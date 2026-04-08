import { useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
    const isAuthenticated = !!authentication?.jwt;

    const sessionId = `${searchParams.get("session_id") || ""}`.trim();
    const statusParam = `${searchParams.get("status") || ""}`.trim().toLowerCase();
    const paymentStatus = `${searchParams.get("payment_status") || ""}`.trim().toLowerCase();
    const planParam = `${searchParams.get("plan") || ""}`.trim().toLowerCase();

    const isSuccess = useMemo(() => (
        !!sessionId
        || statusParam === "success"
        || paymentStatus === "paid"
    ), [paymentStatus, sessionId, statusParam]);

    const redirectTarget = isAuthenticated ? "dashboard/me" : "login";
    const redirectLabel = isAuthenticated ? "Minha conta" : "Ir para login";
    const planLabel = PLAN_LABELS[planParam] || "Plano SenaPrices";

    useEffect(() => {
        if (!isSuccess) {
            return undefined;
        }

        const timer = window.setTimeout(() => {
            navigate(redirectTarget);
        }, 4500);

        return () => window.clearTimeout(timer);
    }, [isSuccess, navigate, redirectTarget]);

    const statusCard = useMemo(() => {
        if (isSuccess) {
            return {
                tone: "green",
                eyebrow: "Pagamento confirmado",
                title: "Assinatura recebida com sucesso",
                description: isAuthenticated
                    ? "Seu acesso já está autenticado. Vamos direcionar você para a área da conta para continuar a configuração."
                    : "Seu pagamento foi confirmado. O próximo passo é entrar no sistema para concluir o acesso inicial da operação.",
                badge: "Sucesso",
            };
        }

        return {
            tone: "orange",
            eyebrow: "Confirmação pendente",
            title: "Não foi possível validar a sessão de checkout",
            description: "Não encontramos um identificador confiável de retorno do pagamento. Você pode voltar à apresentação ou acessar o login e confirmar com o suporte, se necessário.",
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
                    action: () => navigate(redirectTarget),
                },
                {
                    key: "presentation",
                    label: "Voltar à apresentação",
                    action: () => navigate(""),
                },
            ]
            : [
                {
                    key: "presentation",
                    label: "Voltar à apresentação",
                    primary: true,
                    action: () => navigate(""),
                },
                {
                    key: "login",
                    label: "Abrir login",
                    action: () => navigate("login"),
                },
            ]
    ), [isSuccess, navigate, redirectLabel, redirectTarget]);

    const guidelines = useMemo(() => (
        isSuccess
            ? [
                {
                    title: "Fluxo público sem sidebar",
                    description: "A confirmação permanece fora da área autenticada para evitar mistura entre retorno de pagamento e navegação operacional.",
                },
                {
                    title: "Redirecionamento previsível",
                    description: "Quem já está autenticado segue para a conta; quem ainda não entrou vai para o login, sem exigir decisão manual em um ponto crítico do fluxo.",
                },
                {
                    title: "Preparada para Stripe real",
                    description: "A tela aceita `session_id`, `status=success` ou `payment_status=paid`, deixando o acoplamento futuro do checkout mais seguro.",
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
        isSuccess,
        statusCard,
        summaryItems,
        quickActions,
        guidelines,
    };
}
