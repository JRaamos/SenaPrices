import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { buildAccessProfile, getDefaultAuthenticatedPath } from "services/access";
import { hasAuthenticatedSession } from "services/authentication";
import { resolveUserSubscription, saveUserSubscription } from "services/platform";
import { clearRuntimeTimeout, getSearchParams, setRuntimeTimeout } from "services/runtime";
import { ReadObject } from "services/storage";

const PLAN_LABELS = {
    essencial: "Essencial",
    profissional: "Profissional",
    personalizado: "Personalizado",
};

export default function useController() {
    const n = useNavigate();
    const location = useLocation();
    const searchParams = useMemo(() => getSearchParams(location.search), [location.search]);
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

        const timer = setRuntimeTimeout(() => {
            n(redirectPath);
        }, 4200);

        return () => clearRuntimeTimeout(timer);
    }, [isSuccess, n, redirectPath]);

    const statusCard = useMemo(() => {
        if (isSuccess) {
            return {
                tone: "green",
                eyebrow: "Pagamento confirmado",
                title: "Assinatura recebida com sucesso",
                description: isAuthenticated
                    ? "Seu acesso já está autenticado. Vamos direcionar você para a área correta da conta para continuar a configuração."
                    : "Seu pagamento foi confirmado. O próximo passo é entrar no sistema para concluir o acesso inicial da operação.",
                badge: "Sucesso",
            };
        }

        return {
            tone: "orange",
            eyebrow: "Confirmação pendente",
            title: "Não foi possível validar a sessão de checkout",
            description: "Não encontramos um identificador confiável de retorno do pagamento. Você pode voltar à apresentação ou abrir o login e confirmar com o suporte, se necessário.",
            badge: "Revisar",
        };
    }, [isAuthenticated, isSuccess]);

    const summaryItems = useMemo(() => ([
        { label: "Plano", value: planLabel },
        { label: "Sessão", value: sessionId || "Não informada" },
        { label: "Próximo destino", value: isSuccess ? redirectLabel : "Página inicial" },
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
                    label: "Voltar à apresentação",
                    action: () => n("/"),
                },
            ]
            : [
                {
                    key: "presentation",
                    label: "Voltar à apresentação",
                    primary: true,
                    action: () => n("/"),
                },
                {
                    key: "login",
                    label: "Abrir login",
                    action: () => n("/login"),
                },
            ]
    ), [isSuccess, n, redirectLabel, redirectPath]);

    const guidelines = useMemo(() => (
        isSuccess
            ? [
                {
                    title: "Fluxo público sem sidebar",
                    description: "A confirmação permanece fora da área autenticada para evitar mistura entre retorno de pagamento e navegação operacional.",
                },
                {
                    title: "Redirecionamento previsível",
                    description: "Quem já está autenticado segue para o destino certo conforme o papel; quem ainda não entrou vai para o login.",
                },
                {
                    title: "Atualização local de assinatura",
                    description: "Quando houver usuário autenticado e plano identificado, a assinatura local é sincronizada para refletir o acesso liberado.",
                },
            ]
            : [
                {
                    title: "Validação defensiva",
                    description: "Sem um identificador confiável de checkout, a tela não assume sucesso nem altera estados locais de assinatura.",
                },
                {
                    title: "Recuperação simples",
                    description: "O visitante pode retornar à apresentação ou abrir o login para retomar o fluxo com apoio do suporte.",
                },
                {
                    title: "Sem falsa confirmação",
                    description: "A interface evita prometer ativação quando os sinais mínimos do retorno de pagamento não estão presentes.",
                },
            ]
    ), [isSuccess]);

    return {
        statusCard,
        summaryItems,
        quickActions,
        guidelines,
    };
}
