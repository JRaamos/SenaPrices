import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { CoreContext } from "context/CoreContext";
import {
    clearPromotionSeed,
    createPromotionOrder,
    deletePromotionOrder,
    readPromotionOrders,
    readPromotionSeed,
    sanitizePromotionOrder,
} from "services/promotions";
import {
    markPrintHistoryEntryPrinted,
    readPrintHistory,
} from "services/pricing";
import { buildPromotionPrintMarkup } from "services/pricingMarkup";

import {
    PROMOTION_GUIDELINES,
    PROMOTION_ORIENTATION_OPTIONS,
    PROMOTION_PAPER_SIZE_OPTIONS,
    PROMOTION_SOURCE_OPTIONS,
} from "./constants";
import {
    buildPromotionSeedDraft,
    buildPromotionStatus,
    decoratePromotionOrder,
    decoratePromotionSourceEntry,
    filterPromotionSources,
    resolvePromotionEntries,
    sanitizePromotionDraft,
    validatePromotionDraft,
} from "./helpers";
import {
    clearPromotionDraft,
    readPromotionDraft,
    savePromotionDraft,
} from "./storage";

export default function useController() {
    const n = useNavigate();
    const navigate = useCallback((to) => n(`/${to}`), [n]);

    const { setModal, user } = useContext(CoreContext);

    const [loading, setLoading] = useState(false);
    const [historyEntries, setHistoryEntries] = useState([]);
    const [orders, setOrders] = useState([]);
    const [form, setForm] = useState(readPromotionDraft());
    const [selectionSearch, setSelectionSearch] = useState("");
    const [selectionSource, setSelectionSource] = useState("");
    const [ready, setReady] = useState(false);

    const refreshState = useCallback(() => {
        const nextHistoryEntries = readPrintHistory();
        const nextOrders = readPromotionOrders();
        setHistoryEntries(nextHistoryEntries);
        setOrders(nextOrders);
        return {
            historyEntries: nextHistoryEntries,
            orders: nextOrders,
        };
    }, []);

    useEffect(() => {
        const nextState = refreshState();
        const seed = readPromotionSeed();
        const seededDraft = buildPromotionSeedDraft(readPromotionDraft(), seed, nextState.historyEntries);

        setForm(seededDraft);
        clearPromotionSeed();
        setReady(true);
    }, [refreshState]);

    useEffect(() => {
        if (!ready) return;

        const timer = window.setTimeout(() => {
            savePromotionDraft(form);
        }, 300);

        return () => window.clearTimeout(timer);
    }, [form, ready]);

    const applyPatch = useCallback((patch) => {
        setForm(prev => sanitizePromotionDraft({
            ...prev,
            ...(typeof patch === "function" ? patch(prev) : patch),
        }));
    }, []);

    const validation = useMemo(() => (
        validatePromotionDraft(form, historyEntries)
    ), [form, historyEntries]);

    const selectedEntries = useMemo(() => (
        resolvePromotionEntries(validation.draft.selectedEntryIds, historyEntries)
    ), [historyEntries, validation.draft.selectedEntryIds]);

    const visibleSources = useMemo(() => (
        filterPromotionSources(historyEntries, selectionSearch, selectionSource)
            .map(entry => decoratePromotionSourceEntry(entry, validation.draft.selectedEntryIds))
    ), [historyEntries, selectionSearch, selectionSource, validation.draft.selectedEntryIds]);

    const decoratedOrders = useMemo(() => (
        orders.map(order => decoratePromotionOrder(order, historyEntries))
    ), [historyEntries, orders]);

    const activeOrders = useMemo(() => (
        decoratedOrders.filter(order => !order.isExpired)
    ), [decoratedOrders]);

    const header = useMemo(() => ({
        title: "Promocoes",
        breadcrumbs: [
            { label: "Home", to: "/dashboard" },
            { label: "Operacao" },
            { label: "Promocoes" },
        ],
        actions: [
            {
                label: "Historico",
                icon: "products",
                rounded: true,
                outline: true,
                color: "primary",
                action: () => navigate("dashboard/history"),
            },
            {
                label: "Criar preco",
                icon: "products",
                rounded: true,
                color: "secondary",
                action: () => navigate("dashboard/prices/create"),
            },
        ],
    }), [navigate]);

    const clearForm = useCallback(() => {
        clearPromotionDraft();
        clearPromotionSeed();
        setForm(readPromotionDraft());
        toast.success("Formulario de promocao limpo com sucesso.");
    }, []);

    const confirmClearForm = useCallback(() => {
        setModal({
            type: "confirm",
            title: "Deseja limpar esta promocao?",
            text: "O formulario atual sera limpo, mas a fila ja criada continuara preservada.",
            action: clearForm,
        });
    }, [clearForm, setModal]);

    const handleToggleEntry = useCallback((entryId) => {
        applyPatch(prev => ({
            selectedEntryIds: prev.selectedEntryIds.includes(entryId)
                ? prev.selectedEntryIds.filter(item => item !== entryId)
                : [...prev.selectedEntryIds, entryId],
        }));
    }, [applyPatch]);

    const handleCreateOrder = useCallback(() => {
        if (!validation.isValid) {
            toast.error(validation.errorList[0] || "Revise os dados da promocao antes de enviar para a fila.");
            return;
        }

        setLoading(true);

        try {
            const totalCards = selectedEntries.reduce((result, item) => result + (item.totalCards || 0), 0);
            createPromotionOrder({
                ...validation.draft,
                totalCards,
                entryTitles: selectedEntries.map(item => item.title).filter(Boolean),
            }, user);

            refreshState();
            clearPromotionDraft();
            clearPromotionSeed();
            setForm(readPromotionDraft());
            toast.success("Promocao enviada para a fila com sucesso.");
        } catch (error) {
            toast.error(error?.message || "Nao foi possivel criar a promocao.");
        } finally {
            setLoading(false);
        }
    }, [refreshState, selectedEntries, user, validation]);

    const handleUseOrderAsTemplate = useCallback((order) => {
        const safeOrder = sanitizePromotionOrder(order);
        applyPatch({
            name: safeOrder.name,
            description: safeOrder.description,
            validFrom: safeOrder.validFrom,
            validTo: safeOrder.validTo,
            paperSize: safeOrder.paperSize,
            orientation: safeOrder.orientation,
            selectedEntryIds: safeOrder.historyEntryIds,
        });
        toast.info("Promocao carregada como base no formulario.");
    }, [applyPatch]);

    const handlePrintOrder = useCallback((order) => {
        const relatedEntries = resolvePromotionEntries(order.historyEntryIds, readPrintHistory());

        if (!relatedEntries.length) {
            toast.error("Nenhum registro valido do historico foi encontrado para esta promocao.");
            return;
        }

        setLoading(true);

        try {
            const printWindow = window.open("", "_blank", "noopener,noreferrer,width=1180,height=820");

            if (!printWindow) {
                toast.error("Nao foi possivel abrir a impressao da promocao. Verifique o bloqueio de pop-ups.");
                setLoading(false);
                return;
            }

            printWindow.document.open();
            printWindow.document.write(buildPromotionPrintMarkup(order, relatedEntries));
            printWindow.document.close();
            printWindow.focus();

            relatedEntries.forEach(item => {
                markPrintHistoryEntryPrinted(item.id);
            });
            refreshState();

            window.setTimeout(() => {
                printWindow.print();
                printWindow.close();
                setLoading(false);
            }, 250);
        } catch (error) {
            console.log("PromotionPrintError", error);
            toast.error("Nao foi possivel imprimir a promocao.");
            setLoading(false);
        }
    }, [refreshState]);

    const performDeleteOrder = useCallback((order) => {
        if (!order) return;

        deletePromotionOrder(order.id);
        refreshState();
        toast.success("Promocao removida da fila.");
    }, [refreshState]);

    const handleDeleteOrder = useCallback((order) => {
        if (!order) return;

        setModal({
            type: "confirm",
            title: "Deseja remover esta promocao?",
            text: "A remocao afeta apenas a fila promocional. Os registros originais do historico permanecem preservados.",
            action: () => performDeleteOrder(order),
        });
    }, [performDeleteOrder, setModal]);

    const actions = useMemo(() => ([
        {
            label: "Limpar formulario",
            color: "error",
            outline: true,
            rounded: true,
            left: true,
            action: confirmClearForm,
        },
        {
            label: "Atualizar fila",
            color: "primary",
            outline: true,
            rounded: true,
            action: refreshState,
        },
        {
            label: "Criar promocao",
            color: "primary",
            rounded: true,
            loadable: true,
            action: handleCreateOrder,
        },
    ]), [confirmClearForm, handleCreateOrder, refreshState]);

    const summaryItems = useMemo(() => {
        const selectedCards = selectedEntries.reduce((result, item) => result + (item.totalCards || 0), 0);

        return [
            { label: "Promocoes na fila", value: `${decoratedOrders.length}` },
            { label: "Ativas", value: `${activeOrders.length}` },
            { label: "Selecionados no formulario", value: `${selectedEntries.length}` },
            { label: "Cartazes da selecao", value: `${selectedCards}` },
        ];
    }, [activeOrders.length, decoratedOrders.length, selectedEntries]);

    const statusCard = useMemo(() => (
        buildPromotionStatus({
            orders: decoratedOrders,
            activeOrders,
            validation,
        })
    ), [activeOrders, decoratedOrders, validation]);

    return {
        loading,
        header,
        actions,
        form: validation.draft,
        validation,
        statusCard,
        summaryItems,
        recentOrders: decoratedOrders.slice(0, 4),
        orders: decoratedOrders,
        availableSources: visibleSources,
        sourceOptions: PROMOTION_SOURCE_OPTIONS,
        paperSizeOptions: PROMOTION_PAPER_SIZE_OPTIONS,
        orientationOptions: PROMOTION_ORIENTATION_OPTIONS,
        selectionSearch,
        selectionSource,
        guidelines: PROMOTION_GUIDELINES,
        setSelectionSearch,
        setSelectionSource,
        applyPatch,
        handleToggleEntry,
        handleCreateOrder,
        handleUseOrderAsTemplate,
        handlePrintOrder,
        handleDeleteOrder,
    };
}
