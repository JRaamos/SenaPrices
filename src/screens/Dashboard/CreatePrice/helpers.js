import moment from "moment";

import { sanitizeBarcodeDigits, validateEan13 } from "utils/barcode";

import {
    getPrintStyleSettings,
    resolvePosterSheetLayout,
} from "services/settings";

import {
    DEFAULT_FORM_VALUES,
    ORIENTATION_OPTIONS,
    PAPER_SIZE_OPTIONS,
    PRICE_STUDIO_LIMITS,
    PRICE_TYPE_OPTIONS,
    SPECIAL_LAYOUT_OPTIONS,
    UNIT_OPTIONS,
} from "./constants";

const PAPER_DIMENSIONS = {
    A6: { portrait: [105, 148], landscape: [148, 105] },
    A5: { portrait: [148, 210], landscape: [210, 148] },
    A4: { portrait: [210, 297], landscape: [297, 210] },
    A3: { portrait: [297, 420], landscape: [420, 297] },
};

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
        cashPrice: sanitizeCurrencyInput(next.cashPrice),
        fromPrice: sanitizeCurrencyInput(next.fromPrice),
        toPrice: sanitizeCurrencyInput(next.toPrice),
        clubRegularPrice: sanitizeCurrencyInput(next.clubRegularPrice),
        clubPrice: sanitizeCurrencyInput(next.clubPrice),
        clubLabel: sanitizeText(next.clubLabel, PRICE_STUDIO_LIMITS.clubLabel),
        specialQuantity: sanitizeQuantity(next.specialQuantity),
        specialPrice: sanitizeCurrencyInput(next.specialPrice),
        specialLayout: pickAllowed(next.specialLayout, SPECIAL_LAYOUT_OPTIONS.map(item => item.value), DEFAULT_FORM_VALUES.specialLayout),
        paperSize: pickAllowed(next.paperSize, PAPER_SIZE_OPTIONS.map(item => item.value), DEFAULT_FORM_VALUES.paperSize),
        orientation: pickAllowed(next.orientation, ORIENTATION_OPTIONS.map(item => item.value), DEFAULT_FORM_VALUES.orientation),
        offerTitle: sanitizeText(next.offerTitle, PRICE_STUDIO_LIMITS.offerTitle),
        validFrom: sanitizeDate(next.validFrom),
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
        errors.productName = "Selecione um item com descrição principal válida.";
    }

    if (!draft.internalCode && !draft.eanCode) {
        errors.internalCode = "Selecione um item cadastrado para manter rastreabilidade.";
    }

    if (draft.eanCode && !validateEan13(draft.eanCode)) {
        errors.eanCode = "Use um EAN-13 válido com dígito verificador correto.";
    }

    if (draft.validFrom) {
        const startMoment = moment(draft.validFrom, "YYYY-MM-DD", true);

        if (!startMoment.isValid()) {
            errors.validFrom = "Informe uma data inicial válida.";
        }
    }

    if (draft.validUntil) {
        const endMoment = moment(draft.validUntil, "YYYY-MM-DD", true);

        if (!endMoment.isValid()) {
            errors.validUntil = "Informe uma data final válida.";
        }
    }

    if (draft.validFrom && draft.validUntil) {
        const startMoment = moment(draft.validFrom, "YYYY-MM-DD", true);
        const endMoment = moment(draft.validUntil, "YYYY-MM-DD", true);

        if (startMoment.isValid() && endMoment.isValid() && endMoment.isBefore(startMoment)) {
            errors.validUntil = "A data final não pode ser anterior à data inicial.";
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
            errors.specialQuantity = "Informe uma quantidade mínima de 2 unidades.";
        }

        if (specialPrice === null) {
            errors.specialPrice = "Informe o valor da oferta especial.";
        }
    }

    const warnings = [];

    if (!draft.sectionName) {
        warnings.push("Adicionar a seção do produto melhora a identificação da equipe.");
    }

    if (!draft.validFrom && !draft.validUntil) {
        warnings.push("Considere informar a vigência da oferta para reduzir risco operacional.");
    }

    if (!draft.eanCode && !draft.internalCode) {
        warnings.push("Um código interno ou EAN ajuda na rastreabilidade da composição.");
    }

    const errorList = Object.values(errors);

    return {
        errors,
        errorList,
        warnings,
        isValid: errorList.length === 0,
    };
}

export function buildPreview(draftValues, options = {}) {
    const draft = sanitizeDraft(draftValues);
    const priceTypeMeta = PRICE_TYPE_OPTIONS.find(item => item.value === draft.priceType);
    const orientationMeta = ORIENTATION_OPTIONS.find(item => item.value === draft.orientation);
    const printStyle = buildPrintStyleTokens(options.printSettings || getPrintStyleSettings());
    const sheetLayout = resolvePosterSheetLayout(draft.paperSize, draft.orientation, printStyle);
    const posterAspectRatio = resolveAspectRatio(draft.paperSize, draft.orientation);
    const sheetAspectRatio = resolveAspectRatio(sheetLayout.sheetSize, sheetLayout.sheetOrientation);

    const title = draft.productName || "Descrição do produto";
    const subtitleParts = [draft.productSubtitle, draft.sectionName].filter(Boolean);
    const subtitle = subtitleParts.join(" · ");

    const preview = {
        title,
        subtitle,
        offerTitle: draft.offerTitle || priceTypeMeta?.label || "Oferta",
        priceTypeLabel: priceTypeMeta?.label || "Oferta",
        paperLabel: `${draft.paperSize} ${orientationMeta?.label || ""}`.trim(),
        barcodeLabel: draft.showBarcode ? (draft.eanCode || draft.internalCode || "Sem código") : null,
        validityLabel: draft.showValidity ? buildValidityLabel(draft.validFrom, draft.validUntil) : null,
        observation: draft.observation || null,
        style: printStyle,
        unitLabel: draft.unitLabel,
        paperSize: draft.paperSize,
        orientation: draft.orientation,
        posterAspectRatio,
        sheetAspectRatio,
        sheetLayout,
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

export function buildPrintMarkup(preview, options = {}) {
    const safePreview = {
        ...preview,
        style: preview?.style || buildPrintStyleTokens(options.printSettings || getPrintStyleSettings()),
        sheetLayout: preview?.sheetLayout || resolvePosterSheetLayout(preview?.paperSize, preview?.orientation, options.printSettings || getPrintStyleSettings()),
    };
    const composition = safePreview.sheetLayout;
    const posterMarkup = renderPosterMarkup(safePreview);

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(safePreview.title)} - SenaPrices</title>
    <style>
        * { box-sizing: border-box; }
        body {
            margin: 0;
            padding: 24px;
            background: #eef3fa;
            font-family: ${safePreview.style.infoFontFamily};
            color: #111827;
        }
        .sheet-stage {
            width: 100%;
            max-width: 1100px;
            margin: 0 auto;
            display: grid;
            gap: 16px;
        }
        .sheet-meta {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            align-items: center;
            color: #64748b;
            font-size: 13px;
            line-height: 20px;
        }
        .sheet-surface {
            width: 100%;
            aspect-ratio: ${safePreview.sheetAspectRatio};
            border-radius: 28px;
            border: 1px dashed #c7d2e5;
            background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
            padding: 18px;
            display: grid;
            grid-template-columns: repeat(${composition.columns}, minmax(0, 1fr));
            grid-template-rows: repeat(${composition.rows}, minmax(0, 1fr));
            gap: 14px;
        }
        .poster-slot {
            width: 100%;
            height: 100%;
        }
        .poster {
            width: 100%;
            height: 100%;
            border-radius: ${safePreview.style.frameRadius}px;
            background: linear-gradient(180deg, #fff8a1 0%, #fff686 100%);
            border: 1px solid rgba(15, 23, 42, 0.14);
            padding: ${safePreview.style.framePadding}px;
            display: grid;
            align-content: space-between;
            gap: 14px;
            overflow: hidden;
        }
        .poster-header {
            display: grid;
            gap: 10px;
        }
        .badge {
            display: inline-flex;
            align-items: center;
            padding: 8px 12px;
            border-radius: 999px;
            background: ${withAlpha(safePreview.style.accentColor, 0.1)};
            color: ${safePreview.style.accentColor};
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }
        .title {
            margin: 0;
            color: #111827;
            font-family: ${safePreview.style.titleFontFamily};
            font-size: ${Math.max(22, Math.round((safePreview.style.titleSizePx || 42) * 0.68))}px;
            font-weight: 800;
            line-height: 0.98;
            letter-spacing: -0.05em;
            text-align: ${safePreview.style.titleAlign};
            text-transform: ${safePreview.style.titleTransform};
            word-break: break-word;
        }
        .subtitle {
            margin: 0;
            color: #475569;
            font-family: ${safePreview.style.infoFontFamily};
            font-size: ${Math.max(12, Math.round((safePreview.style.subtitleSizePx || 18) * 0.84))}px;
            line-height: 1.45;
            text-align: ${safePreview.style.titleAlign};
        }
        .price {
            display: grid;
            justify-items: ${safePreview.style.priceAlign === "center" ? "center" : safePreview.style.priceAlign === "right" ? "end" : "start"};
            gap: 8px;
        }
        .price-main {
            color: ${safePreview.style.accentColor};
            font-family: ${safePreview.style.priceFontFamily};
            font-size: ${Math.max(38, Math.round((safePreview.style.priceSizePx || 70) * 0.72))}px;
            font-weight: 800;
            line-height: 0.92;
            letter-spacing: -0.06em;
            text-align: ${safePreview.style.priceAlign};
        }
        .support {
            color: #64748b;
            font-family: ${safePreview.style.infoFontFamily};
            font-size: ${Math.max(13, Math.round((safePreview.style.supportSizePx || 22) * 0.8))}px;
            line-height: 1.35;
            text-align: ${safePreview.style.priceAlign};
        }
        .special {
            display: inline-flex;
            align-items: center;
            padding: 8px 12px;
            border-radius: 12px;
            background: ${withAlpha(safePreview.style.highlightColor, 0.14)};
            color: ${safePreview.style.highlightColor};
            font-size: 13px;
            font-weight: 700;
        }
        .footer {
            display: grid;
            gap: 8px;
        }
        .meta-line {
            color: #475569;
            font-size: 12px;
            line-height: 18px;
        }
        @media print {
            body {
                background: #ffffff;
                padding: 0;
            }
            .sheet-meta {
                display: none;
            }
            .sheet-stage {
                max-width: none;
            }
            .sheet-surface {
                border: 0;
                padding: 10mm;
                border-radius: 0;
            }
        }
    </style>
</head>
<body>
    <main class="sheet-stage">
        <div class="sheet-meta">
            <strong>${escapeHtml(composition.sheetLabel)}</strong>
            <span>${escapeHtml(composition.helperText || "")}</span>
        </div>
        <section class="sheet-surface">
            ${Array.from({ length: composition.copies }).map(() => `<div class="poster-slot">${posterMarkup}</div>`).join("")}
        </section>
    </main>
</body>
</html>`;
}

export function buildPrintStyleTokens(printSettings = getPrintStyleSettings()) {
    const descriptionScaleFactor = clampScale(printSettings.descriptionScale, 80, 140) / 100;
    const priceScaleFactor = clampScale(printSettings.priceScale, 80, 180) / 100;

    return {
        ...printSettings,
        titleFontFamily: printSettings.titleFontFamily,
        priceFontFamily: printSettings.priceFontFamily,
        infoFontFamily: printSettings.infoFontFamily,
        titleAlign: printSettings.titleAlign,
        priceAlign: printSettings.priceAlign,
        titleTransform: printSettings.titleTransform,
        accentColor: printSettings.accentColor,
        highlightColor: printSettings.highlightColor,
        titleSizePx: Math.round(44 * descriptionScaleFactor),
        subtitleSizePx: Math.round(18 * descriptionScaleFactor),
        supportSizePx: Math.round(24 * descriptionScaleFactor),
        priceSizePx: Math.round(74 * priceScaleFactor),
        priceSymbolPosition: printSettings.priceSymbolPosition || "left",
        priceSymbolOffsetX: Number(printSettings.priceSymbolOffsetX) || 0,
        priceSymbolOffsetY: Number(printSettings.priceSymbolOffsetY) || 0,
        centsAlign: printSettings.centsAlign || "top",
        centsOffsetX: Number(printSettings.centsOffsetX) || 0,
        centsOffsetY: Number(printSettings.centsOffsetY) || 0,
        commaOffsetX: Number(printSettings.commaOffsetX) || 0,
        commaOffsetY: Number(printSettings.commaOffsetY) || 0,
        unitPosition: printSettings.unitPosition || "below",
        unitOffsetX: Number(printSettings.unitOffsetX) || 0,
        unitOffsetY: Number(printSettings.unitOffsetY) || 0,
        barcodePosition: printSettings.barcodePosition || "meta",
        validityPosition: printSettings.validityPosition || "meta",
        observationPosition: printSettings.observationPosition || "footer",
        metaLayout: printSettings.metaLayout || "grid",
        framePadding: Number(printSettings.framePadding) || 28,
        frameRadius: Number(printSettings.frameRadius) || 24,
    };
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

    const digits = `${value}`.replace(/\D/g, "");

    if (!digits) {
        return null;
    }

    const parsed = Number(digits) / 100;

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

    return `${parsed.format("HH:mm")} · ${parsed.fromNow()}`;
}

export function formatRecentDate(value) {
    if (!value) return "--";

    const parsed = moment(value);

    if (!parsed.isValid()) return "--";

    return parsed.fromNow();
}

export function sanitizeCurrencyInput(value) {
    const digits = `${value || ""}`.replace(/\D/g, "").slice(0, 9);

    if (!digits) {
        return "";
    }

    const cents = digits.slice(-2).padStart(2, "0");
    const integer = (digits.length > 2 ? digits.slice(0, -2) : "0").replace(/^0+(?=\d)/, "") || "0";

    return `${integer},${cents}`;
}

export function buildPriceDisplayParts(primaryPrice, unitLabel, mode = "single") {
    if (mode === "special") {
        return {
            structured: false,
            raw: primaryPrice || "R$ --,--",
            unitLabel: formatUnitLabel(unitLabel),
        };
    }

    const match = `${primaryPrice || ""}`.match(/^R\$\s*([\d.-]+),(\d{2})$/);

    if (!match) {
        return {
            structured: false,
            raw: primaryPrice || "R$ --,--",
            unitLabel: formatUnitLabel(unitLabel),
        };
    }

    return {
        structured: true,
        raw: primaryPrice,
        symbol: "R$",
        integer: match[1],
        comma: ",",
        cents: match[2],
        unitLabel: formatUnitLabel(unitLabel),
    };
}

export function buildPreviewInfoGroups(preview = {}) {
    const style = preview?.style || {};
    const badgeItems = [];
    const headerItems = [];
    const metaItems = [];
    const footerItems = [];

    if (preview.validityLabel) {
        if (style.validityPosition === "badge") {
            badgeItems.push({ label: "Validade", value: preview.validityLabel });
        } else if (style.validityPosition === "footer") {
            footerItems.push({ label: "Validade", value: preview.validityLabel });
        } else if (style.validityPosition !== "hidden") {
            metaItems.push({ label: "Validade", value: preview.validityLabel });
        }
    }

    if (preview.barcodeLabel) {
        if (style.barcodePosition === "header") {
            headerItems.push({ label: "Código", value: preview.barcodeLabel });
        } else if (style.barcodePosition === "footer") {
            footerItems.push({ label: "Código", value: preview.barcodeLabel });
        } else if (style.barcodePosition !== "hidden") {
            metaItems.push({ label: "Código", value: preview.barcodeLabel });
        }
    }

    if (preview.paperLabel) {
        metaItems.unshift({ label: "Formato", value: preview.paperLabel });
    }

    if (preview.sheetLayout?.enabled) {
        metaItems.push({ label: "Composição", value: preview.sheetLayout.sheetLabel });
    }

    if (preview.observation) {
        if (style.observationPosition === "header") {
            headerItems.push({ label: "Observação", value: preview.observation });
        } else if (style.observationPosition === "meta") {
            metaItems.push({ label: "Observação", value: preview.observation });
        } else if (style.observationPosition !== "hidden") {
            footerItems.push({ label: "Observação", value: preview.observation });
        }
    }

    return {
        badgeItems,
        headerItems,
        metaItems,
        footerItems,
    };
}

function renderPosterMarkup(preview) {
    const infoGroups = buildPreviewInfoGroups(preview);

    return `
        <article class="poster">
            <header class="poster-header">
                <div class="badge">${escapeHtml(preview.offerTitle)}</div>
                <h1 class="title">${escapeHtml(preview.title)}</h1>
                ${preview.subtitle ? `<p class="subtitle">${escapeHtml(preview.subtitle)}</p>` : ""}
            </header>
            <section class="price">
                <div class="price-main">${escapeHtml(preview.primaryPrice)}</div>
                ${preview.supportingPrice ? `<div class="support">${escapeHtml(preview.supportingPrice)}</div>` : ""}
                ${preview.specialLabel ? `<div class="special">${escapeHtml(preview.specialLabel)}</div>` : ""}
            </section>
            <footer class="footer">
                ${infoGroups.metaItems.map(item => `<div class="meta-line"><strong>${escapeHtml(item.label)}:</strong> ${escapeHtml(item.value)}</div>`).join("")}
                ${infoGroups.footerItems.map(item => `<div class="meta-line"><strong>${escapeHtml(item.label)}:</strong> ${escapeHtml(item.value)}</div>`).join("")}
            </footer>
        </article>
    `;
}

function buildValidityLabel(validFrom, validUntil) {
    const safeFrom = validFrom ? moment(validFrom, "YYYY-MM-DD", true) : null;
    const safeUntil = validUntil ? moment(validUntil, "YYYY-MM-DD", true) : null;

    if (safeFrom?.isValid() && safeUntil?.isValid()) {
        return `De ${safeFrom.format("DD/MM/YYYY")} até ${safeUntil.format("DD/MM/YYYY")}`;
    }

    if (safeFrom?.isValid()) {
        return `A partir de ${safeFrom.format("DD/MM/YYYY")}`;
    }

    if (safeUntil?.isValid()) {
        return `Até ${safeUntil.format("DD/MM/YYYY")}`;
    }

    return null;
}

function resolveAspectRatio(paperSize = "A5", orientation = "portrait") {
    const paper = PAPER_DIMENSIONS[paperSize] || PAPER_DIMENSIONS.A5;
    const [width, height] = paper[orientation] || paper.portrait;
    return `${width} / ${height}`;
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

function clampScale(value, min, max) {
    const parsed = Number(value);

    if (!Number.isFinite(parsed)) {
        return 100;
    }

    return Math.min(max, Math.max(min, parsed));
}

function formatUnitLabel(unitLabel) {
    if (!unitLabel || unitLabel === "hidden") {
        return "";
    }

    if (unitLabel === "100g") {
        return "cada 100g";
    }

    return unitLabel;
}

function escapeHtml(value) {
    return `${value || ""}`
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export function withAlpha(hexColor, alpha) {
    const safe = `${hexColor || ""}`.replace("#", "");

    if (!/^[0-9a-fA-F]{6}$/.test(safe)) {
        return "rgba(232,108,48,0.12)";
    }

    const red = parseInt(safe.slice(0, 2), 16);
    const green = parseInt(safe.slice(2, 4), 16);
    const blue = parseInt(safe.slice(4, 6), 16);

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
