import { useCallback, useContext, useMemo } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { CoreContext } from "context/CoreContext";
import useList from "hooks/useList";
import { optionsSupport } from "utils/options";

const ROADMAP_MODULES = [
    {
        key: "labels",
        title: "Etiquetas",
        description: "Geracao de etiquetas para gondola e fluxos de impressao especificos.",
        status: "Planejado",
        icon: "/icons/training.svg",
    },
    {
        key: "batch-print",
        title: "Impressao em Lote",
        description: "Selecao e impressao agrupada de precos para operacao diaria do varejo.",
        status: "Planejado",
        icon: "/icons/products.svg",
    },
    {
        key: "promotions",
        title: "Impressao em Lote",
        description: "Execucao agrupada de cartazes selecionados para ganhar escala em operacoes maiores.",
        status: "Planejado",
        icon: "/icons/products.svg",
    },
    {
        key: "reports",
        title: "Relatorios",
        description: "Visao analitica de uso, produtividade e historico operacional do sistema.",
        status: "Planejado",
        icon: "/icons/training.svg",
    },
    {
        key: "pdv",
        title: "Integracao PDV",
        description: "Conexao futura com base externa para abastecer precificacao e operacao de loja.",
        status: "Planejado",
        icon: "/icons/products.svg",
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
            title: item?.title || "Ticket sem titulo",
            description: item?.description || "Sem descricao informada.",
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
                label: "Criar preco",
                rounded: true,
                color: "primary",
                action: () => navigate("dashboard/prices/create"),
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
        displayName: user?.name || "Usuario SenaPrices",
        email: user?.email || "email@nao-informado.com",
        memberSince: formatDate(user?.createdAt || user?.created_at),
        accountId: user?.documentId || user?.id || "--",
    }), [user]);

    const quickActions = useMemo(() => ([
        {
            key: "create-price",
            icon: "/icons/products.svg",
            title: "Criar preco",
            description: "Monte cartazes promocionais com validacao, preview e impressao orientada por padrao.",
            buttonLabel: "Abrir criacao",
            action: () => navigate("dashboard/prices/create"),
        },
        {
            key: "support-create",
            icon: "/icons/proposal.svg",
            title: "Novo ticket",
            description: "Abra um chamado para duvidas, correcoes ou apoio operacional do sistema.",
            buttonLabel: "Abrir suporte",
            action: () => navigate("dashboard/support/create"),
        },
        {
            key: "create-item",
            icon: "/icons/products.svg",
            title: "Criar item",
            description: "Cadastre a base do catalogo para sustentar precificacao, busca e evolucao dos demais modulos.",
            buttonLabel: "Abrir cadastro",
            action: () => navigate("dashboard/items/create"),
        },
        {
            key: "items",
            icon: "/icons/products.svg",
            title: "Itens",
            description: "Consulte, edite e encaminhe itens da base para a criacao de preco sem perder consistencia.",
            buttonLabel: "Abrir catalogo",
            action: () => navigate("dashboard/items"),
        },
        {
            key: "import-items",
            icon: "/icons/products.svg",
            title: "Importar itens",
            description: "Carregue planilhas CSV ou XLSX para alimentar a mesma base central do catalogo com revisao previa.",
            buttonLabel: "Abrir importacao",
            action: () => navigate("dashboard/items/import"),
        },
        {
            key: "quick-price",
            icon: "/icons/products.svg",
            title: "Criacao Rapida",
            description: "Monte lotes operacionais com varias linhas e validacao completa antes da liberacao.",
            buttonLabel: "Abrir modo rapido",
            action: () => navigate("dashboard/prices/quick"),
        },
        {
            key: "history",
            icon: "/icons/products.svg",
            title: "Historico",
            description: "Consulte os registros compartilhados de salvamento e impressao para restaurar ou reimprimir sem retrabalho.",
            buttonLabel: "Abrir historico",
            action: () => navigate("dashboard/history"),
        },
        {
            key: "promotions",
            icon: "/icons/products.svg",
            title: "Promocoes",
            description: "Monte campanhas programadas reaproveitando registros reais do historico operacional.",
            buttonLabel: "Abrir promocoes",
            action: () => navigate("dashboard/promotions"),
        },
        {
            key: "support-list",
            icon: "/icons/proposal.svg",
            title: "Fila de suporte",
            description: "Acompanhe tickets ja criados, status e historico de atendimento.",
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
            title: "Senha e seguranca",
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
            description: "Chamados, historico e edicao de tickets ja estao operacionais nesta etapa do projeto.",
        },
        {
            title: "Conta e seguranca ativas",
            description: "Perfil e troca de senha ja seguem o padrao alto definido para o sistema.",
        },
        {
            title: "Operacao de precificacao ativa",
            description: "A base ja possui criacao de cartaz unitario e criacao rapida em lote com validacao e impressao.",
        },
        {
            title: "Base de catalogo conectada",
            description: "Cadastro, listagem, importacao e criacao de preco agora compartilham a mesma base local de itens.",
        },
        {
            title: "Historico operacional ativo",
            description: "Criar Preco e Criacao Rapida agora registram rastreabilidade compartilhada para restauracao e reimpressao.",
        },
        {
            title: "Fila promocional conectada",
            description: "Promocoes agora reaproveitam selecao real do historico para organizar campanhas e impressao futura.",
        },
    ]), []);

    const recentTickets = useMemo(() => supportRows.slice(0, 3), [supportRows]);

    const moduleCards = useMemo(() => ([
        {
            key: "create-price",
            title: "Criar Preco",
            description: "Composicao segura de cartazes com rascunho local, preview e impressao.",
            status: "Ativo",
            icon: "/icons/products.svg",
            actionLabel: "Criar cartaz",
            action: () => navigate("dashboard/prices/create"),
        },
        {
            key: "quick-price",
            title: "Criacao Rapida",
            description: "Fluxo enxuto para montar varios cartazes no mesmo lote com validacao por linha.",
            status: "Ativo",
            icon: "/icons/products.svg",
            actionLabel: "Abrir modo rapido",
            action: () => navigate("dashboard/prices/quick"),
        },
        {
            key: "create-item",
            title: "Criar Item",
            description: "Fundacao do catalogo com identificadores unicos e base reaproveitavel para os modulos seguintes.",
            status: "Ativo",
            icon: "/icons/products.svg",
            actionLabel: "Cadastrar item",
            action: () => navigate("dashboard/items/create"),
        },
        {
            key: "items",
            title: "Itens",
            description: "Consulta e manutencao da base catalogada com reutilizacao direta no fluxo de precificacao.",
            status: "Ativo",
            icon: "/icons/products.svg",
            actionLabel: "Abrir catalogo",
            action: () => navigate("dashboard/items"),
        },
        {
            key: "import",
            title: "Importacao",
            description: "Carga em lote do catalogo com mapeamento, preview e estrategia de conflito antes de gravar.",
            status: "Ativo",
            icon: "/icons/products.svg",
            actionLabel: "Importar itens",
            action: () => navigate("dashboard/items/import"),
        },
        {
            key: "history",
            title: "Historico",
            description: "Rastro compartilhado das operacoes de precificacao, com reimpressao e restauracao por registro.",
            status: "Ativo",
            icon: "/icons/products.svg",
            actionLabel: "Abrir historico",
            action: () => navigate("dashboard/history"),
        },
        {
            key: "promotions",
            title: "Promocoes",
            description: "Fila programada de campanhas montada sobre registros reais do historico compartilhado.",
            status: "Ativo",
            icon: "/icons/products.svg",
            actionLabel: "Abrir promocoes",
            action: () => navigate("dashboard/promotions"),
        },
        {
            key: "account",
            title: "Minha Conta",
            description: "Gestao do perfil do usuario e manutencao de dados pessoais.",
            status: "Ativo",
            icon: "/icons/user.svg",
            actionLabel: "Abrir conta",
            action: () => navigate("dashboard/me"),
        },
        {
            key: "security",
            title: "Senha e Seguranca",
            description: "Atualizacao de credenciais e protecao de acesso do sistema.",
            status: "Ativo",
            icon: "/icons/password.svg",
            actionLabel: "Gerenciar senha",
            action: () => navigate("dashboard/me/password"),
        },
        {
            key: "support",
            title: "Suporte",
            description: "Registro e acompanhamento de tickets de suporte tecnico e operacional.",
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
