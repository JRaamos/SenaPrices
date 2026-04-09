import { useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { buildAccessProfile, getDefaultAuthenticatedPath } from "services/access";
import { hasAuthenticatedSession } from "services/authentication";
import { resolveUserSubscription, saveUserSubscription } from "services/platform";
import { ReadObject } from "services/storage";

const PLAN_LABELS = {
    essencial: "Essencial",
    profissional: "Profissional",
    personalizado: "Personalizado",
};

export default function useController() {
    const n = useNavigate();
    const location = useLocation();
    const navigate = useCallback((to) => n(`/${to}`), [n]);

    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const authentication = ReadObject("authentication") || {};
    const currentUser = ReadObject("user") || {};
    const isAuthenticated = hasAuthenticatedSession(authentication);

    const sessionId = `${searchParams.get("session_id") || ""}`.trim();
    const statusParam = `${searchParams.get("status") || ""}`.trim().toLowerCase();
    const paymentStatus = `${searchParams.get("payment_status") || ""}`.trim().toLowerCase();
    const planParam = `${searchParams.get("plan") || ""}`.trim().toLowerCase();

    const isSuccess = useMemo(() => (
        !!sessionId
        || statusParam === "success"
        || paymentStatus === "paid"
    ), [paymentStatus, sessionId, statusParam]);

    const accessProfile = useMemo(() => buildAccessProfile(currentUser), [currentUser]);
    const redirectPath = isAuthenticated ? getDefaultAuthenticatedPath(currentUser) : "/login";
    const redirectLabel = isAuthenticated ? (accessProfile.isMaster ? "Painel master" : "Minha conta") : "Ir para login";
    const planLabel = PLAN_LABELS[planParam] || "Plano SenaPrices";

    useEffect(() => {
        if (!isSuccess || !isAuthenticated || !PLAN_LABELS[planParam]) {
            return;
        }

        const subscription = resolveUserSubscription(currentUser);
        saveUserSubscription(currentUser, {
            ...subscription,
            plan: planParam,
            status: "active",
            startDate: subscription.startDate || new Date().toISOString(),
            expiryDate: subscription.expiryDate || new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)).toISOString(),
            autoRenew: true,
        });
    }, [currentUser, isAuthenticated, isSuccess, planParam]);

    useEffect(() => {
        if (!isSuccess) {
            return undefined;
        }

        const timer = window.setTimeout(() => {
            n(redirectPath);
        }, 4200);

        return () => window.clearTimeout(timer);
    }, [isSuccess, n, redirectPath]);

    const statusCard = useMemo(() => {
        if (isSuccess) {
            return {
                tone: "green",
                eyebrow: "Pagamento confirmado",
                title: "Assinatura recebida com sucesso",
                description: isAuthenticated
                    ? "Seu acesso ja esta autenticado. Vamos direcionar voce para a area correta da sua conta para continuar a configuracao."
                    : "Seu pagamento foi confirmado. O proximo passo e entrar no sistema para concluir o acesso inicial da operacao.",
                badge: "Sucesso",
            };
        }

        return {
            tone: "orange",
            eyebrow: "Confirmacao pendente",
            title: "Nao foi possivel validar a sessao de checkout",
            description: "Nao encontramos um identificador confiavel de retorno do pagamento. Voce pode voltar a apresentacao ou abrir o login e confirmar com o suporte, se necessario.",
            badge: "Revisar",
        };
    }, [isAuthenticated, isSuccess]);

    const summaryItems = useMemo(() => ([
        { label: "Plano", value: planLabel },
        { label: "Sessao", value: sessionId || "Nao informada" },
        { label: "Proximo destino", value: isSuccess ? redirectLabel : "Pagina inicial" },
        { label: "Status", value: isSuccess ? "Confirmado" : "Pendente" },
    ]), [isSuccess, planLabel, redirectLabel, sessionId]);

    const quickActions = useMemo(() => (
        isSuccess
            ? [
                {
                    key: "continue",
                    label: redirectLabel,
                    primary: true,
                    action: () => n(redirectPath),
                },
                {
                    key: "presentation",
                    label: "Voltar a apresentacao",
                    action: () => n("/"),
                },
            ]
            : [
                {
                    key: "presentation",
                    label: "Voltar a apresentacao",
                    primary: true,
                    action: () => n("/"),
                },
                {
                    key: "login",
                    label: "Abrir login",
                    action: () => navigate("login"),
                },
            ]
    ), [isSuccess, n, navigate, redirectLabel, redirectPath]);

    const guidelines = useMemo(() => (
        isSuccess
            ? [
                {
                    title: "Fluxo publico sem sidebar",
                    description: "A confirmacao permanece fora da area autenticada para evitar mistura entre retorno de pagamento e navegacao operacional.",
                },
                {
                    title: "Redirecionamento previsivel",
                    description: "Quem ja esta autenticado segue para o destino certo conforme o papel; quem ainda nao entrou vai para o login.",
                },
                {
                    title: "Atualizacao local de assinatura",
                    description: "Quando houver usuario autenticado e plano identificado, a assinatura local e sincronizada para refletir o acesso liberado.",
                },
            ]
            : [
                {
                    title: "Validacao defensiva",
                    description: "Sem um identificador confiavel de checkout, a tela nao assume sucesso nem altera estados locais de assinatura.",
                },
                {
                    title: "Recuperacao simples",
                    description: "O visitante pode retornar a apresentacao ou abrir o login para retomar o fluxo com apoio do suporte.",
                },
                {
                    title: "Sem falsa confirmacao",
                    description: "A interface evita prometer ativacao quando os sinais minimos do retorno de pagamento nao estao presentes.",
                },
            ]
    ), [isSuccess]);

    return {
        isSuccess,
        statusCard,
        summaryItems,
        quickActions,
        guidelines,
    };
}
