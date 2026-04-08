import { ReadObject, SaveObject } from "./storage";

const SUPPORT_ACCESS_KEY = "support-access-logs";

export function readSupportAccessLogs() {
    const values = ReadObject(SUPPORT_ACCESS_KEY);

    if (!Array.isArray(values)) {
        return [];
    }

    return values
        .map(sanitizeSupportAccessLog)
        .filter(item => item.id && item.adminName && item.targetUser)
        .sort((left, right) => `${right.accessDate}|${right.createdAt}`.localeCompare(`${left.accessDate}|${left.createdAt}`));
}

export function createSupportAccessLog(values = {}, user = {}) {
    const draft = sanitizeSupportAccessDraft(values, user);

    if (!draft.adminName || draft.adminName.length < 3) {
        throw new Error("Informe o responsável pelo acesso com pelo menos 3 caracteres.");
    }

    if (!draft.targetUser || draft.targetUser.length < 3) {
        throw new Error("Informe a conta ou usuário alvo com pelo menos 3 caracteres.");
    }

    if (!draft.justification || draft.justification.length < 10) {
        throw new Error("Explique a justificativa do acesso com pelo menos 10 caracteres.");
    }

    if (!draft.ticketCode) {
        throw new Error("Informe o ticket vinculado ao acesso.");
    }

    const current = readSupportAccessLogs();
    const nextLog = {
        ...draft,
        id: createId("support-access"),
        createdAt: new Date().toISOString(),
        createdBy: user?.documentId || user?.id || user?.email || null,
    };

    const nextLogs = [nextLog, ...current];
    SaveObject(SUPPORT_ACCESS_KEY, nextLogs);
    return nextLog;
}

export function deleteSupportAccessLog(id) {
    const nextLogs = readSupportAccessLogs().filter(item => item.id !== id);
    SaveObject(SUPPORT_ACCESS_KEY, nextLogs);
    return nextLogs;
}

export function sanitizeSupportAccessLog(values = {}) {
    return {
        id: `${values?.id || ""}`.trim(),
        accessDate: sanitizeDate(values?.accessDate),
        adminName: sanitizeText(values?.adminName, 70),
        targetUser: sanitizeText(values?.targetUser, 80),
        justification: sanitizeText(values?.justification, 240),
        ticketCode: sanitizeTicketCode(values?.ticketCode),
        createdAt: `${values?.createdAt || ""}`.trim(),
        createdBy: values?.createdBy || null,
    };
}

export function buildSupportAccessCsvRows(logs = []) {
    return (Array.isArray(logs) ? logs : []).map(item => ({
        accessDate: item.accessDate,
        adminName: item.adminName,
        targetUser: item.targetUser,
        justification: item.justification,
        ticketCode: item.ticketCode,
        createdAt: item.createdAt,
    }));
}

export function createDefaultSupportAccessDraft(user = {}) {
    return {
        accessDate: new Date().toISOString().slice(0, 10),
        adminName: sanitizeText(user?.name || user?.email || "", 70),
        targetUser: "",
        justification: "",
        ticketCode: "",
    };
}

function sanitizeSupportAccessDraft(values = {}, user = {}) {
    return sanitizeSupportAccessLog({
        ...createDefaultSupportAccessDraft(user),
        ...(values || {}),
    });
}

function sanitizeText(value, limit) {
    return `${value || ""}`.replace(/\s+/g, " ").trim().slice(0, limit);
}

function sanitizeDate(value) {
    const safeValue = `${value || ""}`.trim();

    if (!safeValue) {
        return new Date().toISOString().slice(0, 10);
    }

    const parsed = new Date(safeValue);
    if (Number.isNaN(parsed.getTime())) {
        return new Date().toISOString().slice(0, 10);
    }

    return parsed.toISOString().slice(0, 10);
}

function sanitizeTicketCode(value) {
    const safeValue = `${value || ""}`.replace(/\s+/g, "").trim().slice(0, 24);
    if (!safeValue) return "";
    return safeValue.startsWith("#") ? safeValue.toUpperCase() : `#${safeValue.toUpperCase()}`;
}

function createId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
