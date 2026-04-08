import moment from "moment";

import { sanitizePromotionOrder, sanitizePromotionSeed } from "services/promotions";

import {
    PROMOTION_DEFAULT_FORM_VALUES,
    PROMOTION_ORIENTATION_OPTIONS,
    PROMOTION_PAPER_SIZE_OPTIONS,
} from "./constants";

export function sanitizePromotionDraft(values = {}) {
    const next = {
        ...PROMOTION_DEFAULT_FORM_VALUES,
        ...(values || {}),
    };

    return {
        name: sanitizeText(next.name, 80),
        description: sanitizeText(next.description, 200),
        validFrom: sanitizeDate(next.validFrom) || PROMOTION_DEFAULT_FORM_VALUES.validFrom,
        validTo: sanitizeDate(next.validTo),
        paperSize: pickAllowed(next.paperSize, PROMOTION_PAPER_SIZE_OPTIONS.map(item => item.value), PROMOTION_DEFAULT_FORM_VALUES.paperSize),
        orientation: pickAllowed(next.orientation, PROMOTION_ORIENTATION_OPTIONS.map(item => item.value), PROMOTION_DEFAULT_FORM_VALUES.orientation),
        selectedEntryIds: Array.isArray(next.selectedEntryIds)
            ? next.selectedEntryIds.map(item => `${item || ""}`.trim()).filter(Boolean)
            : [],
    };
}

export function validatePromotionDraft(values, historyEntries = []) {
    const draft = sanitizePromotionDraft(values);
    const errors = {};

    if (draft.name.length < 3) {
        errors.name = "Informe um nome para a promocao com pelo menos 3 caracteres.";
    }

    if (!draft.validTo) {
        errors.validTo = "Informe a data final da promocao.";
    }

    if (draft.validFrom && draft.validTo && draft.validTo < draft.validFrom) {
        errors.validTo = "A data final nao pode ser anterior ao inicio da promocao.";
    }

    if (!draft.selectedEntryIds.length) {
        errors.selectedEntryIds = "Selecione ao menos um registro do historico.";
    }

    const missingEntries = draft.selectedEntryIds.filter(id => !historyEntries.find(item => item.id === id));
    if (missingEntries.length) {
        errors.selectedEntryIds = "Um ou mais registros selecionados nao estao mais disponiveis no historico.";
    }

    const warnings = [];
    if (!draft.description) {
        warnings.push("Adicionar uma descricao curta ajuda a equipe a identificar a promocao com mais rapidez.");
    }

    const errorList = Object.values(errors);

    return {
        draft,
        errors,
        errorList,
        warnings,
        isValid: errorList.length === 0,
    };
}

export function filterPromotionSources(entries = [], search = "", source = "") {
    const safeSearch = `${search || ""}`.trim().toLowerCase();
    const safeSource = `${source || ""}`.trim();

    return entries.filter(entry => {
        if (safeSource && entry.source !== safeSource) {
            return false;
        }

        if (!safeSearch) {
            return true;
        }

        const haystack = [
            entry.title,
            entry.offerTitle,
            entry.summaryLabel,
            ...(entry.titles || []),
        ].join(" ").toLowerCase();

        return haystack.includes(safeSearch);
    });
}

export function resolvePromotionEntries(ids = [], historyEntries = []) {
    return ids
        .map(id => historyEntries.find(item => item.id === id))
        .filter(Boolean);
}

export function buildPromotionSeedDraft(currentDraft, seed, historyEntries = []) {
    const safeSeed = sanitizePromotionSeed(seed);
    const safeDraft = sanitizePromotionDraft(currentDraft);
    const selectedEntries = resolvePromotionEntries(safeSeed.historyEntryIds, historyEntries);

    if (!selectedEntries.length) {
        return safeDraft;
    }

    const firstEntry = selectedEntries[0];
    const totalCards = selectedEntries.reduce((result, item) => result + (item.totalCards || 0), 0);
    const nextName = safeSeed.name
        || safeDraft.name
        || (selectedEntries.length === 1
            ? `Promocao ${firstEntry.title}`
            : `Promocao com ${totalCards} cartaz(es)`);

    return sanitizePromotionDraft({
        ...safeDraft,
        name: nextName,
        description: safeSeed.description || safeDraft.description,
        paperSize: firstEntry.paperSize || safeDraft.paperSize,
        orientation: firstEntry.orientation || safeDraft.orientation,
        selectedEntryIds: Array.from(new Set([
            ...safeDraft.selectedEntryIds,
            ...safeSeed.historyEntryIds,
        ])),
    });
}

export function buildPromotionStatus({ orders = [], activeOrders = [], validation }) {
    if (!orders.length && !validation?.draft?.selectedEntryIds?.length) {
        return {
            tone: "orange",
            title: "Fila de promocoes vazia",
            description: "Selecione registros do historico para começar a organizar campanhas e impressao futura.",
        };
    }

    if (validation && !validation.isValid && validation.draft.selectedEntryIds.length) {
        return {
            tone: "orange",
            title: "Promocao em revisao",
            description: validation.errorList[0] || "Revise os dados da promocao antes de enviar para a fila.",
        };
    }

    return {
        tone: "green",
        title: "Fila promocional ativa",
        description: `${activeOrders.length} promocao(oes) ativa(s) atualmente na base.`,
    };
}

export function decoratePromotionSourceEntry(entry = {}, selectedEntryIds = []) {
    const selected = selectedEntryIds.includes(entry.id);

    return {
        ...entry,
        isSelected: selected,
        sourceLabel: getSourceLabel(entry.source),
        cardsLabel: `${entry.totalCards || 0} cartaz(es)`,
        savedLabel: formatRelativeDate(entry.savedAt),
        paperLabel: [entry.paperSize, getOrientationLabel(entry.orientation)].filter(Boolean).join(" "),
    };
}

export function decoratePromotionOrder(order, historyEntries = []) {
    const safeOrder = sanitizePromotionOrder(order);
    const relatedEntries = resolvePromotionEntries(safeOrder.historyEntryIds, historyEntries);
    const today = new Date().toISOString().slice(0, 10);
    const isExpired = !!safeOrder.validTo && safeOrder.validTo < today;

    return {
        ...safeOrder,
        isExpired,
        statusLabel: isExpired ? "Encerrada" : "Ativa",
        cardsLabel: `${relatedEntries.reduce((result, item) => result + (item.totalCards || 0), 0) || safeOrder.totalCards} cartaz(es)`,
        sourceLabel: relatedEntries.length === 1
            ? getSourceLabel(relatedEntries[0].source)
            : `${relatedEntries.length} origens`,
        periodLabel: [formatDate(safeOrder.validFrom), formatDate(safeOrder.validTo)].filter(Boolean).join(" ate "),
        paperLabel: [safeOrder.paperSize, getOrientationLabel(safeOrder.orientation)].filter(Boolean).join(" "),
        relatedEntries,
    };
}

export function formatDate(value) {
    if (!value) return "--";

    const parsed = moment(value, "YYYY-MM-DD", true);
    if (!parsed.isValid()) return "--";

    return parsed.format("DD/MM/YYYY");
}

export function formatRelativeDate(value) {
    if (!value) return "--";

    const parsed = moment(value);
    if (!parsed.isValid()) return "--";

    return parsed.fromNow();
}

function getSourceLabel(source) {
    if (source === "quick") {
        return "Criacao Rapida";
    }

    return "Criar Preco";
}

function getOrientationLabel(value) {
    if (value === "portrait") return "Retrato";
    if (value === "landscape") return "Paisagem";
    return "";
}

function sanitizeText(value, limit) {
    return `${value || ""}`.trim().slice(0, limit);
}

function sanitizeDate(value) {
    const safeValue = `${value || ""}`.trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(safeValue) ? safeValue : "";
}

function pickAllowed(value, allowedValues, fallback) {
    return allowedValues.includes(value) ? value : fallback;
}
