import { GET, POST } from "./api";
import {
    authenticateLocalAccount,
    authenticateLocalAccountWithPin,
    clearLocalSession,
    getLocalSessionUser,
    setLocalSessionUser,
} from "./localAccounts";
import { ReadObject, SaveObject } from "./storage";

export const DoRegister = async params => {
    return await POST("/auth/local/register", params);
};

export const hasAuthenticatedSession = (authentication = {}) => {
    return !!authentication?.jwt && authentication?.pendingPin !== true;
};

export const DoLogin = async params => {
    const response = await POST("/auth/local", params);

    if (response?.jwt) {
        clearLocalSession();
        SaveObject("authentication", {
            ...response,
            localOnly: false,
            source: "api",
        });
        return response;
    }

    const identifier = params?.identifier || params?.email || params?.username || "";
    const localUser = authenticateLocalAccount(identifier, params?.password);

    if (!localUser) {
        return response;
    }

    setLocalSessionUser(localUser);

    const auth = {
        jwt: `local-session-${localUser.documentId}`,
        user: localUser,
        localOnly: true,
        source: "local-governance",
        issuedAt: new Date().toISOString(),
    };

    SaveObject("authentication", auth);
    SaveObject("user", localUser);

    return auth;
};

export const DoLoginWithPin = async pin => {
    const localUser = authenticateLocalAccountWithPin(pin);

    if (!localUser) {
        return false;
    }

    setLocalSessionUser(localUser);

    const auth = {
        jwt: `local-pin-session-${localUser.documentId}`,
        user: localUser,
        localOnly: true,
        source: "local-governance",
        issuedAt: new Date().toISOString(),
    };

    SaveObject("authentication", auth);
    SaveObject("user", localUser);

    return auth;
};

export const DoLogout = async () => {
    clearLocalSession();
    SaveObject("authentication", {});
    SaveObject("user", {});
    return true;
};

export const DoForgotPassword = async params => {
    return await POST("/auth/forgot-password", params);
};

export const DoResetPassword = async params => {
    return await POST("/auth/reset-password", params);
};

export const IsLogged = async () => {
    const authentication = ReadObject("authentication");
    return hasAuthenticatedSession(authentication);
};

export const ReadMe = async () => {
    const authentication = ReadObject("authentication") || {};

    if (authentication?.localOnly) {
        return getLocalSessionUser();
    }

    const apiUser = await GET("/users/me", true);
    if (apiUser?.id || apiUser?.documentId) {
        return apiUser;
    }

    return getLocalSessionUser();
};
