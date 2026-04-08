import moment from "moment";

import {
    getCatalogIdentifierConflicts,
    sanitizeCatalogItem,
} from "services/catalog";
import { validateEan13 } from "utils/barcode";

import {
    ITEM_DEFAULT_FORM_VALUES,
    ITEM_GUIDELINES,
    ITEM_LIMITS,
    ITEM_UNIT_OPTIONS,
} from "./constants";

export function sanitizeItemDraft(values = {}) {
    const next = sanitizeCatalogItem({
        ...ITEM_DEFAULT_FORM_VALUES,
        ...(values || {}),
    });

    return {
        internalCode: next.internalCode.slice(0, ITEM_LIMITS.internalCode),
        ean13: next.ean13.slice(0, ITEM_LIMITS.ean13),
        description1: next.description1.slice(0, ITEM_LIMITS.description1),
        description2: next.description2.slice(0, ITEM_LIMITS.description2),
        description3: next.description3.slice(0, ITEM_LIMITS.description3),
        section: next.section.slice(0, ITEM_LIMITS.section),
        unit: ITEM_UNIT_OPTIONS.find(item => item.value === next.unit)?.value || ITEM_DEFAULT_FORM_VALUES.unit,
    };
}

export function validateItemDraft(values, existingItems = []) {
    const draft = sanitizeItemDraft(values);
    const errors = {};
    const warnings = [];

    if (!draft.internalCode && !draft.ean13) {
        errors.identifier = "Informe ao menos um codigo interno ou EAN-13.";
    }

    if (draft.description1.length < 3) {
        errors.description1 = "Informe uma descricao principal com pelo menos 3 caracteres.";
    }

    if (draft.ean13 && !validateEan13(draft.ean13)) {
        errors.ean13 = "Use um EAN-13 valido com digito verificador correto.";
    }

    const conflicts = getCatalogIdentifierConflicts(draft, existingItems);

    if (conflicts.internalCodeItem) {
        errors.internalCode = "Este codigo interno ja esta em uso no catalogo.";
    }

    if (conflicts.ean13Item) {
        errors.ean13 = "Este EAN-13 ja esta cadastrado no catalogo.";
    }

    if (!draft.section) {
        warnings.push("Definir a secao desde agora facilita filtros, importacao e organizacao futura do catalogo.");
    }

    if (!draft.description2) {
        warnings.push("A descricao complementar pode ajudar a diferenciar variacoes do mesmo item na operacao.");
    }

    if (!draft.description3) {
        warnings.push("A terceira linha pode ser usada depois para unidade, sabor ou observacao curta.");
    }

    const errorList = Object.values(errors);

    return {
        errors,
        errorList,
        warnings,
        isValid: errorList.length === 0,
    };
}

export function buildItemPreview(values) {
    const draft = sanitizeItemDraft(values);
    const unitLabel = ITEM_UNIT_OPTIONS.find(item => item.value === draft.unit)?.label || "Unidade";
    const subtitleParts = [draft.description2, draft.description3].filter(Boolean);
    const identifierLine = [draft.ean13 ? `EAN ${draft.ean13}` : null, draft.internalCode || null]
        .filter(Boolean)
        .join(" - ");

    return {
        title: draft.description1 || "Item sem descricao",
        subtitle: subtitleParts.join(" - "),
        section: draft.section || "Sem secao definida",
        unit: unitLabel,
        identifierLine: identifierLine || "Sem codigo definido",
    };
}

export function formatLastSaved(value) {
    if (!value) return "Ainda nao salvo";

    const parsed = moment(value);
    if (!parsed.isValid()) return "Ainda nao salvo";

    return `${parsed.format("HH:mm")} - ${parsed.fromNow()}`;
}

export function formatRecentDate(value) {
    if (!value) return "--";

    const parsed = moment(value);
    if (!parsed.isValid()) return "--";

    return parsed.fromNow();
}

export function buildRecentItemHelper(item) {
    const safeItem = sanitizeCatalogItem(item);
    const codeLabel = safeItem.ean13 || safeItem.internalCode || "Sem codigo";
    return [codeLabel, safeItem.section || "Sem secao"].join(" - ");
}

export { ITEM_GUIDELINES };
