import { ReadObject, SaveObject } from "services/storage";

import { DEFAULT_FORM_VALUES, PRICE_STUDIO_LIMITS } from "./constants";
import { sanitizeDraft } from "./helpers";

const DRAFT_KEY = "price-studio-draft";
const RECENT_KEY = "price-studio-recent";

export function readPriceStudioDraft() {
    const draft = ReadObject(DRAFT_KEY);

    if (!draft || typeof draft !== "object") {
        return {
            ...DEFAULT_FORM_VALUES,
        };
    }

    return sanitizeDraft(draft);
}

export function savePriceStudioDraft(values) {
    return SaveObject(DRAFT_KEY, sanitizeDraft(values));
}

export function clearPriceStudioDraft() {
    return SaveObject(DRAFT_KEY, DEFAULT_FORM_VALUES);
}

export function readRecentCompositions() {
    const recent = ReadObject(RECENT_KEY);

    if (!Array.isArray(recent)) {
        return [];
    }

    return recent
        .filter(item => item && typeof item === "object" && item.id)
        .slice(0, PRICE_STUDIO_LIMITS.recentMax);
}

export function appendRecentComposition(snapshot) {
    const recent = readRecentCompositions().filter(item => item?.id !== snapshot?.id);
    const nextRecent = [snapshot, ...recent].slice(0, PRICE_STUDIO_LIMITS.recentMax);
    SaveObject(RECENT_KEY, nextRecent);
    return nextRecent;
}
