import { ReadObject, SaveObject } from "services/storage";

import { PROMOTION_DEFAULT_FORM_VALUES } from "./constants";
import { sanitizePromotionDraft } from "./helpers";

const DRAFT_KEY = "promotion-form-draft";

export function readPromotionDraft() {
    const draft = ReadObject(DRAFT_KEY);

    if (!draft || typeof draft !== "object") {
        return sanitizePromotionDraft(PROMOTION_DEFAULT_FORM_VALUES);
    }

    return sanitizePromotionDraft(draft);
}

export function savePromotionDraft(values) {
    return SaveObject(DRAFT_KEY, sanitizePromotionDraft(values));
}

export function clearPromotionDraft() {
    return SaveObject(DRAFT_KEY, sanitizePromotionDraft(PROMOTION_DEFAULT_FORM_VALUES));
}
