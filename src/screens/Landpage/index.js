import React from "react";

import { ThemedComponent } from "ui/theme";
import useController from "./controller";

import {
    BillingHelper,
    BillingPill,
    BillingPillText,
    BillingToggle,
    BillingToggleThumb,
    BrandButton,
    BrandCaption,
    BrandNameAccent,
    BrandNameText,
    ClosingCard,
    ClosingSection,
    ClosingText,
    ClosingTitle,
    FaqAnswer,
    FaqCard,
    FaqGrid,
    FaqQuestion,
    FaqQuestionIcon,
    FeatureCard,
    FeatureCardIcon,
    FeatureCardText,
    FeatureCardTitle,
    FeatureGrid,
    FooterBar,
    FooterCopy,
    FooterLink,
    FooterLinks,
    HeroActions,
    HeroBadge,
    HeroChip,
    HeroChipIcon,
    HeroChipRow,
    HeroDescription,
    HeroGrid,
    HeroHighlightCard,
    HeroHighlightText,
    HeroHighlightTitle,
    HeroIndicator,
    HeroIndicatorRow,
    HeroLabel,
    HeroPanel,
    HeroPrimaryButton,
    HeroQuickActionButton,
    HeroQuickActionCard,
    HeroQuickActionGrid,
    HeroQuickActionText,
    HeroQuickActionTitle,
    HeroSection,
    HeroSecondaryButton,
    HeroTitle,
    PageShell,
    PlanBadge,
    PlanButton,
    PlanCard,
    PlanDescription,
    PlanGrid,
    PlanHighlights,
    PlanHighlightsItem,
    PlanMeta,
    PlanName,
    PlanPrice,
    PlatformCard,
    PlatformCardIcon,
    PlatformCardText,
    PlatformCardTitle,
    PlatformGrid,
    Section,
    SectionDescription,
    SectionEyebrow,
    SectionHeader,
    SectionTitle,
    TopActionButton,
    TopActions,
    TopBar,
} from "./styled";

export default function Landpage() {
    const {
        plansRef,
        currentHeroSlide,
        currentSlide,
        heroSlides,
        isAnnual,
        openFaqKey,
        heroChips,
        quickLinks,
        platformFeatures,
        featureCards,
        planCards,
        faqItems,
        seasonalLabel,
        contactEmail,
        contactPhone,
        contactWhatsApp,
        isAuthenticated,
        goLogin,
        goRegister,
        goTop,
        scrollToPlans,
        toggleBilling,
        toggleFaq,
    } = useController();

    return (
        <ThemedComponent>
            <PageShell>
                <TopBar>
                    <BrandButton type="button" onClick={goTop}>
                        <div>
                            <BrandNameText>Sena</BrandNameText>
                            <BrandNameAccent>Prices</BrandNameAccent>
                        </div>
                        <BrandCaption>Sistema promocional para varejo</BrandCaption>
                    </BrandButton>

                    <TopActions>
                        <TopActionButton type="button" onClick={scrollToPlans}>
                            Ver planos
                        </TopActionButton>
                        <TopActionButton $primary type="button" onClick={goLogin}>
                            {isAuthenticated ? "Abrir sistema" : "Entrar"}
                        </TopActionButton>
                    </TopActions>
                </TopBar>

                <HeroSection>
                    <HeroGrid>
                        <div>
                            <HeroBadge>{`${seasonalLabel} \u00b7 cartazes, etiquetas e opera\u00e7\u00e3o`}</HeroBadge>
                            <HeroTitle>{currentHeroSlide.title}</HeroTitle>
                            <HeroDescription>{currentHeroSlide.description}</HeroDescription>

                            <HeroActions>
                                <HeroPrimaryButton type="button" onClick={goLogin}>
                                    Entrar no sistema
                                </HeroPrimaryButton>
                                <HeroSecondaryButton type="button" onClick={goRegister}>
                                    Criar conta
                                </HeroSecondaryButton>
                            </HeroActions>

                            <HeroChipRow>
                                {heroChips.map(item => (
                                    <HeroChip key={item.key}>
                                        <HeroChipIcon src={item.icon} alt={`${item.key}-icon`} />
                                        {item.label}
                                    </HeroChip>
                                ))}
                            </HeroChipRow>
                        </div>

                        <HeroPanel>
                            <HeroHighlightCard>
                                <HeroLabel>Slide atual</HeroLabel>
                                <HeroHighlightTitle>{currentHeroSlide.title}</HeroHighlightTitle>
                                <HeroHighlightText>{currentHeroSlide.description}</HeroHighlightText>

                                <HeroIndicatorRow>
                                    {heroSlides.map((item, index) => (
                                        <HeroIndicator
                                            key={item.title}
                                            $active={index === currentSlide}
                                            aria-label={`slide-${index + 1}`}
                                        />
                                    ))}
                                </HeroIndicatorRow>
                            </HeroHighlightCard>

                            <HeroQuickActionGrid>
                                {quickLinks.map(item => (
                                    <HeroQuickActionCard key={item.key}>
                                        <HeroQuickActionTitle>{item.title}</HeroQuickActionTitle>
                                        <HeroQuickActionText>{item.description}</HeroQuickActionText>
                                        <HeroQuickActionButton type="button" onClick={item.action}>
                                            {item.buttonLabel}
                                        </HeroQuickActionButton>
                                    </HeroQuickActionCard>
                                ))}
                            </HeroQuickActionGrid>
                        </HeroPanel>
                    </HeroGrid>
                </HeroSection>

                <Section>
                    <SectionHeader>
                        <SectionEyebrow>Plataforma</SectionEyebrow>
                        <SectionTitle>Uma plataforma preparada para uso real de loja</SectionTitle>
                        <SectionDescription>
                            Cadastro, precifica\u00e7\u00e3o, etiquetas, hist\u00f3rico, promo\u00e7\u00f5es e governan\u00e7a compartilham a mesma base para reduzir retrabalho e facilitar manuten\u00e7\u00e3o.
                        </SectionDescription>
                    </SectionHeader>

                    <PlatformGrid>
                        {platformFeatures.map(item => (
                            <PlatformCard key={item.key}>
                                <PlatformCardIcon src={item.icon} alt={`${item.key}-icon`} />
                                <PlatformCardTitle>{item.title}</PlatformCardTitle>
                                <PlatformCardText>{item.description}</PlatformCardText>
                            </PlatformCard>
                        ))}
                    </PlatformGrid>
                </Section>

                <Section>
                    <SectionHeader>
                        <SectionEyebrow>Recursos</SectionEyebrow>
                        <SectionTitle>Fluxos centrais do SenaPrices j\u00e1 organizados</SectionTitle>
                        <SectionDescription>
                            A apresenta\u00e7\u00e3o p\u00fablica agora conversa com a mesma governan\u00e7a de papel, plano e configura\u00e7\u00e3o usada nos m\u00f3dulos internos.
                        </SectionDescription>
                    </SectionHeader>

                    <FeatureGrid>
                        {featureCards.map(item => (
                            <FeatureCard key={item.key}>
                                <FeatureCardIcon src={item.icon} alt={`${item.key}-icon`} />
                                <FeatureCardTitle>{item.title}</FeatureCardTitle>
                                <FeatureCardText>{item.description}</FeatureCardText>
                            </FeatureCard>
                        ))}
                    </FeatureGrid>
                </Section>

                <Section ref={plansRef}>
                    <SectionHeader>
                        <SectionEyebrow>Planos</SectionEyebrow>
                        <SectionTitle>Escolha o n\u00edvel de maturidade da sua opera\u00e7\u00e3o</SectionTitle>
                        <SectionDescription>
                            Os valores abaixo j\u00e1 leem a configura\u00e7\u00e3o global da plataforma. O fluxo comercial pode evoluir sem quebrar a camada de acesso j\u00e1 implantada.
                        </SectionDescription>
                    </SectionHeader>

                    <BillingPill>
                        <BillingPillText>Mensal</BillingPillText>
                        <BillingToggle type="button" onClick={toggleBilling} aria-label="Alternar cobran\u00e7a anual">
                            <BillingToggleThumb $active={isAnnual} />
                        </BillingToggle>
                        <BillingPillText $active={isAnnual}>Anual</BillingPillText>
                        <BillingHelper>
                            {isAnnual ? "Valores com desconto anual ativo" : "Compare mensalidade e desconto anual"}
                        </BillingHelper>
                    </BillingPill>

                    <PlanGrid>
                        {planCards.map(item => (
                            <PlanCard key={item.key} $featured={item.key === "profissional"}>
                                {item.badge ? <PlanBadge>{item.badge}</PlanBadge> : null}
                                <PlanName>{item.name}</PlanName>
                                <PlanPrice>{item.displayPrice}</PlanPrice>
                                <PlanMeta>{item.displayMeta}</PlanMeta>
                                <PlanDescription>{item.description}</PlanDescription>

                                <PlanHighlights>
                                    {item.highlights.map(highlight => (
                                        <PlanHighlightsItem key={highlight}>{highlight}</PlanHighlightsItem>
                                    ))}
                                </PlanHighlights>

                                <PlanButton type="button" onClick={item.action}>
                                    {item.cta}
                                </PlanButton>
                            </PlanCard>
                        ))}
                    </PlanGrid>
                </Section>

                <Section>
                    <SectionHeader>
                        <SectionEyebrow>D\u00favidas</SectionEyebrow>
                        <SectionTitle>Perguntas frequentes sobre a opera\u00e7\u00e3o atual</SectionTitle>
                        <SectionDescription>
                            A proposta desta tela \u00e9 apresentar o produto com clareza, com governan\u00e7a real de acesso e sem prometer integra\u00e7\u00f5es que ainda n\u00e3o foram homologadas aqui.
                        </SectionDescription>
                    </SectionHeader>

                    <FaqGrid>
                        {faqItems.map(item => (
                            <FaqCard
                                key={item.key}
                                type="button"
                                $open={openFaqKey === item.key}
                                onClick={() => toggleFaq(item.key)}
                            >
                                <FaqQuestion>
                                    {item.question}
                                    <FaqQuestionIcon $open={openFaqKey === item.key}>
                                        {openFaqKey === item.key ? "-" : "+"}
                                    </FaqQuestionIcon>
                                </FaqQuestion>
                                {openFaqKey === item.key ? <FaqAnswer>{item.answer}</FaqAnswer> : null}
                            </FaqCard>
                        ))}
                    </FaqGrid>
                </Section>

                <ClosingSection>
                    <ClosingCard>
                        <SectionEyebrow>Pronto para operar</SectionEyebrow>
                        <ClosingTitle>Apresenta\u00e7\u00e3o p\u00fablica e acesso agora seguem a mesma governan\u00e7a</ClosingTitle>
                        <ClosingText>
                            Landing, login, retorno comercial, pap\u00e9is operacionais e conta master passaram a compartilhar a mesma l\u00f3gica de acesso para sustentar a expans\u00e3o do SenaPrices com menos risco.
                        </ClosingText>

                        <HeroActions>
                            <HeroPrimaryButton type="button" onClick={goLogin}>
                                Acessar agora
                            </HeroPrimaryButton>
                            <HeroSecondaryButton type="button" onClick={goRegister}>
                                Solicitar acesso
                            </HeroSecondaryButton>
                        </HeroActions>
                    </ClosingCard>
                </ClosingSection>

                <FooterBar>
                    <FooterCopy>
                        {`SenaPrices. Estrutura organizada para varejo, suporte e manuten\u00e7\u00e3o previs\u00edvel.${contactEmail ? ` Contato: ${contactEmail}.` : ""}${contactPhone ? ` Telefone: ${contactPhone}.` : ""}${contactWhatsApp ? ` WhatsApp: ${contactWhatsApp}.` : ""}`}
                    </FooterCopy>
                    <FooterLinks>
                        <FooterLink type="button" onClick={goLogin}>Login</FooterLink>
                        <FooterLink type="button" onClick={goRegister}>Cadastro</FooterLink>
                        <FooterLink type="button" onClick={scrollToPlans}>Planos</FooterLink>
                    </FooterLinks>
                </FooterBar>
            </PageShell>
        </ThemedComponent>
    );
}
