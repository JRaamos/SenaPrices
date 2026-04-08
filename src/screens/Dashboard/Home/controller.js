import { useCallback, useContext, useMemo } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { CoreContext } from "context/CoreContext";
import useList from "hooks/useList";
import { optionsSupport } from "utils/options";

const ROADMAP_MODULES = [
    {
        key: "create-price",
        title: "Criar Preço",
        description: "Tela principal para montar cartazes promocionais com visualização e impressão.",
        status: "Planejado",
        icon: "/icons/products.svg",
    },
    {
        key: "quick-price",
        title: "Criação Rápida",
        description: "Fluxo ágil por EAN ou nome para gerar preços com menos etapas operacionais.",
        status: "Planejado",
        icon: "/icons/training.svg",
    },
    {
        key: "labels",
        title: "Etiquetas",
        description: "Geração de etiquetas para gôndola e fluxos de impressão específicos.",
        status: "Planejado",
        icon: "/icons/training.svg",
    },
    {
        key: "batch-print",
        title: "Impressão em Lote",
        description: "Seleção e impressão agrupada de preços para operação diária do varejo.",
        status: "Planejado",
        icon: "/icons/products.svg",
    },
    {
        key: "items",
        title: "Itens e Importação",
        description: "Cadastro, edição e ingestão de produtos para sustentar os demais módulos.",
        status: "Planejado",
        icon: "/icons/products.svg",
    },
    {
        key: "reports",
        title: "Relatórios",
        description: "Visão analítica de uso, produtividade e histórico operacional do sistema.",
        status: "Planejado",
        icon: "/icons/training.svg",
    },
];

export default function useController() {
    const n = useNavigate();
    const navigate = useCallback((to) => n(`/${to}`), [n]);

    const { user } = useContext(CoreContext);

    const { loading, registers } = useList({
        table: "supports",
        sort: ["createdAt:desc"],
    });

    const supportRows = useMemo(() => (
        (registers || []).map(item => ({
            id: item?.documentId,
            title: item?.title || "Ticket sem título",
            description: item?.description || "Sem descrição informada.",
            status: item?.support_status || "opened",
            statusLabel: optionsSupport?.find(option => option.id === item?.support_status)?.title || "Aberto",
            date: moment(item?.createdAt).isValid() ? moment(item?.createdAt).format("L") : "--",
            relativeDate: moment(item?.createdAt).isValid() ? moment(item?.createdAt).fromNow() : "--",
        }))
    ), [registers]);

    const header = useMemo(() => ({
        title: "Painel SenaPrices",
        breadcrumbs: [
            { label: "Home", to: "/dashboard" },
            { label: "Painel SenaPrices" },
        ],
        actions: [
            {
                label: "Abrir suporte",
                rounded: true,
                color: "primary",
                action: () => navigate("dashboard/support/create"),
            },
            {
                label: "Minha conta",
                rounded: true,
                outline: true,
                color: "primary",
                action: () => navigate("dashboard/me"),
            },
        ],
    }), [navigate]);

    const profile = useMemo(() => ({
        displayName: user?.name || "Usuário SenaPrices",
        email: user?.email || "email@nao-informado.com",
        memberSince: formatDate(user?.createdAt || user?.created_at),
        accountId: user?.documentId || user?.id || "--",
    }), [user]);

    const quickActions = useMemo(() => ([
        {
            key: "support-create",
            icon: "/icons/proposal.svg",
            title: "Novo ticket",
            description: "Abra um chamado para dúvidas, correções ou apoio operacional do sistema.",
            buttonLabel: "Abrir suporte",
            action: () => navigate("dashboard/support/create"),
        },
        {
            key: "support-list",
            icon: "/icons/proposal.svg",
            title: "Fila de suporte",
            description: "Acompanhe tickets já criados, status e histórico de atendimento.",
            buttonLabel: "Ver tickets",
            action: () => navigate("dashboard/support"),
        },
        {
            key: "profile",
            icon: "/icons/user.svg",
            title: "Minha conta",
            description: "Edite dados principais da conta e mantenha o perfil atualizado.",
            buttonLabel: "Abrir conta",
            action: () => navigate("dashboard/me"),
        },
        {
            key: "security",
            icon: "/icons/password.svg",
            title: "Senha e segurança",
            description: "Atualize a senha e mantenha o acesso ao sistema protegido.",
            buttonLabel: "Gerenciar senha",
            action: () => navigate("dashboard/me/password"),
        },
    ]), [navigate]);

    const summaryItems = useMemo(() => {
        const totalTickets = supportRows.length;
        const opened = supportRows.filter(item => item.status === "opened").length;
        const answered = supportRows.filter(item => item.status === "answered").length;
        const closed = supportRows.filter(item => item.status === "closed").length;

        return [
            { label: "Tickets registrados", value: `${totalTickets}` },
            { label: "Em aberto", value: `${opened}` },
            { label: "Respondidos", value: `${answered}` },
            { label: "Fechados", value: `${closed}` },
        ];
    }, [supportRows]);

    const systemHighlights = useMemo(() => ([
        {
            title: "Base de suporte ativa",
            description: "Chamados, histórico e edição de tickets já estão operacionais nesta etapa do projeto.",
        },
        {
            title: "Conta e segurança ativas",
            description: "Perfil e troca de senha já seguem o padrão alto definido para o sistema.",
        },
        {
            title: "Módulos de operação mapeados",
            description: "As páginas locais estão servindo como referência funcional para evolução consistente do produto.",
        },
    ]), []);

    const recentTickets = useMemo(() => supportRows.slice(0, 3), [supportRows]);

    const moduleCards = useMemo(() => ([
        {
            key: "account",
            title: "Minha Conta",
            description: "Gestão do perfil do usuário e manutenção de dados pessoais.",
            status: "Ativo",
            icon: "/icons/user.svg",
            actionLabel: "Abrir conta",
            action: () => navigate("dashboard/me"),
        },
        {
            key: "security",
            title: "Senha e Segurança",
            description: "Atualização de credenciais e proteção de acesso do sistema.",
            status: "Ativo",
            icon: "/icons/password.svg",
            actionLabel: "Gerenciar senha",
            action: () => navigate("dashboard/me/password"),
        },
        {
            key: "support",
            title: "Suporte",
            description: "Registro e acompanhamento de tickets de suporte técnico e operacional.",
            status: "Ativo",
            icon: "/icons/proposal.svg",
            actionLabel: "Ver suporte",
            action: () => navigate("dashboard/support"),
        },
    ]), [navigate]);

    return {
        header,
        loading,
        profile,
        quickActions,
        summaryItems,
        systemHighlights,
        recentTickets,
        moduleCards,
        roadmapModules: ROADMAP_MODULES,
    };
}

function formatDate(value) {
    if (!value) return "--";

    const parsed = moment(value);
    if (!parsed.isValid()) return "--";

    return parsed.format("L");
}
