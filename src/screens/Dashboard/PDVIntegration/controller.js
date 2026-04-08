import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { CoreContext } from "context/CoreContext";
import {
    appendPdvSyncHistory,
    buildPdvOperationalOverview,
    getPdvTypeLabel,
    readPdvConfig,
    runPdvConnectionTest,
    savePdvConfig,
    validatePdvConfig,
} from "services/pdv";

import {
    PDV_COMPATIBILITY_OPTIONS,
    PDV_GUIDELINES,
    PDV_POLICY_ROWS,
    PDV_STEP_CONTENT,
    PDV_SYNC_INTERVAL_OPTIONS,
    PDV_TYPE_OPTIONS,
} from "./constants";
import {
    buildStatusCard,
    buildTypeSummary,
    formatSyncDate,
    getSyncLabel,
    getSyncTone,
} from "./helpers";

export default function useController() {
    const n = useNavigate();
    const navigate = useCallback((to) => n(`/${to}`), [n]);
    const { user } = useContext(CoreContext);

    const [form, setForm] = useState(readPdvConfig());
    const [overview, setOverview] = useState(() => buildPdvOperationalOverview(user));
    const [loading, setLoading] = useState(false);

    const refreshState = useCallback(() => {
        const nextOverview = buildPdvOperationalOverview(user);
        setOverview(nextOverview);
        setForm(nextOverview.config);
        return nextOverview;
    }, [user]);

    useEffect(() => {
        refreshState();
    }, [refreshState]);

    const validation = useMemo(() => validatePdvConfig(form), [form]);
    const statusCard = useMemo(() => buildStatusCard({
        config: validation.draft,
        validation,
        coverage: overview.coverage,
        recentSyncs: overview.recentSyncs,
    }), [overview.coverage, overview.recentSyncs, validation]);

    const applyPatch = useCallback((patch) => {
        setForm(prev => validatePdvConfig({
            ...prev,
            ...(typeof patch === "function" ? patch(prev) : patch),
        }).draft);
    }, []);

    const handleSave = useCallback(() => {
        if (!overview.policy.canConfigure) {
            toast.error("Somente admin e subadmin podem alterar a integração PDV.");
            return;
        }

        if (!validation.isValid) {
            toast.error(validation.errorList[0] || "Revise os campos obrigatórios da integração antes de salvar.");
            return;
        }

        const savedConfig = savePdvConfig(validation.draft, user);
        appendPdvSyncHistory({
            type: "save",
            status: "success",
            message: `Configuração ${getPdvTypeLabel(savedConfig.type)} salva com sucesso.`,
            details: savedConfig.active ? "Política operacional atualizada." : "Integração mantida inativa.",
        }, user);
        setForm(savedConfig);
        refreshState();
        toast.success("Configuração PDV salva com sucesso.");
    }, [overview.policy.canConfigure, refreshState, user, validation]);

    const handleValidate = useCallback(async () => {
        if (!overview.policy.canConfigure) {
            toast.error("Somente admin e subadmin podem validar a integração PDV.");
            return;
        }

        setLoading(true);

        try {
            const savedConfig = savePdvConfig(validation.draft, user);
            const result = await runPdvConnectionTest(savedConfig);

            appendPdvSyncHistory({
                type: "validate",
                status: result.status,
                message: result.message,
                details: `Fonte configurada: ${getPdvTypeLabel(savedConfig.type)}.`,
            }, user);

            refreshState();

            if (result.status === "success") {
                toast.success(result.message);
            } else if (result.status === "warning") {
                toast.info(result.message);
            } else {
                toast.error(result.message);
            }
        } finally {
            setLoading(false);
        }
    }, [overview.policy.canConfigure, refreshState, user, validation.draft]);

    const header = useMemo(() => ({
        title: "Integração PDV",
        breadcrumbs: [
            { label: "Home", to: "/dashboard" },
            { label: "Integrações" },
            { label: "PDV" },
        ],
        actions: [
            {
                label: "Criar preço",
                rounded: true,
                outline: true,
                color: "primary",
                action: () => navigate("dashboard/prices/create"),
            },
            {
                label: "Histórico",
                rounded: true,
                outline: true,
                color: "primary",
                action: () => navigate("dashboard/history"),
            },
            overview.policy.canConfigure ? {
                label: "Relatórios",
                rounded: true,
                color: "secondary",
                action: () => navigate("dashboard/reports"),
            } : null,
        ].filter(Boolean),
    }), [navigate, overview.policy.canConfigure]);

    const actions = useMemo(() => (
        overview.policy.canConfigure ? [
            {
                label: "Validar conexão",
                color: "primary",
                outline: true,
                rounded: true,
                action: handleValidate,
            },
            {
                label: "Salvar configuração",
                color: "primary",
                rounded: true,
                loadable: true,
                action: handleSave,
            },
        ] : []
    ), [handleSave, handleValidate, overview.policy.canConfigure]);

    const summaryItems = useMemo(() => ([
        ...overview.summaryItems,
        {
            label: "Última validação",
            value: formatSyncDate(overview.config.lastSyncAt),
        },
    ]), [overview.config.lastSyncAt, overview.summaryItems]);

    const typeSummary = useMemo(() => buildTypeSummary(validation.draft), [validation.draft]);

    const policyRows = useMemo(() => (
        PDV_POLICY_ROWS.map(item => {
            const isDisabled = !overview.policy.canConfigure || (
                item.key === "showPdvPricesForUsers" && !validation.draft.allowUserPriceEdit
            );

            return {
                ...item,
                active: !!validation.draft[item.key],
                disabled: isDisabled,
            };
        })
    ), [overview.policy.canConfigure, validation.draft]);

    const steps = useMemo(() => PDV_STEP_CONTENT[validation.draft.type] || PDV_STEP_CONTENT.none, [validation.draft.type]);

    const recentSyncs = useMemo(() => (
        overview.recentSyncs.map(item => ({
            ...item,
            tone: getSyncTone(item.status),
            label: getSyncLabel(item.status),
            createdLabel: formatSyncDate(item.createdAt),
        }))
    ), [overview.recentSyncs]);

    return {
        loading,
        header,
        actions,
        form: validation.draft,
        validation,
        statusCard,
        summaryItems,
        typeSummary,
        policyRows,
        steps,
        recentSyncs,
        compatibilityOptions: PDV_COMPATIBILITY_OPTIONS,
        guidelines: PDV_GUIDELINES,
        typeOptions: PDV_TYPE_OPTIONS,
        syncIntervalOptions: PDV_SYNC_INTERVAL_OPTIONS,
        coverage: overview.coverage,
        policy: overview.policy,
        applyPatch,
        handleSave,
        handleValidate,
        handleTogglePolicy: (key) => applyPatch(prev => ({ [key]: !prev[key] })),
    };
}
