import { ReadObject, SaveObject } from "./storage";

const GROUPS_KEY = "governance-groups";
const OFFER_TYPES_KEY = "governance-offer-types";
const SPECIAL_OFFERS_KEY = "governance-special-offers";
const BACKGROUNDS_KEY = "governance-backgrounds";
const CUSTOM_PAGES_KEY = "governance-custom-pages";

const DEFAULT_OFFER_TYPES = [
    "Fim de Semana",
    "Ano Novo",
    "Páscoa",
    "Carnaval",
    "Dia das Mães",
    "Festa Junina",
    "Dia dos Pais",
    "Dia das Crianças",
    "Black Friday",
    "Natal",
].map((name, index) => ({
    id: `default-offer-type-${index + 1}`,
    name,
    active: true,
    locked: true,
    createdAt: "",
    updatedAt: "",
}));

const DEFAULT_SPECIAL_OFFERS = [
    {
        id: "default-special-offer-1",
        name: "Leve 3, Pague 2",
        template: "Leve {qtd_leve}, pague {qtd_pague}",
        active: true,
        locked: true,
        createdAt: "",
        updatedAt: "",
    },
    {
        id: "default-special-offer-2",
        name: "Ganhe um Brinde",
        template: "Na compra de {produto}, ganhe {brinde}",
        active: true,
        locked: true,
        createdAt: "",
        updatedAt: "",
    },
    {
        id: "default-special-offer-3",
        name: "Desconto Percentual",
        template: "{desconto}% de desconto",
        active: true,
        locked: true,
        createdAt: "",
        updatedAt: "",
    },
];

const DEFAULT_BACKGROUNDS = {
    portraitBackground: "",
    landscapeBackground: "",
    portraitClubLogo: "",
    landscapeClubLogo: "",
    updatedAt: "",
    updatedBy: null,
};

export function readGovernanceGroups() {
    const stored = Array.isArray(ReadObject(GROUPS_KEY)) ? ReadObject(GROUPS_KEY) : [];
    return stored.map(sanitizeGroup).filter(Boolean).sort(sortByName);
}

export function createGovernanceGroup(values = {}, user = null) {
    const draft = sanitizeGroup(values, true);
    const items = readGovernanceGroups();

    ensureUniqueName(items, draft.name, "grupo");

    const next = {
        ...draft,
        id: createId("group"),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        updatedBy: getActor(user),
    };

    SaveObject(GROUPS_KEY, [...items, next]);
    return next;
}

export function updateGovernanceGroup(id, patch = {}, user = null) {
    const items = readGovernanceGroups();
    const current = items.find(item => item.id === id);

    if (!current) {
        throw new Error("Grupo não encontrado.");
    }

    const next = sanitizeGroup({
        ...current,
        ...patch,
        id: current.id,
        createdAt: current.createdAt,
        updatedAt: new Date().toISOString(),
        updatedBy: getActor(user),
    }, true);

    ensureUniqueName(items.filter(item => item.id !== current.id), next.name, "grupo");

    SaveObject(GROUPS_KEY, items.map(item => (item.id === current.id ? next : item)));
    return next;
}

export function deleteGovernanceGroup(id) {
    const items = readGovernanceGroups();
    SaveObject(GROUPS_KEY, items.filter(item => item.id !== id));
    return true;
}

export function readOfferTypes() {
    const stored = Array.isArray(ReadObject(OFFER_TYPES_KEY)) ? ReadObject(OFFER_TYPES_KEY) : [];
    const byId = new Map();

    [...DEFAULT_OFFER_TYPES, ...stored.map(item => sanitizeOfferType(item, true)).filter(Boolean)].forEach(item => {
        byId.set(item.id, sanitizeOfferType(item, true));
    });

    return Array.from(byId.values()).sort((a, b) => {
        if (a.locked !== b.locked) return a.locked ? -1 : 1;
        return sortByName(a, b);
    });
}

export function createOfferType(values = {}, user = null) {
    const items = readOfferTypes();
    const draft = sanitizeOfferType(values, true);

    ensureUniqueName(items, draft.name, "tipo de oferta");

    const next = {
        ...draft,
        id: createId("offer-type"),
        locked: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        updatedBy: getActor(user),
    };

    SaveObject(OFFER_TYPES_KEY, [...items.filter(item => !item.locked), next]);
    return next;
}

export function toggleOfferType(id, user = null) {
    return patchOfferType(id, item => ({
        active: !item.active,
        updatedAt: new Date().toISOString(),
        updatedBy: getActor(user),
    }));
}

export function deleteOfferType(id) {
    const items = readOfferTypes();
    const current = items.find(item => item.id === id);

    if (!current) return false;
    if (current.locked) {
        throw new Error("Tipos de oferta padrão não podem ser removidos.");
    }

    SaveObject(OFFER_TYPES_KEY, items.filter(item => !item.locked && item.id !== id));
    return true;
}

export function readSpecialOffers() {
    const stored = Array.isArray(ReadObject(SPECIAL_OFFERS_KEY)) ? ReadObject(SPECIAL_OFFERS_KEY) : [];
    const byId = new Map();

    [...DEFAULT_SPECIAL_OFFERS, ...stored.map(item => sanitizeSpecialOffer(item, true)).filter(Boolean)].forEach(item => {
        byId.set(item.id, sanitizeSpecialOffer(item, true));
    });

    return Array.from(byId.values()).sort((a, b) => {
        if (a.locked !== b.locked) return a.locked ? -1 : 1;
        return sortByName(a, b);
    });
}

export function createSpecialOffer(values = {}, user = null) {
    const items = readSpecialOffers();
    const draft = sanitizeSpecialOffer(values, true);

    ensureUniqueName(items, draft.name, "oferta especial");

    const next = {
        ...draft,
        id: createId("special-offer"),
        locked: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        updatedBy: getActor(user),
    };

    SaveObject(SPECIAL_OFFERS_KEY, [...items.filter(item => !item.locked), next]);
    return next;
}

export function toggleSpecialOffer(id, user = null) {
    return patchSpecialOffer(id, item => ({
        active: !item.active,
        updatedAt: new Date().toISOString(),
        updatedBy: getActor(user),
    }));
}

export function deleteSpecialOffer(id) {
    const items = readSpecialOffers();
    const current = items.find(item => item.id === id);

    if (!current) return false;
    if (current.locked) {
        throw new Error("Ofertas especiais padrão não podem ser removidas.");
    }

    SaveObject(SPECIAL_OFFERS_KEY, items.filter(item => !item.locked && item.id !== id));
    return true;
}

export function readBackgroundAssets() {
    return sanitizeBackgroundAssets(ReadObject(BACKGROUNDS_KEY) || DEFAULT_BACKGROUNDS);
}

export function saveBackgroundAssets(values = {}, user = null) {
    const current = readBackgroundAssets();
    const next = sanitizeBackgroundAssets({
        ...current,
        ...(values || {}),
        updatedAt: new Date().toISOString(),
        updatedBy: getActor(user),
    });

    SaveObject(BACKGROUNDS_KEY, next);
    return next;
}

export function readCustomPages() {
    const stored = Array.isArray(ReadObject(CUSTOM_PAGES_KEY)) ? ReadObject(CUSTOM_PAGES_KEY) : [];
    return stored.map(item => sanitizeCustomPage(item, true)).filter(Boolean).sort(sortByName);
}

export function createCustomPage(values = {}, user = null) {
    const items = readCustomPages();
    const draft = sanitizeCustomPage(values, true);

    ensureUniqueName(items, draft.name, "página personalizada");

    const next = {
        ...draft,
        id: createId("custom-page"),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        updatedBy: getActor(user),
    };

    SaveObject(CUSTOM_PAGES_KEY, [...items, next]);
    return next;
}

export function deleteCustomPage(id) {
    const items = readCustomPages();
    SaveObject(CUSTOM_PAGES_KEY, items.filter(item => item.id !== id));
    return true;
}

function patchOfferType(id, patchFactory) {
    const items = readOfferTypes();
    const current = items.find(item => item.id === id);

    if (!current) {
        throw new Error("Tipo de oferta não encontrado.");
    }

    const patch = typeof patchFactory === "function" ? patchFactory(current) : patchFactory;
    const next = sanitizeOfferType({ ...current, ...patch }, true);
    const customItems = items
        .map(item => (item.id === id ? next : item))
        .filter(item => !item.locked);

    SaveObject(OFFER_TYPES_KEY, customItems);
    return next;
}

function patchSpecialOffer(id, patchFactory) {
    const items = readSpecialOffers();
    const current = items.find(item => item.id === id);

    if (!current) {
        throw new Error("Oferta especial não encontrada.");
    }

    const patch = typeof patchFactory === "function" ? patchFactory(current) : patchFactory;
    const next = sanitizeSpecialOffer({ ...current, ...patch }, true);
    const customItems = items
        .map(item => (item.id === id ? next : item))
        .filter(item => !item.locked);

    SaveObject(SPECIAL_OFFERS_KEY, customItems);
    return next;
}

function sanitizeGroup(values = {}, strict = false) {
    const name = sanitizeText(values?.name, 48);
    if (strict && !name) {
        throw new Error("Informe um nome de grupo.");
    }

    return {
        id: `${values?.id || ""}`.trim(),
        name,
        description: sanitizeText(values?.description, 120),
        members: Array.isArray(values?.members)
            ? values.members.map(item => `${item || ""}`.trim()).filter(Boolean)
            : [],
        createdAt: `${values?.createdAt || ""}`.trim(),
        updatedAt: `${values?.updatedAt || ""}`.trim(),
        updatedBy: values?.updatedBy || null,
    };
}

function sanitizeOfferType(values = {}, strict = false) {
    const name = sanitizeText(values?.name, 48);
    if (strict && !name) {
        throw new Error("Informe um nome para o tipo de oferta.");
    }

    return {
        id: `${values?.id || ""}`.trim(),
        name,
        active: values?.active !== false,
        locked: !!values?.locked,
        createdAt: `${values?.createdAt || ""}`.trim(),
        updatedAt: `${values?.updatedAt || ""}`.trim(),
        updatedBy: values?.updatedBy || null,
    };
}

function sanitizeSpecialOffer(values = {}, strict = false) {
    const name = sanitizeText(values?.name, 48);
    const template = sanitizeText(values?.template, 120);

    if (strict && !name) {
        throw new Error("Informe um nome para a oferta especial.");
    }

    if (strict && !template) {
        throw new Error("Informe um template para a oferta especial.");
    }

    return {
        id: `${values?.id || ""}`.trim(),
        name,
        template,
        active: values?.active !== false,
        locked: !!values?.locked,
        variables: extractTemplateVariables(template),
        createdAt: `${values?.createdAt || ""}`.trim(),
        updatedAt: `${values?.updatedAt || ""}`.trim(),
        updatedBy: values?.updatedBy || null,
    };
}

function sanitizeBackgroundAssets(values = {}) {
    return {
        portraitBackground: sanitizeAsset(values?.portraitBackground),
        landscapeBackground: sanitizeAsset(values?.landscapeBackground),
        portraitClubLogo: sanitizeAsset(values?.portraitClubLogo),
        landscapeClubLogo: sanitizeAsset(values?.landscapeClubLogo),
        updatedAt: `${values?.updatedAt || ""}`.trim(),
        updatedBy: values?.updatedBy || null,
    };
}

function sanitizeCustomPage(values = {}, strict = false) {
    const name = sanitizeText(values?.name, 48);
    if (strict && !name) {
        throw new Error("Informe um nome para a página personalizada.");
    }

    return {
        id: `${values?.id || ""}`.trim(),
        name,
        widthCm: sanitizeNumber(values?.widthCm, 10, 2, 120),
        heightCm: sanitizeNumber(values?.heightCm, 10, 2, 120),
        priceType: pickAllowed(values?.priceType, ["avista", "depor", "clube", "ofertaespecial"], "avista"),
        orientation: pickAllowed(values?.orientation, ["portrait", "landscape"], "portrait"),
        description: sanitizeText(values?.description, 120),
        createdAt: `${values?.createdAt || ""}`.trim(),
        updatedAt: `${values?.updatedAt || ""}`.trim(),
        updatedBy: values?.updatedBy || null,
    };
}

function sanitizeAsset(value = "") {
    const safeValue = `${value || ""}`.trim();
    if (!safeValue) return "";

    if (safeValue.startsWith("data:image/")) {
        return safeValue;
    }

    if (/^https?:\/\//i.test(safeValue)) {
        return safeValue.slice(0, 5000);
    }

    return "";
}

function sanitizeText(value = "", limit = 120) {
    return `${value || ""}`
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, limit);
}

function sanitizeNumber(value, fallback, min, max) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return fallback;
    return Math.min(max, Math.max(min, Number(parsed.toFixed(2))));
}

function extractTemplateVariables(template = "") {
    const matches = template.match(/\{([a-z0-9_]+)\}/gi) || [];
    return Array.from(new Set(matches.map(item => item.replace(/[{}]/g, "").trim()).filter(Boolean)));
}

function pickAllowed(value, allowed, fallback) {
    return allowed.includes(value) ? value : fallback;
}

function ensureUniqueName(items, name, label) {
    const normalized = normalizeName(name);
    const duplicated = items.some(item => normalizeName(item.name) === normalized);

    if (duplicated) {
        throw new Error(`Já existe ${label} com este nome.`);
    }
}

function normalizeName(value = "") {
    return `${value || ""}`
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase();
}

function sortByName(a, b) {
    return `${a?.name || ""}`.localeCompare(`${b?.name || ""}`, "pt-BR");
}

function createId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function getActor(user = {}) {
    return user?.email || user?.documentId || user?.id || null;
}
