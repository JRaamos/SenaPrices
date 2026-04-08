import moment from "moment";
import { buildHistoryEntryPrintMarkup } from "services/pricingMarkup";

import { DEFAULT_HISTORY_FILTERS } from "./constants";

export function sanitizeHistoryFilters(values = {}) {
    return {
        source: `${values?.source || DEFAULT_HISTORY_FILTERS.source}`.trim(),
        status: `${values?.status || DEFAULT_HISTORY_FILTERS.status}`.trim(),
    };
}

export function filterHistoryEntries(entries = [], search = "", filters = DEFAULT_HISTORY_FILTERS) {
    const safeSearch = `${search || ""}`.trim().toLowerCase();
    const safeFilters = sanitizeHistoryFilters(filters);

    return entries.filter(entry => {
        if (safeFilters.source && entry.source !== safeFilters.source) {
            return false;
        }

        if (safeFilters.status === "printed" && !entry.printedAt) {
            return false;
        }

        if (safeFilters.status === "saved" && entry.printedAt) {
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
            entry.createdBy,
        ].join(" ").toLowerCase();

        return haystack.includes(safeSearch);
    });
}

export function buildHistoryStatus({ entries = [], filteredEntries = [] }) {
    if (!entries.length) {
        return {
            tone: "orange",
            title: "Sem registros ainda",
            description: "Assim que um cartaz for salvo ou impresso nos modulos de precificacao, ele aparecera aqui automaticamente.",
        };
    }

    if (!filteredEntries.length) {
        return {
            tone: "orange",
            title: "Nenhum resultado encontrado",
            description: "Revise os filtros aplicados para recuperar os registros do historico operacional.",
        };
    }

    const pendingPrint = filteredEntries.filter(entry => !entry.printedAt).length;

    if (pendingPrint) {
        return {
            tone: "orange",
            title: "Historico com registros pendentes",
            description: `${pendingPrint} registro(s) desta visao ainda nao possuem impressao confirmada.`,
        };
    }

    return {
        tone: "green",
        title: "Historico consistente",
        description: "Todos os registros visiveis ja possuem rastreabilidade operacional completa.",
    };
}

export function buildHistoryPrintMarkup(entry) {
    return buildHistoryEntryPrintMarkup(entry);
}

export function buildHistoryRow(entry) {
    return {
        ...entry,
        sourceLabel: getSourceLabel(entry.source),
        statusLabel: entry.printedAt ? "Impresso" : "Salvo",
        savedLabel: formatDateTime(entry.savedAt),
        printedLabel: entry.printedAt ? formatDateTime(entry.printedAt) : "Ainda nao impresso",
        relativeSavedAt: formatRelativeDate(entry.savedAt),
        relativePrintedAt: entry.printedAt ? formatRelativeDate(entry.printedAt) : "Pendente",
        cardsLabel: `${entry.totalCards} cartaz(es)`,
        titlesPreview: (entry.titles || []).slice(0, 3).join(" - "),
        paperLabel: [entry.paperSize, getOrientationLabel(entry.orientation)].filter(Boolean).join(" "),
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
