import { GET } from "./api";

export async function readUsersDirectory() {
    const result = await GET("/users?populate=role", true);
    const items = normalizeUsersResponse(result);

    return items
        .map(normalizeUserRecord)
        .filter(item => item.id && item.active);
}

export function normalizeUserRole(user = {}) {
    const candidates = [
        user?.role,
        user?.role?.type,
        user?.role?.name,
        user?.role?.code,
        user?.role?.slug,
        user?.roleName,
        user?.roleType,
        user?.profile,
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
    return `${user?.documentId || user?.id || ""}`;
}

export function canManagePromotions(user = {}) {
    const role = normalizeUserRole(user);
    return role === "admin" || role === "subadmin";
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

    return {
        id,
        documentId: `${user?.documentId || user?.id || ""}`,
        rawId: user?.id || null,
        name: `${user?.name || user?.username || user?.fullName || user?.email || "Usuario SenaPrices"}`.trim(),
        email: `${user?.email || ""}`.trim(),
        role: normalizeUserRole(user),
        active: user?.active !== false && user?.blocked !== true,
    };
}
