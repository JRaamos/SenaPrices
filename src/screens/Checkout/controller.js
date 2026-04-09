import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { buildPlanOffer, readMasterConfig } from "services/platform";
import { getSearchParams } from "services/runtime";

const PLAN_LABELS = {
    essencial: "Essencial",
    profissional: "Profissional",
    personalizado: "Personalizado",
};

const BILLING_LABELS = {
    monthly: "Mensal",
    annual: "Anual",
};

const PLAN_HIGHLIGHTS = {
    essencial: [
        "Cartazes promocionais e criação rápida",
        "Histórico operacional e promoções",
        "Cadastro base de itens",
    ],
    profissional: [
        "Tudo do Essencial",
        "Etiquetas Zebra ZPL",
        "Impressão em lote, importação e relatórios",
    ],
    personalizado: [
        "Tudo do Profissional",
        "Integração PDV e escopo dedicado",
        "Onboarding assistido e negociação consultiva",
    ],
};

export default function useController() {
    const n = useNavigate();
    const location = useLocation();
    const masterConfig = useMemo(() => readMasterConfig(), []);
    const searchParams = useMemo(() => getSearchParams(location.search), [location.search]);

    const plan = useMemo(() => {
        const candidate = `${searchParams.get("plan") || "profissional"}`.trim().toLowerCase();
        return PLAN_LABELS[candidate] ? candidate : "profissional";
    }, [searchParams]);

    const billing = useMemo(() => {
        const candidate = `${searchParams.get("billing") || "monthly"}`.trim().toLowerCase();
        return BILLING_LABELS[candidate] ? candidate : "monthly";
    }, [searchParams]);

    const isAnnual = billing === "annual";
    const offer = useMemo(() => buildPlanOffer(plan, { isAnnual }), [isAnnual, plan]);
    const hasStripeKey = !!masterConfig.stripePublishableKey;
    const planLabel = PLAN_LABELS[plan];
    const billingLabel = BILLING_LABELS[billing];
    const isCustomPlan = plan === "personalizado";

    const priceLabel = useMemo(() => {
        if (offer.price === null) {
            return "Sob consulta";
        }

        return offer.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: offer.currency,
            minimumFractionDigits: 2,
        });
    }, [offer.currency, offer.price]);

    const statusCard = useMemo(() => {
        if (isCustomPlan) {
            return {
                tone: "blue",
                eyebrow: "Atendimento consultivo",
                title: "Plano preparado para negociação comercial",
                description: "Este plano atende redes com implantação sob medida. O checkout funciona como etapa de alinhamento antes da contratação final.",
                badge: "Sob consulta",
            };
        }

        if (hasStripeKey) {
            return {
                tone: "green",
                eyebrow: "Checkout preparado",
                title: "Sua contratação já pode seguir para a próxima etapa",
                description: "A camada comercial já possui parâmetros centrais de plano e cobrança. O próximo passo é identificar a conta e concluir a contratação assistida.",
                badge: "Pronto",
            };
        }

        return {
            tone: "orange",
            eyebrow: "Pagamento em homologação",
            title: "A jornada comercial está pronta, mas o gateway ainda depende do servidor",
            description: "Esta página já recebe plano e recorrência com segurança. A etapa final do pagamento online será conectada ao backend sem mudar a experiência pública.",
            badge: "Em evolução",
        };
    }, [hasStripeKey, isCustomPlan]);

    const summaryItems = useMemo(() => ([
        { label: "Plano", value: planLabel },
        { label: "Cobrança", value: billingLabel },
        { label: "Valor", value: priceLabel },
        { label: "Trial", value: isCustomPlan ? "Não aplicável" : `${masterConfig.planConfig.trialDays} dias` },
        { label: "Moeda", value: offer.currency },
        { label: "Contato", value: masterConfig.contactEmail || masterConfig.contactWhatsApp || "Equipe SenaPrices" },
    ]), [billingLabel, isCustomPlan, masterConfig.contactEmail, masterConfig.contactWhatsApp, masterConfig.planConfig.trialDays, offer.currency, planLabel, priceLabel]);

    const quickActions = useMemo(() => ([
        {
            key: "register",
            label: isCustomPlan ? "Solicitar contato comercial" : "Continuar com cadastro",
            primary: true,
            action: () => n(`/register?plan=${plan}&billing=${billing}`),
        },
        {
            key: "login",
            label: "Já tenho conta",
            action: () => n("/login"),
        },
        {
            key: "landing",
            label: "Voltar aos planos",
            action: () => n("/"),
        },
    ]), [billing, n, plan]);

    const guidelines = useMemo(() => ([
        {
            title: "Seleção preservada com segurança",
            description: "Plano e recorrência ficam explícitos na URL e na interface para evitar contratação ambígua.",
        },
        {
            title: "Sem pagamento simulado",
            description: "A tela não promete cobrança confirmada enquanto o conector real do checkout não estiver operacional no backend.",
        },
        {
            title: "Pronta para web e desktop",
            description: "A lógica de contratação ficou desacoplada da apresentação para facilitar integração futura com navegador, desktop wrapper ou app híbrido.",
        },
    ]), []);

    const planHighlights = PLAN_HIGHLIGHTS[plan] || PLAN_HIGHLIGHTS.profissional;

    return {
        billingLabel,
        guidelines,
        planHighlights,
        priceLabel,
        quickActions,
        statusCard,
        summaryItems,
    };
}
