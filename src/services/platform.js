import { ReadObject, SaveObject } from "./storage";
import { findLocalAccountMatch, updateLocalAccount } from "./localAccounts";

const MASTER_CONFIG_KEY = "master-config";
const SUBSCRIPTIONS_KEY = "subscription-directory";

const SEASONAL_THEMES = ["generic", "blackfriday", "semanaConsumidor", "natal", "pascoa"];
const SUBSCRIPTION_PLANS = ["essencial", "profissional", "personalizado", "none"];
const SUBSCRIPTION_STATUSES = ["active", "trial", "expiring", "expired", "cancelled", "none"];

export const DEFAULT_MASTER_CONFIG = {
    contactEmail: "contato@senaprices.com",
    contactPhone: "",
    contactWhatsApp: "",
    stripePublishableKey: "",
    stripeSecretKeyHint: "",
    seasonalTheme: "generic",
    seasonalThemeActive: false,
    seasonalThemeStart: "",
    seasonalThemeEnd: "",
    planConfig: {
        essencialMonthlyPrice: 59.9,
        essencialYearlyPrice: 599,
        essencialAnnualDiscountPercent: 15,
        profissionalMonthlyPrice: 299.9,
        profissionalYearlyPrice: 2990,
        profissionalAnnualDiscountPercent: 15,
        trialDays: 14,
        currency: "BRL",
    },
    discounts: [],
    updatedAt: "",
    updatedBy: null,
};

const DEFAULT_FALLBACK_SUBSCRIPTIONS = {
    master: { plan: "none", status: "none" },
    admin: { plan: "profissional", status: "active", autoRenew: true },
    subadmin: { plan: "profissional", status: "active", autoRenew: true },
    user: { plan: "profissional", status: "active", autoRenew: true },
};

const PLAN_CAPABILITIES = {
    none: {
        dashboard: false,
        createPrice: false,
        quickPrice: false,
        batchPrint: false,
        history: false,
        promotions: false,
        labels: false,
        catalog: false,
        importItems: false,
        reports: false,
        settings: false,
        pdvIntegration: false,
        support: false,
        account: false,
    },
    essencial: {
        dashboard: true,
        createPrice: true,
        quickPrice: true,
        batchPrint: false,
        history: true,
        promotions: true,
        labels: false,
        catalog: true,
        importItems: false,
        reports: false,
        settings: true,
        pdvIntegration: false,
        support: true,
        account: true,
    },
    profissional: {
        dashboard: true,
        createPrice: true,
        quickPrice: true,
        batchPrint: true,
        history: true,
        promotions: true,
        labels: true,
        catalog: true,
        importItems: true,
        reports: true,
        settings: true,
        pdvIntegration: false,
        support: true,
        account: true,
    },
    personalizado: {
        dashboard: true,
        createPrice: true,
        quickPrice: true,
        batchPrint: true,
        history: true,
        promotions: true,
        labels: true,
        catalog: true,
        importItems: true,
        reports: true,
        settings: true,
        pdvIntegration: true,
        support: true,
        account: true,
    },
};

export function readMasterConfig() {
    return sanitizeMasterConfig(ReadObject(MASTER_CONFIG_KEY) || DEFAULT_MASTER_CONFIG);
}

export function saveMasterConfig(values = {}, user = null) {
    const current = readMasterConfig();
    const next = sanitizeMasterConfig({
        ...current,
        ...(values || {}),
        planConfig: {
            ...current.planConfig,
            ...(values?.planConfig || {}),
        },
        updatedAt: new Date().toISOString(),
        updatedBy: user?.email || user?.documentId || user?.id || current.updatedBy || null,
    });

    SaveObject(MASTER_CONFIG_KEY, next);
    return next;
}

export function resolveSeasonalTheme(config = readMasterConfig(), nowValue = new Date()) {
    const safeConfig = sanitizeMasterConfig(config);

    if (!safeConfig.seasonalThemeActive) {
        return "generic";
    }

    const now = normalizeDateKey(nowValue);
    const startsAt = safeConfig.seasonalThemeStart || "";
    const endsAt = safeConfig.seasonalThemeEnd || "";

    if (startsAt && now < startsAt) {
        return "generic";
    }

    if (endsAt && now > endsAt) {
        return "generic";
    }

    return safeConfig.seasonalTheme;
}

export function readSubscriptionDirectory() {
    const stored = ReadObject(SUBSCRIPTIONS_KEY);

    if (!stored || typeof stored !== "object" || Array.isArray(stored)) {
        return {};
    }

    return Object.entries(stored).reduce((accumulator, [key, value]) => ({
        ...accumulator,
        [key]: sanitizeSubscription(value),
    }), {});
}

export function saveUserSubscription(subject = {}, subscription = {}) {
    const safeSubscription = sanitizeSubscription(subscription);
    const directory = readSubscriptionDirectory();
    const keys = resolveSubjectKeys(subject);

    const nextDirectory = { ...directory };
    keys.forEach(key => {
        nextDirectory[key] = safeSubscription;
    });

    SaveObject(SUBSCRIPTIONS_KEY, nextDirectory);

    const localAccount = findLocalAccountMatch(subject);
    if (localAccount) {
        updateLocalAccount(localAccount, { subscription: safeSubscription });
    }

    return safeSubscription;
}

export function resolveUserSubscription(subject = {}) {
    const role = normalizeRole(subject?.role || subject?.roleName || subject?.profile || "user");
    const directory = readSubscriptionDirectory();
    const keys = resolveSubjectKeys(subject);
    const localAccount = findLocalAccountMatch(subject);

    const explicit = sanitizeSubscription(
        subject?.subscription
        || subject?.subscriptionData
        || subject?.billing
        || {}
    );

    const stored = keys
        .map(key => directory[key])
        .find(Boolean);

    const local = sanitizeSubscription(localAccount?.subscription || {});
    const fallback = sanitizeSubscription(DEFAULT_FALLBACK_SUBSCRIPTIONS[role] || DEFAULT_FALLBACK_SUBSCRIPTIONS.user);

    const picked = explicit.plan !== "none"
        || explicit.status !== "none"
        ? explicit
        : stored?.plan !== "none" || stored?.status !== "none"
            ? stored
            : local?.plan !== "none" || local?.status !== "none"
                ? local
                : fallback;

    return deriveSubscriptionState(picked);
}

export function getPlanCapabilities(plan = "profissional") {
    return PLAN_CAPABILITIES[normalizePlan(plan)] || PLAN_CAPABILITIES.profissional;
}

export function canPlanAccessFeature(plan = "profissional", feature = "") {
    const capabilities = getPlanCapabilities(plan);
    return !!capabilities[feature];
}

export function getPlanLabel(plan = "none") {
    const normalizedPlan = normalizePlan(plan);
    if (normalizedPlan === "essencial") return "Essencial";
    if (normalizedPlan === "profissional") return "Profissional";
    if (normalizedPlan === "personalizado") return "Personalizado";
    return "Sem plano";
}

export function getSubscriptionStatusLabel(status = "none") {
    const normalizedStatus = sanitizeSubscription({ status }).status;
    if (normalizedStatus === "active") return "Ativa";
    if (normalizedStatus === "trial") return "Trial";
    if (normalizedStatus === "expiring") return "Expirando";
    if (normalizedStatus === "expired") return "Expirada";
    if (normalizedStatus === "cancelled") return "Cancelada";
    return "Sem assinatura";
}

export function buildPlanOffer(plan = "essencial", options = {}) {
    const config = readMasterConfig();
    const normalizedPlan = normalizePlan(plan);
    const isAnnual = !!options.isAnnual;

    if (normalizedPlan === "personalizado") {
        return {
            plan: normalizedPlan,
            price: null,
            meta: "Sob consulta",
            currency: config.planConfig.currency,
        };
    }

    const monthlyPrice = normalizedPlan === "essencial"
        ? config.planConfig.essencialMonthlyPrice
        : config.planConfig.profissionalMonthlyPrice;

    const annualPrice = normalizedPlan === "essencial"
        ? config.planConfig.essencialYearlyPrice
        : config.planConfig.profissionalYearlyPrice;

    const annualDiscountPercent = normalizedPlan === "essencial"
        ? config.planConfig.essencialAnnualDiscountPercent
        : config.planConfig.profissionalAnnualDiscountPercent;

    return {
        plan: normalizedPlan,
        price: isAnnual ? annualPrice : monthlyPrice,
        monthlyPrice,
        annualPrice,
        annualDiscountPercent,
        currency: config.planConfig.currency,
    };
}

function sanitizeMasterConfig(values = {}) {
    const next = {
        ...DEFAULT_MASTER_CONFIG,
        ...(values || {}),
        planConfig: {
            ...DEFAULT_MASTER_CONFIG.planConfig,
            ...(values?.planConfig || {}),
        },
    };

    return {
        contactEmail: sanitizeText(next.contactEmail, 120),
        contactPhone: sanitizeText(next.contactPhone, 40),
        contactWhatsApp: sanitizeText(next.contactWhatsApp, 40),
        stripePublishableKey: sanitizeText(next.stripePublishableKey, 240),
        stripeSecretKeyHint: sanitizeText(next.stripeSecretKeyHint, 120),
        seasonalTheme: SEASONAL_THEMES.includes(next.seasonalTheme) ? next.seasonalTheme : "generic",
        seasonalThemeActive: !!next.seasonalThemeActive,
        seasonalThemeStart: normalizeDateKey(next.seasonalThemeStart),
        seasonalThemeEnd: normalizeDateKey(next.seasonalThemeEnd),
        planConfig: {
            essencialMonthlyPrice: sanitizeNumber(next.planConfig.essencialMonthlyPrice, DEFAULT_MASTER_CONFIG.planConfig.essencialMonthlyPrice),
            essencialYearlyPrice: sanitizeNumber(next.planConfig.essencialYearlyPrice, DEFAULT_MASTER_CONFIG.planConfig.essencialYearlyPrice),
            essencialAnnualDiscountPercent: sanitizePercent(next.planConfig.essencialAnnualDiscountPercent, DEFAULT_MASTER_CONFIG.planConfig.essencialAnnualDiscountPercent),
            profissionalMonthlyPrice: sanitizeNumber(next.planConfig.profissionalMonthlyPrice, DEFAULT_MASTER_CONFIG.planConfig.profissionalMonthlyPrice),
            profissionalYearlyPrice: sanitizeNumber(next.planConfig.profissionalYearlyPrice, DEFAULT_MASTER_CONFIG.planConfig.profissionalYearlyPrice),
            profissionalAnnualDiscountPercent: sanitizePercent(next.planConfig.profissionalAnnualDiscountPercent, DEFAULT_MASTER_CONFIG.planConfig.profissionalAnnualDiscountPercent),
            trialDays: sanitizeInteger(next.planConfig.trialDays, DEFAULT_MASTER_CONFIG.planConfig.trialDays),
            currency: sanitizeText(next.planConfig.currency, 8) || DEFAULT_MASTER_CONFIG.planConfig.currency,
        },
        discounts: Array.isArray(next.discounts) ? next.discounts : [],
        updatedAt: `${next.updatedAt || ""}`.trim(),
        updatedBy: next.updatedBy || null,
    };
}

function sanitizeSubscription(values = {}) {
    const next = values && typeof values === "object" ? values : {};
    return {
        plan: normalizePlan(next.plan),
        status: SUBSCRIPTION_STATUSES.includes(`${next.status || ""}`.trim().toLowerCase())
            ? `${next.status || ""}`.trim().toLowerCase()
            : "none",
        startDate: next.startDate || null,
        expiryDate: next.expiryDate || null,
        autoRenew: next.autoRenew !== false,
    };
}

function deriveSubscriptionState(values = {}) {
    const next = sanitizeSubscription(values);

    if (next.plan === "none") {
        return next;
    }

    if (!next.expiryDate) {
        return next;
    }

    const now = Date.now();
    const expiry = new Date(next.expiryDate).getTime();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    if (Number.isNaN(expiry)) {
        return next;
    }

    if (expiry < now) {
        return {
            ...next,
            status: "expired",
        };
    }

    if (expiry - now <= sevenDays && next.status === "active") {
        return {
            ...next,
            status: "expiring",
        };
    }

    return next;
}

function resolveSubjectKeys(subject = {}) {
    const identity = `${subject?.documentId || subject?.id || ""}`.trim();
    const email = `${subject?.email || ""}`.trim().toLowerCase();

    return [identity, email].filter(Boolean);
}

function normalizeRole(value = "user") {
    const role = `${value || ""}`.trim().toLowerCase();
    if (role === "master") return "master";
    if (role === "subadmin" || role === "supervisor") return "subadmin";
    if (role === "admin") return "admin";
    return "user";
}

function normalizePlan(value = "none") {
    const plan = `${value || ""}`.trim().toLowerCase();
    return SUBSCRIPTION_PLANS.includes(plan) ? plan : "none";
}

function sanitizeText(value, limit) {
    return `${value || ""}`.replace(/\s+/g, " ").trim().slice(0, limit);
}

function sanitizeNumber(value, fallback) {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function sanitizePercent(value, fallback) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
        return fallback;
    }

    return Math.min(100, Math.max(0, parsed));
}

function sanitizeInteger(value, fallback) {
    const parsed = parseInt(value, 10);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function normalizeDateKey(value) {
    const normalized = `${value || ""}`.trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(normalized) ? normalized : "";
}
