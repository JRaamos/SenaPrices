import moment from "moment";
import { sanitizeBarcodeDigits, validateEan13 } from "utils/barcode";

import {
    DEFAULT_FORM_VALUES,
    ORIENTATION_OPTIONS,
    PAPER_SIZE_OPTIONS,
    PRICE_STUDIO_LIMITS,
    PRICE_TYPE_OPTIONS,
    SPECIAL_LAYOUT_OPTIONS,
    UNIT_OPTIONS,
} from "./constants";

export function sanitizeDraft(values = {}) {
    const next = {
        ...DEFAULT_FORM_VALUES,
        ...(values || {}),
    };

    return {
        priceType: pickAllowed(next.priceType, PRICE_TYPE_OPTIONS.map(item => item.value), DEFAULT_FORM_VALUES.priceType),
        productName: sanitizeText(next.productName, PRICE_STUDIO_LIMITS.productName),
        productSubtitle: sanitizeText(next.productSubtitle, PRICE_STUDIO_LIMITS.productSubtitle),
        sectionName: sanitizeText(next.sectionName, PRICE_STUDIO_LIMITS.sectionName),
        unitLabel: pickAllowed(next.unitLabel, UNIT_OPTIONS.map(item => item.value), DEFAULT_FORM_VALUES.unitLabel),
        internalCode: sanitizeCode(next.internalCode, PRICE_STUDIO_LIMITS.internalCode),
        eanCode: sanitizeBarcodeDigits(next.eanCode, PRICE_STUDIO_LIMITS.eanCode),
        cashPrice: sanitizeCurrency(next.cashPrice),
        fromPrice: sanitizeCurrency(next.fromPrice),
        toPrice: sanitizeCurrency(next.toPrice),
        clubRegularPrice: sanitizeCurrency(next.clubRegularPrice),
        clubPrice: sanitizeCurrency(next.clubPrice),
        clubLabel: sanitizeText(next.clubLabel, PRICE_STUDIO_LIMITS.clubLabel),
        specialQuantity: sanitizeQuantity(next.specialQuantity),
        specialPrice: sanitizeCurrency(next.specialPrice),
        specialLayout: pickAllowed(next.specialLayout, SPECIAL_LAYOUT_OPTIONS.map(item => item.value), DEFAULT_FORM_VALUES.specialLayout),
        paperSize: pickAllowed(next.paperSize, PAPER_SIZE_OPTIONS.map(item => item.value), DEFAULT_FORM_VALUES.paperSize),
        orientation: pickAllowed(next.orientation, ORIENTATION_OPTIONS.map(item => item.value), DEFAULT_FORM_VALUES.orientation),
        offerTitle: sanitizeText(next.offerTitle, PRICE_STUDIO_LIMITS.offerTitle),
        validUntil: sanitizeDate(next.validUntil),
        observation: sanitizeText(next.observation, PRICE_STUDIO_LIMITS.observation),
        showBarcode: !!next.showBarcode,
        showValidity: !!next.showValidity,
    };
}

export function validateDraft(values) {
    const draft = sanitizeDraft(values);
    const errors = {};

    if (draft.productName.length < 3) {
        errors.productName = "Informe uma descricao principal com pelo menos 3 caracteres.";
    }

    if (draft.eanCode && !validateEan13(draft.eanCode)) {
        errors.eanCode = "Use um EAN-13 valido com digito verificador correto.";
    }

    if (draft.validUntil) {
        const validMoment = moment(draft.validUntil, "YYYY-MM-DD", true);
        if (!validMoment.isValid()) {
            errors.validUntil = "Informe uma data de validade valida.";
        } else if (validMoment.isBefore(moment().startOf("day"))) {
            errors.validUntil = "A validade não pode estar no passado.";
        }
    }

    if (draft.priceType === "avista") {
        const cashPrice = parseCurrencyValue(draft.cashPrice);
        if (cashPrice === null) {
            errors.cashPrice = "Informe um preço à vista válido.";
        }
    }

    if (draft.priceType === "depor") {
        const fromPrice = parseCurrencyValue(draft.fromPrice);
        const toPrice = parseCurrencyValue(draft.toPrice);

        if (fromPrice === null) {
            errors.fromPrice = "Informe o preço original da oferta.";
        }

        if (toPrice === null) {
            errors.toPrice = "Informe o preço promocional da oferta.";
        }

        if (fromPrice !== null && toPrice !== null && toPrice >= fromPrice) {
            errors.toPrice = "O valor promocional deve ser menor que o valor original.";
        }
    }

    if (draft.priceType === "clube") {
        const clubPrice = parseCurrencyValue(draft.clubPrice);
        const regularPrice = parseCurrencyValue(draft.clubRegularPrice);

        if (clubPrice === null) {
            errors.clubPrice = "Informe o valor exclusivo do clube.";
        }

        if (regularPrice !== null && clubPrice !== null && clubPrice >= regularPrice) {
            errors.clubRegularPrice = "O valor normal deve ser maior que o valor do clube.";
        }
    }

    if (draft.priceType === "ofertaespecial") {
        const specialPrice = parseCurrencyValue(draft.specialPrice);
        const specialQuantity = parseInt(draft.specialQuantity, 10);

        if (!Number.isInteger(specialQuantity) || specialQuantity < 2) {
            errors.specialQuantity = "Informe uma quantidade minima de 2 unidades.";
        }

        if (specialPrice === null) {
            errors.specialPrice = "Informe o valor da oferta especial.";
        }
    }

    const warnings = [];

    if (!draft.sectionName) {
        warnings.push("Adicionar a secao do produto melhora a identificacao da equipe.");
    }

    if (!draft.validUntil) {
        warnings.push("Considere informar a validade da oferta para reduzir risco operacional.");
    }

    if (!draft.eanCode && !draft.internalCode) {
        warnings.push("Um codigo interno ou EAN ajuda na rastreabilidade da composicao.");
    }

    const errorList = Object.values(errors);

    return {
        errors,
        errorList,
        warnings,
        isValid: errorList.length === 0,
    };
}

export function buildPreview(draftValues) {
    const draft = sanitizeDraft(draftValues);
    const priceTypeMeta = PRICE_TYPE_OPTIONS.find(item => item.value === draft.priceType);
    const orientationMeta = ORIENTATION_OPTIONS.find(item => item.value === draft.orientation);

    const title = draft.productName || "Descrição do produto";
    const subtitleParts = [draft.productSubtitle, draft.sectionName, draft.unitLabel].filter(Boolean);
    const subtitle = subtitleParts.join(" - ");

    const preview = {
        title,
        subtitle,
        offerTitle: draft.offerTitle || priceTypeMeta?.label || "Oferta",
        priceTypeLabel: priceTypeMeta?.label || "Oferta",
        paperLabel: `${draft.paperSize} ${orientationMeta?.label || ""}`.trim(),
        barcodeLabel: draft.showBarcode ? (draft.eanCode || draft.internalCode || "Sem codigo") : null,
        validityLabel: draft.showValidity && draft.validUntil
            ? `Valido ate ${moment(draft.validUntil).format("DD/MM/YYYY")}`
            : null,
        observation: draft.observation || null,
    };

    if (draft.priceType === "avista") {
        const cashPrice = parseCurrencyValue(draft.cashPrice);

        return {
            ...preview,
            mode: "single",
            primaryPrice: cashPrice !== null ? formatCurrency(cashPrice) : "R$ --,--",
            supportingPrice: null,
            specialLabel: null,
        };
    }

    if (draft.priceType === "depor") {
        const fromPrice = parseCurrencyValue(draft.fromPrice);
        const toPrice = parseCurrencyValue(draft.toPrice);

        return {
            ...preview,
            mode: "compare",
            primaryPrice: toPrice !== null ? formatCurrency(toPrice) : "R$ --,--",
            supportingPrice: fromPrice !== null ? `De ${formatCurrency(fromPrice)}` : null,
            specialLabel: fromPrice !== null && toPrice !== null && fromPrice > toPrice
                ? `Economia de ${formatCurrency(fromPrice - toPrice)}`
                : null,
        };
    }

    if (draft.priceType === "clube") {
        const clubPrice = parseCurrencyValue(draft.clubPrice);
        const regularPrice = parseCurrencyValue(draft.clubRegularPrice);

        return {
            ...preview,
            mode: "club",
            primaryPrice: clubPrice !== null ? formatCurrency(clubPrice) : "R$ --,--",
            supportingPrice: regularPrice !== null ? `Valor normal ${formatCurrency(regularPrice)}` : null,
            specialLabel: draft.clubLabel || "Oferta Clube",
        };
    }

    const specialPrice = parseCurrencyValue(draft.specialPrice);
    const specialQuantity = parseInt(draft.specialQuantity, 10) || 0;

    return {
        ...preview,
        mode: "special",
        primaryPrice: specialPrice !== null ? `${specialQuantity} por ${formatCurrency(specialPrice)}` : `${specialQuantity || "--"} por R$ --,--`,
        supportingPrice: draft.specialLayout === "vertical" ? "Layout vertical" : "Layout horizontal",
        specialLabel: "Oferta especial",
    };
}

export function buildSnapshot(values, user) {
    const draft = sanitizeDraft(values);
    const preview = buildPreview(draft);

    return {
        id: `${Date.now()}`,
        createdAt: new Date().toISOString(),
        createdBy: user?.email || "usuario@local",
        title: draft.productName || "Cartaz sem nome",
        priceType: draft.priceType,
        primaryPrice: preview.primaryPrice,
        paperLabel: preview.paperLabel,
        draft,
    };
}

export function buildPrintMarkup(preview) {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(preview.title)} - SenaPrices</title>
    <style>
        * { box-sizing: border-box; }
        body {
            margin: 0;
            padding: 24px;
            background: #f3f6fb;
            font-family: Arial, Helvetica, sans-serif;
            color: #111827;
        }
        .sheet {
            width: 100%;
            max-width: 920px;
            margin: 0 auto;
            padding: 28px;
            border-radius: 24px;
            background: linear-gradient(180deg, #ffffff 0%, #eef4fb 100%);
            border: 1px solid #d9e4f2;
        }
        .badge {
            display: inline-block;
            padding: 8px 14px;
            border-radius: 999px;
            background: #06346b;
            color: #ffffff;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }
        .title {
            margin: 18px 0 0;
            font-size: 44px;
            line-height: 0.98;
            font-weight: 800;
            letter-spacing: -0.05em;
        }
        .subtitle {
            margin: 12px 0 0;
            font-size: 18px;
            line-height: 28px;
            color: #475569;
        }
        .price {
            margin-top: 28px;
            font-size: 74px;
            line-height: 0.95;
            font-weight: 800;
            letter-spacing: -0.06em;
            color: #06346b;
        }
        .support {
            margin-top: 12px;
            font-size: 24px;
            line-height: 30px;
            color: #64748b;
        }
        .special {
            margin-top: 16px;
            display: inline-block;
            padding: 10px 14px;
            border-radius: 14px;
            background: #fff1ea;
            color: #e86c30;
            font-size: 16px;
            font-weight: 700;
        }
        .meta {
            margin-top: 28px;
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
        }
        .meta-card {
            padding: 14px 16px;
            border-radius: 16px;
            background: #f8fbff;
            border: 1px solid #d9e4f2;
        }
        .meta-label {
            font-size: 11px;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.08em;
        }
        .meta-value {
            margin-top: 8px;
            font-size: 16px;
            line-height: 22px;
            font-weight: 700;
            color: #111827;
        }
        @media print {
            body {
                background: #ffffff;
                padding: 0;
            }
            .sheet {
                max-width: none;
                border: 0;
                box-shadow: none;
            }
        }
    </style>
</head>
<body>
    <main class="sheet">
        <div class="badge">${escapeHtml(preview.offerTitle)}</div>
        <h1 class="title">${escapeHtml(preview.title)}</h1>
        ${preview.subtitle ? `<p class="subtitle">${escapeHtml(preview.subtitle)}</p>` : ""}
        <div class="price">${escapeHtml(preview.primaryPrice)}</div>
        ${preview.supportingPrice ? `<div class="support">${escapeHtml(preview.supportingPrice)}</div>` : ""}
        ${preview.specialLabel ? `<div class="special">${escapeHtml(preview.specialLabel)}</div>` : ""}
        <section class="meta">
            <div class="meta-card">
                <div class="meta-label">Formato</div>
                <div class="meta-value">${escapeHtml(preview.paperLabel)}</div>
            </div>
            <div class="meta-card">
                <div class="meta-label">Codigo</div>
                <div class="meta-value">${escapeHtml(preview.barcodeLabel || "Nao exibido")}</div>
            </div>
            <div class="meta-card">
                <div class="meta-label">Validade</div>
                <div class="meta-value">${escapeHtml(preview.validityLabel || "Sem validade")}</div>
            </div>
        </section>
        ${preview.observation ? `<p class="subtitle">${escapeHtml(preview.observation)}</p>` : ""}
    </main>
</body>
</html>`;
}

export function formatCurrency(value) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    });
}

export function parseCurrencyValue(value) {
    if (!value) return null;

    const normalized = `${value}`
        .replace(/\s/g, "")
        .replace(/\./g, "")
        .replace(",", ".");

    const parsed = Number(normalized);

    if (!Number.isFinite(parsed) || parsed <= 0) {
        return null;
    }

    return Number(parsed.toFixed(2));
}

export function formatLastSaved(value) {
    if (!value) return "Ainda não salvo";

    const parsed = moment(value);

    if (!parsed.isValid()) {
        return "Ainda não salvo";
    }

    return `${parsed.format("HH:mm")} - ${parsed.fromNow()}`;
}

export function formatRecentDate(value) {
    if (!value) return "--";

    const parsed = moment(value);
    if (!parsed.isValid()) return "--";

    return parsed.fromNow();
}

function sanitizeText(value, limit) {
    return `${value || ""}`.replace(/\s+/g, " ").trim().slice(0, limit);
}

function sanitizeCode(value, limit) {
    return `${value || ""}`
        .toUpperCase()
        .replace(/[^A-Z0-9\-_/]/g, "")
        .slice(0, limit);
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

function sanitizeDate(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(`${value || ""}`) ? value : "";
}

function pickAllowed(value, allowedValues, fallback) {
    return allowedValues.includes(value) ? value : fallback;
}

function escapeHtml(value) {
    return `${value || ""}`
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
