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
                            Entrar
                        </TopActionButton>
                    </TopActions>
                </TopBar>

                <HeroSection>
                    <HeroGrid>
                        <div>
                            <HeroBadge>Cartazes, etiquetas e operacao</HeroBadge>
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
                        <SectionTitle>Uma base preparada para uso real de loja</SectionTitle>
                        <SectionDescription>
                            A estrutura nova aproveita as regras funcionais do projeto local e as organiza com uma arquitetura mais limpa no GitHub.
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
                        <SectionTitle>Fluxos centrais do SenaPrices ja mapeados</SectionTitle>
                        <SectionDescription>
                            Esta landing apresenta a direcao funcional do produto enquanto as telas operacionais sao portadas modulo por modulo.
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
                        <SectionTitle>Escolha o nivel de maturidade da sua operacao</SectionTitle>
                        <SectionDescription>
                            Os valores abaixo organizam o posicionamento comercial da plataforma. Nesta etapa, os botoes direcionam para o fluxo publico de acesso.
                        </SectionDescription>
                    </SectionHeader>

                    <BillingPill>
                        <BillingPillText>Mensal</BillingPillText>
                        <BillingToggle type="button" onClick={toggleBilling} aria-label="Alternar cobranca anual">
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
                        <SectionEyebrow>Duvidas</SectionEyebrow>
                        <SectionTitle>Perguntas frequentes sobre a base atual</SectionTitle>
                        <SectionDescription>
                            O objetivo desta tela e apresentar o produto com clareza sem prometer fluxos que ainda nao foram acoplados neste repositorio.
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
                        <SectionEyebrow>Pronto para evoluir</SectionEyebrow>
                        <ClosingTitle>Uma landing forte para sustentar as proximas etapas</ClosingTitle>
                        <ClosingText>
                            Login, conta, seguranca, suporte e home ja estao ativos. Agora a base publica tambem segue o mesmo nivel de organizacao para suportar a expansao do SenaPrices.
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
                    <FooterCopy>SenaPrices. Estrutura organizada para varejo, suporte e manutencao previsivel.</FooterCopy>
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
