import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FAQ_ITEMS,
    FEATURE_CARDS,
    HERO_SLIDES,
    PLAN_CARDS,
    PLATFORM_FEATURES,
} from "./content";

export default function useController() {
    const n = useNavigate();
    const navigate = useCallback((to) => n(`/${to}`), [n]);

    const plansRef = useRef(null);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnnual, setIsAnnual] = useState(false);
    const [openFaqKey, setOpenFaqKey] = useState(FAQ_ITEMS[0]?.key || null);

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

    const toggleBilling = useCallback(() => {
        setIsAnnual(prev => !prev);
    }, []);

    const toggleFaq = useCallback((faqKey) => {
        setOpenFaqKey(prev => (prev === faqKey ? null : faqKey));
    }, []);

    const planCards = useMemo(() => (
        PLAN_CARDS.map(plan => {
            if (plan.monthlyPrice === null) {
                return {
                    ...plan,
                    displayPrice: "Sob consulta",
                    displayMeta: "Escopo e implantacao personalizados",
                    action: () => navigate("register"),
                };
            }

            const effectiveMonthly = isAnnual
                ? plan.monthlyPrice * (1 - (plan.annualDiscountPercent / 100))
                : plan.monthlyPrice;

            const formatted = formatCurrency(effectiveMonthly);
            const meta = isAnnual
                ? `cobranca anual com ${plan.annualDiscountPercent}% de desconto`
                : "cobranca mensal";

            return {
                ...plan,
                displayPrice: formatted,
                displayMeta: meta,
                action: () => navigate("register"),
            };
        })
    ), [isAnnual, navigate]);

    const heroChips = useMemo(() => ([
        { key: "desktop", label: "Programa de computador", icon: "/icons/products.svg" },
        { key: "web", label: "Acesso web", icon: "/icons/menu.svg" },
        { key: "labels", label: "Etiquetas e operacao", icon: "/icons/training.svg" },
    ]), []);

    const quickLinks = useMemo(() => ([
        {
            key: "login",
            title: "Entrar no sistema",
            description: "Acesso direto a area autenticada ja estruturada no projeto GitHub.",
            buttonLabel: "Ir para login",
            action: () => navigate("login"),
        },
        {
            key: "register",
            title: "Criar conta",
            description: "Fluxo publico para cadastro inicial enquanto a area comercial evolui no projeto.",
            buttonLabel: "Abrir cadastro",
            action: () => navigate("register"),
        },
        {
            key: "plans",
            title: "Ver planos",
            description: "Compare os niveis de oferta e a direcao comercial do produto.",
            buttonLabel: "Abrir planos",
            action: scrollToPlans,
        },
    ]), [navigate, scrollToPlans]);

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
        goLogin: () => navigate("login"),
        goRegister: () => navigate("register"),
        goTop,
        scrollToPlans,
        toggleBilling,
        toggleFaq,
    };
}

function formatCurrency(value) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    });
}
