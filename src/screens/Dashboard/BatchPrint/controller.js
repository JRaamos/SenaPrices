import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { CoreContext } from "context/CoreContext";
import { readPrintHistory, markPrintHistoryEntryPrinted } from "services/pricing";
import { readPromotionOrders } from "services/promotions";
import { buildBatchSelectionPrintMarkup } from "services/pricingMarkup";
import {
    canManagePromotions,
    getUserIdentity,
    normalizeUserRole,
} from "services/users";

import {
    BATCH_PRINT_DEFAULT_DRAFT,
    BATCH_PRINT_GUIDELINES,
    BATCH_PRINT_PAPER_OPTIONS,
    BATCH_PRINT_SOURCE_OPTIONS,
} from "./constants";
import {
    buildBatchCandidates,
    buildBatchSourceSummary,
    buildBatchStatus,
    buildRecentBatchJobRow,
    buildUniqueHistoryEntries,
    filterBatchCandidates,
    getCurrentUserKeys,
    sanitizeBatchPrintDraft,
} from "./helpers";
import {
    appendRecentBatchPrintJob,
    readBatchPrintDraft,
    readRecentBatchPrintJobs,
    saveBatchPrintDraft,
} from "./storage";

export default function useController() {
    const n = useNavigate();
    const navigate = useCallback((to) => n(`/${to}`), [n]);

    const { user } = useContext(CoreContext);
    const currentUserId = getUserIdentity(user);
    const currentUserRole = normalizeUserRole(user);
    const canManage = canManagePromotions(user);
    const currentUserKeys = useMemo(() => (
        getCurrentUserKeys(user, currentUserId)
    ), [currentUserId, user]);

    const [loading, setLoading] = useState(false);
    const [draft, setDraft] = useState(readBatchPrintDraft());
    const [historyEntries, setHistoryEntries] = useState([]);
    const [promotionOrders, setPromotionOrders] = useState([]);
    const [recentJobs, setRecentJobs] = useState([]);
    const [ready, setReady] = useState(false);

    const refreshState = useCallback(() => {
        const nextHistory = readPrintHistory();
        const nextOrders = readPromotionOrders();
        setHistoryEntries(nextHistory);
        setPromotionOrders(nextOrders);
        return {
            historyEntries: nextHistory,
            promotionOrders: nextOrders,
        };
    }, []);

    useEffect(() => {
        refreshState();
        setRecentJobs(readRecentBatchPrintJobs().map(buildRecentBatchJobRow));
        setReady(true);
    }, [refreshState]);

    useEffect(() => {
        if (!ready) return;

        const timer = window.setTimeout(() => {
            saveBatchPrintDraft(draft);
        }, 300);

        return () => window.clearTimeout(timer);
    }, [draft, ready]);

    const candidates = useMemo(() => (
        buildBatchCandidates({
            historyEntries,
            promotionOrders,
            canManage,
            currentUserId,
            currentUserKeys,
        })
    ), [canManage, currentUserId, currentUserKeys, historyEntries, promotionOrders]);

    useEffect(() => {
        if (!ready) return;

        const availableKeys = new Set(candidates.map(item => item.key));
        setDraft(prev => {
            const nextSelectedKeys = prev.selectedKeys.filter(item => availableKeys.has(item));

            if (nextSelectedKeys.length === prev.selectedKeys.length) {
                return prev;
            }

            return sanitizeBatchPrintDraft({
                ...prev,
                selectedKeys: nextSelectedKeys,
            });
        });
    }, [candidates, ready]);

    const visibleCandidates = useMemo(() => (
        filterBatchCandidates(candidates, draft)
    ), [candidates, draft]);

    const selectedCandidates = useMemo(() => (
        candidates.filter(item => draft.selectedKeys.includes(item.key))
    ), [candidates, draft.selectedKeys]);

    const uniqueSelectedEntries = useMemo(() => (
        buildUniqueHistoryEntries(selectedCandidates)
    ), [selectedCandidates]);

    const selectedCards = useMemo(() => (
        uniqueSelectedEntries.reduce((result, item) => result + (item.totalCards || 0), 0)
    ), [uniqueSelectedEntries]);

    const applyPatch = useCallback((patch) => {
        setDraft(prev => sanitizeBatchPrintDraft({
            ...prev,
            ...(typeof patch === "function" ? patch(prev) : patch),
        }));
    }, []);

    const handleToggleCandidate = useCallback((candidateKey) => {
        applyPatch(prev => ({
            selectedKeys: prev.selectedKeys.includes(candidateKey)
                ? prev.selectedKeys.filter(item => item !== candidateKey)
                : [...prev.selectedKeys, candidateKey],
        }));
    }, [applyPatch]);

    const handleToggleVisible = useCallback(() => {
        const visibleKeys = visibleCandidates.map(item => item.key);
        const allVisibleSelected = visibleKeys.length > 0
            && visibleKeys.every(item => draft.selectedKeys.includes(item));

        applyPatch(prev => ({
            selectedKeys: allVisibleSelected
                ? prev.selectedKeys.filter(item => !visibleKeys.includes(item))
                : Array.from(new Set([...prev.selectedKeys, ...visibleKeys])),
        }));
    }, [applyPatch, draft.selectedKeys, visibleCandidates]);

    const handleClearSelection = useCallback(() => {
        applyPatch({ selectedKeys: [] });
        toast.info("Selecao do lote limpa com sucesso.");
    }, [applyPatch]);

    const handleRestoreRecentJob = useCallback((job) => {
        if (!job?.selectedKeys?.length) {
            toast.error("Este lote recente não possui seleção restaurável.");
            return;
        }

        const availableKeys = new Set(candidates.map(item => item.key));
        const nextSelectedKeys = job.selectedKeys.filter(item => availableKeys.has(item));

        if (!nextSelectedKeys.length) {
            toast.error("Os registros deste lote não estão mais disponíveis para restauração.");
            return;
        }

        applyPatch({ selectedKeys: nextSelectedKeys });
        toast.success("Seleção do lote restaurada a partir do histórico recente.");
    }, [applyPatch, candidates]);

    const handlePrintBatch = useCallback(() => {
        if (!selectedCandidates.length) {
            toast.error("Selecione ao menos um registro para montar o lote.");
            return;
        }

        if (!uniqueSelectedEntries.length) {
            toast.error("A seleção atual não possui cartazes válidos para impressão.");
            return;
        }

        setLoading(true);

        try {
            const printWindow = window.open("", "_blank", "noopener,noreferrer,width=1180,height=820");

            if (!printWindow) {
                toast.error("Não foi possível abrir a impressão em lote. Verifique o bloqueio de pop-ups.");
                setLoading(false);
                return;
            }

            const title = selectedCandidates.length === 1
                ? `Lote - ${selectedCandidates[0].title}`
                : `Lote operacional com ${selectedCandidates.length} selecao(oes)`;
            const subtitle = [
                buildBatchSourceSummary(selectedCandidates),
                `${selectedCards} cartaz(es)`,
                user?.email || currentUserRole,
            ].filter(Boolean).join(" - ");

            printWindow.document.open();
            printWindow.document.write(buildBatchSelectionPrintMarkup({
                title,
                subtitle,
                entries: uniqueSelectedEntries,
            }));
            printWindow.document.close();
            printWindow.focus();

            uniqueSelectedEntries.forEach(entry => {
                markPrintHistoryEntryPrinted(entry.id);
            });

            const nextRecentJobs = appendRecentBatchPrintJob({
                title,
                sourceSummary: buildBatchSourceSummary(selectedCandidates),
                totalSelections: selectedCandidates.length,
                totalCards: selectedCards,
                selectedKeys: selectedCandidates.map(item => item.key),
            }).map(buildRecentBatchJobRow);

            setRecentJobs(nextRecentJobs);
            refreshState();

            window.setTimeout(() => {
                printWindow.print();
                printWindow.close();
                setLoading(false);
                toast.success("Lote enviado para impressao com sucesso.");
            }, 250);
        } catch (error) {
            console.log("BatchPrintError", error);
            toast.error("Não foi possível imprimir o lote selecionado.");
            setLoading(false);
        }
    }, [
        currentUserRole,
        refreshState,
        selectedCandidates,
        selectedCards,
        uniqueSelectedEntries,
        user,
    ]);

    useEffect(() => {
        if (!ready) return;

        const handleShortcut = (event) => {
            const isModifierPressed = event.ctrlKey || event.metaKey;
            if (!isModifierPressed) return;

            const key = `${event.key || ""}`.toLowerCase();

            if (key === "p") {
                event.preventDefault();
                handlePrintBatch();
            }

            if (key === "a" && event.shiftKey) {
                event.preventDefault();
                handleToggleVisible();
            }
        };

        window.addEventListener("keydown", handleShortcut);
        return () => window.removeEventListener("keydown", handleShortcut);
    }, [handlePrintBatch, handleToggleVisible, ready]);

    const header = useMemo(() => ({
        title: "Impressão em Lote",
        breadcrumbs: [
            { label: "Home", to: "/dashboard" },
            { label: "Operação" },
            { label: "Impressão em Lote" },
        ],
        actions: [
            {
                label: "Histórico",
                rounded: true,
                outline: true,
                color: "primary",
                action: () => navigate("dashboard/history"),
            },
            {
                label: "Promoções",
                rounded: true,
                outline: true,
                color: "primary",
                action: () => navigate("dashboard/promotions"),
            },
            {
                label: "Criação rápida",
                rounded: true,
                color: "secondary",
                action: () => navigate("dashboard/prices/quick"),
            },
        ],
    }), [navigate]);

    const actions = useMemo(() => ([
        {
            label: "Limpar selecao",
            color: "error",
            outline: true,
            rounded: true,
            left: true,
            action: handleClearSelection,
        },
        {
            label: "Atualizar fila",
            color: "primary",
            outline: true,
            rounded: true,
            action: refreshState,
        },
        {
            label: visibleCandidates.length && visibleCandidates.every(item => draft.selectedKeys.includes(item.key))
                ? "Desmarcar visiveis"
                : "Selecionar visiveis",
            color: "primary",
            outline: true,
            rounded: true,
            action: handleToggleVisible,
        },
        {
            label: "Imprimir lote",
            color: "primary",
            rounded: true,
            loadable: true,
            action: handlePrintBatch,
        },
    ]), [draft.selectedKeys, handleClearSelection, handlePrintBatch, handleToggleVisible, refreshState, visibleCandidates]);

    const summaryItems = useMemo(() => {
        const historyCount = visibleCandidates.filter(item => item.source === "history").length;
        const promotionCount = visibleCandidates.filter(item => item.source === "promotion").length;

        if (!canManage) {
            return [
                { label: "Perfil", value: currentUserRole },
                { label: "Fontes visiveis", value: `${visibleCandidates.length}` },
                { label: "Meu histórico", value: `${historyCount}` },
                { label: "Promoções atribuidas", value: `${promotionCount}` },
                { label: "Selecionadas", value: `${selectedCandidates.length}` },
                { label: "Cartazes unicos", value: `${selectedCards}` },
            ];
        }

        return [
            { label: "Perfil", value: currentUserRole },
            { label: "Fontes visiveis", value: `${visibleCandidates.length}` },
            { label: "Histórico", value: `${historyCount}` },
            { label: "Promoções ativas", value: `${promotionCount}` },
            { label: "Selecionadas", value: `${selectedCandidates.length}` },
            { label: "Cartazes unicos", value: `${selectedCards}` },
        ];
    }, [canManage, currentUserRole, selectedCandidates.length, selectedCards, visibleCandidates]);

    const statusCard = useMemo(() => (
        buildBatchStatus({
            candidates,
            visibleCandidates,
            selectedCandidates,
        })
    ), [candidates, selectedCandidates, visibleCandidates]);

    return {
        loading,
        canManage,
        currentUserRole,
        header,
        actions,
        draft,
        candidates: visibleCandidates,
        selectedCandidates,
        recentJobs,
        statusCard,
        summaryItems,
        guidelines: BATCH_PRINT_GUIDELINES,
        sourceOptions: BATCH_PRINT_SOURCE_OPTIONS,
        paperOptions: BATCH_PRINT_PAPER_OPTIONS,
        applyPatch,
        handleToggleCandidate,
        handleToggleVisible,
        handleClearSelection,
        handleRestoreRecentJob,
    };
}
