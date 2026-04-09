import CryptoJS from "crypto-js";

import { ReadObject, SaveObject } from "./storage";

const LOCAL_ACCOUNTS_KEY = "local-governance-accounts";
const LOCAL_SESSION_KEY = "local-governance-session";
const LOCAL_SECRET = "SenaPrices::LocalAccounts";

export const LOCAL_ACCOUNT_CREDENTIALS = [
    {
        role: "master",
        roleLabel: "Master",
        name: "Master SenaPrices",
        email: "master@senaprices.com",
        password: "Master@2025!",
        pin: "00000000",
        subscription: {
            plan: "none",
            status: "none",
        },
    },
    {
        role: "admin",
        roleLabel: "Administrador",
        name: "Administrador",
        email: "admin@sistema.com",
        password: "admin123",
        pin: "12341234",
        subscription: {
            plan: "profissional",
            status: "active",
            startDate: new Date().toISOString(),
            expiryDate: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)).toISOString(),
            autoRenew: true,
        },
    },
    {
        role: "subadmin",
        roleLabel: "Subadministrador",
        name: "Supervisor Operacional",
        email: "supervisor@sistema.com",
        password: "supervisor123",
        pin: "22223333",
        subscription: {
            plan: "profissional",
            status: "active",
            startDate: new Date().toISOString(),
            expiryDate: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)).toISOString(),
            autoRenew: true,
        },
    },
    {
        role: "user",
        roleLabel: "Operador",
        name: "Joao Silva",
        email: "joao@sistema.com",
        password: "user123",
        pin: "11112222",
        subscription: {
            plan: "profissional",
            status: "active",
            startDate: new Date().toISOString(),
            expiryDate: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)).toISOString(),
            autoRenew: true,
        },
    },
];

const DEFAULT_LOCAL_ACCOUNTS = LOCAL_ACCOUNT_CREDENTIALS.map((account, index) => ({
    id: account.role === "master" ? "local-master" : `local-account-${index + 1}`,
    documentId: account.role === "master" ? "local-master" : `local-account-${index + 1}`,
    name: account.name,
    email: account.email,
    role: account.role,
    active: true,
    passwordHash: hashSecret(account.password),
    pinHash: hashSecret(account.pin),
    subscription: account.subscription,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    source: "local",
}));

export function readLocalAccounts() {
    const stored = Array.isArray(ReadObject(LOCAL_ACCOUNTS_KEY))
        ? ReadObject(LOCAL_ACCOUNTS_KEY)
        : [];

    const merged = mergeWithDefaults(stored);
    const normalized = merged.map(normalizeLocalAccount);

    SaveObject(LOCAL_ACCOUNTS_KEY, normalized);

    return normalized;
}

export function readLocalAccountsDirectory() {
    return readLocalAccounts().map(stripSensitiveFields);
}

export function findLocalAccountMatch(subject = {}) {
    const accounts = readLocalAccounts();
    const email = `${subject?.email || ""}`.trim().toLowerCase();
    const documentId = `${subject?.documentId || subject?.id || ""}`.trim();

    if (!email && !documentId) {
        return null;
    }

    return accounts.find(account => (
        (email && account.email === email)
        || (documentId && (account.id === documentId || account.documentId === documentId))
    )) || null;
}

export function authenticateLocalAccount(identifier = "", password = "") {
    const normalizedIdentifier = `${identifier || ""}`.trim().toLowerCase();
    const normalizedPassword = `${password || ""}`;

    if (!normalizedIdentifier || !normalizedPassword) {
        return null;
    }

    const account = readLocalAccounts().find(item => (
        item.active
        && (
            item.email === normalizedIdentifier
            || `${item.name || ""}`.trim().toLowerCase() === normalizedIdentifier
        )
        && item.passwordHash === hashSecret(normalizedPassword)
    ));

    if (!account) {
        return null;
    }

    return stripSensitiveFields(account);
}

export function authenticateLocalAccountWithPin(pin = "") {
    const normalizedPin = `${pin || ""}`.replace(/\D/g, "").slice(0, 8);
    if (normalizedPin.length !== 8) {
        return null;
    }

    const account = readLocalAccounts().find(item => (
        item.active
        && item.pinHash === hashSecret(normalizedPin)
    ));

    if (!account) {
        return null;
    }

    return stripSensitiveFields(account);
}

export function validateLocalAccountPin(subject = {}, pin = "") {
    const account = findLocalAccountMatch(subject);
    const normalizedPin = `${pin || ""}`.replace(/\D/g, "").slice(0, 8);

    if (!account || normalizedPin.length !== 8) {
        return false;
    }

    return account.pinHash === hashSecret(normalizedPin);
}

export function getLocalSessionUser() {
    const session = ReadObject(LOCAL_SESSION_KEY) || {};
    if (!session?.accountId) {
        return null;
    }

    const account = readLocalAccounts().find(item => item.id === session.accountId);
    return account ? stripSensitiveFields(account) : null;
}

export function setLocalSessionUser(account = {}) {
    const accountId = `${account?.documentId || account?.id || ""}`.trim();
    if (!accountId) {
        return null;
    }

    SaveObject(LOCAL_SESSION_KEY, {
        accountId,
        localOnly: true,
        authenticatedAt: new Date().toISOString(),
    });

    return getLocalSessionUser();
}

export function clearLocalSession() {
    SaveObject(LOCAL_SESSION_KEY, {});
    return true;
}

export function updateLocalAccount(subject = {}, patch = {}) {
    const current = findLocalAccountMatch(subject);
    if (!current) {
        return null;
    }

    const accounts = readLocalAccounts();
    const nextAccounts = accounts.map(account => {
        if (account.id !== current.id) {
            return account;
        }

        const next = normalizeLocalAccount({
            ...account,
            ...patch,
            email: patch?.email ? `${patch.email}`.trim().toLowerCase() : account.email,
            passwordHash: patch?.password ? hashSecret(`${patch.password}`) : account.passwordHash,
            pinHash: patch?.pin ? hashSecret(`${patch.pin}`) : account.pinHash,
            updatedAt: new Date().toISOString(),
        });

        return next;
    });

    SaveObject(LOCAL_ACCOUNTS_KEY, nextAccounts);

    const updated = nextAccounts.find(account => account.id === current.id);
    return updated ? stripSensitiveFields(updated) : null;
}

export function createLocalAccount(values = {}) {
    const draft = normalizeDraftAccount(values);
    const accounts = readLocalAccounts();

    if (draft.role === "master") {
        throw new Error("A conta master é gerenciada separadamente.");
    }

    if (accounts.some(account => account.email === draft.email)) {
        throw new Error("Já existe uma conta com este e-mail.");
    }

    const nextAccount = normalizeLocalAccount({
        id: `local-account-${Date.now()}`,
        documentId: `local-account-${Date.now()}`,
        name: draft.name,
        email: draft.email,
        role: draft.role,
        active: draft.active,
        passwordHash: hashSecret(draft.password),
        pinHash: hashSecret(draft.pin),
        subscription: draft.subscription,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        source: "local",
    });

    SaveObject(LOCAL_ACCOUNTS_KEY, [...accounts, nextAccount]);
    return stripSensitiveFields(nextAccount);
}

export function saveGovernedLocalAccount(subject = {}, patch = {}) {
    const current = findLocalAccountMatch(subject);
    if (!current) {
        return null;
    }

    if (current.role === "master" && patch?.role && patch.role !== "master") {
        throw new Error("A conta master não pode mudar de perfil.");
    }

    const accounts = readLocalAccounts();
    const nextDraft = normalizeDraftAccount({
        ...current,
        ...patch,
        subscription: patch?.subscription || current.subscription,
        password: patch?.password || "",
        pin: patch?.pin || "",
        allowEmptySecrets: true,
    }, true);

    if (accounts.some(account => account.id !== current.id && account.email === nextDraft.email)) {
        throw new Error("Já existe outra conta com este e-mail.");
    }

    const nextAccounts = accounts.map(account => {
        if (account.id !== current.id) {
            return account;
        }

        return normalizeLocalAccount({
            ...account,
            name: nextDraft.name,
            email: nextDraft.email,
            role: current.role === "master" ? "master" : nextDraft.role,
            active: current.role === "master" ? true : nextDraft.active,
            passwordHash: nextDraft.password ? hashSecret(nextDraft.password) : account.passwordHash,
            pinHash: nextDraft.pin ? hashSecret(nextDraft.pin) : account.pinHash,
            subscription: nextDraft.subscription,
            updatedAt: new Date().toISOString(),
        });
    });

    SaveObject(LOCAL_ACCOUNTS_KEY, nextAccounts);
    const updated = nextAccounts.find(account => account.id === current.id);
    return updated ? stripSensitiveFields(updated) : null;
}

export function toggleLocalAccountActive(subject = {}) {
    const current = findLocalAccountMatch(subject);
    if (!current || current.role === "master") {
        throw new Error("A conta selecionada não pode ser desativada.");
    }

    return updateLocalAccount(current, {
        active: !current.active,
    });
}

export function removeLocalAccount(subject = {}) {
    const current = findLocalAccountMatch(subject);
    if (!current || current.role === "master") {
        return false;
    }

    const nextAccounts = readLocalAccounts().filter(account => account.id !== current.id);
    SaveObject(LOCAL_ACCOUNTS_KEY, nextAccounts);

    const session = ReadObject(LOCAL_SESSION_KEY) || {};
    if (session?.accountId === current.id) {
        clearLocalSession();
    }

    return true;
}

function mergeWithDefaults(storedAccounts = []) {
    const byEmail = new Map(
        storedAccounts
            .map(account => normalizeLocalAccount(account))
            .filter(account => account.email)
            .map(account => [account.email, account])
    );

    DEFAULT_LOCAL_ACCOUNTS.forEach(account => {
        if (!byEmail.has(account.email)) {
            byEmail.set(account.email, account);
        }
    });

    return Array.from(byEmail.values());
}

function normalizeLocalAccount(account = {}) {
    return {
        id: `${account?.id || account?.documentId || account?.email || ""}`.trim(),
        documentId: `${account?.documentId || account?.id || account?.email || ""}`.trim(),
        name: `${account?.name || account?.email || "SenaPrices"}`.trim(),
        email: `${account?.email || ""}`.trim().toLowerCase(),
        role: normalizeRole(account?.role),
        active: account?.active !== false,
        passwordHash: `${account?.passwordHash || ""}`.trim(),
        pinHash: `${account?.pinHash || ""}`.trim(),
        subscription: normalizeSubscription(account?.subscription),
        createdAt: `${account?.createdAt || ""}`.trim() || new Date().toISOString(),
        updatedAt: `${account?.updatedAt || ""}`.trim() || new Date().toISOString(),
        source: "local",
    };
}

function stripSensitiveFields(account = {}) {
    return {
        id: account.id,
        documentId: account.documentId,
        name: account.name,
        email: account.email,
        role: account.role,
        active: account.active,
        subscription: normalizeSubscription(account.subscription),
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
        source: "local",
    };
}

function normalizeDraftAccount(values = {}, isUpdate = false) {
    const role = normalizeRole(values?.role);
    const name = `${values?.name || ""}`.trim();
    const email = `${values?.email || ""}`.trim().toLowerCase();
    const password = `${values?.password || ""}`.trim();
    const pin = `${values?.pin || ""}`.replace(/\D/g, "").slice(0, 8);
    const allowEmptySecrets = !!values?.allowEmptySecrets;

    if (!name) {
        throw new Error("Informe o nome do usuário.");
    }

    if (!email || !email.includes("@")) {
        throw new Error("Informe um e-mail válido.");
    }

    if ((!isUpdate || !allowEmptySecrets) && password.length < 6) {
        throw new Error("A senha deve ter ao menos 6 caracteres.");
    }

    if ((!isUpdate || !allowEmptySecrets) && pin.length !== 8) {
        throw new Error("O PIN deve ter 8 dígitos.");
    }

    if (isUpdate && !allowEmptySecrets && values?.password !== undefined && password.length && password.length < 6) {
        throw new Error("A senha deve ter ao menos 6 caracteres.");
    }

    if (isUpdate && !allowEmptySecrets && values?.pin !== undefined && pin.length && pin.length !== 8) {
        throw new Error("O PIN deve ter 8 dígitos.");
    }

    return {
        name,
        email,
        role,
        active: values?.active !== false,
        password,
        pin,
        subscription: normalizeSubscription(values?.subscription),
    };
}

function normalizeRole(value = "") {
    const role = `${value || ""}`.trim().toLowerCase();

    if (role === "master") return "master";
    if (role === "subadmin" || role === "supervisor") return "subadmin";
    if (role === "admin") return "admin";
    return "user";
}

function normalizeSubscription(subscription = {}) {
    return {
        plan: `${subscription?.plan || "none"}`.trim().toLowerCase() || "none",
        status: `${subscription?.status || "none"}`.trim().toLowerCase() || "none",
        startDate: subscription?.startDate || null,
        expiryDate: subscription?.expiryDate || null,
        autoRenew: subscription?.autoRenew !== false,
    };
}

function hashSecret(value = "") {
    return CryptoJS.SHA256(`${LOCAL_SECRET}:${value}`).toString();
}
