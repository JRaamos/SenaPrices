import moment from "moment";
import { validateEan13 } from "utils/barcode";

import {
    buildPrintStyleTokens,
    formatCurrency,
    parseCurrencyValue,
    withAlpha,
} from "../CreatePrice/helpers";
import { getPrintStyleSettings } from "services/settings";
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
            errors.push("Quando usar apenas números, informe um EAN com 13 dígitos.");
        }

        if (isDigitsOnly(row.query) && row.query.length === 13 && !validateEan13(row.query)) {
            errors.push("O EAN informado na linha é inválido.");
        }

        if (draft.priceType === "avista") {
            if (parseCurrencyValue(row.cashPrice) === null) {
                errors.push("Informe um preço à vista válido.");
            }
        }

        if (draft.priceType === "depor") {
            const fromPrice = parseCurrencyValue(row.fromPrice);
            const toPrice = parseCurrencyValue(row.toPrice);

            if (fromPrice === null) {
                errors.push("Informe o preço original da linha.");
            }

            if (toPrice === null) {
                errors.push("Informe o preço promocional da linha.");
            }

            if (fromPrice !== null && toPrice !== null && toPrice >= fromPrice) {
                errors.push("O preço promocional deve ser menor que o preço original.");
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
                errors.push("Use quantidade mínima de 2 unidades.");
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
            draftErrors.push("Informe uma data de validade válida.");
        } else if (validMoment.isBefore(moment().startOf("day"))) {
            draftErrors.push("A validade não pode estar no passado.");
        }
    }

    const validRows = draft.rows.filter(row => !rowErrors[row.id]);
    const warningList = [];

    if (!draft.validUntil) {
        warningList.push("Definir validade reduz risco de cartazes desatualizados em loja.");
    }

    if (draft.rows.some(row => isDigitsOnly(row.query))) {
        warningList.push("Linhas digitadas apenas com EAN imprimem um título técnico; prefira descrição de produto quando possível.");
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

export function buildRowPreview(draftValues, row, options = {}) {
    const draft = sanitizeQuickDraft(draftValues);
    const currentRow = sanitizeQuickRows([row])[0];
    const priceTypeMeta = PRICE_TYPE_OPTIONS.find(item => item.value === draft.priceType);
    const orientationMeta = ORIENTATION_OPTIONS.find(item => item.value === draft.orientation);
    const printStyle = buildPrintStyleTokens(options.printSettings || getPrintStyleSettings());
    const title = buildRowTitle(currentRow.query);
    const barcodeLabel = isDigitsOnly(currentRow.query) && currentRow.query.length === 13 ? currentRow.query : null;

    const preview = {
        title,
        subtitle: currentRow.subtitle || null,
        offerTitle: draft.offerTitle || priceTypeMeta?.label || "Oferta rápida",
        paperLabel: `${draft.paperSize} ${orientationMeta?.label || ""}`.trim(),
        validityLabel: draft.showValidity && draft.validUntil ? `Válido até ${moment(draft.validUntil).format("DD/MM/YYYY")}` : null,
        barcodeLabel: draft.showBarcode ? (barcodeLabel || "Não informado") : null,
        observation: draft.observation || null,
        style: printStyle,
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
    <title>Impressão rápida - SenaPrices</title>
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
        ${previews.map(preview => renderPreviewCard(preview)).join("")}
    </main>
</body>
</html>`;
}

export function formatLastSaved(value) {
    if (!value) return "Ainda não salvo";
    const parsed = moment(value);
    if (!parsed.isValid()) return "Ainda não salvo";
    return `${parsed.format("HH:mm")} · ${parsed.fromNow()}`;
}

export function formatRecentDate(value) {
    if (!value) return "--";
    const parsed = moment(value);
    if (!parsed.isValid()) return "--";
    return parsed.fromNow();
}

export function buildRowTitle(query) {
    if (!query) return "Produto não informado";
    if (isDigitsOnly(query) && query.length === 13) {
        return `EAN ${query}`;
    }
    return query;
}

function renderPreviewCard(preview) {
    const style = preview.style || buildPrintStyleTokens(getPrintStyleSettings());

    return `
        <section class="card">
            <div
                style="
                    display:inline-block;
                    padding:8px 12px;
                    border-radius:999px;
                    background:${style.accentColor};
                    color:#ffffff;
                    font-size:11px;
                    font-weight:700;
                    letter-spacing:0.08em;
                    text-transform:uppercase;
                "
            >${escapeHtml(preview.offerTitle)}</div>
            <h1
                style="
                    margin:14px 0 0;
                    color:#111827;
                    font-family:${style.titleFontFamily};
                    font-size:${Math.max(30, Math.round(style.titleSizePx * 0.72))}px;
                    font-weight:800;
                    line-height:0.98;
                    letter-spacing:-0.05em;
                    text-align:${style.titleAlign};
                    text-transform:${style.titleTransform};
                "
            >${escapeHtml(preview.title)}</h1>
            ${preview.subtitle ? `
                <p
                    style="
                        margin:10px 0 0;
                        color:#475569;
                        font-family:${style.infoFontFamily};
                        font-size:${Math.max(14, Math.round(style.subtitleSizePx * 0.88))}px;
                        line-height:1.5;
                        text-align:${style.titleAlign};
                    "
                >${escapeHtml(preview.subtitle)}</p>
            ` : ""}
            <div
                style="
                    margin-top:22px;
                    color:${style.accentColor};
                    font-family:${style.priceFontFamily};
                    font-size:${Math.max(44, Math.round(style.priceSizePx * 0.68))}px;
                    line-height:0.94;
                    font-weight:800;
                    letter-spacing:-0.05em;
                    text-align:${style.priceAlign};
                "
            >${escapeHtml(preview.primaryPrice)}</div>
            ${preview.supportingPrice ? `
                <div
                    style="
                        margin-top:10px;
                        color:#64748b;
                        font-family:${style.infoFontFamily};
                        font-size:${Math.max(16, Math.round(style.supportSizePx * 0.76))}px;
                        line-height:1.35;
                        text-align:${style.priceAlign};
                    "
                >${escapeHtml(preview.supportingPrice)}</div>
            ` : ""}
            ${preview.specialLabel ? `
                <div
                    style="
                        margin-top:12px;
                        display:inline-block;
                        padding:8px 12px;
                        border-radius:12px;
                        background:${withAlpha(style.highlightColor, 0.12)};
                        color:${style.highlightColor};
                        font-family:${style.infoFontFamily};
                        font-size:13px;
                        font-weight:700;
                    "
                >${escapeHtml(preview.specialLabel)}</div>
            ` : ""}
            <div style="margin-top:18px;display:grid;gap:10px;">
                <div style="padding:12px 14px;border-radius:14px;background:#f8fbff;border:1px solid #d9e4f2;">
                    <div style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Formato</div>
                    <div style="margin-top:6px;font-size:14px;line-height:20px;font-weight:700;">${escapeHtml(preview.paperLabel)}</div>
                </div>
                <div style="padding:12px 14px;border-radius:14px;background:#f8fbff;border:1px solid #d9e4f2;">
                    <div style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Código</div>
                    <div style="margin-top:6px;font-size:14px;line-height:20px;font-weight:700;">${escapeHtml(preview.barcodeLabel || "Não exibido")}</div>
                </div>
                <div style="padding:12px 14px;border-radius:14px;background:#f8fbff;border:1px solid #d9e4f2;">
                    <div style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Validade</div>
                    <div style="margin-top:6px;font-size:14px;line-height:20px;font-weight:700;">${escapeHtml(preview.validityLabel || "Sem validade")}</div>
                </div>
                ${preview.observation ? `
                    <div style="padding:12px 14px;border-radius:14px;background:#f8fbff;border:1px solid #d9e4f2;">
                        <div style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Observação</div>
                        <div style="margin-top:6px;font-size:14px;line-height:20px;font-weight:700;">${escapeHtml(preview.observation)}</div>
                    </div>
                ` : ""}
            </div>
        </section>
    `;
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
