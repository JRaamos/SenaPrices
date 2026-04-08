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
    canManagePromotions,
    getUserIdentity,
    normalizeUserRole,
    readUsersDirectory,
} from "services/users";

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
    const currentUserId = getUserIdentity(user);
    const currentUserRole = normalizeUserRole(user);
    const canManage = canManagePromotions(user);

    const [loading, setLoading] = useState(false);
    const [historyEntries, setHistoryEntries] = useState([]);
    const [orders, setOrders] = useState([]);
    const [usersDirectory, setUsersDirectory] = useState([]);
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

    const loadUsersDirectory = useCallback(async () => {
        if (!canManage) {
            setUsersDirectory([]);
            return [];
        }

        const users = await readUsersDirectory();
        const assignableUsers = users.filter(item => item.role === "user");
        setUsersDirectory(assignableUsers);
        return assignableUsers;
    }, [canManage]);

    useEffect(() => {
        let active = true;

        const init = async () => {
            const nextState = refreshState();
            const seed = readPromotionSeed();
            const directory = await loadUsersDirectory();
            const baseDraft = buildPromotionSeedDraft(readPromotionDraft(), seed, nextState.historyEntries);
            const fallbackAssignedIds = canManage
                ? baseDraft.assignedUserIds
                : [currentUserId].filter(Boolean);
            const sanitizedDraft = sanitizePromotionDraft({
                ...baseDraft,
                assignedUserIds: fallbackAssignedIds.filter(id => (
                    !canManage || directory.some(item => item.id === id)
                )),
            });

            if (!active) return;

            setForm(sanitizedDraft);
            clearPromotionSeed();
            setReady(true);
        };

        init();

        return () => {
            active = false;
        };
    }, [canManage, currentUserId, loadUsersDirectory, refreshState]);

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
        validatePromotionDraft(form, historyEntries, canManage)
    ), [canManage, form, historyEntries]);

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

    const archivedOrders = useMemo(() => (
        decoratedOrders.filter(order => order.isExpired)
    ), [decoratedOrders]);

    const visibleOrders = useMemo(() => {
        if (canManage) {
            return activeOrders;
        }

        return activeOrders.filter(order => order.assignedUserIds.includes(currentUserId));
    }, [activeOrders, canManage, currentUserId]);

    const header = useMemo(() => ({
        title: "Promoções",
        breadcrumbs: [
            { label: "Home", to: "/dashboard" },
            { label: "Operação" },
            { label: "Promoções" },
        ],
        actions: [
            {
                label: "Histórico",
                icon: "products",
                rounded: true,
                outline: true,
                color: "primary",
                action: () => navigate("dashboard/history"),
            },
            !canManage ? null : {
                label: "Criar preço",
                icon: "products",
                rounded: true,
                color: "secondary",
                action: () => navigate("dashboard/prices/create"),
            },
            !canManage ? null : {
                label: "Importar",
                icon: "products",
                rounded: true,
                outline: true,
                color: "primary",
                action: () => navigate("dashboard/items/import"),
            },
        ],
    }), [canManage, navigate]);

    const clearForm = useCallback(() => {
        if (!canManage) {
            return;
        }

        clearPromotionDraft();
        clearPromotionSeed();
        setForm(readPromotionDraft());
        toast.success("Formulário de promoção limpo com sucesso.");
    }, [canManage]);

    const confirmClearForm = useCallback(() => {
        setModal({
            type: "confirm",
            title: "Deseja limpar esta promoção?",
            text: "O formulário atual será limpo, mas a fila já criada continuará preservada.",
            action: clearForm,
        });
    }, [clearForm, setModal]);

    const handleToggleEntry = useCallback((entryId) => {
        if (!canManage) {
            return;
        }

        applyPatch(prev => ({
            selectedEntryIds: prev.selectedEntryIds.includes(entryId)
                ? prev.selectedEntryIds.filter(item => item !== entryId)
                : [...prev.selectedEntryIds, entryId],
        }));
    }, [applyPatch, canManage]);

    const handleToggleAssignedUser = useCallback((userId) => {
        if (!canManage) {
            return;
        }

        applyPatch(prev => ({
            assignedUserIds: prev.assignedUserIds.includes(userId)
                ? prev.assignedUserIds.filter(item => item !== userId)
                : [...prev.assignedUserIds, userId],
        }));
    }, [applyPatch, canManage]);

    const handleCreateOrder = useCallback(() => {
        if (!canManage) {
            toast.error("Somente admin e subadmin podem criar promoções programadas.");
            return;
        }

        if (!validation.isValid) {
            toast.error(validation.errorList[0] || "Revise os dados da promoção antes de enviar para a fila.");
            return;
        }

        setLoading(true);

        try {
            const totalCards = selectedEntries.reduce((result, item) => result + (item.totalCards || 0), 0);
            const assignedUsers = usersDirectory.filter(item => validation.draft.assignedUserIds.includes(item.id));
            createPromotionOrder({
                ...validation.draft,
                totalCards,
                entryTitles: selectedEntries.map(item => item.title).filter(Boolean),
                assignedUserNames: assignedUsers.map(item => item.name),
            }, user);

            refreshState();
            clearPromotionDraft();
            clearPromotionSeed();
            setForm(readPromotionDraft());
            toast.success("Promoção enviada para a fila com sucesso.");
        } catch (error) {
            toast.error(error?.message || "Não foi possível criar a promoção.");
        } finally {
            setLoading(false);
        }
    }, [canManage, refreshState, selectedEntries, user, usersDirectory, validation]);

    const handleUseOrderAsTemplate = useCallback((order) => {
        if (!canManage) {
            return;
        }

        const safeOrder = sanitizePromotionOrder(order);
        applyPatch({
            name: safeOrder.name,
            description: safeOrder.description,
            validFrom: safeOrder.validFrom,
            validTo: safeOrder.validTo,
            paperSize: safeOrder.paperSize,
            orientation: safeOrder.orientation,
            selectedEntryIds: safeOrder.historyEntryIds,
            assignedUserIds: safeOrder.assignedUserIds,
        });
        toast.info("Promoção carregada como base no formulário.");
    }, [applyPatch, canManage]);

    const handlePrintOrder = useCallback((order) => {
        if (!canManage && !order?.assignedUserIds?.includes(currentUserId)) {
            toast.error("Esta promoção não está atribuída ao seu usuário.");
            return;
        }

        const relatedEntries = resolvePromotionEntries(order.historyEntryIds, readPrintHistory());

        if (!relatedEntries.length) {
            toast.error("Nenhum registro válido do histórico foi encontrado para esta promoção.");
            return;
        }

        setLoading(true);

        try {
            const printWindow = window.open("", "_blank", "noopener,noreferrer,width=1180,height=820");

            if (!printWindow) {
                toast.error("Não foi possível abrir a impressão da promoção. Verifique o bloqueio de pop-ups.");
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
            toast.error("Não foi possível imprimir a promoção.");
            setLoading(false);
        }
    }, [canManage, currentUserId, refreshState]);

    const performDeleteOrder = useCallback((order) => {
        if (!order) return;

        deletePromotionOrder(order.id);
        refreshState();
        toast.success("Promoção removida da fila.");
    }, [refreshState]);

    const handleDeleteOrder = useCallback((order) => {
        if (!canManage) {
            toast.error("Somente admin e subadmin podem remover promoções.");
            return;
        }

        if (!order) return;

        setModal({
            type: "confirm",
            title: "Deseja remover esta promoção?",
            text: "A remoção afeta apenas a fila promocional. Os registros originais do histórico permanecem preservados.",
            action: () => performDeleteOrder(order),
        });
    }, [canManage, performDeleteOrder, setModal]);

    const actions = useMemo(() => ([
        !canManage ? null : {
            label: "Limpar formulário",
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
            action: async () => {
                refreshState();
                if (canManage) {
                    await loadUsersDirectory();
                }
            },
        },
        !canManage ? null : {
            label: "Criar promoção",
            color: "primary",
            rounded: true,
            loadable: true,
            action: handleCreateOrder,
        },
    ].filter(Boolean)), [canManage, confirmClearForm, handleCreateOrder, loadUsersDirectory, refreshState]);

    const summaryItems = useMemo(() => {
        const selectedCards = selectedEntries.reduce((result, item) => result + (item.totalCards || 0), 0);
        const queueCards = visibleOrders.reduce((result, item) => result + (item.totalCards || 0), 0);

        if (!canManage) {
            return [
                { label: "Perfil", value: "user" },
                { label: "Recebidas por você", value: `${visibleOrders.length}` },
                { label: "Cartazes na fila", value: `${queueCards}` },
                { label: "Prontas para imprimir", value: `${visibleOrders.length}` },
            ];
        }

        return [
            { label: "Perfil", value: currentUserRole },
            { label: "Ativas", value: `${activeOrders.length}` },
            { label: "Encerradas", value: `${archivedOrders.length}` },
            { label: "Usuários elegíveis", value: `${usersDirectory.length}` },
            { label: "Selecionados no formulário", value: `${selectedEntries.length}` },
            { label: "Cartazes da seleção", value: `${selectedCards}` },
        ];
    }, [
        activeOrders.length,
        archivedOrders.length,
        canManage,
        currentUserRole,
        selectedEntries,
        usersDirectory.length,
        visibleOrders,
    ]);

    const statusCard = useMemo(() => (
        buildPromotionStatus({
            orders: visibleOrders,
            activeOrders: canManage ? activeOrders : visibleOrders,
            validation,
            canManage,
        })
    ), [activeOrders, canManage, validation, visibleOrders]);

    return {
        loading,
        canManage,
        currentUserRole,
        header,
        actions,
        form: validation.draft,
        validation,
        statusCard,
        summaryItems,
        recentOrders: (canManage ? activeOrders : visibleOrders).slice(0, 4),
        orders: visibleOrders,
        archivedOrders,
        availableSources: visibleSources,
        assignableUsers: usersDirectory,
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
        handleToggleAssignedUser,
        handleCreateOrder,
        handleUseOrderAsTemplate,
        handlePrintOrder,
        handleDeleteOrder,
    };
}
