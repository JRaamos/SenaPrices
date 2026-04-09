import { useCallback, useContext, useMemo } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { CoreContext } from "context/CoreContext";
import useList from "hooks/useList";
import { buildAccessProfile, canAccessRoute, getAccountEntryPath, ROUTE_KEYS } from "services/access";
import { optionsSupport } from "utils/options";

const ROADMAP_MODULES = [
    {
        key: "commercial",
        title: "Assinaturas e landing",
        description: "Fluxo comercial com temas sazonais, planos, checkout e governan\u00e7a da plataforma.",
        status: "Planejado",
        icon: "/icons/products.svg",
    },
];

export default function useController() {
    const n = useNavigate();
    const navigate = useCallback((to) => n(to.startsWith("/") ? to : `/${to}`), [n]);

    const { user } = useContext(CoreContext);
    const accessProfile = useMemo(() => buildAccessProfile(user), [user]);
    const canOpenRoute = useCallback(routeKey => canAccessRoute(routeKey, user, true), [user]);

    const { loading, registers } = useList({
        table: "supports",
        sort: ["createdAt:desc"],
    });

    const supportRows = useMemo(() => (
        (registers || []).map(item => ({
            id: item?.documentId,
            title: item?.title || "Ticket sem t\u00edtulo",
            description: item?.description || "Sem descri\u00e7\u00e3o informada.",
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
            canOpenRoute(ROUTE_KEYS.createPrice) ? {
                label: "Criar pre\u00e7o",
                rounded: true,
                color: "primary",
                action: () => navigate("/dashboard/prices/create"),
            } : null,
            canOpenRoute(ROUTE_KEYS.me) ? {
                label: "Minha conta",
                rounded: true,
                outline: true,
                color: "primary",
                action: () => navigate(getAccountEntryPath(user)),
            } : null,
        ].filter(Boolean),
    }), [canOpenRoute, navigate, user]);

    const profile = useMemo(() => ({
        displayName: user?.name || "Usu\u00e1rio SenaPrices",
        email: user?.email || "email@nao-informado.com",
        memberSince: formatDate(user?.createdAt || user?.created_at),
        accountId: user?.documentId || user?.id || "--",
        roleLabel: accessProfile.roleLabel,
        planLabel: accessProfile.planLabel,
        subscriptionStatusLabel: accessProfile.subscriptionStatusLabel,
    }), [accessProfile.planLabel, accessProfile.roleLabel, accessProfile.subscriptionStatusLabel, user]);

    const quickActions = useMemo(() => filterByAccess([
        buildAction({
            key: "create-price",
            routeKey: ROUTE_KEYS.createPrice,
            icon: "/icons/products.svg",
            title: "Criar pre\u00e7o",
            description: "Monte cartazes promocionais com valida\u00e7\u00e3o, pr\u00e9-visualiza\u00e7\u00e3o e impress\u00e3o orientada por padr\u00e3o.",
            buttonLabel: "Abrir cria\u00e7\u00e3o",
            action: () => navigate("/dashboard/prices/create"),
        }),
        buildAction({
            key: "quick-price",
            routeKey: ROUTE_KEYS.quickPrice,
            icon: "/icons/products.svg",
            title: "Cria\u00e7\u00e3o R\u00e1pida",
            description: "Monte lotes operacionais com v\u00e1rias linhas e valida\u00e7\u00e3o completa antes da libera\u00e7\u00e3o.",
            buttonLabel: "Abrir modo r\u00e1pido",
            action: () => navigate("/dashboard/prices/quick"),
        }),
        buildAction({
            key: "batch-print",
            routeKey: ROUTE_KEYS.batchPrint,
            icon: "/icons/products.svg",
            title: "Impress\u00e3o em Lote",
            description: "Consolide Hist\u00f3rico e Promo\u00e7\u00f5es em uma fila \u00fanica para imprimir em escala com rastreabilidade.",
            buttonLabel: "Abrir lote",
            action: () => navigate("/dashboard/prices/batch"),
        }),
        buildAction({
            key: "labels",
            routeKey: ROUTE_KEYS.labels,
            icon: "/icons/products.svg",
            title: "Etiquetas",
            description: "Emita etiquetas de g\u00f4ndola a partir do cat\u00e1logo e da \u00faltima precifica\u00e7\u00e3o rastre\u00e1vel do item.",
            buttonLabel: "Abrir etiquetas",
            action: () => navigate("/dashboard/labels"),
        }),
        buildAction({
            key: "pdv",
            routeKey: ROUTE_KEYS.pdvIntegration,
            icon: "/icons/products.svg",
            title: "Integra\u00e7\u00e3o PDV",
            description: "Consulte a pol\u00edtica da origem externa e valide como o pre\u00e7o sugerido abastece cartazes sem perder governan\u00e7a.",
            buttonLabel: "Abrir integra\u00e7\u00e3o",
            action: () => navigate("/dashboard/integration"),
        }),
        buildAction({
            key: "history",
            routeKey: ROUTE_KEYS.history,
            icon: "/icons/products.svg",
            title: "Hist\u00f3rico",
            description: "Consulte os registros compartilhados de salvamento e impress\u00e3o para restaurar ou reimprimir sem retrabalho.",
            buttonLabel: "Abrir hist\u00f3rico",
            action: () => navigate("/dashboard/history"),
        }),
        buildAction({
            key: "promotions",
            routeKey: ROUTE_KEYS.promotions,
            icon: "/icons/products.svg",
            title: "Promo\u00e7\u00f5es",
            description: "Monte campanhas programadas reaproveitando registros reais do hist\u00f3rico operacional.",
            buttonLabel: "Abrir promo\u00e7\u00f5es",
            action: () => navigate("/dashboard/promotions"),
        }),
        buildAction({
            key: "create-item",
            routeKey: ROUTE_KEYS.createItem,
            icon: "/icons/products.svg",
            title: "Criar item",
            description: "Cadastre a base do cat\u00e1logo para sustentar precifica\u00e7\u00e3o, busca e evolu\u00e7\u00e3o dos demais m\u00f3dulos.",
            buttonLabel: "Abrir cadastro",
            action: () => navigate("/dashboard/items/create"),
        }),
        buildAction({
            key: "items",
            routeKey: ROUTE_KEYS.items,
            icon: "/icons/products.svg",
            title: "Itens",
            description: "Consulte, edite e encaminhe itens da base para a cria\u00e7\u00e3o de pre\u00e7o sem perder consist\u00eancia.",
            buttonLabel: "Abrir cat\u00e1logo",
            action: () => navigate("/dashboard/items"),
        }),
        buildAction({
            key: "import-items",
            routeKey: ROUTE_KEYS.importItems,
            icon: "/icons/products.svg",
            title: "Importar itens",
            description: "Carregue planilhas CSV ou XLSX para alimentar a mesma base central do cat\u00e1logo com revis\u00e3o pr\u00e9via.",
            buttonLabel: "Abrir importa\u00e7\u00e3o",
            action: () => navigate("/dashboard/items/import"),
        }),
        buildAction({
            key: "reports",
            routeKey: ROUTE_KEYS.reports,
            icon: "/icons/training.svg",
            title: "Relat\u00f3rios",
            description: "Leia o consolidado operacional por per\u00edodo com vis\u00e3o de fontes, usu\u00e1rios, se\u00e7\u00f5es e atividade recente.",
            buttonLabel: "Abrir relat\u00f3rios",
            action: () => navigate("/dashboard/reports"),
        }),
        buildAction({
            key: "settings",
            routeKey: ROUTE_KEYS.settings,
            icon: "/icons/training.svg",
            title: accessProfile.isMaster ? "Painel master" : "Defini\u00e7\u00f5es",
            description: accessProfile.isMaster
                ? "Administre contato da plataforma, tema sazonal, moedas, trial e precifica\u00e7\u00e3o dos planos."
                : "Padronize impress\u00e3o, se\u00e7\u00f5es, etiquetas e leitura de acessos a partir de uma \u00fanica central.",
            buttonLabel: accessProfile.isMaster ? "Abrir painel master" : "Abrir defini\u00e7\u00f5es",
            action: () => navigate(accessProfile.settingsPath),
        }),
        buildAction({
            key: "support-create",
            routeKey: ROUTE_KEYS.supportForm,
            icon: "/icons/proposal.svg",
            title: "Novo ticket",
            description: "Abra um chamado para d\u00favidas, corre\u00e7\u00f5es ou apoio operacional do sistema.",
            buttonLabel: "Abrir suporte",
            action: () => navigate("/dashboard/support/create"),
        }),
        buildAction({
            key: "support-list",
            routeKey: ROUTE_KEYS.support,
            icon: "/icons/proposal.svg",
            title: "Fila de suporte",
            description: "Acompanhe tickets j\u00e1 criados, status e hist\u00f3rico de atendimento.",
            buttonLabel: "Ver tickets",
            action: () => navigate("/dashboard/support"),
        }),
        buildAction({
            key: "support-access",
            routeKey: ROUTE_KEYS.supportAccess,
            icon: "/icons/training.svg",
            title: "Log de suporte",
            description: "Consulte a trilha administrativa de acessos vinculados ao atendimento de clientes.",
            buttonLabel: "Abrir log",
            action: () => navigate("/dashboard/support/access"),
        }),
        buildAction({
            key: "profile",
            routeKey: ROUTE_KEYS.me,
            icon: "/icons/user.svg",
            title: "Minha conta",
            description: "Edite dados principais da conta e mantenha o perfil atualizado.",
            buttonLabel: "Abrir conta",
            action: () => navigate(getAccountEntryPath(user)),
        }),
        buildAction({
            key: "security",
            routeKey: ROUTE_KEYS.mePassword,
            icon: "/icons/password.svg",
            title: "Senha e seguran\u00e7a",
            description: "Atualize a senha e mantenha o acesso ao sistema protegido.",
            buttonLabel: "Gerenciar senha",
            action: () => navigate("/dashboard/me/password"),
        }),
    ], canOpenRoute), [accessProfile.isMaster, accessProfile.settingsPath, canOpenRoute, navigate, user]);

    const summaryItems = useMemo(() => {
        const totalTickets = supportRows.length;
        const opened = supportRows.filter(item => item.status === "opened").length;
        const answered = supportRows.filter(item => item.status === "answered").length;
        const closed = supportRows.filter(item => item.status === "closed").length;

        return [
            { label: "Perfil", value: accessProfile.roleLabel },
            { label: "Plano", value: accessProfile.planLabel },
            { label: "Assinatura", value: accessProfile.subscriptionStatusLabel },
            { label: "Tickets registrados", value: `${totalTickets}` },
            { label: "Em aberto", value: `${opened}` },
            { label: "Respondidos", value: `${answered}` },
            { label: "Fechados", value: `${closed}` },
        ];
    }, [accessProfile.planLabel, accessProfile.roleLabel, accessProfile.subscriptionStatusLabel, supportRows]);

    const systemHighlights = useMemo(() => ([
        {
            title: "Base de suporte ativa",
            description: "Chamados, hist\u00f3rico e edi\u00e7\u00e3o de tickets j\u00e1 est\u00e3o operacionais nesta etapa do projeto.",
        },
        {
            title: "Conta e seguran\u00e7a ativas",
            description: "Perfil, segunda etapa por PIN e troca de senha seguem o padr\u00e3o alto definido para o sistema.",
        },
        {
            title: "Opera\u00e7\u00e3o de precifica\u00e7\u00e3o ativa",
            description: "A base j\u00e1 possui cria\u00e7\u00e3o de cartaz unit\u00e1rio e cria\u00e7\u00e3o r\u00e1pida em lote com valida\u00e7\u00e3o e impress\u00e3o.",
        },
        {
            title: "Base de cat\u00e1logo conectada",
            description: "Cadastro, listagem, importa\u00e7\u00e3o e cria\u00e7\u00e3o de pre\u00e7o agora compartilham a mesma base local de itens.",
        },
        {
            title: "Hist\u00f3rico operacional ativo",
            description: "Criar Pre\u00e7o e Cria\u00e7\u00e3o R\u00e1pida registram rastreabilidade compartilhada para restaura\u00e7\u00e3o e reimpress\u00e3o.",
        },
        {
            title: "Fila promocional conectada",
            description: "Promo\u00e7\u00f5es reaproveitam sele\u00e7\u00e3o real do hist\u00f3rico para organizar campanhas e impress\u00e3o futura.",
        },
        {
            title: "Impress\u00e3o em lote ativa",
            description: "Hist\u00f3rico e Promo\u00e7\u00f5es alimentam a mesma fila operacional de impress\u00e3o agrupada com controle por perfil.",
        },
        {
            title: "Etiquetas conectadas ao cat\u00e1logo",
            description: "A emiss\u00e3o de etiquetas reaproveita cat\u00e1logo e \u00faltima precifica\u00e7\u00e3o v\u00e1lida, reduzindo diverg\u00eancia entre g\u00f4ndola e cartaz.",
        },
        {
            title: "Integra\u00e7\u00e3o PDV governada",
            description: "A origem externa possui pol\u00edtica de valida\u00e7\u00e3o, visibilidade por perfil e reaproveitamento de pre\u00e7o nos fluxos ativos.",
        },
        {
            title: "Defini\u00e7\u00f5es centralizadas",
            description: "A governan\u00e7a de impress\u00e3o, se\u00e7\u00f5es, etiquetas, planos e acessos foi consolidada em centrais \u00fanicas.",
        },
        {
            title: "Trilha de suporte audit\u00e1vel",
            description: "Administradores agora contam com um log dedicado para registrar acessos sens\u00edveis a contas de clientes.",
        },
        {
            title: "Leitura gerencial dispon\u00edvel",
            description: "Relat\u00f3rios consolidam hist\u00f3rico, promo\u00e7\u00f5es, lotes e etiquetas para apoiar gest\u00e3o e auditoria operacional.",
        },
    ]), []);

    const recentTickets = useMemo(() => supportRows.slice(0, 3), [supportRows]);

    const moduleCards = useMemo(() => filterByAccess([
        buildCard({
            key: "create-price",
            routeKey: ROUTE_KEYS.createPrice,
            title: "Criar Pre\u00e7o",
            description: "Composi\u00e7\u00e3o segura de cartazes com rascunho local, pr\u00e9-visualiza\u00e7\u00e3o e impress\u00e3o.",
            actionLabel: "Criar cartaz",
            action: () => navigate("/dashboard/prices/create"),
        }),
        buildCard({
            key: "quick-price",
            routeKey: ROUTE_KEYS.quickPrice,
            title: "Cria\u00e7\u00e3o R\u00e1pida",
            description: "Fluxo enxuto para montar v\u00e1rios cartazes no mesmo lote com valida\u00e7\u00e3o por linha.",
            actionLabel: "Abrir modo r\u00e1pido",
            action: () => navigate("/dashboard/prices/quick"),
        }),
        buildCard({
            key: "batch-print",
            routeKey: ROUTE_KEYS.batchPrint,
            title: "Impress\u00e3o em Lote",
            description: "Fila \u00fanica para imprimir em escala sobre Hist\u00f3rico e Promo\u00e7\u00f5es, com deduplica\u00e7\u00e3o e respeito ao perfil do usu\u00e1rio.",
            actionLabel: "Abrir lote",
            action: () => navigate("/dashboard/prices/batch"),
        }),
        buildCard({
            key: "create-item",
            routeKey: ROUTE_KEYS.createItem,
            title: "Criar Item",
            description: "Funda\u00e7\u00e3o do cat\u00e1logo com identificadores \u00fanicos e base reaproveit\u00e1vel para os m\u00f3dulos seguintes.",
            actionLabel: "Cadastrar item",
            action: () => navigate("/dashboard/items/create"),
        }),
        buildCard({
            key: "items",
            routeKey: ROUTE_KEYS.items,
            title: "Itens",
            description: "Consulta e manuten\u00e7\u00e3o da base catalogada com reutiliza\u00e7\u00e3o direta no fluxo de precifica\u00e7\u00e3o.",
            actionLabel: "Abrir cat\u00e1logo",
            action: () => navigate("/dashboard/items"),
        }),
        buildCard({
            key: "import",
            routeKey: ROUTE_KEYS.importItems,
            title: "Importa\u00e7\u00e3o",
            description: "Carga em lote do cat\u00e1logo com mapeamento, pr\u00e9-visualiza\u00e7\u00e3o e estrat\u00e9gia de conflito antes de gravar.",
            actionLabel: "Importar itens",
            action: () => navigate("/dashboard/items/import"),
        }),
        buildCard({
            key: "settings",
            routeKey: ROUTE_KEYS.settings,
            title: accessProfile.isMaster ? "Painel Master" : "Defini\u00e7\u00f5es",
            description: accessProfile.isMaster
                ? "Governan\u00e7a da plataforma com tema sazonal, contatos, planos, trial e par\u00e2metros comerciais."
                : "Central operacional para governar padr\u00f5es de impress\u00e3o, se\u00e7\u00f5es, etiquetas e acessos.",
            actionLabel: accessProfile.isMaster ? "Abrir painel master" : "Abrir defini\u00e7\u00f5es",
            action: () => navigate(accessProfile.settingsPath),
        }),
        buildCard({
            key: "history",
            routeKey: ROUTE_KEYS.history,
            title: "Hist\u00f3rico",
            description: "Rastro compartilhado das opera\u00e7\u00f5es de precifica\u00e7\u00e3o, com reimpress\u00e3o e restaura\u00e7\u00e3o por registro.",
            actionLabel: "Abrir hist\u00f3rico",
            action: () => navigate("/dashboard/history"),
        }),
        buildCard({
            key: "labels",
            routeKey: ROUTE_KEYS.labels,
            title: "Etiquetas",
            description: "Gera\u00e7\u00e3o de etiquetas HTML e Zebra ZPL com base no cat\u00e1logo e na \u00faltima precifica\u00e7\u00e3o rastre\u00e1vel do item.",
            actionLabel: "Abrir etiquetas",
            action: () => navigate("/dashboard/labels"),
        }),
        buildCard({
            key: "pdv",
            routeKey: ROUTE_KEYS.pdvIntegration,
            title: "Integra\u00e7\u00e3o PDV",
            description: "Governan\u00e7a da origem externa para sugerir pre\u00e7o, validar conex\u00e3o e proteger a edi\u00e7\u00e3o conforme o perfil operacional.",
            actionLabel: "Abrir integra\u00e7\u00e3o",
            action: () => navigate("/dashboard/integration"),
        }),
        buildCard({
            key: "promotions",
            routeKey: ROUTE_KEYS.promotions,
            title: "Promo\u00e7\u00f5es",
            description: "Fila programada de campanhas montada sobre registros reais do hist\u00f3rico compartilhado.",
            actionLabel: "Abrir promo\u00e7\u00f5es",
            action: () => navigate("/dashboard/promotions"),
        }),
        buildCard({
            key: "reports",
            routeKey: ROUTE_KEYS.reports,
            title: "Relat\u00f3rios",
            description: "Painel gerencial para leitura consolidada da opera\u00e7\u00e3o por per\u00edodo, fonte, usu\u00e1rio e se\u00e7\u00e3o.",
            actionLabel: "Abrir relat\u00f3rios",
            action: () => navigate("/dashboard/reports"),
        }),
        buildCard({
            key: "support-access",
            routeKey: ROUTE_KEYS.supportAccess,
            title: "Log de Suporte",
            description: "Auditoria administrativa dos acessos feitos durante atendimentos e interven\u00e7\u00f5es em contas de clientes.",
            actionLabel: "Abrir log",
            action: () => navigate("/dashboard/support/access"),
        }),
        buildCard({
            key: "account",
            routeKey: ROUTE_KEYS.me,
            title: "Minha Conta",
            description: "Gest\u00e3o do perfil do usu\u00e1rio, assinatura e dados principais da conta.",
            actionLabel: "Abrir conta",
            action: () => navigate(getAccountEntryPath(user)),
        }),
        buildCard({
            key: "security",
            routeKey: ROUTE_KEYS.mePassword,
            title: "Senha e Seguran\u00e7a",
            description: "Atualiza\u00e7\u00e3o de credenciais e prote\u00e7\u00e3o de acesso do sistema.",
            actionLabel: "Gerenciar senha",
            action: () => navigate("/dashboard/me/password"),
        }),
        buildCard({
            key: "support",
            routeKey: ROUTE_KEYS.support,
            title: "Suporte",
            description: "Registro e acompanhamento de tickets t\u00e9cnicos e operacionais.",
            actionLabel: "Ver suporte",
            action: () => navigate("/dashboard/support"),
        }),
    ], canOpenRoute), [accessProfile.isMaster, accessProfile.settingsPath, canOpenRoute, navigate, user]);

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
        role: accessProfile.role,
    };
}

function buildAction(config = {}) {
    return config;
}

function buildCard(config = {}) {
    return {
        status: "Ativo",
        icon: "/icons/products.svg",
        ...config,
    };
}

function filterByAccess(items = [], canOpenRoute = () => false) {
    return items.filter(item => !item.routeKey || canOpenRoute(item.routeKey));
}

function formatDate(value) {
    if (!value) return "--";

    const parsed = moment(value);
    if (!parsed.isValid()) return "--";

    return parsed.format("L");
}
