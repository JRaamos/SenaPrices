import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { CoreContext } from "context/CoreContext";
import {
    createCatalogItem,
    readCatalogItems,
    readCatalogSections,
    saveCatalogPriceSeed,
} from "services/catalog";

import { ITEM_DEFAULT_FORM_VALUES } from "./constants";
import {
    buildItemPreview,
    buildRecentItemHelper,
    formatLastSaved,
    formatRecentDate,
    ITEM_GUIDELINES,
    sanitizeItemDraft,
    validateItemDraft,
} from "./helpers";
import {
    clearCreateItemDraft,
    readCreateItemDraft,
    saveCreateItemDraft,
} from "./storage";

export default function useController() {
    const n = useNavigate();
    const navigate = useCallback((to) => n(`/${to}`), [n]);

    const { user, setModal } = useContext(CoreContext);

    const [form, setForm] = useState(ITEM_DEFAULT_FORM_VALUES);
    const [catalogItems, setCatalogItems] = useState([]);
    const [sections, setSections] = useState([]);
    const [lastSavedAt, setLastSavedAt] = useState(null);
    const [ready, setReady] = useState(false);
    const [loading, setLoading] = useState(false);

    const refreshCatalogState = useCallback(() => {
        setCatalogItems(readCatalogItems());
        setSections(readCatalogSections());
    }, []);

    useEffect(() => {
        setForm(readCreateItemDraft());
        refreshCatalogState();
        setReady(true);
    }, [refreshCatalogState]);

    useEffect(() => {
        if (!ready) return;

        const timer = window.setTimeout(() => {
            saveCreateItemDraft(form);
            setLastSavedAt(new Date().toISOString());
        }, 300);

        return () => window.clearTimeout(timer);
    }, [form, ready]);

    const applyPatch = useCallback((patch) => {
        setForm(prev => sanitizeItemDraft({
            ...prev,
            ...(typeof patch === "function" ? patch(prev) : patch),
        }));
    }, []);

    const validation = useMemo(() => validateItemDraft(form, catalogItems), [catalogItems, form]);
    const preview = useMemo(() => buildItemPreview(form), [form]);

    const handleClearDraft = useCallback(() => {
        clearCreateItemDraft();
        setForm(ITEM_DEFAULT_FORM_VALUES);
        setLastSavedAt(null);
        toast.success("Rascunho do item limpo com sucesso.");
    }, []);

    const confirmClearDraft = useCallback(() => {
        setModal({
            type: "confirm",
            title: "Deseja limpar este cadastro?",
            text: "Os dados atuais serao removidos do rascunho local. O catalogo salvo continua preservado.",
            action: handleClearDraft,
        });
    }, [handleClearDraft, setModal]);

    const handleSave = useCallback((openCreatePrice = false) => {
        if (loading) {
            return false;
        }

        if (!validation.isValid) {
            toast.error(validation.errorList[0] || "Revise os campos obrigatorios antes de salvar o item.");
            return false;
        }

        setLoading(true);

        try {
            const createdItem = createCatalogItem(form, user);
            refreshCatalogState();
            clearCreateItemDraft();
            setForm(ITEM_DEFAULT_FORM_VALUES);
            setLastSavedAt(null);

            if (openCreatePrice) {
                saveCatalogPriceSeed(createdItem);
                toast.success("Item cadastrado e enviado para a criacao de preco.");
                navigate("dashboard/prices/create");
            } else {
                toast.success("Item cadastrado com sucesso.");
            }

            return createdItem;
        } catch (error) {
            toast.error(error?.message || "Nao foi possivel salvar o item.");
            return false;
        } finally {
            setLoading(false);
        }
    }, [form, loading, navigate, refreshCatalogState, user, validation.errorList, validation.isValid]);

    const handleUseRecentItem = useCallback((item) => {
        const seededDraft = sanitizeItemDraft({
            description1: item?.description1,
            description2: item?.description2,
            description3: item?.description3,
            section: item?.section,
            unit: item?.unit,
            internalCode: "",
            ean13: "",
        });

        setForm(seededDraft);
        toast.info("Base carregada a partir de um item recente. Revise os identificadores antes de salvar.");
    }, []);

    const sectionSuggestions = useMemo(() => (
        sections
            .filter(item => {
                const currentSearch = `${form.section || ""}`.toLowerCase();
                return !currentSearch || item.name.toLowerCase().includes(currentSearch);
            })
            .slice(0, 8)
    ), [form.section, sections]);

    const header = useMemo(() => ({
        title: "Criar Item",
        breadcrumbs: [
            { label: "Home", to: "/dashboard" },
            { label: "Catalogo" },
            { label: "Criar Item" },
        ],
        actions: [
            {
                label: "Itens",
                icon: "products",
                rounded: true,
                outline: true,
                color: "primary",
                action: () => navigate("dashboard/items"),
            },
            {
                label: "Importar",
                icon: "products",
                rounded: true,
                outline: true,
                color: "primary",
                action: () => navigate("dashboard/items/import"),
            },
            {
                label: "Criar preco",
                icon: "products",
                rounded: true,
                color: "primary",
                action: () => navigate("dashboard/prices/create"),
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
            label: "Salvar item",
            color: "primary",
            outline: true,
            rounded: true,
            loadable: true,
            action: () => handleSave(false),
        },
        {
            label: "Salvar e criar preco",
            color: "primary",
            rounded: true,
            loadable: true,
            action: () => handleSave(true),
        },
    ]), [confirmClearDraft, handleSave]);

    const statusCard = useMemo(() => {
        if (validation.isValid) {
            return {
                tone: "green",
                title: "Cadastro consistente",
                description: "O item esta pronto para entrar na base e alimentar os modulos operacionais seguintes.",
            };
        }

        return {
            tone: "orange",
            title: "Ajustes necessarios",
            description: `${validation.errorList.length} ponto(s) exigem revisao antes de salvar no catalogo.`,
        };
    }, [validation.errorList.length, validation.isValid]);

    const summaryItems = useMemo(() => ([
        { label: "Operador", value: user?.email || "usuario@local" },
        { label: "Itens na base", value: `${catalogItems.length}` },
        { label: "Secoes ativas", value: `${sections.length}` },
        { label: "Rascunho", value: formatLastSaved(lastSavedAt) },
    ]), [catalogItems.length, lastSavedAt, sections.length, user]);

    const recentItems = useMemo(() => (
        catalogItems.slice(0, 5).map(item => ({
            ...item,
            helper: buildRecentItemHelper(item),
            relativeDate: formatRecentDate(item.updatedAt || item.createdAt),
        }))
    ), [catalogItems]);

    return {
        loading,
        header,
        actions,
        form,
        preview,
        validation,
        statusCard,
        summaryItems,
        sectionSuggestions,
        recentItems,
        guidelines: ITEM_GUIDELINES,
        applyPatch,
        handleUseRecentItem,
    };
}
