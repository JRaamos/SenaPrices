import { DELETE, GET, PUT } from "./api";

import { ReadObject } from "./storage";
import { getLocalSessionUser, removeLocalAccount, updateLocalAccount } from "./localAccounts";

function isLocalSession() {
    const authentication = ReadObject("authentication") || {};
    return !!authentication?.localOnly;
}

export const ReadMe = async () => {
    if (isLocalSession()) {
        return getLocalSessionUser();
    }

    const apiUser = await GET("/me", true);
    if (apiUser?.id || apiUser?.documentId) {
        return apiUser;
    }

    return getLocalSessionUser();
};

export const UpdateMe = async params => {
    if (isLocalSession()) {
        return updateLocalAccount(getLocalSessionUser(), params);
    }

    return await PUT("/me", params, true);
};

export const RemoveMe = async () => {
    if (isLocalSession()) {
        const user = getLocalSessionUser();
        const removed = removeLocalAccount(user);
        return removed ? { ok: true } : { error: true, message: "Nao foi possivel remover a conta local." };
    }

    return await DELETE("/me", true);
};

export const UpdateMePassword = async params => {
    if (isLocalSession()) {
        const currentUser = getLocalSessionUser();
        const updated = updateLocalAccount(currentUser, {
            password: params?.password || params?.newPassword || "",
        });

        return updated || { error: true, message: "Nao foi possivel atualizar a senha local." };
    }

    return await PUT("/me/password", params, true);
};
