import { useCallback, useContext, useMemo, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { CoreContext } from "context/CoreContext";
import { downloadCSV } from "utils/downloads";
import {
    buildSupportAccessCsvRows,
    createDefaultSupportAccessDraft,
    createSupportAccessLog,
    deleteSupportAccessLog,
    readSupportAccessLogs,
} from "services/supportAccess";
import {
    canAccessSupportLog,
    normalizeUserRole,
} from "services/users";

const EXPORT_COLUMNS = [
    { title: "Data do acesso", ref: "accessDate" },
    { title: "Responsável", ref: "adminName" },
    { title: "Conta ou usuário alvo", ref: "targetUser" },
    { title: "Justificativa", ref: "justification" },
    { title: "Ticket", ref: "ticketCode" },
    { title: "Registrado em", ref: "createdAt" },
];

const GUIDELINES = [
    {
        title: "Registro obrigatório e objetivo",
        description: "Todo acesso administrativo a contas de clientes deve ficar documentado com ticket e justificativa clara.",
    },
    {
        title: "Auditoria antes de exceção",
        description: "Evite acessar a conta de um cliente sem um chamado rastreável ou sem uma necessidade operacional bem delimitada.",
    },
    {
        title: "Nada de dados sensíveis",
        description: "O log deve registrar o motivo do acesso, não senhas, tokens, cartões ou outros dados confidenciais.",
    },
];

export default function useController() {
    const n = useNavigate();
    const navigate = useCallback((to) => n(`/${to}`), [n]);

    const { user, setModal } = useContext(CoreContext);

    const canAccess = canAccessSupportLog(user);
    const role = normalizeUserRole(user);

    const [logs, setLogs] = useState(readSupportAccessLogs());
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(createDefaultSupportAccessDraft(user));

    const refreshState = useCallback(() => {
        setLogs(readSupportAccessLogs());
    }, []);

    const handlePatch = useCallback((patch) => {
        setForm(previous => ({
            ...previous,
            ...(typeof patch === "function" ? patch(previous) : patch),
        }));
    }, []);

    const handleToggleForm = useCallback(() => {
        setShowForm(previous => !previous);
        setForm(createDefaultSupportAccessDraft(user));
    }, [user]);

    const handleExport = useCallback(() => {
        if (!logs.length) {
            toast.info("Ainda não existem registros suficientes para exportação.");
            return;
        }

        downloadCSV(
            EXPORT_COLUMNS,
            buildSupportAccessCsvRows(logs),
            `log-acesso-suporte-${new Date().toISOString().slice(0, 10)}.csv`
        );
        toast.success("CSV do log de suporte gerado com sucesso.");
    }, [logs]);

    const handleCreateLog = useCallback(() => {
        if (!canAccess) {
            toast.error("Somente administradores podem registrar acessos de suporte.");
            return;
        }

        try {
            createSupportAccessLog(form, user);
            refreshState();
            setForm(createDefaultSupportAccessDraft(user));
            setShowForm(false);
            toast.success("Acesso de suporte registrado com sucesso.");
        } catch (error) {
            toast.error(error?.message || "Não foi possível registrar o acesso de suporte.");
        }
    }, [canAccess, form, refreshState, user]);

    const handleDeleteLog = useCallback((log) => {
        if (!canAccess) {
            return;
        }

        setModal({
            type: "confirm",
            title: "Deseja excluir este registro?",
            text: "A exclusão remove o histórico deste acesso de suporte da trilha local de auditoria.",
            action: () => {
                deleteSupportAccessLog(log.id);
                refreshState();
                toast.success("Registro removido com sucesso.");
            },
        });
    }, [canAccess, refreshState, setModal]);

    const filteredLogs = useMemo(() => {
        const query = `${search || ""}`.trim().toLowerCase();

        if (!query) {
            return logs;
        }

        return logs.filter(item => (
            item.adminName.toLowerCase().includes(query)
            || item.targetUser.toLowerCase().includes(query)
            || item.justification.toLowerCase().includes(query)
            || item.ticketCode.toLowerCase().includes(query)
            || formatDate(item.accessDate).toLowerCase().includes(query)
        ));
    }, [logs, search]);

    const summaryItems = useMemo(() => {
        const now = moment();
        const thisMonth = logs.filter(item => moment(item.accessDate).isSame(now, "month")).length;
        const admins = new Set(logs.map(item => item.adminName)).size;
        const targets = new Set(logs.map(item => item.targetUser)).size;

        return [
            { label: "Registros", value: `${logs.length}` },
            { label: "Neste mês", value: `${thisMonth}` },
            { label: "Admins distintos", value: `${admins}` },
            { label: "Contas acessadas", value: `${targets}` },
        ];
    }, [logs]);

    const latestLog = useMemo(() => logs[0] || null, [logs]);

    const latestLogCard = useMemo(() => ({
        title: latestLog ? latestLog.targetUser : "Nenhum acesso registrado",
        description: latestLog
            ? latestLog.justification
            : "Assim que o primeiro acesso for auditado, o resumo mais recente aparecerá aqui.",
        status: latestLog ? latestLog.ticketCode : "Sem registros",
        date: latestLog ? formatDate(latestLog.accessDate) : "--",
    }), [latestLog]);

    const quickActions = useMemo(() => (
        canAccess
            ? [
                {
                    key: "toggle-form",
                    icon: "/icons/proposal.svg",
                    title: showForm ? "Fechar registro" : "Registrar acesso",
                    description: "Abra ou feche o formulário para documentar acessos administrativos a contas de clientes.",
                    buttonLabel: showForm ? "Fechar formulário" : "Novo registro",
                    action: handleToggleForm,
                },
                {
                    key: "support-list",
                    icon: "/icons/proposal.svg",
                    title: "Fila de suporte",
                    description: "Volte para os tickets e mantenha o log sempre conectado ao chamado correspondente.",
                    buttonLabel: "Abrir suporte",
                    action: () => navigate("dashboard/support"),
                },
            ]
            : [
                {
                    key: "support-list",
                    icon: "/icons/proposal.svg",
                    title: "Fila de suporte",
                    description: "Acompanhe os tickets do ambiente sem acessar o log administrativo.",
                    buttonLabel: "Abrir suporte",
                    action: () => navigate("dashboard/support"),
                },
                {
                    key: "profile",
                    icon: "/icons/user.svg",
                    title: "Minha conta",
                    description: "Volte para o perfil e mantenha a navegação dentro da área segura.",
                    buttonLabel: "Abrir perfil",
                    action: () => navigate("dashboard/me"),
                },
            ]
    ), [canAccess, handleToggleForm, navigate, showForm]);

    const statusCard = useMemo(() => {
        if (!canAccess) {
            return {
                tone: "orange",
                title: "Acesso restrito",
                description: "O log de suporte é uma trilha administrativa sensível e fica disponível apenas para administradores.",
                badge: "Restrito",
            };
        }

        if (!logs.length) {
            return {
                tone: "orange",
                title: "Auditoria pronta para uso",
                description: "A central está pronta para registrar os primeiros acessos administrativos com rastreabilidade.",
                badge: "Inicial",
            };
        }

        return {
            tone: "green",
            title: "Trilha de suporte ativa",
            description: `${logs.length} registro(s) disponíveis para consulta e exportação.`,
            badge: "Auditoria",
        };
    }, [canAccess, logs.length]);

    const profile = useMemo(() => ({
        displayName: user?.name || "Usuário SenaPrices",
        email: user?.email || "email@nao-informado.com",
        memberSince: formatDate(user?.createdAt || user?.created_at),
        accountId: user?.documentId || user?.id || "--",
    }), [user]);

    const header = useMemo(() => ({
        title: "Log de Suporte",
        breadcrumbs: [
            { label: "Home", to: "/dashboard" },
            { label: "Suporte", to: "/dashboard/support" },
            { label: "Log de Suporte" },
        ],
        actions: [
            {
                label: "Fila de suporte",
                rounded: true,
                outline: true,
                color: "primary",
                action: () => navigate("dashboard/support"),
            },
            {
                label: "Meu perfil",
                rounded: true,
                color: "secondary",
                action: () => navigate("dashboard/me"),
            },
        ],
    }), [navigate]);

    const actions = useMemo(() => {
        if (!canAccess) {
            return [
                {
                    label: "Abrir suporte",
                    color: "primary",
                    outline: true,
                    rounded: true,
                    left: true,
                    action: () => navigate("dashboard/support"),
                },
                {
                    label: "Minha conta",
                    color: "primary",
                    rounded: true,
                    action: () => navigate("dashboard/me"),
                },
            ];
        }

        const baseActions = [
            {
                label: "Exportar CSV",
                color: "primary",
                outline: true,
                rounded: true,
                left: true,
                action: handleExport,
            },
            {
                label: showForm ? "Cancelar registro" : "Novo registro",
                color: "primary",
                outline: !showForm,
                rounded: true,
                action: handleToggleForm,
            },
        ];

        if (!showForm) {
            return baseActions;
        }

        return [
            ...baseActions,
            {
                label: "Salvar registro",
                color: "primary",
                rounded: true,
                action: handleCreateLog,
            },
        ];
    }, [canAccess, handleCreateLog, handleExport, handleToggleForm, navigate, showForm]);

    return {
        loading: false,
        header,
        actions,
        canAccess,
        roleLabel: getRoleLabel(role),
        profile,
        summaryItems,
        quickActions,
        latestLogCard,
        statusCard,
        guidelines: GUIDELINES,
        showForm,
        form,
        search,
        filteredLogs,
        setSearch,
        handlePatch,
        handleCreateLog,
        handleDeleteLog,
    };
}

function getRoleLabel(role) {
    if (role === "admin") return "Administrador";
    if (role === "subadmin") return "Subadministrador";
    if (role === "master") return "Master";
    return "Usuário";
}

function formatDate(value) {
    if (!value) return "--";
    const parsed = moment(value);
    if (!parsed.isValid()) return "--";
    return parsed.format("L");
}
