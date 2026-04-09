import { ReadObject, SaveObject } from "./storage";
import { sanitizeBarcodeDigits, validateEan13 } from "utils/barcode";

import { ALIGN_OPTIONS, PRINT_FONT_OPTIONS } from "./settings";

const LABEL_SETTINGS_KEY = "label-settings";
const LABEL_RECENT_JOBS_KEY = "label-recent-jobs";
const LABEL_RECENT_LIMIT = 8;

export const LABEL_PRESET_OPTIONS = [
    { value: "40x25", label: "40 x 25 mm", widthMm: 40, heightMm: 25 },
    { value: "58x30", label: "58 x 30 mm", widthMm: 58, heightMm: 30 },
    { value: "50x30", label: "50 x 30 mm", widthMm: 50, heightMm: 30 },
    { value: "80x50", label: "80 x 50 mm", widthMm: 80, heightMm: 50 },
    { value: "100x50", label: "100 x 50 mm", widthMm: 100, heightMm: 50 },
    { value: "100x30", label: "100 x 30 mm", widthMm: 100, heightMm: 30 },
    { value: "custom", label: "Customizado", widthMm: 58, heightMm: 30 },
];

export const LABEL_DPI_OPTIONS = [
    { value: 203, label: "203 DPI" },
    { value: 300, label: "300 DPI" },
];

export const DEFAULT_LABEL_SETTINGS = {
    preset: "58x30",
    widthMm: 58,
    heightMm: 30,
    dpi: 203,
    showDescription2: true,
    showDescription3: false,
    showSection: true,
    showUnit: true,
    showBarcode: true,
    showEan: true,
    showInternalCode: true,
    showPrice: true,
    defaultCopies: 1,
    fontFamily: '"Montserrat", Arial, sans-serif',
    textAlign: "left",
    titleScale: 100,
    priceScale: 100,
    metaScale: 100,
    accentColor: "#06346b",
};

export function sanitizeLabelSettings(values = {}) {
    const next = {
        ...DEFAULT_LABEL_SETTINGS,
        ...(values || {}),
    };
    const preset = pickAllowed(next.preset, LABEL_PRESET_OPTIONS.map(item => item.value), DEFAULT_LABEL_SETTINGS.preset);
    const presetConfig = LABEL_PRESET_OPTIONS.find(item => item.value === preset) || LABEL_PRESET_OPTIONS[0];
    const widthMm = sanitizeDimension(next.widthMm, preset === "custom" ? next.widthMm : presetConfig.widthMm);
    const heightMm = sanitizeDimension(next.heightMm, preset === "custom" ? next.heightMm : presetConfig.heightMm);

    return {
        preset,
        widthMm,
        heightMm,
        dpi: pickAllowed(Number(next.dpi), LABEL_DPI_OPTIONS.map(item => item.value), DEFAULT_LABEL_SETTINGS.dpi),
        showDescription2: !!next.showDescription2,
        showDescription3: !!next.showDescription3,
        showSection: !!next.showSection,
        showUnit: !!next.showUnit,
        showBarcode: !!next.showBarcode,
        showEan: !!next.showEan,
        showInternalCode: !!next.showInternalCode,
        showPrice: !!next.showPrice,
        defaultCopies: sanitizeCopies(next.defaultCopies),
        fontFamily: pickAllowed(
            next.fontFamily,
            PRINT_FONT_OPTIONS.map(item => item.value),
            DEFAULT_LABEL_SETTINGS.fontFamily
        ),
        textAlign: pickAllowed(
            next.textAlign,
            ALIGN_OPTIONS.map(item => item.value),
            DEFAULT_LABEL_SETTINGS.textAlign
        ),
        titleScale: sanitizeScale(next.titleScale, DEFAULT_LABEL_SETTINGS.titleScale, 80, 140),
        priceScale: sanitizeScale(next.priceScale, DEFAULT_LABEL_SETTINGS.priceScale, 80, 180),
        metaScale: sanitizeScale(next.metaScale, DEFAULT_LABEL_SETTINGS.metaScale, 80, 140),
        accentColor: sanitizeHexColor(next.accentColor, DEFAULT_LABEL_SETTINGS.accentColor),
    };
}

export function readLabelSettings() {
    return sanitizeLabelSettings(ReadObject(LABEL_SETTINGS_KEY) || DEFAULT_LABEL_SETTINGS);
}

export function saveLabelSettings(values = {}) {
    const settings = sanitizeLabelSettings(values);
    SaveObject(LABEL_SETTINGS_KEY, settings);
    return settings;
}

export function sanitizeRecentLabelJob(values = {}) {
    return {
        id: `${values?.id || ""}`.trim(),
        title: `${values?.title || ""}`.trim().slice(0, 120),
        totalItems: Number.isInteger(values?.totalItems) ? values.totalItems : 0,
        totalLabels: Number.isInteger(values?.totalLabels) ? values.totalLabels : 0,
        preset: `${values?.preset || ""}`.trim(),
        selectedItemIds: Array.isArray(values?.selectedItemIds)
            ? values.selectedItemIds.map(item => `${item || ""}`.trim()).filter(Boolean)
            : [],
        createdAt: `${values?.createdAt || ""}`.trim(),
    };
}

export function readRecentLabelJobs() {
    const values = ReadObject(LABEL_RECENT_JOBS_KEY);

    if (!Array.isArray(values)) {
        return [];
    }

    return values
        .map(sanitizeRecentLabelJob)
        .filter(item => item.id && item.createdAt && item.selectedItemIds.length)
        .sort((left, right) => `${right.createdAt || ""}`.localeCompare(`${left.createdAt || ""}`))
        .slice(0, LABEL_RECENT_LIMIT);
}

export function appendRecentLabelJob(values = {}) {
    const job = sanitizeRecentLabelJob({
        ...values,
        id: values?.id || createId("label-job"),
        createdAt: values?.createdAt || new Date().toISOString(),
    });

    const nextJobs = [job, ...readRecentLabelJobs()]
        .filter((item, index, list) => list.findIndex(candidate => candidate.id === item.id) === index)
        .slice(0, LABEL_RECENT_LIMIT);

    SaveObject(LABEL_RECENT_JOBS_KEY, nextJobs);
    return nextJobs;
}

export function buildLabelStyleTokens(settings = DEFAULT_LABEL_SETTINGS) {
    const safeSettings = sanitizeLabelSettings(settings);
    const titleFactor = safeSettings.titleScale / 100;
    const priceFactor = safeSettings.priceScale / 100;
    const metaFactor = safeSettings.metaScale / 100;

    const baseTitle = safeSettings.heightMm >= 40 ? 14 : safeSettings.heightMm >= 30 ? 12 : 11;
    const basePrice = safeSettings.heightMm >= 40 ? 24 : safeSettings.heightMm >= 30 ? 20 : 18;

    return {
        titleSizePx: Math.round(baseTitle * titleFactor),
        subtitleSizePx: Math.max(10, Math.round(10 * metaFactor)),
        metaSizePx: Math.max(9, Math.round(9 * metaFactor)),
        priceSizePx: Math.round(basePrice * priceFactor),
        fontFamily: safeSettings.fontFamily,
        textAlign: safeSettings.textAlign,
        accentColor: safeSettings.accentColor,
    };
}

export function buildLabelPrintMarkup({ title = "Etiquetas SenaPrices", subtitle = "", items = [], settings = DEFAULT_LABEL_SETTINGS }) {
    const safeSettings = sanitizeLabelSettings(settings);
    const style = buildLabelStyleTokens(safeSettings);
    const labels = expandLabelCopies(items);

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <style>
        * { box-sizing: border-box; }
        body {
            margin: 0;
            padding: 18px;
            background: #f3f6fb;
            font-family: ${style.fontFamily};
            color: #111827;
        }
        .header {
            margin-bottom: 16px;
            padding: 20px 22px;
            border-radius: 22px;
            background: linear-gradient(180deg, ${style.accentColor} 0%, #0f172a 100%);
            color: #ffffff;
        }
        .eyebrow {
            display: inline-flex;
            padding: 8px 12px;
            border-radius: 999px;
            background: rgba(255,255,255,0.12);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }
        .title {
            margin: 16px 0 0;
            font-size: 30px;
            line-height: 1;
            font-weight: 800;
            letter-spacing: -0.05em;
        }
        .subtitle {
            margin: 10px 0 0;
            max-width: 720px;
            color: rgba(255,255,255,0.78);
            font-size: 14px;
            line-height: 22px;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(${safeSettings.widthMm}mm, ${safeSettings.widthMm}mm));
            gap: 3mm;
            align-items: start;
        }
        .label {
            width: ${safeSettings.widthMm}mm;
            min-height: ${safeSettings.heightMm}mm;
            padding: 2.4mm 2.6mm;
            border-radius: 3mm;
            border: 0.3mm solid #cbd5e1;
            background: #ffffff;
            display: grid;
            gap: 1.5mm;
            break-inside: avoid;
            text-align: ${style.textAlign};
        }
        .name {
            font-family: ${style.fontFamily};
            font-size: ${style.titleSizePx}px;
            line-height: 1.05;
            font-weight: 800;
            letter-spacing: -0.03em;
        }
        .subtitle-row {
            color: #475569;
            font-family: ${style.fontFamily};
            font-size: ${style.subtitleSizePx}px;
            line-height: 1.3;
        }
        .price {
            color: ${style.accentColor};
            font-family: ${style.fontFamily};
            font-size: ${style.priceSizePx}px;
            line-height: 0.95;
            font-weight: 800;
            letter-spacing: -0.05em;
        }
        .meta {
            color: #475569;
            font-family: ${style.fontFamily};
            font-size: ${style.metaSizePx}px;
            line-height: 1.3;
        }
        .barcode {
            margin-top: auto;
            padding-top: 1.6mm;
            border-top: 0.2mm dashed #cbd5e1;
            font-family: monospace;
            font-size: ${Math.max(9, style.metaSizePx)}px;
            line-height: 1.3;
            word-break: break-all;
        }
        @media print {
            @page { margin: 4mm; }
            body {
                background: #ffffff;
                padding: 0;
            }
            .header {
                border-radius: 0;
                margin-bottom: 10px;
            }
            .label {
                box-shadow: none;
            }
        }
    </style>
</head>
<body>
    <section class="header">
        <span class="eyebrow">Etiquetas SenaPrices</span>
        <h1 class="title">${escapeHtml(title)}</h1>
        ${subtitle ? `<p class="subtitle">${escapeHtml(subtitle)}</p>` : ""}
    </section>
    <section class="grid">
        ${labels.map(item => renderLabelMarkup(item, safeSettings, style)).join("")}
    </section>
</body>
</html>`;
}

export function buildLabelsZpl({ items = [], settings = DEFAULT_LABEL_SETTINGS }) {
    const safeSettings = sanitizeLabelSettings(settings);
    const labels = expandLabelCopies(items);

    return labels
        .map(item => buildSingleLabelZpl(item, safeSettings))
        .join("\n");
}

function renderLabelMarkup(item = {}, settings = DEFAULT_LABEL_SETTINGS, style = buildLabelStyleTokens(settings)) {
    const subtitleParts = [
        settings.showDescription2 ? item.description2 : "",
        settings.showDescription3 ? item.description3 : "",
        settings.showSection ? item.section : "",
        settings.showUnit ? item.unit : "",
    ].filter(Boolean);
    const codeParts = [
        settings.showInternalCode ? item.internalCode : "",
        settings.showEan ? item.ean13 : "",
    ].filter(Boolean);

    return `
        <article class="label">
            <div class="name">${escapeHtml(item.description1 || "Item sem descrição")}</div>
            ${subtitleParts.length ? `<div class="subtitle-row">${escapeHtml(subtitleParts.join(" · "))}</div>` : ""}
            ${settings.showPrice ? `<div class="price">${escapeHtml(item.priceLabel || "Sem preço")}</div>` : ""}
            ${settings.showPrice && item.secondaryPrice ? `<div class="meta">${escapeHtml(item.secondaryPrice)}</div>` : ""}
            ${item.offerLabel ? `<div class="meta">${escapeHtml(item.offerLabel)}</div>` : ""}
            ${(settings.showBarcode || codeParts.length)
                ? `<div class="barcode">${escapeHtml([
                    settings.showBarcode && item.ean13 ? item.ean13 : "",
                    ...codeParts,
                ].filter(Boolean).join(" · "))}</div>`
                : ""}
        </article>
    `;
}

function buildSingleLabelZpl(item = {}, settings = DEFAULT_LABEL_SETTINGS) {
    const dpi = settings.dpi;
    const widthDots = mmToDots(settings.widthMm, dpi);
    const heightDots = mmToDots(settings.heightMm, dpi);
    const baseX = mmToDots(2.2, dpi);
    const titleHeight = Math.max(24, Math.round((widthDots > 700 ? 34 : 30) * (settings.titleScale / 100)));
    const titleWidth = Math.max(20, Math.round((widthDots > 700 ? 28 : 24) * (settings.titleScale / 100)));
    const priceHeight = Math.max(36, Math.round((widthDots > 700 ? 54 : 48) * (settings.priceScale / 100)));
    const priceWidth = Math.max(28, Math.round((widthDots > 700 ? 42 : 36) * (settings.priceScale / 100)));
    const metaHeight = Math.max(18, Math.round(20 * (settings.metaScale / 100)));
    const metaWidth = Math.max(16, Math.round(18 * (settings.metaScale / 100)));
    let currentY = mmToDots(2.2, dpi);
    const lines = [];

    lines.push("^XA");
    lines.push(`^PW${widthDots}`);
    lines.push(`^LL${heightDots}`);
    lines.push("^LH0,0");
    lines.push("^CI28");

    wrapTextForZpl(normalizeZplText(item.description1 || "Item sem descrição"), widthDots > 700 ? 28 : 24, 2).forEach((line, index) => {
        lines.push(`^FO${baseX},${currentY + (index * mmToDots(3.8, dpi))}^A0N,${titleHeight},${titleWidth}^FD${escapeZpl(line)}^FS`);
    });
    currentY += mmToDots(9.4, dpi);

    const subtitleParts = [
        settings.showDescription2 ? normalizeZplText(item.description2) : "",
        settings.showDescription3 ? normalizeZplText(item.description3) : "",
        settings.showSection ? normalizeZplText(item.section) : "",
        settings.showUnit ? normalizeZplText(item.unit) : "",
    ].filter(Boolean);

    if (subtitleParts.length) {
        lines.push(`^FO${baseX},${currentY}^A0N,${metaHeight},${metaWidth}^FD${escapeZpl(subtitleParts.join(" - "))}^FS`);
        currentY += mmToDots(3.8, dpi);
    }

    if (settings.showPrice) {
        lines.push(`^FO${baseX},${currentY}^A0N,${priceHeight},${priceWidth}^FD${escapeZpl(normalizeZplText(item.priceLabel || "Sem preço"))}^FS`);
        currentY += mmToDots(8.6, dpi);
    }

    if (settings.showPrice && item.secondaryPrice) {
        lines.push(`^FO${baseX},${currentY}^A0N,${metaHeight},${metaWidth}^FD${escapeZpl(normalizeZplText(item.secondaryPrice))}^FS`);
        currentY += mmToDots(3.6, dpi);
    }

    if (item.offerLabel) {
        lines.push(`^FO${baseX},${currentY}^A0N,${metaHeight},${metaWidth}^FD${escapeZpl(normalizeZplText(item.offerLabel))}^FS`);
        currentY += mmToDots(3.6, dpi);
    }

    const ean = sanitizeBarcodeDigits(item.ean13, 13);

    if (settings.showBarcode && validateEan13(ean)) {
        const barcodeHeight = Math.max(mmToDots(8, dpi), 54);
        const barcodeY = Math.min(currentY + mmToDots(1.2, dpi), heightDots - barcodeHeight - mmToDots(7.2, dpi));
        lines.push(`^BY2,2,${barcodeHeight}`);
        lines.push(`^FO${baseX},${barcodeY}^BEN,${barcodeHeight},Y,N^FD${ean}^FS`);
        currentY = barcodeY + barcodeHeight + mmToDots(1.8, dpi);
    }

    const footerParts = [
        settings.showInternalCode ? normalizeZplText(item.internalCode) : "",
        settings.showEan && !settings.showBarcode ? ean : "",
    ].filter(Boolean);

    if (footerParts.length) {
        const footerY = Math.min(currentY, heightDots - mmToDots(4.6, dpi));
        lines.push(`^FO${baseX},${footerY}^A0N,${Math.max(16, metaHeight - 2)},${Math.max(14, metaWidth - 2)}^FD${escapeZpl(footerParts.join(" - "))}^FS`);
    }

    lines.push("^XZ");
    return lines.join("\n");
}

function expandLabelCopies(items = []) {
    return (Array.isArray(items) ? items : []).flatMap(item => (
        Array.from({ length: sanitizeCopies(item?.copies || 1) }, () => sanitizeLabelItem(item))
    ));
}

function sanitizeLabelItem(values = {}) {
    return {
        id: `${values?.id || values?.itemId || ""}`.trim(),
        description1: `${values?.description1 || ""}`.trim().slice(0, 80),
        description2: `${values?.description2 || ""}`.trim().slice(0, 60),
        description3: `${values?.description3 || ""}`.trim().slice(0, 60),
        section: `${values?.section || ""}`.trim().slice(0, 40),
        unit: `${values?.unit || ""}`.trim().slice(0, 24),
        internalCode: `${values?.internalCode || ""}`.trim().slice(0, 32),
        ean13: sanitizeBarcodeDigits(values?.ean13, 13),
        priceLabel: `${values?.priceLabel || ""}`.trim().slice(0, 48),
        secondaryPrice: `${values?.secondaryPrice || ""}`.trim().slice(0, 60),
        offerLabel: `${values?.offerLabel || ""}`.trim().slice(0, 60),
        copies: sanitizeCopies(values?.copies || 1),
    };
}

function mmToDots(value, dpi) {
    return Math.round((Number(value) / 25.4) * dpi);
}

function wrapTextForZpl(value, charsPerLine, maxLines) {
    const words = `${value || ""}`.split(/\s+/).filter(Boolean);
    const lines = [];
    let current = "";

    words.forEach(word => {
        const next = current ? `${current} ${word}` : word;

        if (next.length > charsPerLine && current) {
            lines.push(current);
            current = word;
            return;
        }

        current = next;
    });

    if (current) {
        lines.push(current);
    }

    return lines.slice(0, maxLines);
}

function normalizeZplText(value) {
    return `${value || ""}`
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\x20-\x7E]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function escapeZpl(value) {
    return `${value || ""}`
        .replace(/\^/g, " ")
        .replace(/~/g, " ");
}

function escapeHtml(value) {
    return `${value || ""}`
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function sanitizeDimension(value, fallback) {
    const parsed = Number(value);

    if (!Number.isFinite(parsed)) {
        return fallback;
    }

    return Math.min(Math.max(parsed, 20), 120);
}

function sanitizeCopies(value) {
    const parsed = parseInt(`${value || 0}`, 10);

    if (!Number.isInteger(parsed)) {
        return DEFAULT_LABEL_SETTINGS.defaultCopies;
    }

    return Math.min(Math.max(parsed, 1), 99);
}

function sanitizeScale(value, fallback, min, max) {
    const parsed = Number(value);

    if (!Number.isFinite(parsed)) {
        return fallback;
    }

    return Math.min(max, Math.max(min, Math.round(parsed)));
}

function sanitizeHexColor(value, fallback) {
    const normalized = `${value || ""}`.trim();
    return /^#[0-9a-fA-F]{6}$/.test(normalized) ? normalized : fallback;
}

function pickAllowed(value, allowedValues, fallback) {
    return allowedValues.includes(value) ? value : fallback;
}

function createId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
