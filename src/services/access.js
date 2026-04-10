import {
    canPlanAccessFeature,
    getPlanCapabilities,
    getPlanLabel,
    getSubscriptionStatusLabel,
    resolveUserSubscription,
} from "./platform";
import { normalizeUserRole } from "./users";

export const ROUTE_KEYS = {
    landing: "landing",
    checkout: "checkout",
    checkoutSuccess: "checkoutSuccess",
    login: "login",
    register: "register",
    forgot: "forgot",
    createPassword: "createPassword",
    dashboardHome: "dashboardHome",
    createPrice: "createPrice",
    quickPrice: "quickPrice",
    batchPrint: "batchPrint",
    history: "history",
    promotions: "promotions",
    labels: "labels",
    pdvIntegration: "pdvIntegration",
    reports: "reports",
    settings: "settings",
    createItem: "createItem",
    importItems: "importItems",
    items: "items",
    me: "me",
    mePassword: "mePassword",
    support: "support",
    supportAccess: "supportAccess",
    supportForm: "supportForm",
    notFound: "notFound",
};

const PUBLIC_ROUTES = new Set([
    ROUTE_KEYS.landing,
    ROUTE_KEYS.checkout,
    ROUTE_KEYS.checkoutSuccess,
    ROUTE_KEYS.login,
    ROUTE_KEYS.register,
    ROUTE_KEYS.forgot,
    ROUTE_KEYS.createPassword,
    ROUTE_KEYS.notFound,
]);

const ROUTE_RULES = {
    [ROUTE_KEYS.dashboardHome]: { roles: ["admin", "subadmin", "user"], feature: "dashboard" },
    [ROUTE_KEYS.createPrice]: { roles: ["admin", "subadmin", "user"], feature: "createPrice" },
    [ROUTE_KEYS.quickPrice]: { roles: ["admin", "subadmin", "user"], feature: "quickPrice" },
    [ROUTE_KEYS.batchPrint]: { roles: ["admin", "subadmin", "user"], feature: "batchPrint" },
    [ROUTE_KEYS.history]: { roles: ["admin", "subadmin", "user"], feature: "history" },
    [ROUTE_KEYS.promotions]: { roles: ["admin", "subadmin", "user"], feature: "promotions" },
    [ROUTE_KEYS.labels]: { roles: ["admin", "subadmin", "user"], feature: "labels" },
    [ROUTE_KEYS.pdvIntegration]: { roles: ["admin", "subadmin", "user"], feature: "pdvIntegration" },
    [ROUTE_KEYS.reports]: { roles: ["admin", "subadmin"], feature: "reports" },
    [ROUTE_KEYS.settings]: { roles: ["master", "admin", "subadmin"], feature: "settings" },
    [ROUTE_KEYS.createItem]: { roles: ["admin", "subadmin"], feature: "catalog" },
    [ROUTE_KEYS.importItems]: { roles: ["admin", "subadmin"], feature: "importItems" },
    [ROUTE_KEYS.items]: { roles: ["admin", "subadmin"], feature: "catalog" },
    [ROUTE_KEYS.me]: { roles: ["admin", "subadmin", "user"], feature: "account" },
    [ROUTE_KEYS.mePassword]: { roles: ["admin", "subadmin", "user"], feature: "account" },
    [ROUTE_KEYS.support]: { roles: ["admin", "subadmin", "user"], feature: "support" },
    [ROUTE_KEYS.supportForm]: { roles: ["admin", "subadmin", "user"], feature: "support" },
    [ROUTE_KEYS.supportAccess]: { roles: ["master", "admin"], feature: "support" },
};

function buildSettingsPath(tab = "platform") {
    return `/dashboard/settings?tab=${tab}`;
}

export function buildAccessProfile(user = {}) {
    const role = normalizeUserRole(user);
    const subscription = resolveUserSubscription(user);
    const plan = subscription.plan;
    const capabilities = getPlanCapabilities(plan);
    const isMaster = role === "master";

    return {
        role,
        roleLabel: getRoleLabel(role),
        isMaster,
        isAdmin: role === "admin",
        isSubadmin: role === "subadmin",
        isUser: role === "user",
        plan,
        planLabel: isMaster ? "Governança" : getPlanLabel(plan),
        subscription,
        subscriptionStatusLabel: isMaster ? "Conta master" : getSubscriptionStatusLabel(subscription.status),
        capabilities,
        defaultPath: getDefaultAuthenticatedPath(user),
        settingsPath: isMaster ? buildSettingsPath("platform") : "/dashboard/settings",
    };
}

export function getDefaultAuthenticatedPath(user = {}) {
    const role = normalizeUserRole(user);

    if (role === "master") {
        return buildSettingsPath("platform");
    }

    return "/dashboard";
}

export function getAccountEntryPath(user = {}) {
    const role = normalizeUserRole(user);
    return role === "master" ? buildSettingsPath("platform") : "/dashboard/me";
}

export function resolveRouteAccess(routeKey, user = {}, isAuthenticated = false) {
    const accessProfile = buildAccessProfile(user);

    if (PUBLIC_ROUTES.has(routeKey)) {
        if (isAuthenticated && (routeKey === ROUTE_KEYS.login || routeKey === ROUTE_KEYS.register)) {
            return {
                allowed: false,
                redirectTo: accessProfile.defaultPath,
                accessProfile,
            };
        }

        return {
            allowed: true,
            accessProfile,
        };
    }

    if (!isAuthenticated) {
        return {
            allowed: false,
            redirectTo: "/login",
            accessProfile,
        };
    }

    const rule = ROUTE_RULES[routeKey];
    if (!rule) {
        return {
            allowed: true,
            accessProfile,
        };
    }

    if (!rule.roles.includes(accessProfile.role)) {
        return {
            allowed: false,
            notFound: true,
            accessProfile,
        };
    }

    if (!accessProfile.isMaster && rule.feature && !canPlanAccessFeature(accessProfile.plan, rule.feature)) {
        return {
            allowed: false,
            notFound: true,
            accessProfile,
        };
    }

    if (accessProfile.isMaster && routeKey !== ROUTE_KEYS.settings) {
        return {
            allowed: false,
            redirectTo: accessProfile.settingsPath,
            accessProfile,
        };
    }

    return {
        allowed: true,
        accessProfile,
    };
}

export function canAccessRoute(routeKey, user = {}, isAuthenticated = false) {
    return resolveRouteAccess(routeKey, user, isAuthenticated).allowed;
}

export function buildSidebarSections(user = {}, isAuthenticated = true) {
    if (!isAuthenticated) {
        return {
            primary: [],
            secondary: [],
        };
    }

    const accessProfile = buildAccessProfile(user);

    if (accessProfile.isMaster) {
        return {
            primary: [
                {
                    label: "Plataforma",
                    iconToken: "master",
                    children: [
                        { label: "Conta master", path: buildSettingsPath("platform") },
                        { label: "Planos e cobrança", path: buildSettingsPath("billing") },
                        { label: "Landing pública", path: "/" },
                        { label: "Simular checkout", path: "/checkout?plan=profissional&billing=annual" },
                    ],
                },
                {
                    label: "Configurações globais",
                    iconToken: "settings",
                    children: [
                        { label: "Impressão", path: buildSettingsPath("print") },
                        { label: "Tipos de oferta", path: buildSettingsPath("offertypes") },
                        { label: "Ofertas especiais", path: buildSettingsPath("special") },
                        { label: "Seções", path: buildSettingsPath("sections") },
                        { label: "Imagens de fundo", path: buildSettingsPath("backgrounds") },
                        { label: "Páginas", path: buildSettingsPath("custompages") },
                        { label: "Etiquetas", path: buildSettingsPath("labels") },
                    ],
                },
                {
                    label: "Governança",
                    iconToken: "supportAccess",
                    children: [
                        { label: "Usuários", path: buildSettingsPath("users") },
                        { label: "Grupos", path: buildSettingsPath("groups") },
                        { label: "Suporte", path: buildSettingsPath("support") },
                        { label: "Log de suporte", path: "/dashboard/support/access" },
                    ],
                },
            ],
            secondary: [],
        };
    }

    const primary = [
        { key: ROUTE_KEYS.createPrice, label: "Criar Preço", iconToken: "createPrice", path: "/dashboard/prices/create" },
        { key: ROUTE_KEYS.quickPrice, label: "Criação Rápida", iconToken: "quickPrice", path: "/dashboard/prices/quick" },
        { key: ROUTE_KEYS.batchPrint, label: "Impressão em Lote", iconToken: "batchPrint", path: "/dashboard/prices/batch" },
        { key: ROUTE_KEYS.promotions, label: "Promoções", iconToken: "promotions", path: "/dashboard/promotions" },
        { key: ROUTE_KEYS.history, label: "Histórico", iconToken: "history", path: "/dashboard/history" },
        { key: ROUTE_KEYS.labels, label: "Etiquetas", iconToken: "labels", path: "/dashboard/labels" },
        { key: ROUTE_KEYS.createItem, label: "Criar Item", iconToken: "createItem", path: "/dashboard/items/create" },
        { key: ROUTE_KEYS.items, label: "Itens", iconToken: "items", path: "/dashboard/items" },
        { key: ROUTE_KEYS.importItems, label: "Importar", iconToken: "import", path: "/dashboard/items/import" },
        { key: ROUTE_KEYS.reports, label: "Relatórios", iconToken: "reports", path: "/dashboard/reports" },
        { key: ROUTE_KEYS.pdvIntegration, label: "Integração PDV", iconToken: "integration", path: "/dashboard/integration" },
        { key: ROUTE_KEYS.settings, label: "Definições", iconToken: "settings", path: "/dashboard/settings" },
        { key: ROUTE_KEYS.supportAccess, label: "Log de Suporte", iconToken: "supportAccess", path: "/dashboard/support/access" },
    ].filter(item => canAccessRoute(item.key, user, isAuthenticated));

    // Account access is already exposed through the footer profile card and
    // the dedicated internal account navigation, so we keep the footer lean.
    const secondary = [
        { key: ROUTE_KEYS.support, label: "Suporte", iconToken: "support", path: "/dashboard/support" },
    ].filter(item => canAccessRoute(item.key, user, isAuthenticated));

    return {
        primary,
        secondary,
    };
}

function getRoleLabel(role = "user") {
    if (role === "master") return "Master";
    if (role === "admin") return "Administrador";
    if (role === "subadmin") return "Subadministrador";
    return "Usuário";
}
