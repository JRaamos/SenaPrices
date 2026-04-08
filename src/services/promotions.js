import { ReadObject, SaveObject } from "./storage";

const PROMOTION_ORDERS_KEY = "promotion-orders";
const PROMOTION_SEED_KEY = "promotion-seed";

export function readPromotionOrders() {
    return readArray(PROMOTION_ORDERS_KEY)
        .map(sanitizePromotionOrder)
        .filter(item => item.id && item.name)
        .sort((left, right) => `${right.createdAt || ""}`.localeCompare(`${left.createdAt || ""}`));
}

export function createPromotionOrder(values = {}, user) {
    const draft = sanitizePromotionOrder({
        ...values,
        id: values?.id || createId("promotion-order"),
        documentId: values?.documentId || createId("promotion-document"),
        createdAt: values?.createdAt || new Date().toISOString(),
        createdBy: values?.createdBy || user?.email || user?.documentId || user?.id || null,
    });

    assertPromotionOrder(draft);

    const nextOrders = [draft, ...readPromotionOrders()];
    SaveObject(PROMOTION_ORDERS_KEY, nextOrders);

    return draft;
}

export function deletePromotionOrder(id) {
    const nextOrders = readPromotionOrders().filter(item => item.id !== id && item.documentId !== id);
    SaveObject(PROMOTION_ORDERS_KEY, nextOrders);
    return nextOrders;
}

export function savePromotionSeed(values = {}) {
    const seed = sanitizePromotionSeed(values);
    SaveObject(PROMOTION_SEED_KEY, seed);
    return seed;
}

export function readPromotionSeed() {
    const value = ReadObject(PROMOTION_SEED_KEY);

    if (!value || typeof value !== "object") {
        return sanitizePromotionSeed();
    }

    return sanitizePromotionSeed(value);
}

export function clearPromotionSeed() {
    return SaveObject(PROMOTION_SEED_KEY, sanitizePromotionSeed());
}

export function sanitizePromotionOrder(values = {}) {
    const historyEntryIds = Array.isArray(values?.historyEntryIds)
        ? values.historyEntryIds.map(item => `${item || ""}`.trim()).filter(Boolean)
        : [];
    const assignedUserIds = Array.isArray(values?.assignedUserIds)
        ? values.assignedUserIds.map(item => `${item || ""}`.trim()).filter(Boolean)
        : [];

    return {
        id: `${values?.id || ""}`,
        documentId: `${values?.documentId || ""}`,
        name: sanitizeText(values?.name, 80),
        description: sanitizeText(values?.description, 200),
        validFrom: sanitizeDate(values?.validFrom),
        validTo: sanitizeDate(values?.validTo),
        paperSize: sanitizeText(values?.paperSize, 12),
        orientation: sanitizeText(values?.orientation, 24),
        historyEntryIds,
        assignedUserIds,
        assignedUserNames: Array.isArray(values?.assignedUserNames)
            ? values.assignedUserNames.map(item => sanitizeText(item, 80)).filter(Boolean)
            : [],
        totalCards: Number.isInteger(values?.totalCards) ? values.totalCards : historyEntryIds.length,
        entryTitles: Array.isArray(values?.entryTitles)
            ? values.entryTitles.map(item => sanitizeText(item, 120)).filter(Boolean)
            : [],
        createdAt: `${values?.createdAt || ""}`,
        createdBy: values?.createdBy || null,
    };
}

export function sanitizePromotionSeed(values = {}) {
    return {
        historyEntryIds: Array.isArray(values?.historyEntryIds)
            ? values.historyEntryIds.map(item => `${item || ""}`.trim()).filter(Boolean)
            : [],
        name: sanitizeText(values?.name, 80),
        description: sanitizeText(values?.description, 200),
        assignedUserIds: Array.isArray(values?.assignedUserIds)
            ? values.assignedUserIds.map(item => `${item || ""}`.trim()).filter(Boolean)
            : [],
    };
}

function assertPromotionOrder(order) {
    if (order.name.length < 3) {
        throw new Error("Informe um nome de promoção com pelo menos 3 caracteres.");
    }

    if (!order.validFrom || !order.validTo) {
        throw new Error("Informe o período de vigência da promoção.");
    }

    if (order.validTo < order.validFrom) {
        throw new Error("A data final da promoção não pode ser anterior ao início.");
    }

    if (!order.historyEntryIds.length) {
        throw new Error("Selecione ao menos um registro do histórico para compor a promoção.");
    }

    if (!order.assignedUserIds.length) {
        throw new Error("Selecione ao menos um usuário para receber a promoção.");
    }
}

function readArray(key) {
    const value = ReadObject(key);
    return Array.isArray(value) ? value : [];
}

function createId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function sanitizeText(value, limit) {
    return `${value || ""}`.trim().slice(0, limit);
}

function sanitizeDate(value) {
    const safeValue = `${value || ""}`.trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(safeValue) ? safeValue : "";
}
