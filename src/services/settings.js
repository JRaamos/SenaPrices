import { ReadObject, SaveObject } from "./storage";

const APP_SETTINGS_KEY = "app-settings";

export const PRINT_FONT_OPTIONS = [
    { value: "Arial, Helvetica, sans-serif", label: "Arial" },
    { value: '"Montserrat", Arial, sans-serif', label: "Montserrat" },
    { value: '"Roboto", Arial, sans-serif', label: "Roboto" },
    { value: "Verdana, Geneva, sans-serif", label: "Verdana" },
    { value: "Georgia, serif", label: "Georgia" },
];

export const ALIGN_OPTIONS = [
    { value: "left", label: "Esquerda" },
    { value: "center", label: "Centro" },
    { value: "right", label: "Direita" },
];

export const TITLE_TRANSFORM_OPTIONS = [
    { value: "none", label: "Normal" },
    { value: "uppercase", label: "Maiúsculas" },
];

export const PRICE_SYMBOL_POSITION_OPTIONS = [
    { value: "left", label: "Ao lado" },
    { value: "top", label: "Acima" },
    { value: "hidden", label: "Ocultar" },
];

export const PRICE_CENTS_ALIGN_OPTIONS = [
    { value: "top", label: "No topo" },
    { value: "center", label: "No centro" },
    { value: "bottom", label: "Na base" },
];

export const PRICE_UNIT_POSITION_OPTIONS = [
    { value: "inline", label: "Na mesma linha" },
    { value: "below", label: "Abaixo do preço" },
    { value: "hidden", label: "Ocultar" },
];

export const INFO_POSITION_OPTIONS = [
    { value: "meta", label: "Na grade final" },
    { value: "header", label: "Perto do cabeçalho" },
    { value: "footer", label: "No rodapé" },
    { value: "hidden", label: "Ocultar" },
];

export const VALIDITY_POSITION_OPTIONS = [
    { value: "meta", label: "Na grade final" },
    { value: "badge", label: "Ao lado do selo" },
    { value: "footer", label: "No rodapé" },
    { value: "hidden", label: "Ocultar" },
];

export const META_LAYOUT_OPTIONS = [
    { value: "grid", label: "Em cards" },
    { value: "stacked", label: "Em lista" },
];

export const A5_SHEET_MODE_OPTIONS = [
    { value: "single", label: "1 cartaz por impressão" },
    { value: "a4-2up", label: "2 cartazes A5 em folha A4" },
];

export const A6_SHEET_MODE_OPTIONS = [
    { value: "single", label: "1 cartaz por impressão" },
    { value: "a4-4up", label: "4 cartazes A6 em folha A4" },
];

export const DEFAULT_APP_SETTINGS = {
    print: {
        defaultPaperSize: "A5",
        defaultOrientation: "portrait",
        defaultShowBarcode: true,
        defaultShowValidity: true,
        defaultOfferTitle: "Oferta da semana",
        defaultQuickOfferTitle: "Oferta rápida",
        titleFontFamily: '"Montserrat", Arial, sans-serif',
        priceFontFamily: '"Montserrat", Arial, sans-serif',
        infoFontFamily: "Arial, Helvetica, sans-serif",
        titleAlign: "left",
        priceAlign: "left",
        titleTransform: "none",
        descriptionScale: 100,
        priceScale: 100,
        accentColor: "#06346b",
        highlightColor: "#e86c30",
        priceSymbolPosition: "left",
        priceSymbolOffsetX: 0,
        priceSymbolOffsetY: 0,
        centsAlign: "top",
        centsOffsetX: 0,
        centsOffsetY: 0,
        commaOffsetX: 0,
        commaOffsetY: 0,
        unitPosition: "below",
        unitOffsetX: 0,
        unitOffsetY: 0,
        barcodePosition: "meta",
        validityPosition: "meta",
        observationPosition: "footer",
        metaLayout: "grid",
        framePadding: 28,
        frameRadius: 24,
        a5SheetMode: "single",
        a6SheetMode: "single",
    },
    updatedAt: "",
    updatedBy: null,
};

const ALLOWED_PAPER_SIZES = ["A6", "A5", "A4", "A3"];
const ALLOWED_ORIENTATIONS = ["portrait", "landscape"];
const ALLOWED_A5_SHEET_MODES = A5_SHEET_MODE_OPTIONS.map(item => item.value);
const ALLOWED_A6_SHEET_MODES = A6_SHEET_MODE_OPTIONS.map(item => item.value);

export function readAppSettings() {
    return sanitizeAppSettings(ReadObject(APP_SETTINGS_KEY) || DEFAULT_APP_SETTINGS);
}

export function saveAppSettings(values = {}, user = null) {
    const current = readAppSettings();
    const next = sanitizeAppSettings({
        ...current,
        ...(values || {}),
        updatedAt: new Date().toISOString(),
        updatedBy: user?.email || user?.documentId || user?.id || current.updatedBy || null,
    });

    SaveObject(APP_SETTINGS_KEY, next);
    return next;
}

export function sanitizeAppSettings(values = {}) {
    const next = {
        ...DEFAULT_APP_SETTINGS,
        ...(values || {}),
        print: {
            ...DEFAULT_APP_SETTINGS.print,
            ...(values?.print || {}),
        },
    };

    return {
        print: {
            defaultPaperSize: pickAllowed(
                next.print.defaultPaperSize,
                ALLOWED_PAPER_SIZES,
                DEFAULT_APP_SETTINGS.print.defaultPaperSize
            ),
            defaultOrientation: pickAllowed(
                next.print.defaultOrientation,
                ALLOWED_ORIENTATIONS,
                DEFAULT_APP_SETTINGS.print.defaultOrientation
            ),
            defaultShowBarcode: !!next.print.defaultShowBarcode,
            defaultShowValidity: !!next.print.defaultShowValidity,
            defaultOfferTitle: sanitizeText(next.print.defaultOfferTitle, 30) || DEFAULT_APP_SETTINGS.print.defaultOfferTitle,
            defaultQuickOfferTitle: sanitizeText(next.print.defaultQuickOfferTitle, 30) || DEFAULT_APP_SETTINGS.print.defaultQuickOfferTitle,
            titleFontFamily: pickAllowed(
                next.print.titleFontFamily,
                PRINT_FONT_OPTIONS.map(item => item.value),
                DEFAULT_APP_SETTINGS.print.titleFontFamily
            ),
            priceFontFamily: pickAllowed(
                next.print.priceFontFamily,
                PRINT_FONT_OPTIONS.map(item => item.value),
                DEFAULT_APP_SETTINGS.print.priceFontFamily
            ),
            infoFontFamily: pickAllowed(
                next.print.infoFontFamily,
                PRINT_FONT_OPTIONS.map(item => item.value),
                DEFAULT_APP_SETTINGS.print.infoFontFamily
            ),
            titleAlign: pickAllowed(
                next.print.titleAlign,
                ALIGN_OPTIONS.map(item => item.value),
                DEFAULT_APP_SETTINGS.print.titleAlign
            ),
            priceAlign: pickAllowed(
                next.print.priceAlign,
                ALIGN_OPTIONS.map(item => item.value),
                DEFAULT_APP_SETTINGS.print.priceAlign
            ),
            titleTransform: pickAllowed(
                next.print.titleTransform,
                TITLE_TRANSFORM_OPTIONS.map(item => item.value),
                DEFAULT_APP_SETTINGS.print.titleTransform
            ),
            descriptionScale: sanitizeScale(next.print.descriptionScale, DEFAULT_APP_SETTINGS.print.descriptionScale, 80, 140),
            priceScale: sanitizeScale(next.print.priceScale, DEFAULT_APP_SETTINGS.print.priceScale, 80, 180),
            accentColor: sanitizeHexColor(next.print.accentColor, DEFAULT_APP_SETTINGS.print.accentColor),
            highlightColor: sanitizeHexColor(next.print.highlightColor, DEFAULT_APP_SETTINGS.print.highlightColor),
            priceSymbolPosition: pickAllowed(
                next.print.priceSymbolPosition,
                PRICE_SYMBOL_POSITION_OPTIONS.map(item => item.value),
                DEFAULT_APP_SETTINGS.print.priceSymbolPosition
            ),
            priceSymbolOffsetX: sanitizeOffset(next.print.priceSymbolOffsetX, DEFAULT_APP_SETTINGS.print.priceSymbolOffsetX),
            priceSymbolOffsetY: sanitizeOffset(next.print.priceSymbolOffsetY, DEFAULT_APP_SETTINGS.print.priceSymbolOffsetY),
            centsAlign: pickAllowed(
                next.print.centsAlign,
                PRICE_CENTS_ALIGN_OPTIONS.map(item => item.value),
                DEFAULT_APP_SETTINGS.print.centsAlign
            ),
            centsOffsetX: sanitizeOffset(next.print.centsOffsetX, DEFAULT_APP_SETTINGS.print.centsOffsetX),
            centsOffsetY: sanitizeOffset(next.print.centsOffsetY, DEFAULT_APP_SETTINGS.print.centsOffsetY),
            commaOffsetX: sanitizeOffset(next.print.commaOffsetX, DEFAULT_APP_SETTINGS.print.commaOffsetX),
            commaOffsetY: sanitizeOffset(next.print.commaOffsetY, DEFAULT_APP_SETTINGS.print.commaOffsetY),
            unitPosition: pickAllowed(
                next.print.unitPosition,
                PRICE_UNIT_POSITION_OPTIONS.map(item => item.value),
                DEFAULT_APP_SETTINGS.print.unitPosition
            ),
            unitOffsetX: sanitizeOffset(next.print.unitOffsetX, DEFAULT_APP_SETTINGS.print.unitOffsetX),
            unitOffsetY: sanitizeOffset(next.print.unitOffsetY, DEFAULT_APP_SETTINGS.print.unitOffsetY),
            barcodePosition: pickAllowed(
                next.print.barcodePosition,
                INFO_POSITION_OPTIONS.map(item => item.value),
                DEFAULT_APP_SETTINGS.print.barcodePosition
            ),
            validityPosition: pickAllowed(
                next.print.validityPosition,
                VALIDITY_POSITION_OPTIONS.map(item => item.value),
                DEFAULT_APP_SETTINGS.print.validityPosition
            ),
            observationPosition: pickAllowed(
                next.print.observationPosition,
                INFO_POSITION_OPTIONS.map(item => item.value),
                DEFAULT_APP_SETTINGS.print.observationPosition
            ),
            metaLayout: pickAllowed(
                next.print.metaLayout,
                META_LAYOUT_OPTIONS.map(item => item.value),
                DEFAULT_APP_SETTINGS.print.metaLayout
            ),
            framePadding: sanitizeScale(next.print.framePadding, DEFAULT_APP_SETTINGS.print.framePadding, 18, 40),
            frameRadius: sanitizeScale(next.print.frameRadius, DEFAULT_APP_SETTINGS.print.frameRadius, 12, 32),
            a5SheetMode: pickAllowed(
                next.print.a5SheetMode,
                ALLOWED_A5_SHEET_MODES,
                DEFAULT_APP_SETTINGS.print.a5SheetMode
            ),
            a6SheetMode: pickAllowed(
                next.print.a6SheetMode,
                ALLOWED_A6_SHEET_MODES,
                DEFAULT_APP_SETTINGS.print.a6SheetMode
            ),
        },
        updatedAt: `${next.updatedAt || ""}`.trim(),
        updatedBy: next.updatedBy || null,
    };
}

export function getCreatePriceDefaults() {
    const settings = readAppSettings();

    return {
        paperSize: settings.print.defaultPaperSize,
        orientation: settings.print.defaultOrientation,
        showBarcode: settings.print.defaultShowBarcode,
        showValidity: settings.print.defaultShowValidity,
        offerTitle: settings.print.defaultOfferTitle,
    };
}

export function getQuickPriceDefaults() {
    const settings = readAppSettings();

    return {
        paperSize: settings.print.defaultPaperSize,
        orientation: settings.print.defaultOrientation,
        showBarcode: settings.print.defaultShowBarcode,
        showValidity: settings.print.defaultShowValidity,
        offerTitle: settings.print.defaultQuickOfferTitle,
    };
}

export function getPrintStyleSettings() {
    return readAppSettings().print;
}

export function resolvePosterSheetLayout(paperSize, orientation, printSettings = getPrintStyleSettings()) {
    const safePaperSize = pickAllowed(paperSize, ALLOWED_PAPER_SIZES, "A5");
    const safeOrientation = pickAllowed(orientation, ALLOWED_ORIENTATIONS, "portrait");

    if (safePaperSize === "A5" && printSettings.a5SheetMode === "a4-2up") {
        const isLandscape = safeOrientation === "landscape";

        return {
            enabled: true,
            mode: "a4-2up",
            sheetSize: "A4",
            sheetLabel: "Folha A4 com 2 cartazes A5",
            helperText: "A5 configurado para imprimir 2 cartazes por folha A4.",
            copies: 2,
            columns: isLandscape ? 2 : 1,
            rows: isLandscape ? 1 : 2,
            sheetOrientation: isLandscape ? "landscape" : "portrait",
        };
    }

    if (safePaperSize === "A6" && printSettings.a6SheetMode === "a4-4up") {
        return {
            enabled: true,
            mode: "a4-4up",
            sheetSize: "A4",
            sheetLabel: "Folha A4 com 4 cartazes A6",
            helperText: "A6 configurado para imprimir 4 cartazes por folha A4.",
            copies: 4,
            columns: 2,
            rows: 2,
            sheetOrientation: safeOrientation,
        };
    }

    return {
        enabled: false,
        mode: "single",
        sheetSize: safePaperSize,
        sheetLabel: `${safePaperSize} individual`,
        helperText: `${safePaperSize} configurado para impressão unitária.`,
        copies: 1,
        columns: 1,
        rows: 1,
        sheetOrientation: safeOrientation,
    };
}

function sanitizeText(value, limit) {
    return `${value || ""}`.replace(/\s+/g, " ").trim().slice(0, limit);
}

function pickAllowed(value, allowedValues, fallback) {
    return allowedValues.includes(value) ? value : fallback;
}

function sanitizeScale(value, fallback, min, max) {
    const parsed = Number(value);

    if (!Number.isFinite(parsed)) {
        return fallback;
    }

    return Math.min(max, Math.max(min, Math.round(parsed)));
}

function sanitizeOffset(value, fallback) {
    const parsed = Number(value);

    if (!Number.isFinite(parsed)) {
        return fallback;
    }

    return Math.min(48, Math.max(-48, Math.round(parsed)));
}

function sanitizeHexColor(value, fallback) {
    const normalized = `${value || ""}`.trim();
    return /^#[0-9a-fA-F]{6}$/.test(normalized) ? normalized : fallback;
}
