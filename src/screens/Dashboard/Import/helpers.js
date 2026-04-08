import * as XLSX from "xlsx";

import { downloadCSV } from "utils/downloads";
import {
    findCatalogItemByIdentifiers,
    sanitizeCatalogItem,
} from "services/catalog";
import {
    sanitizeItemDraft,
    validateItemDraft,
} from "../CreateItem/helpers";

import {
    IMPORT_CONFLICT_OPTIONS,
    IMPORT_PREVIEW_LIMIT,
    IMPORT_TARGET_FIELDS,
    IMPORT_TEMPLATE_COLUMNS,
    IMPORT_TEMPLATE_ROWS,
} from "./constants";

const IMPORT_FIELD_ALIASES = {
    internalCode: ["codigointerno", "codigo", "code", "sku", "codinterno"],
    ean13: ["ean13", "ean", "codigodebarras", "barcode"],
    description1: ["descricao1", "descricao", "descricaoprincipal", "produto", "productname", "description1"],
    description2: ["descricao2", "descricaocomplementar", "description2", "subtitle"],
    description3: ["descricao3", "descricaoadicional", "description3", "complemento"],
    section: ["secao", "section", "departamento", "categoria"],
    unit: ["unidade", "unit", "uom"],
};

export async function parseImportFile(file) {
    const fileName = `${file?.name || ""}`.trim();
    const extension = fileName.split(".").pop()?.toLowerCase() || "";
    const isSpreadsheet = extension === "xlsx" || extension === "xls";

    const matrix = isSpreadsheet
        ? await readSpreadsheetMatrix(file)
        : readDelimitedMatrix(await file.text());

    return buildDatasetFromMatrix(matrix, fileName, extension);
}

export function buildInitialMapping(columns = []) {
    return IMPORT_TARGET_FIELDS.reduce((result, field) => {
        const column = columns.find(item => (
            IMPORT_FIELD_ALIASES[field.key]?.includes(normalizeImportHeader(item.label))
            || IMPORT_FIELD_ALIASES[field.key]?.includes(normalizeImportHeader(item.key))
        ));

        return {
            ...result,
            [field.key]: column?.key || "",
        };
    }, {});
}

export function sanitizeMapping(values = {}) {
    return IMPORT_TARGET_FIELDS.reduce((result, field) => ({
        ...result,
        [field.key]: `${values?.[field.key] || ""}`.trim(),
    }), {});
}

export function buildImportPlan({ dataset, mapping, conflictMode, existingItems }) {
    const safeMapping = sanitizeMapping(mapping);
    const mode = pickAllowed(conflictMode, IMPORT_CONFLICT_OPTIONS.map(item => item.value), "skip");
    let workingItems = (existingItems || []).map(item => sanitizeCatalogItem(item));

    const rows = (dataset?.rows || []).map((row) => {
        const mappedValues = mapImportRow(row, safeMapping);
        const match = findCatalogItemByIdentifiers(mappedValues, workingItems);
        const isPreviewMatch = `${match.item?.id || ""}`.startsWith("preview-")
            || `${match.item?.documentId || ""}`.startsWith("preview-");
        const validation = match.isMixedMatch
            ? { errorList: ["Codigo interno e EAN apontam para itens diferentes na base atual."], warnings: [] }
            : validateItemDraft(mappedValues, workingItems, match.item?.id || null);

        const warnings = [...(validation.warnings || [])];
        const rawUnitValue = readMappedValue(row, safeMapping.unit);

        if (rawUnitValue && mappedValues.unit === "unidade" && normalizeImportHeader(rawUnitValue) !== "unidade") {
            warnings.push("Unidade nao reconhecida foi normalizada para 'Unidade'.");
        }

        let action = "create";
        let message = "Linha pronta para inclusao na base.";

        if (isPreviewMatch) {
            action = "invalid";
            message = "Esta linha duplica identificadores de outra linha do mesmo arquivo.";
        } else if (validation.errorList.length) {
            action = "invalid";
            message = validation.errorList[0];
        } else if (match.item) {
            if (mode === "update") {
                action = "update";
                message = "Linha atualizara um item existente.";
            } else {
                action = "skip";
                message = "Linha ignorada por conflito com item ja existente.";
            }
        }

        const planRow = {
            id: row.id,
            lineNumber: row.lineNumber,
            values: mappedValues,
            action,
            message,
            warnings,
            matchedItem: match.item || null,
        };

        if (action === "create") {
            workingItems = [
                {
                    ...sanitizeCatalogItem(mappedValues),
                    id: `preview-${row.id}`,
                    documentId: `preview-${row.id}`,
                },
                ...workingItems,
            ];
        }

        if (action === "update" && match.item) {
            workingItems = workingItems.map(item => (
                item.id === match.item.id
                    ? {
                        ...item,
                        ...sanitizeCatalogItem(mappedValues),
                    }
                    : item
            ));
        }

        return planRow;
    });

    const summary = rows.reduce((result, row) => ({
        ...result,
        [row.action]: (result[row.action] || 0) + 1,
    }), {
        create: 0,
        update: 0,
        skip: 0,
        invalid: 0,
    });

    return {
        rows,
        summary,
        previewRows: rows.slice(0, IMPORT_PREVIEW_LIMIT),
        canImport: summary.create + summary.update > 0,
    };
}

export function downloadImportTemplate(format = "csv") {
    if (format === "xlsx") {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet([IMPORT_TEMPLATE_COLUMNS, ...IMPORT_TEMPLATE_ROWS]);
        worksheet["!cols"] = IMPORT_TEMPLATE_COLUMNS.map(() => ({ wch: 22 }));
        XLSX.utils.book_append_sheet(workbook, worksheet, "Itens");
        XLSX.writeFile(workbook, "modelo_itens_senaprices.xlsx");
        return;
    }

    downloadCSV(
        IMPORT_TEMPLATE_COLUMNS.map(title => ({ title, ref: title })),
        IMPORT_TEMPLATE_ROWS.map(row => (
            IMPORT_TEMPLATE_COLUMNS.reduce((result, column, index) => ({
                ...result,
                [column]: row[index],
            }), {})
        )),
        "modelo_itens_senaprices.csv",
    );
}

export function getImportActionMeta(action) {
    switch (action) {
    case "create":
        return {
            label: "Criar",
            tone: "blue",
        };
    case "update":
        return {
            label: "Atualizar",
            tone: "green",
        };
    case "skip":
        return {
            label: "Ignorar",
            tone: "neutral",
        };
    default:
        return {
            label: "Invalida",
            tone: "danger",
        };
    }
}

function mapImportRow(row, mapping) {
    return sanitizeItemDraft({
        internalCode: readMappedValue(row, mapping.internalCode),
        ean13: readMappedValue(row, mapping.ean13),
        description1: readMappedValue(row, mapping.description1),
        description2: readMappedValue(row, mapping.description2),
        description3: readMappedValue(row, mapping.description3),
        section: readMappedValue(row, mapping.section),
        unit: readMappedValue(row, mapping.unit),
    });
}

function readMappedValue(row, columnKey) {
    if (!columnKey) return "";
    return `${row?.values?.[columnKey] || ""}`;
}

async function readSpreadsheetMatrix(file) {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    return XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        raw: false,
        defval: "",
        blankrows: false,
    });
}

function readDelimitedMatrix(text) {
    const safeText = `${text || ""}`.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    const lines = safeText.split("\n").filter(line => line.trim().length > 0);

    if (!lines.length) {
        return [];
    }

    const delimiter = detectDelimiter(lines[0]);

    return lines.map(line => parseDelimitedLine(line, delimiter));
}

function detectDelimiter(headerLine) {
    const candidates = [",", ";", "\t"];
    const counts = candidates.map(delimiter => ({
        delimiter,
        count: `${headerLine || ""}`.split(delimiter).length,
    }));

    return counts.sort((left, right) => right.count - left.count)[0]?.delimiter || ",";
}

function parseDelimitedLine(line, delimiter) {
    const values = [];
    let current = "";
    let quoted = false;

    for (let index = 0; index < line.length; index += 1) {
        const character = line[index];
        const nextCharacter = line[index + 1];

        if (character === "\"") {
            if (quoted && nextCharacter === "\"") {
                current += "\"";
                index += 1;
            } else {
                quoted = !quoted;
            }
            continue;
        }

        if (character === delimiter && !quoted) {
            values.push(current);
            current = "";
            continue;
        }

        current += character;
    }

    values.push(current);
    return values.map(value => `${value || ""}`.trim());
}

function buildDatasetFromMatrix(matrix, fileName, extension) {
    if (!Array.isArray(matrix) || matrix.length < 2) {
        throw new Error("O arquivo precisa ter cabecalho e pelo menos uma linha de dados.");
    }

    const [headerRow, ...bodyRows] = matrix;
    const seen = {};
    const columns = headerRow.map((value, index) => {
        const label = `${value || ""}`.trim() || `Coluna ${index + 1}`;
        const normalizedKey = normalizeImportHeader(label) || `coluna_${index + 1}`;
        const suffix = seen[normalizedKey] ? `_${seen[normalizedKey] + 1}` : "";
        seen[normalizedKey] = (seen[normalizedKey] || 0) + 1;

        return {
            key: `${normalizedKey}${suffix}`,
            label,
        };
    });

    const rows = bodyRows
        .filter(currentRow => currentRow.some(cell => `${cell || ""}`.trim() !== ""))
        .map((currentRow, index) => ({
            id: `${index + 1}`,
            lineNumber: index + 2,
            values: columns.reduce((result, column, columnIndex) => ({
                ...result,
                [column.key]: `${currentRow?.[columnIndex] || ""}`.trim(),
            }), {}),
        }));

    if (!rows.length) {
        throw new Error("O arquivo nao possui linhas de dados validas.");
    }

    return {
        fileName,
        extension,
        columns,
        rows,
    };
}

function normalizeImportHeader(value) {
    return `${value || ""}`
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "");
}

function pickAllowed(value, allowedValues, fallback) {
    return allowedValues.includes(value) ? value : fallback;
}
