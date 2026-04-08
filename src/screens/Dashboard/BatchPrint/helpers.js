import moment from "moment";

import { sanitizePromotionOrder } from "services/promotions";

import { BATCH_PRINT_DEFAULT_DRAFT } from "./constants";

export function sanitizeBatchPrintDraft(values = {}) {
    const next = {
        ...BATCH_PRINT_DEFAULT_DRAFT,
        ...(values || {}),
    };

    return {
        search: `${next.search || ""}`.trim().slice(0, 80),
        source: pickAllowed(next.source, ["", "history", "promotion"], ""),
        paperSize: pickAllowed(next.paperSize, ["", "A6", "A5", "A4"], ""),
        selectedKeys: Array.isArray(next.selectedKeys)
            ? next.selectedKeys.map(item => `${item || ""}`.trim()).filter(Boolean)
            : [],
    };
}

export function sanitizeRecentBatchJob(values = {}) {
    return {
        id: `${values?.id || ""}`.trim(),
        title: `${values?.title || ""}`.trim().slice(0, 120),
        sourceSummary: `${values?.sourceSummary || ""}`.trim().slice(0, 120),
        totalSelections: Number.isInteger(values?.totalSelections) ? values.totalSelections : 0,
        totalCards: Number.isInteger(values?.totalCards) ? values.totalCards : 0,
        selectedKeys: Array.isArray(values?.selectedKeys)
            ? values.selectedKeys.map(item => `${item || ""}`.trim()).filter(Boolean)
            : [],
        createdAt: `${values?.createdAt || ""}`.trim(),
    };
}

export function getCurrentUserKeys(user = {}, currentUserId = "") {
    return Array.from(new Set([
        `${user?.email || ""}`.trim().toLowerCase(),
        `${user?.documentId || ""}`.trim().toLowerCase(),
        `${user?.id || ""}`.trim().toLowerCase(),
        `${currentUserId || ""}`.trim().toLowerCase(),
    ].filter(Boolean)));
}

export function buildBatchCandidates({
    historyEntries = [],
    promotionOrders = [],
    canManage = true,
    currentUserId = "",
    currentUserKeys = [],
}) {
    const historyCandidates = historyEntries
        .filter(entry => canManage || belongsToCurrentUser(entry, currentUserKeys))
        .map(buildHistoryCandidate);

    const promotionCandidates = promotionOrders
        .map(order => buildPromotionCandidate(order, historyEntries))
        .filter(Boolean)
        .filter(candidate => !candidate.isExpired)
        .filter(candidate => canManage || candidate.assignedUserIds.includes(currentUserId));

    return [...promotionCandidates, ...historyCandidates]
        .sort((left, right) => `${right.createdAt || ""}`.localeCompare(`${left.createdAt || ""}`));
}

export function filterBatchCandidates(candidates = [], filters = BATCH_PRINT_DEFAULT_DRAFT) {
    const safeFilters = sanitizeBatchPrintDraft(filters);
    const safeSearch = safeFilters.search.toLowerCase();

    return candidates.filter(candidate => {
        if (safeFilters.source && candidate.source !== safeFilters.source) {
            return false;
        }

        if (safeFilters.paperSize && candidate.paperSize !== safeFilters.paperSize) {
            return false;
        }

        if (!safeSearch) {
            return true;
        }

        const haystack = [
            candidate.title,
            candidate.description,
            candidate.detailValue,
            candidate.periodLabel,
            candidate.sourceLabel,
            candidate.paperLabel,
            ...(candidate.entryTitles || []),
        ].join(" ").toLowerCase();

        return haystack.includes(safeSearch);
    });
}

export function buildBatchStatus({
    candidates = [],
    visibleCandidates = [],
    selectedCandidates = [],
}) {
    if (!candidates.length) {
        return {
            tone: "orange",
            title: "Nenhum cartaz disponivel",
            description: "Assim que houver histórico próprio ou promoções atribuídas, os registros aparecerão aqui para impressão em lote.",
        };
    }

    if (!visibleCandidates.length) {
        return {
            tone: "orange",
            title: "Nenhum resultado encontrado",
            description: "Revise os filtros para recuperar fontes validas da impressao em lote.",
        };
    }

    if (!selectedCandidates.length) {
        return {
            tone: "orange",
            title: "Selecao em aberto",
            description: "Escolha um ou mais registros operacionais para montar o lote de impressao.",
        };
    }

    const uniqueEntries = buildUniqueHistoryEntries(selectedCandidates);
    const totalCards = uniqueEntries.reduce((result, entry) => result + (entry.totalCards || 0), 0);

    return {
        tone: "green",
        title: "Lote pronto para impressao",
        description: `${selectedCandidates.length} selecao(oes) resultam em ${totalCards} cartaz(es) unicos para impressao.`,
    };
}

export function buildUniqueHistoryEntries(candidates = []) {
    const register = new Map();

    candidates.forEach(candidate => {
        (candidate.historyEntries || []).forEach(entry => {
            if (!entry?.id || register.has(entry.id)) {
                return;
            }

            register.set(entry.id, entry);
        });
    });

    return Array.from(register.values());
}

export function buildBatchSourceSummary(candidates = []) {
    const historyCount = candidates.filter(item => item.source === "history").length;
    const promotionCount = candidates.filter(item => item.source === "promotion").length;

    return [
        historyCount ? `${historyCount} histórico` : "",
        promotionCount ? `${promotionCount} promoção(ões)` : "",
    ].filter(Boolean).join(" - ") || "Selecao manual";
}

export function buildRecentBatchJobRow(job = {}) {
    const safeJob = sanitizeRecentBatchJob(job);

    return {
        ...safeJob,
        helper: `${safeJob.totalSelections} selecao(oes) - ${safeJob.totalCards} cartaz(es)`,
        relativeDate: formatRelativeDate(safeJob.createdAt),
        createdLabel: formatDateTime(safeJob.createdAt),
    };
}

export function formatDateTime(value) {
    if (!value) return "--";

    const parsed = moment(value);
    if (!parsed.isValid()) return "--";

    return parsed.format("DD/MM/YYYY [as] HH:mm");
}

export function formatRelativeDate(value) {
    if (!value) return "--";

    const parsed = moment(value);
    if (!parsed.isValid()) return "--";

    return parsed.fromNow();
}

function buildHistoryCandidate(entry = {}) {
    return {
        key: `history:${entry.id}`,
        id: entry.id,
        source: "history",
        sourceLabel: "Histórico",
        title: entry.title || "Registro sem titulo",
        description: entry.summaryLabel || entry.offerTitle || "Registro salvo no histórico operacional.",
        detailLabel: "Criado por",
        detailValue: entry.createdBy || "--",
        periodLabel: entry.printedAt
            ? `Impresso ${formatDateTime(entry.printedAt)}`
            : `Salvo ${formatDateTime(entry.savedAt)}`,
        statusLabel: entry.printedAt ? "Impresso" : "Salvo",
        statusTone: entry.printedAt ? "green" : "neutral",
        cardsLabel: `${entry.totalCards || 0} cartaz(es)`,
        paperSize: `${entry.paperSize || ""}`.trim(),
        paperLabel: [entry.paperSize, getOrientationLabel(entry.orientation)].filter(Boolean).join(" "),
        entryTitles: Array.isArray(entry.titles) ? entry.titles : [],
        createdAt: entry.savedAt || "",
        historyEntries: entry?.id ? [entry] : [],
        totalCards: entry.totalCards || 0,
    };
}

function buildPromotionCandidate(order, historyEntries = []) {
    const safeOrder = sanitizePromotionOrder(order);
    const relatedEntries = (safeOrder.historyEntryIds || [])
        .map(id => historyEntries.find(entry => entry.id === id))
        .filter(Boolean);

    if (!safeOrder.id || !relatedEntries.length) {
        return null;
    }

    const today = new Date().toISOString().slice(0, 10);
    const isExpired = !!safeOrder.validTo && safeOrder.validTo < today;
    const isUpcoming = !!safeOrder.validFrom && safeOrder.validFrom > today;
    const totalCards = relatedEntries.reduce((result, entry) => result + (entry.totalCards || 0), 0);

    return {
        key: `promotion:${safeOrder.id}`,
        id: safeOrder.id,
        source: "promotion",
        sourceLabel: "Promocao",
        title: safeOrder.name || "Promocao sem titulo",
        description: safeOrder.description || "Campanha programada para impressao operacional.",
        detailLabel: "Destinatarios",
        detailValue: safeOrder.assignedUserNames.join(", ") || `${safeOrder.assignedUserIds.length} usuário(s)`,
        periodLabel: [formatDate(safeOrder.validFrom), formatDate(safeOrder.validTo)].filter(Boolean).join(" ate "),
        statusLabel: isUpcoming ? "Programada" : "Ativa",
        statusTone: isUpcoming ? "blue" : "green",
        cardsLabel: `${totalCards} cartaz(es)`,
        paperSize: safeOrder.paperSize,
        paperLabel: [safeOrder.paperSize, getOrientationLabel(safeOrder.orientation)].filter(Boolean).join(" "),
        entryTitles: safeOrder.entryTitles,
        createdAt: safeOrder.createdAt || "",
        historyEntries: relatedEntries,
        totalCards,
        assignedUserIds: safeOrder.assignedUserIds,
        assignedUserNames: safeOrder.assignedUserNames,
        isExpired,
    };
}

function belongsToCurrentUser(entry = {}, currentUserKeys = []) {
    const createdBy = `${entry?.createdBy || ""}`.trim().toLowerCase();

    if (!createdBy) {
        return false;
    }

    return currentUserKeys.includes(createdBy);
}

function formatDate(value) {
    if (!value) return "--";

    const parsed = moment(value, "YYYY-MM-DD", true);
    if (!parsed.isValid()) return "--";

    return parsed.format("DD/MM/YYYY");
}

function getOrientationLabel(value) {
    if (value === "portrait") return "Retrato";
    if (value === "landscape") return "Paisagem";
    return "";
}

function pickAllowed(value, allowedValues, fallback) {
    return allowedValues.includes(value) ? value : fallback;
}
