import { ReadObject, SaveObject } from "./storage";

const PRICE_RECORDS_KEY = "pricing-records";
const HISTORY_KEY = "pricing-history";
const HISTORY_LIMIT = 240;

export function readPriceRecords() {
    return readArray(PRICE_RECORDS_KEY)
        .map(sanitizePriceRecord)
        .filter(item => item.id && item.historyEntryId)
        .sort((left, right) => `${right.savedAt || ""}`.localeCompare(`${left.savedAt || ""}`));
}

export function readPrintHistory() {
    return readArray(HISTORY_KEY)
        .map(sanitizeHistoryEntry)
        .filter(item => item.id && item.savedAt)
        .sort((left, right) => `${right.savedAt || ""}`.localeCompare(`${left.savedAt || ""}`));
}

export function recordPricingOperation(values = {}) {
    const safeRecords = Array.isArray(values.records) ? values.records : [];

    if (!safeRecords.length) {
        throw new Error("A operacao precisa informar ao menos um cartaz valido para ser registrada.");
    }

    const savedAt = values.savedAt || new Date().toISOString();
    const historyId = createId("history");
    const nextRecords = safeRecords.map((record, index) => sanitizePriceRecord({
        ...record,
        id: record?.id || createId("record"),
        documentId: record?.documentId || createId("pricing-record"),
        historyEntryId: historyId,
        batchIndex: index + 1,
        savedAt,
        printedAt: values.printedAt || null,
        source: values.source,
        createdBy: values.createdBy || null,
    }));

    const historyEntry = sanitizeHistoryEntry({
        id: historyId,
        documentId: createId("pricing-history"),
        source: values.source,
        restoreTarget: values.restoreTarget || values.source,
        createdBy: values.createdBy || null,
        savedAt,
        printedAt: values.printedAt || null,
        priceType: values.priceType,
        paperSize: values.paperSize,
        orientation: values.orientation,
        title: values.title || nextRecords[0]?.title || "Operacao sem titulo",
        offerTitle: values.offerTitle || nextRecords[0]?.offerTitle || "",
        summaryLabel: values.summaryLabel || "",
        totalCards: nextRecords.length,
        priceRecordIds: nextRecords.map(item => item.id),
        titles: nextRecords.map(item => item.title).filter(Boolean),
        restoreDraft: cloneObject(values.restoreDraft),
    });

    const nextHistory = [historyEntry, ...readPrintHistory()];
    const nextPriceRecords = [...nextRecords, ...readPriceRecords()];
    persistPricingState(nextHistory, nextPriceRecords);

    return {
        historyEntry,
        priceRecords: nextRecords,
    };
}

export function markPrintHistoryEntryPrinted(id, printedAt = new Date().toISOString()) {
    const nextHistory = readPrintHistory().map(item => (
        item.id === id
            ? sanitizeHistoryEntry({
                ...item,
                printedAt,
            })
            : item
    ));

    const nextPriceRecords = readPriceRecords().map(item => (
        item.historyEntryId === id
            ? sanitizePriceRecord({
                ...item,
                printedAt,
            })
            : item
    ));

    persistPricingState(nextHistory, nextPriceRecords);
    return nextHistory.find(item => item.id === id) || null;
}

export function deletePrintHistoryEntry(id) {
    const nextHistory = readPrintHistory().filter(item => item.id !== id && item.documentId !== id);
    const activeIds = new Set(nextHistory.flatMap(item => item.priceRecordIds));
    const nextPriceRecords = readPriceRecords().filter(item => activeIds.has(item.id));

    persistPricingState(nextHistory, nextPriceRecords);
    return nextHistory;
}

export function sanitizePriceRecord(values = {}) {
    return {
        id: `${values?.id || ""}`,
        documentId: `${values?.documentId || ""}`,
        historyEntryId: `${values?.historyEntryId || ""}`,
        source: pickAllowed(values?.source, ["manual", "quick"], "manual"),
        createdBy: values?.createdBy || null,
        batchIndex: Number.isInteger(values?.batchIndex) ? values.batchIndex : 1,
        savedAt: `${values?.savedAt || ""}`,
        printedAt: values?.printedAt ? `${values.printedAt}` : null,
        priceType: `${values?.priceType || ""}`,
        paperSize: `${values?.paperSize || ""}`,
        orientation: `${values?.orientation || ""}`,
        title: sanitizeText(values?.title, 120),
        subtitle: sanitizeText(values?.subtitle, 180),
        offerTitle: sanitizeText(values?.offerTitle, 80),
        primaryPrice: sanitizeText(values?.primaryPrice, 40),
        supportingPrice: sanitizeText(values?.supportingPrice, 60),
        specialLabel: sanitizeText(values?.specialLabel, 80),
        barcodeLabel: sanitizeText(values?.barcodeLabel, 32),
        validityLabel: sanitizeText(values?.validityLabel, 60),
        observation: sanitizeText(values?.observation, 160),
        internalCode: sanitizeText(values?.internalCode, 40),
        eanCode: sanitizeText(values?.eanCode, 20),
        sectionName: sanitizeText(values?.sectionName, 60),
        unitLabel: sanitizeText(values?.unitLabel, 30),
    };
}

export function sanitizeHistoryEntry(values = {}) {
    const restoreDraft = cloneObject(values?.restoreDraft);
    const safeIds = Array.isArray(values?.priceRecordIds)
        ? values.priceRecordIds.map(item => `${item || ""}`).filter(Boolean)
        : [];
    const safeTitles = Array.isArray(values?.titles)
        ? values.titles.map(item => sanitizeText(item, 120)).filter(Boolean)
        : [];

    return {
        id: `${values?.id || ""}`,
        documentId: `${values?.documentId || ""}`,
        source: pickAllowed(values?.source, ["manual", "quick"], "manual"),
        restoreTarget: pickAllowed(values?.restoreTarget, ["manual", "quick"], pickAllowed(values?.source, ["manual", "quick"], "manual")),
        createdBy: values?.createdBy || null,
        savedAt: `${values?.savedAt || ""}`,
        printedAt: values?.printedAt ? `${values.printedAt}` : null,
        priceType: `${values?.priceType || ""}`,
        paperSize: `${values?.paperSize || ""}`,
        orientation: `${values?.orientation || ""}`,
        title: sanitizeText(values?.title, 120),
        offerTitle: sanitizeText(values?.offerTitle, 80),
        summaryLabel: sanitizeText(values?.summaryLabel, 120),
        totalCards: Number.isInteger(values?.totalCards) ? values.totalCards : Math.max(safeIds.length, 1),
        priceRecordIds: safeIds,
        titles: safeTitles,
        restoreDraft: restoreDraft && typeof restoreDraft === "object" ? restoreDraft : null,
    };
}

function persistPricingState(historyEntries, priceRecords) {
    const sortedHistory = (Array.isArray(historyEntries) ? historyEntries : [])
        .map(sanitizeHistoryEntry)
        .filter(item => item.id && item.savedAt)
        .sort((left, right) => `${right.savedAt || ""}`.localeCompare(`${left.savedAt || ""}`))
        .slice(0, HISTORY_LIMIT);

    const activeIds = new Set(sortedHistory.flatMap(item => item.priceRecordIds));
    const sortedPriceRecords = (Array.isArray(priceRecords) ? priceRecords : [])
        .map(sanitizePriceRecord)
        .filter(item => item.id && activeIds.has(item.id))
        .sort((left, right) => `${right.savedAt || ""}`.localeCompare(`${left.savedAt || ""}`));

    SaveObject(HISTORY_KEY, sortedHistory);
    SaveObject(PRICE_RECORDS_KEY, sortedPriceRecords);
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

function pickAllowed(value, allowedValues, fallback) {
    return allowedValues.includes(value) ? value : fallback;
}

function cloneObject(value) {
    if (!value || typeof value !== "object") {
        return null;
    }

    try {
        return JSON.parse(JSON.stringify(value));
    } catch (error) {
        return null;
    }
}
