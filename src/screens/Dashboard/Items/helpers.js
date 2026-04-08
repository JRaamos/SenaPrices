import moment from "moment";

import { DEFAULT_ITEMS_FILTERS } from "./constants";

export function sanitizeItemsFilters(values = {}) {
    const next = {
        ...DEFAULT_ITEMS_FILTERS,
        ...(values || {}),
    };

    return {
        section: `${next.section || ""}`.trim(),
        unit: `${next.unit || ""}`.trim(),
        hasEan: pickAllowed(next.hasEan, ["", "yes", "no"], ""),
        hasInternalCode: pickAllowed(next.hasInternalCode, ["", "yes", "no"], ""),
    };
}

export function filterCatalogItems(items = [], search = "", values = {}) {
    const filters = sanitizeItemsFilters(values);
    const normalizedSearch = `${search || ""}`.trim().toLowerCase();

    return (items || []).filter(item => {
        const searchableValues = [
            item?.description1,
            item?.description2,
            item?.description3,
            item?.internalCode,
            item?.ean13,
            item?.section,
            item?.unit,
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        const matchesSearch = !normalizedSearch || searchableValues.includes(normalizedSearch);
        const matchesSection = !filters.section || item?.section === filters.section;
        const matchesUnit = !filters.unit || item?.unit === filters.unit;
        const matchesEan = !filters.hasEan || (filters.hasEan === "yes" ? !!item?.ean13 : !item?.ean13);
        const matchesInternal = !filters.hasInternalCode || (filters.hasInternalCode === "yes" ? !!item?.internalCode : !item?.internalCode);

        return matchesSearch && matchesSection && matchesUnit && matchesEan && matchesInternal;
    });
}

export function countActiveFilters(values = {}) {
    const filters = sanitizeItemsFilters(values);
    return Object.values(filters).filter(Boolean).length;
}

export function formatCatalogDate(value) {
    if (!value) return "--";

    const parsed = moment(value);
    if (!parsed.isValid()) return "--";

    return parsed.format("L");
}

export function formatRelativeCatalogDate(value) {
    if (!value) return "--";

    const parsed = moment(value);
    if (!parsed.isValid()) return "--";

    return parsed.fromNow();
}

export function buildCatalogStatus({ items, filteredItems, isEditorDirty }) {
    if (!items.length) {
        return {
            tone: "orange",
            title: "Catalogo em formacao",
            description: "Ainda nao existem itens cadastrados nesta base. Comece pela fundacao do catalogo.",
        };
    }

    if (isEditorDirty) {
        return {
            tone: "orange",
            title: "Edicao pendente",
            description: "Existem alteracoes locais ainda nao persistidas para o item selecionado.",
        };
    }

    return {
        tone: "green",
        title: "Catalogo operacional",
        description: `${filteredItems.length} item(ns) disponiveis na visao atual com a mesma base usada na precificacao.`,
    };
}

function pickAllowed(value, allowedValues, fallback) {
    return allowedValues.includes(value) ? value : fallback;
}
