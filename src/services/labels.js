import { ReadObject, SaveObject } from "./storage";
import { sanitizeBarcodeDigits, validateEan13 } from "utils/barcode";

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
    showSection: true,
    showUnit: true,
    showBarcode: true,
    showEan: true,
    showInternalCode: true,
    defaultCopies: 1,
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
        showSection: !!next.showSection,
        showUnit: !!next.showUnit,
        showBarcode: !!next.showBarcode,
        showEan: !!next.showEan,
        showInternalCode: !!next.showInternalCode,
        defaultCopies: sanitizeCopies(next.defaultCopies),
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

export function buildLabelPrintMarkup({ title = "Etiquetas SenaPrices", subtitle = "", items = [], settings = DEFAULT_LABEL_SETTINGS }) {
    const safeSettings = sanitizeLabelSettings(settings);
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
            font-family: Arial, Helvetica, sans-serif;
            color: #111827;
        }
        .header {
            margin-bottom: 16px;
            padding: 20px 22px;
            border-radius: 22px;
            background: linear-gradient(180deg, #06346b 0%, #0f172a 100%);
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
            color: rgba(255,255,255,0.76);
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
        }
        .name {
            font-size: ${safeSettings.heightMm >= 40 ? "14px" : safeSettings.heightMm >= 30 ? "12px" : "11px"};
            line-height: 1.05;
            font-weight: 800;
            letter-spacing: -0.03em;
        }
        .subtitle-row {
            color: #475569;
            font-size: 10px;
            line-height: 1.3;
        }
        .price {
            color: #06346b;
            font-size: ${safeSettings.heightMm >= 40 ? "24px" : safeSettings.heightMm >= 30 ? "20px" : "18px"};
            line-height: 0.95;
            font-weight: 800;
            letter-spacing: -0.05em;
        }
        .meta {
            color: #475569;
            font-size: 9px;
            line-height: 1.3;
        }
        .barcode {
            margin-top: auto;
            padding-top: 1.6mm;
            border-top: 0.2mm dashed #cbd5e1;
            font-family: monospace;
            font-size: 9px;
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
        ${labels.map(item => renderLabelMarkup(item, safeSettings)).join("")}
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

function renderLabelMarkup(item = {}, settings = DEFAULT_LABEL_SETTINGS) {
    const subtitleParts = [
        settings.showDescription2 ? item.description2 : "",
        settings.showSection ? item.section : "",
        settings.showUnit ? item.unit : "",
    ].filter(Boolean);
    const codeParts = [
        settings.showInternalCode ? item.internalCode : "",
        settings.showEan ? item.ean13 : "",
    ].filter(Boolean);

    return `
        <article class="label">
            <div class="name">${escapeHtml(item.description1 || "Item sem descricao")}</div>
            ${subtitleParts.length ? `<div class="subtitle-row">${escapeHtml(subtitleParts.join(" - "))}</div>` : ""}
            <div class="price">${escapeHtml(item.priceLabel || "Sem preco")}</div>
            ${item.secondaryPrice ? `<div class="meta">${escapeHtml(item.secondaryPrice)}</div>` : ""}
            ${item.offerLabel ? `<div class="meta">${escapeHtml(item.offerLabel)}</div>` : ""}
            ${(settings.showBarcode || codeParts.length)
                ? `<div class="barcode">${escapeHtml([
                    settings.showBarcode && item.ean13 ? item.ean13 : "",
                    ...codeParts,
                ].filter(Boolean).join(" - "))}</div>`
                : ""}
        </article>
    `;
}

function buildSingleLabelZpl(item = {}, settings = DEFAULT_LABEL_SETTINGS) {
    const dpi = settings.dpi;
    const widthDots = mmToDots(settings.widthMm, dpi);
    const heightDots = mmToDots(settings.heightMm, dpi);
    const baseX = mmToDots(2.2, dpi);
    let currentY = mmToDots(2.2, dpi);
    const lines = [];

    lines.push("^XA");
    lines.push(`^PW${widthDots}`);
    lines.push(`^LL${heightDots}`);
    lines.push("^LH0,0");
    lines.push("^CI28");

    wrapTextForZpl(normalizeZplText(item.description1 || "Item sem descricao"), widthDots > 700 ? 28 : 24, 2).forEach((line, index) => {
        lines.push(`^FO${baseX},${currentY + (index * mmToDots(3.8, dpi))}^A0N,${widthDots > 700 ? 34 : 30},${widthDots > 700 ? 28 : 24}^FD${escapeZpl(line)}^FS`);
    });
    currentY += mmToDots(9.4, dpi);

    const subtitleParts = [
        settings.showDescription2 ? normalizeZplText(item.description2) : "",
        settings.showSection ? normalizeZplText(item.section) : "",
        settings.showUnit ? normalizeZplText(item.unit) : "",
    ].filter(Boolean);

    if (subtitleParts.length) {
        lines.push(`^FO${baseX},${currentY}^A0N,20,18^FD${escapeZpl(subtitleParts.join(" - "))}^FS`);
        currentY += mmToDots(3.8, dpi);
    }

    lines.push(`^FO${baseX},${currentY}^A0N,${widthDots > 700 ? 54 : 48},${widthDots > 700 ? 42 : 36}^FD${escapeZpl(normalizeZplText(item.priceLabel || "Sem preco"))}^FS`);
    currentY += mmToDots(8.6, dpi);

    if (item.secondaryPrice) {
        lines.push(`^FO${baseX},${currentY}^A0N,20,18^FD${escapeZpl(normalizeZplText(item.secondaryPrice))}^FS`);
        currentY += mmToDots(3.6, dpi);
    }

    if (item.offerLabel) {
        lines.push(`^FO${baseX},${currentY}^A0N,20,18^FD${escapeZpl(normalizeZplText(item.offerLabel))}^FS`);
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
        lines.push(`^FO${baseX},${footerY}^A0N,18,16^FD${escapeZpl(footerParts.join(" - "))}^FS`);
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

function pickAllowed(value, allowedValues, fallback) {
    return allowedValues.includes(value) ? value : fallback;
}

function createId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
