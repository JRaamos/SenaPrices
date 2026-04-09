import { GET } from "./api";
import { findLocalAccountMatch, readLocalAccountsDirectory } from "./localAccounts";

export async function readUsersDirectory() {
    const result = await GET("/users?populate=role", true);
    const apiItems = normalizeUsersResponse(result)
        .map(normalizeUserRecord)
        .filter(item => item.id && item.active);
    const localItems = readLocalAccountsDirectory()
        .map(normalizeUserRecord)
        .filter(item => item.id && item.active);

    const byIdentity = new Map();

    [...localItems, ...apiItems].forEach(item => {
        const key = getUserIdentity(item) || `${item?.email || ""}`.trim().toLowerCase();
        if (!key) {
            return;
        }

        const previous = byIdentity.get(key) || {};
        byIdentity.set(key, normalizeUserRecord({
            ...previous,
            ...item,
        }));
    });

    return Array.from(byIdentity.values());
}

export function normalizeUserRole(user = {}) {
    const localAccount = findLocalAccountMatch(user);
    const candidates = [
        user?.role,
        user?.role?.type,
        user?.role?.name,
        user?.role?.code,
        user?.role?.slug,
        user?.roleName,
        user?.roleType,
        user?.profile,
        localAccount?.role,
    ]
        .flatMap(value => {
            if (!value) return [];
            if (typeof value === "string") return [value];
            if (typeof value === "object") {
                return [
                    value?.type,
                    value?.name,
                    value?.code,
                    value?.slug,
                ].filter(Boolean);
            }
            return [];
        })
        .map(value => `${value || ""}`.trim().toLowerCase());

    if (candidates.some(value => value.includes("subadmin") || value.includes("supervisor"))) {
        return "subadmin";
    }

    if (candidates.some(value => value.includes("master"))) {
        return "master";
    }

    if (candidates.some(value => value.includes("admin"))) {
        return "admin";
    }

    return "user";
}

export function getUserIdentity(user = {}) {
    return `${user?.documentId || user?.id || user?.email || ""}`;
}

export function canManagePromotions(user = {}) {
    const role = normalizeUserRole(user);
    return role === "admin" || role === "subadmin";
}

export function canAccessSupportLog(user = {}) {
    const role = normalizeUserRole(user);
    return role === "admin" || role === "master";
}

function normalizeUsersResponse(result) {
    if (Array.isArray(result)) {
        return result;
    }

    if (Array.isArray(result?.data)) {
        return result.data.map(item => (
            item?.attributes
                ? { id: item.id, ...item.attributes }
                : item
        ));
    }

    return [];
}

function normalizeUserRecord(user = {}) {
    const id = getUserIdentity(user);
    const localAccount = findLocalAccountMatch(user);

    return {
        id,
        documentId: `${user?.documentId || user?.id || user?.email || ""}`,
        rawId: user?.id || null,
        name: `${user?.name || user?.username || user?.fullName || localAccount?.name || user?.email || "Usuario SenaPrices"}`.trim(),
        email: `${user?.email || localAccount?.email || ""}`.trim().toLowerCase(),
        role: normalizeUserRole({
            ...localAccount,
            ...user,
        }),
        active: user?.active !== false && user?.blocked !== true,
        source: user?.source || localAccount?.source || "api",
    };
}
