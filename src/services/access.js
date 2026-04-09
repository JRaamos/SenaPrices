import { canPlanAccessFeature, getPlanCapabilities, getPlanLabel, getSubscriptionStatusLabel, resolveUserSubscription } from "./platform";
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
    [ROUTE_KEYS.supportAccess]: { roles: ["admin"], feature: "support" },
};

export function buildAccessProfile(user = {}) {
    const role = normalizeUserRole(user);
    const subscription = resolveUserSubscription(user);
    const plan = subscription.plan;
    const capabilities = getPlanCapabilities(plan);

    return {
        role,
        roleLabel: getRoleLabel(role),
        isMaster: role === "master",
        isAdmin: role === "admin",
        isSubadmin: role === "subadmin",
        isUser: role === "user",
        plan,
        planLabel: getPlanLabel(plan),
        subscription,
        subscriptionStatusLabel: getSubscriptionStatusLabel(subscription.status),
        capabilities,
        defaultPath: getDefaultAuthenticatedPath(user),
        settingsPath: role === "master" ? "/dashboard/settings?tab=platform" : "/dashboard/settings",
    };
}

export function getDefaultAuthenticatedPath(user = {}) {
    const role = normalizeUserRole(user);

    if (role === "master") {
        return "/dashboard/settings?tab=platform";
    }

    return "/dashboard";
}

export function getAccountEntryPath(user = {}) {
    const role = normalizeUserRole(user);
    return role === "master" ? "/dashboard/settings?tab=platform" : "/dashboard/me";
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
                { label: "Landing", icon: "home", path: "/" },
                { label: "Master", icon: "training", path: "/dashboard/settings?tab=platform" },
            ],
            secondary: [
                {
                    label: "Conta",
                    icon: "user",
                    children: [
                        { label: "Painel master", path: "/dashboard/settings?tab=platform" },
                    ],
                },
            ],
        };
    }

    const primary = [
        { key: ROUTE_KEYS.dashboardHome, label: "Home", icon: "home", path: "/dashboard", border: true },
        { key: ROUTE_KEYS.createPrice, label: "Criar Pre\u00e7o", icon: "products", path: "/dashboard/prices/create" },
        { key: ROUTE_KEYS.quickPrice, label: "Cria\u00e7\u00e3o R\u00e1pida", icon: "products", path: "/dashboard/prices/quick" },
        { key: ROUTE_KEYS.batchPrint, label: "Impress\u00e3o em Lote", icon: "products", path: "/dashboard/prices/batch" },
        { key: ROUTE_KEYS.history, label: "Hist\u00f3rico", icon: "products", path: "/dashboard/history" },
        { key: ROUTE_KEYS.promotions, label: "Promo\u00e7\u00f5es", icon: "products", path: "/dashboard/promotions" },
        { key: ROUTE_KEYS.labels, label: "Etiquetas", icon: "products", path: "/dashboard/labels" },
        { key: ROUTE_KEYS.pdvIntegration, label: "Integra\u00e7\u00e3o PDV", icon: "products", path: "/dashboard/integration" },
        { key: ROUTE_KEYS.items, label: "Itens", icon: "products", path: "/dashboard/items" },
        { key: ROUTE_KEYS.createItem, label: "Criar Item", icon: "products", path: "/dashboard/items/create" },
        { key: ROUTE_KEYS.importItems, label: "Importar", icon: "products", path: "/dashboard/items/import" },
        { key: ROUTE_KEYS.settings, label: "Defini\u00e7\u00f5es", icon: "training", path: "/dashboard/settings" },
        { key: ROUTE_KEYS.reports, label: "Relat\u00f3rios", icon: "training", path: "/dashboard/reports" },
        { key: ROUTE_KEYS.support, label: "Suporte", icon: "proposal", path: "/dashboard/support" },
        { key: ROUTE_KEYS.supportAccess, label: "Log de Suporte", icon: "training", path: "/dashboard/support/access" },
    ].filter(item => canAccessRoute(item.key, user, isAuthenticated));

    const secondary = [
        {
            label: "Minha Conta",
            icon: "user",
            children: [
                { key: ROUTE_KEYS.me, label: "Meu Perfil", path: "/dashboard/me" },
                { key: ROUTE_KEYS.mePassword, label: "Senha e seguran\u00e7a", path: "/dashboard/me/password" },
            ].filter(item => canAccessRoute(item.key, user, isAuthenticated)),
        },
    ];

    return {
        primary,
        secondary,
    };
}

function getRoleLabel(role = "user") {
    if (role === "master") return "Master";
    if (role === "admin") return "Administrador";
    if (role === "subadmin") return "Subadministrador";
    return "Usu\u00e1rio";
}
