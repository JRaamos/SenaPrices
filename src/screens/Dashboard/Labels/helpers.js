import moment from "moment";
import { sanitizeBarcodeDigits } from "utils/barcode";

import { DEFAULT_LABEL_FILTERS } from "./constants";

export function sanitizeLabelFilters(values = {}) {
    return {
        search: `${values?.search || DEFAULT_LABEL_FILTERS.search}`.trim().slice(0, 80),
        section: `${values?.section || DEFAULT_LABEL_FILTERS.section}`.trim().slice(0, 40),
    };
}

export function buildLabelItemRow(item = {}, priceRecords = []) {
    const latestPriceRecord = findLatestPriceRecord(item, priceRecords);
    const sectionLabel = item.section || "Sem secao";
    const unitLabel = item.unit || "unidade";

    return {
        ...item,
        latestPriceRecord,
        canSelect: !!latestPriceRecord,
        statusLabel: latestPriceRecord ? "Precificado" : "Sem preco",
        statusTone: latestPriceRecord ? "green" : "orange",
        priceLabel: latestPriceRecord?.primaryPrice || "Sem preco atualizado",
        secondaryPrice: latestPriceRecord?.supportingPrice || "",
        offerLabel: latestPriceRecord?.offerTitle || "",
        sectionLabel,
        unitLabel,
        helper: [sectionLabel, unitLabel, item.internalCode ? `#${item.internalCode}` : ""].filter(Boolean).join(" - "),
        searchIndex: [
            item.description1,
            item.description2,
            item.description3,
            item.section,
            item.internalCode,
            item.ean13,
            latestPriceRecord?.primaryPrice,
            latestPriceRecord?.offerTitle,
        ].join(" ").toLowerCase(),
    };
}

export function filterLabelRows(rows = [], filters = DEFAULT_LABEL_FILTERS) {
    const safeFilters = sanitizeLabelFilters(filters);
    const safeSearch = safeFilters.search.toLowerCase();

    return rows.filter(item => {
        if (safeFilters.section && item.section !== safeFilters.section) {
            return false;
        }

        if (!safeSearch) {
            return true;
        }

        return item.searchIndex.includes(safeSearch);
    });
}

export function buildLabelStatus({ rows = [], visibleRows = [], selectedItems = [] }) {
    if (!rows.length) {
        return {
            tone: "orange",
            title: "Catalogo sem itens",
            description: "Cadastre ou importe itens antes de emitir etiquetas de gondola.",
        };
    }

    if (!visibleRows.length) {
        return {
            tone: "orange",
            title: "Nenhum item encontrado",
            description: "Revise a busca e os filtros de secao para recuperar itens elegiveis da operacao.",
        };
    }

    const pricedRows = visibleRows.filter(item => item.canSelect).length;

    if (!selectedItems.length) {
        return {
            tone: pricedRows ? "orange" : "orange",
            title: pricedRows ? "Selecao pronta para montar" : "Itens sem precificacao rastreavel",
            description: pricedRows
                ? `${pricedRows} item(ns) desta visao possuem preco valido para gerar etiqueta.`
                : "Atualize a precificacao dos itens desta visao para liberar a emissao de etiquetas.",
        };
    }

    const totalLabels = selectedItems.reduce((result, item) => result + item.copies, 0);

    return {
        tone: "green",
        title: "Lote de etiquetas pronto",
        description: `${selectedItems.length} item(ns) selecionado(s) geram ${totalLabels} etiqueta(s) no lote atual.`,
    };
}

export function buildLabelRecentJobRow(job = {}) {
    return {
        ...job,
        helper: `${job.totalItems} item(ns) - ${job.totalLabels} etiqueta(s)`,
        createdLabel: formatDateTime(job.createdAt),
        relativeDate: formatRelativeDate(job.createdAt),
    };
}

export function buildSelectedLabelItems(rows = [], selectedQuantities = {}) {
    return rows
        .filter(item => Number(selectedQuantities[item.id]) > 0)
        .map(item => ({
            id: item.id,
            description1: item.description1,
            description2: item.description2,
            section: item.section,
            unit: item.unit,
            internalCode: item.internalCode,
            ean13: item.ean13,
            priceLabel: item.priceLabel,
            secondaryPrice: item.secondaryPrice,
            offerLabel: item.offerLabel,
            copies: Number(selectedQuantities[item.id]) || 1,
        }));
}

export function createRestoredSelection(selectedItemIds = [], defaultCopies = 1, availableIds = []) {
    const register = {};
    const available = new Set(availableIds);

    selectedItemIds.forEach(itemId => {
        if (!available.has(itemId)) {
            return;
        }
        register[itemId] = defaultCopies;
    });

    return register;
}

export function findLatestPriceRecord(item = {}, priceRecords = []) {
    const safeEan = sanitizeBarcodeDigits(item.ean13, 13);
    const safeCode = normalizeCode(item.internalCode);
    let latestMatch = null;

    (Array.isArray(priceRecords) ? priceRecords : []).forEach(record => {
        const recordEan = sanitizeBarcodeDigits(record?.eanCode, 13);
        const recordCode = normalizeCode(record?.internalCode);
        const sameItem = (safeEan && recordEan === safeEan) || (safeCode && recordCode === safeCode);

        if (!sameItem) {
            return;
        }

        if (!latestMatch || `${record.savedAt || ""}` > `${latestMatch.savedAt || ""}`) {
            latestMatch = record;
        }
    });

    return latestMatch;
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

function normalizeCode(value) {
    return `${value || ""}`.trim().toUpperCase();
}
