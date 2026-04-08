import { ReadObject, SaveObject } from "./storage";
import { sanitizeBarcodeDigits, validateEan13 } from "utils/barcode";

const ITEMS_KEY = "catalog-items";
const SECTIONS_KEY = "catalog-sections";
const PRICE_SEED_KEY = "catalog-price-seed";

const DEFAULT_ITEM = {
    internalCode: "",
    ean13: "",
    description1: "",
    description2: "",
    description3: "",
    section: "",
    unit: "unidade",
};

const ALLOWED_UNITS = [
    "cada",
    "kg",
    "pacote",
    "100g",
    "saco",
    "caixa",
    "fardo",
    "litro",
    "unidade",
];

export function readCatalogItems() {
    const stored = ReadObject(ITEMS_KEY);
    const items = Array.isArray(stored) ? stored : [];

    return items
        .filter(item => item && typeof item === "object")
        .map(item => sanitizeCatalogItem(item))
        .filter(item => item.description1)
        .sort((left, right) => `${right.updatedAt || ""}`.localeCompare(`${left.updatedAt || ""}`));
}

export function readCatalogSections() {
    const stored = ReadObject(SECTIONS_KEY);
    const sections = Array.isArray(stored) ? stored : [];

    return sections
        .filter(item => item && typeof item === "object")
        .map(item => sanitizeCatalogSection(item))
        .filter(item => item.name)
        .sort((left, right) => left.name.localeCompare(right.name, "pt-BR"));
}

export function createCatalogItem(values, user) {
    const draft = sanitizeCatalogItem(values);
    const catalogItems = readCatalogItems();
    const conflicts = getCatalogIdentifierConflicts(draft, catalogItems);

    assertCatalogItemPayload(draft);
    assertCatalogConflicts(conflicts);

    const section = ensureCatalogSection(draft.section, user);
    const now = new Date().toISOString();
    const item = {
        ...draft,
        id: createId(),
        documentId: createDocumentId("catalog-item"),
        section: section?.name || draft.section,
        createdAt: now,
        updatedAt: now,
        createdBy: user?.documentId || user?.id || null,
        updatedBy: user?.documentId || user?.id || null,
    };

    SaveObject(ITEMS_KEY, [item, ...catalogItems]);

    return item;
}

export function updateCatalogItem(id, values, user) {
    const catalogItems = readCatalogItems();
    const currentItem = catalogItems.find(item => item.id === id || item.documentId === id);

    if (!currentItem) {
        throw new Error("Item nao encontrado para atualizacao.");
    }

    const draft = sanitizeCatalogItem({
        ...currentItem,
        ...(values || {}),
    });

    const conflicts = getCatalogIdentifierConflicts(draft, catalogItems, currentItem.id);

    assertCatalogItemPayload(draft);
    assertCatalogConflicts(conflicts);

    const section = ensureCatalogSection(draft.section, user);
    const nextItem = {
        ...currentItem,
        ...draft,
        section: section?.name || draft.section,
        updatedAt: new Date().toISOString(),
        updatedBy: user?.documentId || user?.id || null,
    };

    SaveObject(ITEMS_KEY, catalogItems.map(item => (
        item.id === currentItem.id ? nextItem : item
    )));

    return nextItem;
}

export function deleteCatalogItem(id) {
    const catalogItems = readCatalogItems();
    const nextItems = catalogItems.filter(item => item.id !== id && item.documentId !== id);
    SaveObject(ITEMS_KEY, nextItems);
    return nextItems;
}

export function duplicateCatalogItem(id, user) {
    const catalogItems = readCatalogItems();
    const currentItem = catalogItems.find(item => item.id === id || item.documentId === id);

    if (!currentItem) {
        throw new Error("Item nao encontrado para duplicacao.");
    }

    const copy = {
        ...currentItem,
        internalCode: currentItem.internalCode ? `${currentItem.internalCode}-COPIA` : "",
        ean13: "",
        description1: `${currentItem.description1} copia`,
    };

    return createCatalogItem(copy, user);
}

export function getCatalogIdentifierConflicts(values, items = readCatalogItems(), currentId = null) {
    const draft = sanitizeCatalogItem(values);
    const normalizedInternalCode = normalizeComparisonValue(draft.internalCode);
    const normalizedEan = draft.ean13;

    return {
        internalCodeItem: normalizedInternalCode
            ? items.find(item => item.id !== currentId && normalizeComparisonValue(item.internalCode) === normalizedInternalCode) || null
            : null,
        ean13Item: normalizedEan
            ? items.find(item => item.id !== currentId && item.ean13 === normalizedEan) || null
            : null,
    };
}

export function findCatalogItemByIdentifiers(values, items = readCatalogItems()) {
    const draft = sanitizeCatalogItem(values);
    const normalizedInternalCode = normalizeComparisonValue(draft.internalCode);
    const internalCodeItem = normalizedInternalCode
        ? items.find(item => normalizeComparisonValue(item.internalCode) === normalizedInternalCode) || null
        : null;
    const ean13Item = draft.ean13
        ? items.find(item => item.ean13 === draft.ean13) || null
        : null;

    if (internalCodeItem && ean13Item && internalCodeItem.id !== ean13Item.id) {
        return {
            item: null,
            internalCodeItem,
            ean13Item,
            isMixedMatch: true,
        };
    }

    return {
        item: internalCodeItem || ean13Item || null,
        internalCodeItem,
        ean13Item,
        isMixedMatch: false,
    };
}

export function saveCatalogPriceSeed(item) {
    return SaveObject(PRICE_SEED_KEY, sanitizeCatalogItem(item));
}

export function readCatalogPriceSeed() {
    const seed = ReadObject(PRICE_SEED_KEY);

    if (!seed || typeof seed !== "object") {
        return null;
    }

    return sanitizeCatalogItem(seed);
}

export function clearCatalogPriceSeed() {
    return SaveObject(PRICE_SEED_KEY, null);
}

export function buildPriceDraftFromCatalogItem(item) {
    const currentItem = sanitizeCatalogItem(item);
    const subtitleParts = [currentItem.description2, currentItem.description3].filter(Boolean);
    const safeUnit = ["unidade", "kg", "litro", "pacote", "caixa"].includes(currentItem.unit)
        ? currentItem.unit
        : "unidade";

    return {
        productName: currentItem.description1,
        productSubtitle: subtitleParts.join(" - "),
        sectionName: currentItem.section,
        unitLabel: safeUnit,
        internalCode: currentItem.internalCode,
        eanCode: currentItem.ean13,
    };
}

export function sanitizeCatalogItem(values = {}) {
    const next = {
        ...DEFAULT_ITEM,
        ...(values || {}),
    };

    return {
        id: `${next.id || ""}`,
        documentId: `${next.documentId || ""}`,
        internalCode: sanitizeCode(next.internalCode, 24),
        ean13: sanitizeBarcodeDigits(next.ean13, 13),
        description1: sanitizeText(next.description1, 80),
        description2: sanitizeText(next.description2, 60),
        description3: sanitizeText(next.description3, 60),
        section: sanitizeText(next.section, 40),
        unit: pickAllowed(next.unit, ALLOWED_UNITS, DEFAULT_ITEM.unit),
        createdAt: `${next.createdAt || ""}`,
        updatedAt: `${next.updatedAt || ""}`,
        createdBy: next.createdBy || null,
        updatedBy: next.updatedBy || null,
    };
}

export function sanitizeCatalogSection(values = {}) {
    return {
        id: `${values?.id || ""}`,
        documentId: `${values?.documentId || ""}`,
        name: sanitizeText(values?.name, 40),
        createdAt: `${values?.createdAt || ""}`,
        updatedAt: `${values?.updatedAt || ""}`,
        createdBy: values?.createdBy || null,
    };
}

function ensureCatalogSection(sectionName, user) {
    const safeName = sanitizeText(sectionName, 40);

    if (!safeName) {
        return null;
    }

    const sections = readCatalogSections();
    const existing = sections.find(item => normalizeComparisonValue(item.name) === normalizeComparisonValue(safeName));

    if (existing) {
        return existing;
    }

    const now = new Date().toISOString();
    const section = {
        id: createId(),
        documentId: createDocumentId("catalog-section"),
        name: safeName,
        createdAt: now,
        updatedAt: now,
        createdBy: user?.documentId || user?.id || null,
    };

    SaveObject(SECTIONS_KEY, [...sections, section]);
    return section;
}

function assertCatalogItemPayload(item) {
    if (!item.description1 || item.description1.length < 3) {
        throw new Error("Informe uma descricao principal com pelo menos 3 caracteres.");
    }

    if (!item.internalCode && !item.ean13) {
        throw new Error("Informe ao menos um identificador: codigo interno ou EAN-13.");
    }

    if (item.ean13 && !validateEan13(item.ean13)) {
        throw new Error("O EAN-13 informado e invalido.");
    }
}

function assertCatalogConflicts(conflicts) {
    if (conflicts.internalCodeItem) {
        throw new Error("Ja existe um item com este codigo interno.");
    }

    if (conflicts.ean13Item) {
        throw new Error("Ja existe um item com este EAN-13.");
    }
}

function sanitizeText(value, limit) {
    return `${value || ""}`.replace(/\s+/g, " ").trim().slice(0, limit);
}

function sanitizeCode(value, limit) {
    return `${value || ""}`
        .toUpperCase()
        .replace(/[^A-Z0-9\-_/]/g, "")
        .slice(0, limit);
}

function pickAllowed(value, allowedValues, fallback) {
    return allowedValues.includes(value) ? value : fallback;
}

function normalizeComparisonValue(value) {
    return `${value || ""}`.trim().toUpperCase();
}

function createId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function createDocumentId(prefix) {
    return `${prefix}-${createId()}`;
}
