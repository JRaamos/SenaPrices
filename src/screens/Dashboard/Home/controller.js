import { useCallback, useContext, useMemo } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { CoreContext } from "context/CoreContext";
import useList from "hooks/useList";
import { optionsSupport } from "utils/options";
import { canManagePromotions, normalizeUserRole } from "services/users";

const ROADMAP_MODULES = [
    {
        key: "pdv",
        title: "Integração PDV",
        description: "Conexão futura com base externa para abastecer catálogo, precificação e sincronização automática.",
        status: "Planejado",
        icon: "/icons/products.svg",
    },
    {
        key: "settings",
        title: "Definições",
        description: "Centralização das configurações de impressão, identidade visual, usuários e parâmetros operacionais.",
        status: "Planejado",
        icon: "/icons/training.svg",
    },
    {
        key: "commercial",
        title: "Assinaturas e landing",
        description: "Fluxo comercial com temas sazonais, planos, checkout e governança da plataforma.",
        status: "Planejado",
        icon: "/icons/products.svg",
    },
];

export default function useController() {
    const n = useNavigate();
    const navigate = useCallback((to) => n(`/${to}`), [n]);

    const { user } = useContext(CoreContext);
    const canManage = canManagePromotions(user);
    const role = normalizeUserRole(user);

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
                label: "Criar preço",
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
        displayName: user?.name || "Usuário SenaPrices",
        email: user?.email || "email@nao-informado.com",
        memberSince: formatDate(user?.createdAt || user?.created_at),
        accountId: user?.documentId || user?.id || "--",
    }), [user]);

    const quickActions = useMemo(() => {
        const baseActions = [
            {
                key: "create-price",
                icon: "/icons/products.svg",
                title: "Criar preço",
                description: "Monte cartazes promocionais com validação, pré-visualização e impressão orientada por padrão.",
                buttonLabel: "Abrir criação",
                action: () => navigate("dashboard/prices/create"),
            },
            {
                key: "quick-price",
                icon: "/icons/products.svg",
                title: "Criação Rápida",
                description: "Monte lotes operacionais com várias linhas e validação completa antes da liberação.",
                buttonLabel: "Abrir modo rápido",
                action: () => navigate("dashboard/prices/quick"),
            },
            {
                key: "batch-print",
                icon: "/icons/products.svg",
                title: "Impressão em Lote",
                description: "Consolide Histórico e Promoções em uma fila única para imprimir em escala com rastreabilidade.",
                buttonLabel: "Abrir lote",
                action: () => navigate("dashboard/prices/batch"),
            },
            {
                key: "labels",
                icon: "/icons/products.svg",
                title: "Etiquetas",
                description: "Emita etiquetas de gôndola a partir do catálogo e da última precificação rastreável do item.",
                buttonLabel: "Abrir etiquetas",
                action: () => navigate("dashboard/labels"),
            },
            {
                key: "history",
                icon: "/icons/products.svg",
                title: "Histórico",
                description: "Consulte os registros compartilhados de salvamento e impressão para restaurar ou reimprimir sem retrabalho.",
                buttonLabel: "Abrir histórico",
                action: () => navigate("dashboard/history"),
            },
            {
                key: "promotions",
                icon: "/icons/products.svg",
                title: "Promoções",
                description: "Monte campanhas programadas reaproveitando registros reais do histórico operacional.",
                buttonLabel: "Abrir promoções",
                action: () => navigate("dashboard/promotions"),
            },
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
        ];

        if (!canManage) {
            return baseActions;
        }

        return [
            ...baseActions.slice(0, 1),
            {
                key: "create-item",
                icon: "/icons/products.svg",
                title: "Criar item",
                description: "Cadastre a base do catálogo para sustentar precificação, busca e evolução dos demais módulos.",
                buttonLabel: "Abrir cadastro",
                action: () => navigate("dashboard/items/create"),
            },
            {
                key: "items",
                icon: "/icons/products.svg",
                title: "Itens",
                description: "Consulte, edite e encaminhe itens da base para a criação de preço sem perder consistência.",
                buttonLabel: "Abrir catálogo",
                action: () => navigate("dashboard/items"),
            },
            {
                key: "import-items",
                icon: "/icons/products.svg",
                title: "Importar itens",
                description: "Carregue planilhas CSV ou XLSX para alimentar a mesma base central do catálogo com revisão prévia.",
                buttonLabel: "Abrir importação",
                action: () => navigate("dashboard/items/import"),
            },
            ...baseActions.slice(1, 6),
            {
                key: "reports",
                icon: "/icons/training.svg",
                title: "Relatórios",
                description: "Leia o consolidado operacional por período com visão de fontes, usuários, seções e atividade recente.",
                buttonLabel: "Abrir relatórios",
                action: () => navigate("dashboard/reports"),
            },
            ...baseActions.slice(6),
        ];
    }, [canManage, navigate]);

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
            title: "Operação de precificação ativa",
            description: "A base já possui criação de cartaz unitário e criação rápida em lote com validação e impressão.",
        },
        {
            title: "Base de catálogo conectada",
            description: "Cadastro, listagem, importação e criação de preço agora compartilham a mesma base local de itens.",
        },
        {
            title: "Histórico operacional ativo",
            description: "Criar Preço e Criação Rápida agora registram rastreabilidade compartilhada para restauração e reimpressão.",
        },
        {
            title: "Fila promocional conectada",
            description: "Promoções agora reaproveitam seleção real do histórico para organizar campanhas e impressão futura.",
        },
        {
            title: "Impressão em lote ativa",
            description: "Histórico e Promoções agora alimentam a mesma fila operacional de impressão agrupada com controle por perfil.",
        },
        {
            title: "Etiquetas conectadas ao catálogo",
            description: "A emissão de etiquetas agora reaproveita catálogo e última precificação válida, reduzindo divergência entre gôndola e cartaz.",
        },
        {
            title: "Leitura gerencial disponível",
            description: "Relatórios já consolidam histórico, promoções, lotes e etiquetas para apoiar gestão e auditoria operacional.",
        },
    ]), []);

    const recentTickets = useMemo(() => supportRows.slice(0, 3), [supportRows]);

    const moduleCards = useMemo(() => {
        const baseCards = [
            {
                key: "create-price",
                title: "Criar Preço",
                description: "Composição segura de cartazes com rascunho local, pré-visualização e impressão.",
                status: "Ativo",
                icon: "/icons/products.svg",
                actionLabel: "Criar cartaz",
                action: () => navigate("dashboard/prices/create"),
            },
            {
                key: "quick-price",
                title: "Criação Rápida",
                description: "Fluxo enxuto para montar vários cartazes no mesmo lote com validação por linha.",
                status: "Ativo",
                icon: "/icons/products.svg",
                actionLabel: "Abrir modo rápido",
                action: () => navigate("dashboard/prices/quick"),
            },
            {
                key: "batch-print",
                title: "Impressão em Lote",
                description: "Fila única para imprimir em escala sobre Histórico e Promoções, com deduplicação e respeito ao perfil do usuário.",
                status: "Ativo",
                icon: "/icons/products.svg",
                actionLabel: "Abrir lote",
                action: () => navigate("dashboard/prices/batch"),
            },
            {
                key: "history",
                title: "Histórico",
                description: "Rastro compartilhado das operações de precificação, com reimpressão e restauração por registro.",
                status: "Ativo",
                icon: "/icons/products.svg",
                actionLabel: "Abrir histórico",
                action: () => navigate("dashboard/history"),
            },
            {
                key: "labels",
                title: "Etiquetas",
                description: "Geração de etiquetas HTML e Zebra ZPL com base no catálogo e na última precificação rastreável do item.",
                status: "Ativo",
                icon: "/icons/products.svg",
                actionLabel: "Abrir etiquetas",
                action: () => navigate("dashboard/labels"),
            },
            {
                key: "promotions",
                title: "Promoções",
                description: "Fila programada de campanhas montada sobre registros reais do histórico compartilhado.",
                status: "Ativo",
                icon: "/icons/products.svg",
                actionLabel: "Abrir promoções",
                action: () => navigate("dashboard/promotions"),
            },
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
        ];

        if (!canManage) {
            return baseCards;
        }

        return [
            baseCards[0],
            baseCards[1],
            baseCards[2],
            {
                key: "create-item",
                title: "Criar Item",
                description: "Fundação do catálogo com identificadores únicos e base reaproveitável para os módulos seguintes.",
                status: "Ativo",
                icon: "/icons/products.svg",
                actionLabel: "Cadastrar item",
                action: () => navigate("dashboard/items/create"),
            },
            {
                key: "items",
                title: "Itens",
                description: "Consulta e manutenção da base catalogada com reutilização direta no fluxo de precificação.",
                status: "Ativo",
                icon: "/icons/products.svg",
                actionLabel: "Abrir catálogo",
                action: () => navigate("dashboard/items"),
            },
            {
                key: "import",
                title: "Importação",
                description: "Carga em lote do catálogo com mapeamento, pré-visualização e estratégia de conflito antes de gravar.",
                status: "Ativo",
                icon: "/icons/products.svg",
                actionLabel: "Importar itens",
                action: () => navigate("dashboard/items/import"),
            },
            baseCards[3],
            baseCards[4],
            baseCards[5],
            {
                key: "reports",
                title: "Relatórios",
                description: "Painel gerencial para leitura consolidada da operação por período, fonte, usuário e seção.",
                status: "Ativo",
                icon: "/icons/training.svg",
                actionLabel: "Abrir relatórios",
                action: () => navigate("dashboard/reports"),
            },
            baseCards[6],
            baseCards[7],
            baseCards[8],
        ];
    }, [canManage, navigate]);

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
        role,
    };
}

function formatDate(value) {
    if (!value) return "--";

    const parsed = moment(value);
    if (!parsed.isValid()) return "--";

    return parsed.format("L");
}
