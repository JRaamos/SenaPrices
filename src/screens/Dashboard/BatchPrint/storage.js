import { ReadObject, SaveObject } from "services/storage";

import { BATCH_PRINT_DEFAULT_DRAFT } from "./constants";
import {
    sanitizeBatchPrintDraft,
    sanitizeRecentBatchJob,
} from "./helpers";

const BATCH_PRINT_DRAFT_KEY = "batch-print-draft";
const BATCH_PRINT_RECENT_JOBS_KEY = "batch-print-recent-jobs";
const BATCH_PRINT_RECENT_LIMIT = 8;

export function readBatchPrintDraft() {
    return sanitizeBatchPrintDraft(ReadObject(BATCH_PRINT_DRAFT_KEY) || BATCH_PRINT_DEFAULT_DRAFT);
}

export function saveBatchPrintDraft(values = {}) {
    const draft = sanitizeBatchPrintDraft(values);
    SaveObject(BATCH_PRINT_DRAFT_KEY, draft);
    return draft;
}

export function readRecentBatchPrintJobs() {
    const values = ReadObject(BATCH_PRINT_RECENT_JOBS_KEY);

    if (!Array.isArray(values)) {
        return [];
    }

    return values
        .map(sanitizeRecentBatchJob)
        .filter(item => item.id && item.createdAt && item.selectedKeys.length)
        .sort((left, right) => `${right.createdAt || ""}`.localeCompare(`${left.createdAt || ""}`))
        .slice(0, BATCH_PRINT_RECENT_LIMIT);
}

export function appendRecentBatchPrintJob(values = {}) {
    const job = sanitizeRecentBatchJob({
        ...values,
        id: values?.id || createId("batch-print-job"),
        createdAt: values?.createdAt || new Date().toISOString(),
    });

    const nextJobs = [job, ...readRecentBatchPrintJobs()]
        .filter((item, index, list) => list.findIndex(candidate => candidate.id === item.id) === index)
        .slice(0, BATCH_PRINT_RECENT_LIMIT);

    SaveObject(BATCH_PRINT_RECENT_JOBS_KEY, nextJobs);
    return nextJobs;
}

function createId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
