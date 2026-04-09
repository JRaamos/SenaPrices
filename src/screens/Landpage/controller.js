import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FAQ_ITEMS,
    FEATURE_CARDS,
    HERO_SLIDES,
    PLAN_CARDS,
    PLATFORM_FEATURES,
} from "./content";
import { buildAccessProfile, getAccountEntryPath, getDefaultAuthenticatedPath } from "services/access";
import { buildPlanOffer, readMasterConfig, resolveSeasonalTheme } from "services/platform";
import { ReadObject } from "services/storage";

const SEASONAL_LABELS = {
    generic: "Padr\u00e3o SenaPrices",
    blackfriday: "Black Friday",
    semanaConsumidor: "Semana do Consumidor",
    natal: "Natal",
    pascoa: "P\u00e1scoa",
};

export default function useController() {
    const n = useNavigate();
    const navigate = useCallback((to) => n(to.startsWith("/") ? to : `/${to}`), [n]);

    const plansRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnnual, setIsAnnual] = useState(false);
    const [openFaqKey, setOpenFaqKey] = useState(FAQ_ITEMS[0]?.key || null);

    const currentUser = ReadObject("user") || {};
    const authentication = ReadObject("authentication") || {};
    const accessProfile = useMemo(() => buildAccessProfile(currentUser), [currentUser]);
    const isAuthenticated = !!authentication?.jwt && authentication?.pendingPin !== true;
    const masterConfig = useMemo(() => readMasterConfig(), []);
    const seasonalTheme = useMemo(() => resolveSeasonalTheme(masterConfig), [masterConfig]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });

        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
        }, 4200);

        return () => clearInterval(timer);
    }, []);

    const currentHeroSlide = HERO_SLIDES[currentSlide];

    const scrollToPlans = useCallback(() => {
        plansRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, []);

    const goTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const toggleFaq = useCallback((faqKey) => {
        setOpenFaqKey(prev => (prev === faqKey ? null : faqKey));
    }, []);

    const planCards = useMemo(() => (
        PLAN_CARDS.map(plan => {
            const offer = buildPlanOffer(plan.key, { isAnnual });
            const displayPrice = offer.price === null
                ? "Sob consulta"
                : offer.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: offer.currency,
                    minimumFractionDigits: 2,
                });

            const displayMeta = offer.price === null
                ? "Escopo, onboarding e SLA negociados com a equipe comercial"
                : isAnnual
                    ? `cobran\u00e7a anual \u00b7 ${plan.discountLabel}`
                    : "cobran\u00e7a mensal";

            const action = () => {
                if (isAuthenticated) {
                    n(getDefaultAuthenticatedPath(currentUser));
                    return;
                }

                navigate("/login");
            };

            return {
                ...plan,
                displayPrice,
                displayMeta,
                action,
            };
        })
    ), [currentUser, isAnnual, isAuthenticated, n, navigate]);

    const heroChips = useMemo(() => ([
        { key: "desktop", label: "Programa de computador", icon: "/icons/products.svg" },
        { key: "web", label: "Acesso web governado", icon: "/icons/menu.svg" },
        { key: "labels", label: "Etiquetas Zebra ZPL", icon: "/icons/training.svg" },
    ]), []);

    const quickLinks = useMemo(() => {
        if (isAuthenticated) {
            return [
                {
                    key: "dashboard",
                    title: accessProfile.isMaster ? "Painel master" : "Abrir sistema",
                    description: accessProfile.isMaster
                        ? "Continue na governan\u00e7a da plataforma com par\u00e2metros globais, planos e tema sazonal."
                        : `Sua sess\u00e3o est\u00e1 pronta para ${accessProfile.roleLabel.toLowerCase()} com plano ${accessProfile.planLabel.toLowerCase()}.`,
                    buttonLabel: accessProfile.isMaster ? "Abrir master" : "Ir para dashboard",
                    action: () => n(getDefaultAuthenticatedPath(currentUser)),
                },
                {
                    key: "plans",
                    title: "Ver planos",
                    description: "Compare os n\u00edveis comerciais e a cobertura por m\u00f3dulo do produto.",
                    buttonLabel: "Abrir planos",
                    action: scrollToPlans,
                },
                {
                    key: "account",
                    title: accessProfile.isMaster ? "Painel da plataforma" : "Minha conta",
                    description: accessProfile.isMaster
                        ? "Revise contatos, tema sazonal e precifica\u00e7\u00e3o global da plataforma."
                        : "Revise perfil, seguran\u00e7a e, quando aplic\u00e1vel, a governan\u00e7a da assinatura.",
                    buttonLabel: accessProfile.isMaster ? "Abrir painel" : "Abrir conta",
                    action: () => n(getAccountEntryPath(currentUser)),
                },
            ];
        }

        return [
            {
                key: "login",
                title: "Entrar no sistema",
                description: "Acesse com e-mail e senha, com segunda etapa por PIN nas contas governadas localmente.",
                buttonLabel: "Ir para login",
                action: () => navigate("/login"),
            },
            {
                key: "register",
                title: "Criar conta",
                description: "Abra o fluxo p\u00fablico de cadastro enquanto a camada comercial segue evoluindo.",
                buttonLabel: "Abrir cadastro",
                action: () => navigate("/register"),
            },
            {
                key: "plans",
                title: "Ver planos",
                description: "Compare os n\u00edveis comerciais e a cobertura por m\u00f3dulo do produto.",
                buttonLabel: "Abrir planos",
                action: scrollToPlans,
            },
        ];
    }, [accessProfile.isMaster, accessProfile.planLabel, accessProfile.roleLabel, currentUser, isAuthenticated, n, navigate, scrollToPlans]);

    return {
        plansRef,
        currentHeroSlide,
        currentSlide,
        heroSlides: HERO_SLIDES,
        isAnnual,
        openFaqKey,
        heroChips,
        quickLinks,
        platformFeatures: PLATFORM_FEATURES,
        featureCards: FEATURE_CARDS,
        planCards,
        faqItems: FAQ_ITEMS,
        seasonalLabel: SEASONAL_LABELS[seasonalTheme] || SEASONAL_LABELS.generic,
        contactEmail: masterConfig.contactEmail,
        contactPhone: masterConfig.contactPhone,
        contactWhatsApp: masterConfig.contactWhatsApp,
        isAuthenticated,
        goLogin: () => navigate("/login"),
        goRegister: () => navigate("/register"),
        goTop,
        scrollToPlans,
        toggleBilling: () => setIsAnnual(prev => !prev),
        toggleFaq,
    };
}
