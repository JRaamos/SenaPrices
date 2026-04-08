import { ReadObject, SaveObject } from "services/storage";

import { QUICK_PRICE_DEFAULT_DRAFT, QUICK_PRICE_LIMITS } from "./constants";
import { sanitizeQuickDraft } from "./helpers";

const DRAFT_KEY = "quick-price-draft";
const RECENT_KEY = "quick-price-recent";

export function readQuickPriceDraft() {
    const draft = ReadObject(DRAFT_KEY);

    if (!draft || typeof draft !== "object") {
        return sanitizeQuickDraft(QUICK_PRICE_DEFAULT_DRAFT);
    }

    return sanitizeQuickDraft(draft);
}

export function saveQuickPriceDraft(values) {
    return SaveObject(DRAFT_KEY, sanitizeQuickDraft(values));
}

export function clearQuickPriceDraft() {
    return SaveObject(DRAFT_KEY, QUICK_PRICE_DEFAULT_DRAFT);
}

export function readRecentQuickBatches() {
    const recent = ReadObject(RECENT_KEY);

    if (!Array.isArray(recent)) {
        return [];
    }

    return recent
        .filter(item => item && typeof item === "object" && item.id)
        .slice(0, QUICK_PRICE_LIMITS.recentMax);
}

export function appendRecentQuickBatch(snapshot) {
    const recent = readRecentQuickBatches().filter(item => item?.id !== snapshot?.id);
    const nextRecent = [snapshot, ...recent].slice(0, QUICK_PRICE_LIMITS.recentMax);
    SaveObject(RECENT_KEY, nextRecent);
    return nextRecent;
}
