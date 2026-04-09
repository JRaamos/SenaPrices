import { useCallback, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { CoreContext } from "context/CoreContext";
import { getDefaultAuthenticatedPath } from "services/access";
import { DoLogin, DoLoginWithPin, hasAuthenticatedSession } from "services/authentication";
import { LOCAL_ACCOUNT_CREDENTIALS, findLocalAccountMatch, validateLocalAccountPin } from "services/localAccounts";
import { ReadObject, SaveObject } from "services/storage";
import { exposeStrapiError } from "utils";

export default function useController() {
    const n = useNavigate();
    const { reloadMe } = useContext(CoreContext);
    const existingAuthentication = ReadObject("authentication") || {};
    const existingPendingUser = existingAuthentication?.pendingPin ? (ReadObject("user") || null) : null;

    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState(existingPendingUser ? "credentials" : "credentials");
    const [stage, setStage] = useState(existingPendingUser ? "verify-pin" : "credentials");
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
        identifier: "",
        password: "",
    });
    const [pin, setPin] = useState("");
    const [pendingUser, setPendingUser] = useState(existingPendingUser);

    const demoCredentials = useMemo(() => LOCAL_ACCOUNT_CREDENTIALS.map(item => ({
        ...item,
        title: `${item.roleLabel}: ${item.email}`,
        subtitle: `Senha ${item.password} \u00b7 PIN ${item.pin}`,
    })), []);

    const accessSignals = useMemo(() => ([
        {
            key: "security",
            value: "2 etapas",
            description: "Credenciais e PIN quando a conta exigir confirmação adicional.",
        },
        {
            key: "governance",
            value: "papel + plano",
            description: "A sessão entra já limitada ao perfil operacional ou gerencial correto.",
        },
        {
            key: "continuity",
            value: "sessão previsível",
            description: "Login, recuperação de contexto e redirecionamento seguem a mesma regra de acesso.",
        },
    ]), []);

    const completeLogin = useCallback((user) => {
        const authentication = ReadObject("authentication") || {};
        SaveObject("authentication", {
            ...authentication,
            pendingPin: false,
        });
        n(getDefaultAuthenticatedPath(user || {}));
    }, [n]);

    const goPresentation = useCallback(() => {
        n("/");
    }, [n]);

    const goRegister = useCallback(() => {
        n("/register");
    }, [n]);

    const goForgotPassword = useCallback(() => {
        n("/forgot");
    }, [n]);

    const handleModeChange = useCallback((nextMode) => {
        setMode(nextMode);
        setStage(nextMode === "pin" ? "pin" : "credentials");
        setError("");
        setPin("");
        setPendingUser(null);
    }, []);

    const handleCredentialsChange = useCallback((field, value) => {
        setCredentials(previous => ({
            ...previous,
            [field]: value,
        }));
    }, []);

    const handleSubmitCredentials = useCallback(async () => {
        if (loading) {
            return;
        }

        const identifier = `${credentials.identifier || ""}`.trim();
        const password = `${credentials.password || ""}`;

        if (!identifier || !password) {
            setError("Informe email ou nome e a senha para continuar.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const result = await DoLogin({
                identifier,
                password,
            });

            if (!result || exposeStrapiError(result)) {
                setError("N\u00e3o foi poss\u00edvel autenticar com as credenciais informadas.");
                return;
            }

            const currentUser = await reloadMe();
            const resolvedUser = currentUser || result?.user || {};
            const requiresPin = !!findLocalAccountMatch(resolvedUser);

            if (!requiresPin) {
                completeLogin(resolvedUser);
                return;
            }

            const authentication = ReadObject("authentication") || {};
            SaveObject("authentication", {
                ...authentication,
                pendingPin: true,
            });

            setPendingUser(resolvedUser);
            setPin("");
            setStage("verify-pin");
            toast.info("Confirme o PIN de 8 d\u00edgitos para concluir a entrada.");
        } finally {
            setLoading(false);
        }
    }, [completeLogin, credentials.identifier, credentials.password, loading, reloadMe]);

    const handleSubmitVerifyPin = useCallback(() => {
        if (loading) {
            return;
        }

        const normalizedPin = `${pin || ""}`.replace(/\D/g, "").slice(0, 8);
        if (normalizedPin.length !== 8) {
            setError("Digite um PIN de 8 d\u00edgitos para continuar.");
            return;
        }

        if (!validateLocalAccountPin(pendingUser || {}, normalizedPin)) {
            setError("PIN incorreto. Revise os 8 d\u00edgitos e tente novamente.");
            return;
        }

        completeLogin(pendingUser || {});
    }, [completeLogin, loading, pendingUser, pin]);

    const handleSubmitPinMode = useCallback(async () => {
        if (loading) {
            return;
        }

        const normalizedPin = `${pin || ""}`.replace(/\D/g, "").slice(0, 8);
        if (normalizedPin.length !== 8) {
            setError("Digite um PIN de 8 d\u00edgitos para continuar.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const result = await DoLoginWithPin(normalizedPin);
            if (!result) {
                setError("PIN incorreto ou conta local inativa.");
                return;
            }

            const currentUser = await reloadMe();
            completeLogin(currentUser || result?.user || result || {});
        } finally {
            setLoading(false);
        }
    }, [completeLogin, loading, pin, reloadMe]);

    const handleSubmit = useCallback(async () => {
        if (mode === "pin") {
            await handleSubmitPinMode();
            return;
        }

        if (stage === "verify-pin") {
            handleSubmitVerifyPin();
            return;
        }

        await handleSubmitCredentials();
    }, [handleSubmitCredentials, handleSubmitPinMode, handleSubmitVerifyPin, mode, stage]);

    const handleBackToCredentials = useCallback(() => {
        const authentication = ReadObject("authentication") || {};
        SaveObject("authentication", {
            ...authentication,
            pendingPin: false,
        });
        setStage("credentials");
        setPendingUser(null);
        setPin("");
        setError("");
    }, []);

    const authentication = ReadObject("authentication") || {};

    return {
        loading,
        mode,
        stage,
        error,
        credentials,
        pin,
        accessSignals,
        demoCredentials,
        isPartiallyAuthenticated: !!authentication?.jwt && !hasAuthenticatedSession(authentication),
        setPin,
        setError,
        handleModeChange,
        handleCredentialsChange,
        handleSubmit,
        handleBackToCredentials,
        goPresentation,
        goRegister,
        goForgotPassword,
    };
}
