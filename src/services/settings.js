import { ReadObject, SaveObject } from "./storage";

const APP_SETTINGS_KEY = "app-settings";

export const DEFAULT_APP_SETTINGS = {
    print: {
        defaultPaperSize: "A5",
        defaultOrientation: "portrait",
        defaultShowBarcode: true,
        defaultShowValidity: true,
        defaultOfferTitle: "Oferta da semana",
        defaultQuickOfferTitle: "Oferta rápida",
    },
    updatedAt: "",
    updatedBy: null,
};

const ALLOWED_PAPER_SIZES = ["A6", "A5", "A4", "A3"];
const ALLOWED_ORIENTATIONS = ["portrait", "landscape"];

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

function sanitizeText(value, limit) {
    return `${value || ""}`.replace(/\s+/g, " ").trim().slice(0, limit);
}

function pickAllowed(value, allowedValues, fallback) {
    return allowedValues.includes(value) ? value : fallback;
}
