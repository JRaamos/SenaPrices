import { ReadObject, SaveObject } from "services/storage";

import { ITEM_DEFAULT_FORM_VALUES } from "./constants";
import { sanitizeItemDraft } from "./helpers";

const DRAFT_KEY = "create-item-draft";

export function readCreateItemDraft() {
    const draft = ReadObject(DRAFT_KEY);

    if (!draft || typeof draft !== "object") {
        return sanitizeItemDraft(ITEM_DEFAULT_FORM_VALUES);
    }

    return sanitizeItemDraft(draft);
}

export function saveCreateItemDraft(values) {
    return SaveObject(DRAFT_KEY, sanitizeItemDraft(values));
}

export function clearCreateItemDraft() {
    return SaveObject(DRAFT_KEY, ITEM_DEFAULT_FORM_VALUES);
}
