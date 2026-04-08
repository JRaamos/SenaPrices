import moment from "moment";

import { formatCurrency, parseCurrencyValue } from "../CreatePrice/helpers";
import {
    ORIENTATION_OPTIONS,
    PAPER_SIZE_OPTIONS,
    PRICE_TYPE_OPTIONS,
    QUICK_PRICE_DEFAULT_DRAFT,
    QUICK_PRICE_DEFAULT_ROW,
    QUICK_PRICE_LIMITS,
} from "./constants";

export { formatCurrency, parseCurrencyValue };

export function createQuickRow() {
    return {
        ...QUICK_PRICE_DEFAULT_ROW,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    };
}

export function sanitizeQuickDraft(values = {}) {
    const next = {
        ...QUICK_PRICE_DEFAULT_DRAFT,
        ...(values || {}),
    };

    return {
        priceType: pickAllowed(next.priceType, PRICE_TYPE_OPTIONS.map(item => item.value), QUICK_PRICE_DEFAULT_DRAFT.priceType),
        paperSize: pickAllowed(next.paperSize, PAPER_SIZE_OPTIONS.map(item => item.value), QUICK_PRICE_DEFAULT_DRAFT.paperSize),
        orientation: pickAllowed(next.orientation, ORIENTATION_OPTIONS.map(item => item.value), QUICK_PRICE_DEFAULT_DRAFT.orientation),
        offerTitle: sanitizeText(next.offerTitle, QUICK_PRICE_LIMITS.offerTitle),
        validUntil: sanitizeDate(next.validUntil),
        observation: sanitizeText(next.observation, QUICK_PRICE_LIMITS.observation),
        showBarcode: !!next.showBarcode,
        showValidity: !!next.showValidity,
        rows: sanitizeQuickRows(next.rows),
    };
}

export function sanitizeQuickRows(rows = []) {
    const safeRows = Array.isArray(rows) ? rows : [];

    if (!safeRows.length) {
        return [createQuickRow()];
    }

    return safeRows.slice(0, QUICK_PRICE_LIMITS.rowsMax).map(item => ({
        ...QUICK_PRICE_DEFAULT_ROW,
        id: item?.id || createQuickRow().id,
        query: sanitizeText(item?.query, QUICK_PRICE_LIMITS.query),
        subtitle: sanitizeText(item?.subtitle, QUICK_PRICE_LIMITS.subtitle),
        cashPrice: sanitizeCurrency(item?.cashPrice),
        fromPrice: sanitizeCurrency(item?.fromPrice),
        toPrice: sanitizeCurrency(item?.toPrice),
        clubRegularPrice: sanitizeCurrency(item?.clubRegularPrice),
        clubPrice: sanitizeCurrency(item?.clubPrice),
        specialQuantity: sanitizeQuantity(item?.specialQuantity),
        specialPrice: sanitizeCurrency(item?.specialPrice),
    }));
}

export function validateQuickDraft(values) {
    const draft = sanitizeQuickDraft(values);
    const rowErrors = {};

    draft.rows.forEach(row => {
        const errors = [];

        if (row.query.length < 3) {
            errors.push("Informe produto ou EAN com pelo menos 3 caracteres.");
        }

        if (isDigitsOnly(row.query) && row.query.length !== 13) {
            errors.push("Quando usar apenas numeros, informe um EAN com 13 digitos.");
        }

        if (draft.priceType === "avista") {
            if (parseCurrencyValue(row.cashPrice) === null) {
                errors.push("Informe um preco a vista valido.");
            }
        }

        if (draft.priceType === "depor") {
            const fromPrice = parseCurrencyValue(row.fromPrice);
            const toPrice = parseCurrencyValue(row.toPrice);

            if (fromPrice === null) {
                errors.push("Informe o preco original da linha.");
            }

            if (toPrice === null) {
                errors.push("Informe o preco promocional da linha.");
            }

            if (fromPrice !== null && toPrice !== null && toPrice >= fromPrice) {
                errors.push("O preco promocional deve ser menor que o preco original.");
            }
        }

        if (draft.priceType === "clube") {
            const clubPrice = parseCurrencyValue(row.clubPrice);
            const regularPrice = parseCurrencyValue(row.clubRegularPrice);

            if (clubPrice === null) {
                errors.push("Informe o valor do clube.");
            }

            if (regularPrice !== null && clubPrice !== null && clubPrice >= regularPrice) {
                errors.push("O valor normal deve ser maior que o valor do clube.");
            }
        }

        if (draft.priceType === "ofertaespecial") {
            const specialPrice = parseCurrencyValue(row.specialPrice);
            const quantity = parseInt(row.specialQuantity, 10);

            if (!Number.isInteger(quantity) || quantity < 2) {
                errors.push("Use quantidade minima de 2 unidades.");
            }

            if (specialPrice === null) {
                errors.push("Informe o valor da oferta especial.");
            }
        }

        if (errors.length) {
            rowErrors[row.id] = errors;
        }
    });

    const validMoment = draft.validUntil ? moment(draft.validUntil, "YYYY-MM-DD", true) : null;
    const draftErrors = [];

    if (draft.validUntil) {
        if (!validMoment?.isValid()) {
            draftErrors.push("Informe uma data de validade valida.");
        } else if (validMoment.isBefore(moment().startOf("day"))) {
            draftErrors.push("A validade nao pode estar no passado.");
        }
    }

    const validRows = draft.rows.filter(row => !rowErrors[row.id]);
    const warningList = [];

    if (!draft.validUntil) {
        warningList.push("Definir validade reduz risco de cartazes desatualizados em loja.");
    }

    if (draft.rows.some(row => isDigitsOnly(row.query))) {
        warningList.push("Linhas digitadas apenas com EAN imprimem um titulo tecnico; prefira descricao de produto quando possivel.");
    }

    return {
        draft,
        rowErrors,
        draftErrors,
        validRows,
        invalidRows: draft.rows.length - validRows.length,
        warningList,
        isValid: draftErrors.length === 0 && validRows.length > 0 && Object.keys(rowErrors).length === 0,
    };
}

export function buildRowPreview(draftValues, row) {
    const draft = sanitizeQuickDraft(draftValues);
    const currentRow = sanitizeQuickRows([row])[0];
    const priceTypeMeta = PRICE_TYPE_OPTIONS.find(item => item.value === draft.priceType);
    const orientationMeta = ORIENTATION_OPTIONS.find(item => item.value === draft.orientation);
    const title = buildRowTitle(currentRow.query);
    const barcodeLabel = isDigitsOnly(currentRow.query) && currentRow.query.length === 13 ? currentRow.query : null;

    const preview = {
        title,
        subtitle: currentRow.subtitle || null,
        offerTitle: draft.offerTitle || priceTypeMeta?.label || "Oferta rapida",
        paperLabel: `${draft.paperSize} ${orientationMeta?.label || ""}`.trim(),
        validityLabel: draft.showValidity && draft.validUntil ? `Valido ate ${moment(draft.validUntil).format("DD/MM/YYYY")}` : null,
        barcodeLabel: draft.showBarcode ? (barcodeLabel || "Nao informado") : null,
        observation: draft.observation || null,
    };

    if (draft.priceType === "avista") {
        const price = parseCurrencyValue(currentRow.cashPrice);
        return {
            ...preview,
            primaryPrice: price !== null ? formatCurrency(price) : "R$ --,--",
            supportingPrice: null,
            specialLabel: null,
        };
    }

    if (draft.priceType === "depor") {
        const fromPrice = parseCurrencyValue(currentRow.fromPrice);
        const toPrice = parseCurrencyValue(currentRow.toPrice);

        return {
            ...preview,
            primaryPrice: toPrice !== null ? formatCurrency(toPrice) : "R$ --,--",
            supportingPrice: fromPrice !== null ? `De ${formatCurrency(fromPrice)}` : null,
            specialLabel: fromPrice !== null && toPrice !== null && fromPrice > toPrice
                ? `Economia de ${formatCurrency(fromPrice - toPrice)}`
                : null,
        };
    }

    if (draft.priceType === "clube") {
        const regularPrice = parseCurrencyValue(currentRow.clubRegularPrice);
        const clubPrice = parseCurrencyValue(currentRow.clubPrice);

        return {
            ...preview,
            primaryPrice: clubPrice !== null ? formatCurrency(clubPrice) : "R$ --,--",
            supportingPrice: regularPrice !== null ? `Valor normal ${formatCurrency(regularPrice)}` : null,
            specialLabel: "Oferta Clube",
        };
    }

    const quantity = parseInt(currentRow.specialQuantity, 10) || 0;
    const specialPrice = parseCurrencyValue(currentRow.specialPrice);

    return {
        ...preview,
        primaryPrice: specialPrice !== null ? `${quantity} por ${formatCurrency(specialPrice)}` : `${quantity || "--"} por R$ --,--`,
        supportingPrice: null,
        specialLabel: "Oferta especial",
    };
}

export function buildBatchSnapshot(draftValues, validRows, user) {
    const draft = sanitizeQuickDraft(draftValues);

    return {
        id: `${Date.now()}`,
        createdAt: new Date().toISOString(),
        createdBy: user?.email || "usuario@local",
        totalRows: validRows.length,
        priceType: draft.priceType,
        offerTitle: draft.offerTitle,
        draft: {
            ...draft,
            rows: validRows,
        },
    };
}

export function buildBatchPrintMarkup(draftValues, validRows) {
    const previews = validRows.map(row => buildRowPreview(draftValues, row));

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Impressao rapida - SenaPrices</title>
    <style>
        * { box-sizing: border-box; }
        body {
            margin: 0;
            padding: 24px;
            background: #f3f6fb;
            font-family: Arial, Helvetica, sans-serif;
            color: #111827;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
        }
        .card {
            padding: 22px;
            border-radius: 22px;
            background: linear-gradient(180deg, #ffffff 0%, #eef4fb 100%);
            border: 1px solid #d9e4f2;
            break-inside: avoid;
        }
        .badge {
            display: inline-block;
            padding: 8px 12px;
            border-radius: 999px;
            background: #06346b;
            color: #ffffff;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }
        .title {
            margin: 14px 0 0;
            font-size: 30px;
            line-height: 0.98;
            font-weight: 800;
            letter-spacing: -0.05em;
        }
        .subtitle {
            margin: 10px 0 0;
            color: #475569;
            font-size: 14px;
            line-height: 21px;
        }
        .price {
            margin-top: 22px;
            color: #06346b;
            font-size: 48px;
            line-height: 0.94;
            font-weight: 800;
            letter-spacing: -0.05em;
        }
        .support {
            margin-top: 10px;
            color: #64748b;
            font-size: 18px;
            line-height: 24px;
        }
        .special {
            margin-top: 12px;
            display: inline-block;
            padding: 8px 12px;
            border-radius: 12px;
            background: #fff1ea;
            color: #e86c30;
            font-size: 13px;
            font-weight: 700;
        }
        .meta {
            margin-top: 18px;
            display: grid;
            gap: 10px;
        }
        .meta-item {
            padding: 12px 14px;
            border-radius: 14px;
            background: #f8fbff;
            border: 1px solid #d9e4f2;
        }
        .meta-label {
            font-size: 10px;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.08em;
        }
        .meta-value {
            margin-top: 6px;
            font-size: 14px;
            line-height: 20px;
            font-weight: 700;
        }
        @media print {
            body {
                background: #ffffff;
                padding: 0;
            }
            .grid {
                gap: 12px;
            }
            .card {
                break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <main class="grid">
        ${previews.map(preview => `
            <section class="card">
                <div class="badge">${escapeHtml(preview.offerTitle)}</div>
                <h1 class="title">${escapeHtml(preview.title)}</h1>
                ${preview.subtitle ? `<p class="subtitle">${escapeHtml(preview.subtitle)}</p>` : ""}
                <div class="price">${escapeHtml(preview.primaryPrice)}</div>
                ${preview.supportingPrice ? `<div class="support">${escapeHtml(preview.supportingPrice)}</div>` : ""}
                ${preview.specialLabel ? `<div class="special">${escapeHtml(preview.specialLabel)}</div>` : ""}
                <div class="meta">
                    <div class="meta-item">
                        <div class="meta-label">Formato</div>
                        <div class="meta-value">${escapeHtml(preview.paperLabel)}</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Codigo</div>
                        <div class="meta-value">${escapeHtml(preview.barcodeLabel || "Nao exibido")}</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Validade</div>
                        <div class="meta-value">${escapeHtml(preview.validityLabel || "Sem validade")}</div>
                    </div>
                    ${preview.observation ? `
                        <div class="meta-item">
                            <div class="meta-label">Observacao</div>
                            <div class="meta-value">${escapeHtml(preview.observation)}</div>
                        </div>
                    ` : ""}
                </div>
            </section>
        `).join("")}
    </main>
</body>
</html>`;
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

export function buildRowTitle(query) {
    if (!query) return "Produto nao informado";
    if (isDigitsOnly(query) && query.length === 13) {
        return `EAN ${query}`;
    }
    return query;
}

function sanitizeText(value, limit) {
    return `${value || ""}`.replace(/\s+/g, " ").trim().slice(0, limit);
}

function sanitizeDate(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(`${value || ""}`) ? value : "";
}

function sanitizeCurrency(value) {
    const raw = `${value || ""}`.replace(/[^\d,]/g, "");
    const [integerPart = "", decimalPart = ""] = raw.split(",");
    const safeInteger = integerPart.replace(/^0+(?=\d)/, "");
    const nextValue = decimalPart ? `${safeInteger},${decimalPart.slice(0, 2)}` : safeInteger;
    return nextValue.slice(0, 16);
}

function sanitizeQuantity(value) {
    const digits = `${value || ""}`.replace(/\D/g, "").slice(0, 3);
    return digits.replace(/^0+(?=\d)/, "");
}

function pickAllowed(value, allowedValues, fallback) {
    return allowedValues.includes(value) ? value : fallback;
}

function isDigitsOnly(value) {
    return /^\d+$/.test(`${value || ""}`);
}

function escapeHtml(value) {
    return `${value || ""}`
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
