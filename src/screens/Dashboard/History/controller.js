import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { CoreContext } from "context/CoreContext";
import {
    deletePrintHistoryEntry,
    markPrintHistoryEntryPrinted,
    readPrintHistory,
} from "services/pricing";

import { savePriceStudioDraft } from "../CreatePrice/storage";
import { saveQuickPriceDraft } from "../QuickPrice/storage";
import {
    DEFAULT_HISTORY_FILTERS,
    HISTORY_GUIDELINES,
    HISTORY_SOURCE_OPTIONS,
    HISTORY_STATUS_OPTIONS,
} from "./constants";
import {
    buildHistoryPrintMarkup,
    buildHistoryRow,
    buildHistoryStatus,
    filterHistoryEntries,
    sanitizeHistoryFilters,
} from "./helpers";

export default function useController() {
    const n = useNavigate();
    const navigate = useCallback((to) => n(`/${to}`), [n]);

    const { setModal, user } = useContext(CoreContext);

    const [loading, setLoading] = useState(false);
    const [entries, setEntries] = useState([]);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState(DEFAULT_HISTORY_FILTERS);

    const refreshHistory = useCallback(() => {
        const nextEntries = readPrintHistory();
        setEntries(nextEntries);
        return nextEntries;
    }, []);

    useEffect(() => {
        refreshHistory();
    }, [refreshHistory]);

    const visibleEntries = useMemo(() => (
        filterHistoryEntries(entries, search, filters).map(buildHistoryRow)
    ), [entries, filters, search]);

    const header = useMemo(() => ({
        title: "Historico",
        breadcrumbs: [
            { label: "Home", to: "/dashboard" },
            { label: "Operacao" },
            { label: "Historico" },
        ],
        actions: [
            {
                label: "Criar preco",
                icon: "products",
                rounded: true,
                outline: true,
                color: "primary",
                action: () => navigate("dashboard/prices/create"),
            },
            {
                label: "Criacao rapida",
                icon: "products",
                rounded: true,
                color: "secondary",
                action: () => navigate("dashboard/prices/quick"),
            },
        ],
    }), [navigate]);

    const actions = useMemo(() => ([
        {
            label: "Atualizar historico",
            color: "primary",
            outline: true,
            rounded: true,
            left: true,
            action: refreshHistory,
        },
        {
            label: "Criar preco",
            color: "primary",
            outline: true,
            rounded: true,
            action: () => navigate("dashboard/prices/create"),
        },
        {
            label: "Criacao rapida",
            color: "primary",
            rounded: true,
            action: () => navigate("dashboard/prices/quick"),
        },
    ]), [navigate, refreshHistory]);

    const summaryItems = useMemo(() => {
        const totalCards = entries.reduce((result, item) => result + (item.totalCards || 0), 0);
        const printedEntries = entries.filter(item => !!item.printedAt).length;
        const quickEntries = entries.filter(item => item.source === "quick").length;

        return [
            { label: "Operador", value: user?.email || "usuario@local" },
            { label: "Registros", value: `${entries.length}` },
            { label: "Cartazes rastreados", value: `${totalCards}` },
            { label: "Impressos", value: `${printedEntries}` },
            { label: "Lotes rapidos", value: `${quickEntries}` },
            { label: "Na visao atual", value: `${visibleEntries.length}` },
        ];
    }, [entries, user, visibleEntries.length]);

    const statusCard = useMemo(() => (
        buildHistoryStatus({
            entries,
            filteredEntries: visibleEntries,
        })
    ), [entries, visibleEntries]);

    const recentEntries = useMemo(() => visibleEntries.slice(0, 4), [visibleEntries]);

    const applyFiltersPatch = useCallback((patch) => {
        setFilters(prev => sanitizeHistoryFilters({
            ...prev,
            ...(typeof patch === "function" ? patch(prev) : patch),
        }));
    }, []);

    const clearFilters = useCallback(() => {
        setSearch("");
        setFilters(DEFAULT_HISTORY_FILTERS);
    }, []);

    const handleRestoreEntry = useCallback((entry) => {
        if (!entry?.restoreDraft) {
            toast.error("Este registro nao possui um rascunho restauravel.");
            return;
        }

        if (entry.restoreTarget === "quick") {
            saveQuickPriceDraft(entry.restoreDraft);
            toast.success("Lote enviado de volta para a Criacao Rapida.");
            navigate("dashboard/prices/quick");
            return;
        }

        savePriceStudioDraft(entry.restoreDraft);
        toast.success("Composicao enviada de volta para Criar Preco.");
        navigate("dashboard/prices/create");
    }, [navigate]);

    const handlePrintEntry = useCallback((entry) => {
        if (!entry?.restoreDraft) {
            toast.error("Este registro nao possui dados suficientes para reimpressao.");
            return;
        }

        setLoading(true);

        try {
            const printWindow = window.open("", "_blank", "noopener,noreferrer,width=1080,height=760");

            if (!printWindow) {
                toast.error("Nao foi possivel abrir a reimpressao. Verifique o bloqueio de pop-ups.");
                setLoading(false);
                return;
            }

            printWindow.document.open();
            printWindow.document.write(buildHistoryPrintMarkup(entry));
            printWindow.document.close();
            printWindow.focus();

            markPrintHistoryEntryPrinted(entry.id);
            refreshHistory();

            window.setTimeout(() => {
                printWindow.print();
                printWindow.close();
                setLoading(false);
            }, 250);
        } catch (error) {
            console.log("HistoryPrintError", error);
            toast.error("Nao foi possivel reimprimir este registro.");
            setLoading(false);
        }
    }, [refreshHistory]);

    const performDeleteEntry = useCallback((entry) => {
        if (!entry) return;

        deletePrintHistoryEntry(entry.id);
        refreshHistory();
        toast.success("Registro removido do historico.");
    }, [refreshHistory]);

    const handleDeleteEntry = useCallback((entry) => {
        if (!entry) return;

        setModal({
            type: "confirm",
            title: "Deseja remover este registro?",
            text: "A exclusao afeta apenas o historico operacional desta base local. Use somente quando a remocao for realmente necessaria.",
            action: () => performDeleteEntry(entry),
        });
    }, [performDeleteEntry, setModal]);

    return {
        loading,
        header,
        actions,
        entries: visibleEntries,
        search,
        filters,
        sourceOptions: HISTORY_SOURCE_OPTIONS,
        statusOptions: HISTORY_STATUS_OPTIONS,
        statusCard,
        summaryItems,
        recentEntries,
        guidelines: HISTORY_GUIDELINES,
        applyFiltersPatch,
        clearFilters,
        setSearch,
        handleRestoreEntry,
        handlePrintEntry,
        handleDeleteEntry,
    };
}
