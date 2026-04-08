import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { CoreContext } from "context/CoreContext";
import {
    buildPriceDraftFromCatalogItem,
    clearCatalogPriceSeed,
    readCatalogPriceSeed,
} from "services/catalog";

import {
    DEFAULT_FORM_VALUES,
    ORIENTATION_OPTIONS,
    PAPER_SIZE_OPTIONS,
    PRICE_TYPE_OPTIONS,
    QUALITY_GUIDELINES,
    SPECIAL_LAYOUT_OPTIONS,
    UNIT_OPTIONS,
} from "./constants";
import {
    buildPreview,
    buildPrintMarkup,
    buildSnapshot,
    formatLastSaved,
    formatRecentDate,
    sanitizeDraft,
    validateDraft,
} from "./helpers";
import {
    appendRecentComposition,
    clearPriceStudioDraft,
    readPriceStudioDraft,
    readRecentCompositions,
    savePriceStudioDraft,
} from "./storage";

export default function useController() {
    const n = useNavigate();
    const navigate = useCallback((to) => n(`/${to}`), [n]);

    const { user, setModal } = useContext(CoreContext);

    const [form, setForm] = useState(DEFAULT_FORM_VALUES);
    const [recentCompositions, setRecentCompositions] = useState([]);
    const [lastSavedAt, setLastSavedAt] = useState(null);
    const [ready, setReady] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const priceSeed = readCatalogPriceSeed();

        if (priceSeed) {
            setForm(sanitizeDraft({
                ...DEFAULT_FORM_VALUES,
                ...buildPriceDraftFromCatalogItem(priceSeed),
            }));
            clearCatalogPriceSeed();
        } else {
            setForm(readPriceStudioDraft());
        }

        setRecentCompositions(readRecentCompositions());
        setReady(true);
    }, []);

    useEffect(() => {
        if (!ready) return;

        const timer = window.setTimeout(() => {
            savePriceStudioDraft(form);
            setLastSavedAt(new Date().toISOString());
        }, 300);

        return () => window.clearTimeout(timer);
    }, [form, ready]);

    const applyPatch = useCallback((patch) => {
        setForm(prev => sanitizeDraft({
            ...prev,
            ...(typeof patch === "function" ? patch(prev) : patch),
        }));
    }, []);

    const validation = useMemo(() => validateDraft(form), [form]);
    const preview = useMemo(() => buildPreview(form), [form]);

    const handleSaveSnapshot = useCallback((showToast = true) => {
        if (!validation.isValid) {
            toast.error(validation.errorList[0] || "Revise os campos obrigatorios antes de salvar.");
            return false;
        }

        const snapshot = buildSnapshot(form, user);
        const nextRecent = appendRecentComposition(snapshot);
        setRecentCompositions(nextRecent);

        if (showToast) {
            toast.success("Composicao salva localmente com sucesso.");
        }

        return snapshot;
    }, [form, user, validation.errorList, validation.isValid]);

    const handlePrint = useCallback(() => {
        if (!validation.isValid) {
            toast.error(validation.errorList[0] || "Revise a composicao antes de imprimir.");
            return;
        }

        handleSaveSnapshot(false);
        setLoading(true);

        try {
            const printWindow = window.open("", "_blank", "noopener,noreferrer,width=980,height=720");

            if (!printWindow) {
                toast.error("Nao foi possivel abrir a impressao. Verifique se o navegador bloqueou pop-ups.");
                setLoading(false);
                return;
            }

            printWindow.document.open();
            printWindow.document.write(buildPrintMarkup(preview));
            printWindow.document.close();
            printWindow.focus();

            window.setTimeout(() => {
                printWindow.print();
                printWindow.close();
                setLoading(false);
            }, 250);
        } catch (error) {
            console.log("CreatePricePrintError", error);
            toast.error("A impressao falhou. Tente novamente em alguns instantes.");
            setLoading(false);
        }
    }, [handleSaveSnapshot, preview, validation.errorList, validation.isValid]);

    const handleRestoreComposition = useCallback((snapshot) => {
        if (!snapshot?.draft) return;

        applyPatch(snapshot.draft);
        toast.success("Composicao restaurada a partir do historico local.");
    }, [applyPatch]);

    const handleClearDraft = useCallback(() => {
        clearPriceStudioDraft();
        setForm(DEFAULT_FORM_VALUES);
        setLastSavedAt(null);
        toast.success("Rascunho limpo com sucesso.");
    }, []);

    const confirmClearDraft = useCallback(() => {
        setModal({
            type: "confirm",
            title: "Deseja limpar este rascunho?",
            text: "A composicao atual sera removida do rascunho local. O historico salvo continua disponivel para restauracao.",
            action: handleClearDraft,
        });
    }, [handleClearDraft, setModal]);

    useEffect(() => {
        if (!ready) return;

        const handleShortcut = (event) => {
            const isModifierPressed = event.ctrlKey || event.metaKey;
            if (!isModifierPressed) return;

            const key = `${event.key || ""}`.toLowerCase();

            if (key === "s") {
                event.preventDefault();
                handleSaveSnapshot();
            }

            if (key === "p") {
                event.preventDefault();
                handlePrint();
            }
        };

        window.addEventListener("keydown", handleShortcut);

        return () => window.removeEventListener("keydown", handleShortcut);
    }, [handlePrint, handleSaveSnapshot, ready]);

    const header = useMemo(() => ({
        title: "Criar Preco",
        breadcrumbs: [
            { label: "Home", to: "/dashboard" },
            { label: "Operacao" },
            { label: "Criar Preco" },
        ],
        actions: [
            {
                label: "Painel",
                icon: "home",
                rounded: true,
                outline: true,
                color: "primary",
                action: () => navigate("dashboard"),
            },
            {
                label: "Suporte",
                icon: "proposal",
                rounded: true,
                color: "secondary",
                action: () => navigate("dashboard/support"),
            },
        ],
    }), [navigate]);

    const actions = useMemo(() => ([
        {
            label: "Limpar rascunho",
            color: "error",
            outline: true,
            rounded: true,
            left: true,
            action: confirmClearDraft,
        },
        {
            label: "Salvar versao",
            color: "primary",
            outline: true,
            rounded: true,
            action: () => handleSaveSnapshot(),
        },
        {
            label: "Imprimir cartaz",
            color: "primary",
            rounded: true,
            loadable: true,
            action: handlePrint,
        },
    ]), [confirmClearDraft, handlePrint, handleSaveSnapshot]);

    const statusCard = useMemo(() => {
        if (validation.isValid) {
            return {
                tone: "green",
                title: "Pronto para impressao",
                description: "Os campos obrigatorios foram validados e a composicao esta pronta para gerar cartaz.",
            };
        }

        return {
            tone: "orange",
            title: "Ajustes necessarios",
            description: `${validation.errorList.length} ponto(s) precisam de revisao antes da impressao.`,
        };
    }, [validation.errorList.length, validation.isValid]);

    const summaryItems = useMemo(() => ([
        { label: "Operador", value: user?.email || "usuario@local" },
        { label: "Tipo", value: PRICE_TYPE_OPTIONS.find(item => item.value === form.priceType)?.label || "--" },
        { label: "Formato", value: preview.paperLabel || "--" },
        { label: "Rascunho", value: formatLastSaved(lastSavedAt) },
    ]), [form.priceType, lastSavedAt, preview.paperLabel, user]);

    const recentItems = useMemo(() => (
        recentCompositions.map(item => ({
            ...item,
            helper: `${item.primaryPrice} - ${item.paperLabel}`,
            relativeDate: formatRecentDate(item.createdAt),
        }))
    ), [recentCompositions]);

    const shortcuts = useMemo(() => ([
        {
            label: "Ctrl + S",
            description: "Salva a composicao valida no historico local criptografado.",
        },
        {
            label: "Ctrl + P",
            description: "Abre a impressao da composicao atual quando os dados estiverem validos.",
        },
    ]), []);

    return {
        loading,
        header,
        actions,
        form,
        preview,
        validation,
        statusCard,
        summaryItems,
        recentItems,
        shortcuts,
        guidelines: QUALITY_GUIDELINES,
        priceTypeOptions: PRICE_TYPE_OPTIONS,
        paperSizeOptions: PAPER_SIZE_OPTIONS,
        orientationOptions: ORIENTATION_OPTIONS,
        unitOptions: UNIT_OPTIONS,
        specialLayoutOptions: SPECIAL_LAYOUT_OPTIONS,
        applyPatch,
        handleRestoreComposition,
    };
}
