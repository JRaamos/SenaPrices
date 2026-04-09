import React from "react";

import DashboardIconGlyph from "components/Dashboard/IconGlyph";
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
    FeatureCard,
    FeatureCardIcon,
    FeatureCardText,
    FeatureCardTitle,
    FeatureFootnote,
    FeatureGrid,
    FooterBar,
    FooterCopy,
    FooterLink,
    FooterLinks,
    HeroActions,
    HeroBadge,
    HeroBrand,
    HeroChip,
    HeroChipIcon,
    HeroChipRow,
    HeroDescription,
    HeroIndicator,
    HeroIndicatorRow,
    HeroMetricCard,
    HeroMetricGrid,
    HeroMetricText,
    HeroMetricValue,
    HeroPrimaryButton,
    HeroSecondaryButton,
    HeroSection,
    HeroTitle,
    PageShell,
    PlanBadge,
    PlanBilling,
    PlanButton,
    PlanCard,
    PlanDescription,
    PlanDiscount,
    PlanGrid,
    PlanHighlights,
    PlanHighlightsItem,
    PlanMeta,
    PlanModeBadge,
    PlanName,
    PlanOriginalPrice,
    PlanPrice,
    PlanPriceCycle,
    PlanSeat,
    PlatformBulletItem,
    PlatformBulletList,
    PlatformCard,
    PlatformCardBadge,
    PlatformCardEyebrow,
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
        heroMetrics,
        isAnnual,
        heroChips,
        platformFeatures,
        featureCards,
        planCards,
        seasonalLabel,
        contactEmail,
        contactPhone,
        contactWhatsApp,
        isAuthenticated,
        goLogin,
        goTop,
        scrollToPlans,
        toggleBilling,
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
                        <BrandCaption>Sistema promocional</BrandCaption>
                    </BrandButton>

                    <TopActions>
                        <TopActionButton type="button" onClick={scrollToPlans}>
                            Planos
                        </TopActionButton>
                        <TopActionButton $primary type="button" onClick={goLogin}>
                            {isAuthenticated ? "Acessar o sistema" : "Acessar o sistema"}
                        </TopActionButton>
                    </TopActions>
                </TopBar>

                <HeroSection>
                    <HeroBrand>
                        <BrandButton type="button" onClick={goTop}>
                            <div>
                                <BrandNameText>Sena</BrandNameText>
                                <BrandNameAccent>Prices</BrandNameAccent>
                            </div>
                            <BrandCaption>Sistema promocional</BrandCaption>
                        </BrandButton>
                    </HeroBrand>

                    <HeroBadge>{seasonalLabel}</HeroBadge>
                    <HeroTitle>{currentHeroSlide.title}</HeroTitle>
                    <HeroDescription>{currentHeroSlide.description}</HeroDescription>

                    <HeroActions>
                        <HeroPrimaryButton type="button" onClick={goLogin}>
                            Entrar no sistema
                        </HeroPrimaryButton>
                        <HeroSecondaryButton type="button" onClick={scrollToPlans}>
                            Ver planos
                        </HeroSecondaryButton>
                    </HeroActions>

                    <HeroChipRow>
                        {heroChips.map(item => (
                            <HeroChip key={item.key}>
                                <HeroChipIcon>
                                    <DashboardIconGlyph name={item.iconToken} size={16} color="#8ab4ff" />
                                </HeroChipIcon>
                                {item.label}
                            </HeroChip>
                        ))}
                    </HeroChipRow>

                    <HeroIndicatorRow>
                        {heroSlides.map((item, index) => (
                            <HeroIndicator
                                key={item.title}
                                $active={index === currentSlide}
                                aria-label={`slide-${index + 1}`}
                            />
                        ))}
                    </HeroIndicatorRow>

                    <HeroMetricGrid>
                        {heroMetrics.map(item => (
                            <HeroMetricCard key={item.key}>
                                <HeroMetricValue>{item.value}</HeroMetricValue>
                                <HeroMetricText>{item.label}</HeroMetricText>
                            </HeroMetricCard>
                        ))}
                    </HeroMetricGrid>
                </HeroSection>

                <Section>
                    <SectionHeader $center>
                        <SectionEyebrow>Plataforma</SectionEyebrow>
                        <SectionTitle>Escolha a forma certa de operar</SectionTitle>
                        <SectionDescription>
                            O SenaPrices pode funcionar como programa de computador e também na web, respeitando o plano contratado e o ritmo real da operação.
                        </SectionDescription>
                    </SectionHeader>

                    <PlatformGrid>
                        {platformFeatures.map(item => (
                            <PlatformCard key={item.key}>
                                <PlatformCardIcon>
                                    <DashboardIconGlyph
                                        name={item.iconToken}
                                        size={28}
                                        color={item.key === "desktop" ? "#10b981" : "#3b82f6"}
                                    />
                                </PlatformCardIcon>
                                <PlatformCardTitle>{item.title}</PlatformCardTitle>
                                <PlatformCardBadge $tone={item.key === "desktop" ? "green" : "blue"}>
                                    {item.tag}
                                </PlatformCardBadge>
                                <PlatformCardEyebrow>{item.eyebrow}</PlatformCardEyebrow>
                                <PlatformCardText>{item.description}</PlatformCardText>
                                <PlatformBulletList>
                                    {item.bullets.map(bullet => (
                                        <PlatformBulletItem key={bullet}>{bullet}</PlatformBulletItem>
                                    ))}
                                </PlatformBulletList>
                            </PlatformCard>
                        ))}
                    </PlatformGrid>
                </Section>

                <Section>
                    <SectionHeader $center>
                        <SectionTitle>Tudo que você precisa</SectionTitle>
                        <SectionDescription>
                            Desenvolvido especificamente para o varejo brasileiro: rápido, confiável, organizado e preparado para crescer sem burocracia.
                        </SectionDescription>
                    </SectionHeader>

                    <FeatureGrid>
                        {featureCards.map(item => (
                            <FeatureCard key={item.key}>
                                <FeatureCardIcon>
                                    <DashboardIconGlyph name={item.iconToken} size={24} color="#7c4dff" />
                                </FeatureCardIcon>
                                <FeatureCardTitle>{item.title}</FeatureCardTitle>
                                <FeatureCardText>{item.description}</FeatureCardText>
                            </FeatureCard>
                        ))}
                    </FeatureGrid>

                    <FeatureFootnote>Alguns recursos avançados exigem conexão com internet e plano compatível.</FeatureFootnote>
                </Section>

                <Section ref={plansRef} $soft>
                    <SectionHeader $center>
                        <SectionTitle>Planos e preços</SectionTitle>
                        <SectionDescription>
                            Escolha o plano ideal para o seu estabelecimento. Todos incluem atualizações e suporte por e-mail.
                        </SectionDescription>
                    </SectionHeader>

                    <BillingPill>
                        <BillingPillText>Mensal</BillingPillText>
                        <BillingToggle type="button" onClick={toggleBilling} aria-label="Alternar cobrança anual">
                            <BillingToggleThumb $active={isAnnual} />
                        </BillingToggle>
                        <BillingPillText $active={isAnnual}>Anual</BillingPillText>
                        <BillingHelper>Economize com o faturamento anual</BillingHelper>
                    </BillingPill>

                    <PlanGrid>
                        {planCards.map(item => (
                            <PlanCard key={item.key} $featured={item.key === "profissional"}>
                                {item.badge ? <PlanBadge>{item.badge}</PlanBadge> : null}
                                <PlanModeBadge $featured={item.key === "profissional"}>{item.modeLabel}</PlanModeBadge>
                                <PlanName>{item.name}</PlanName>
                                <PlanDescription>{item.description}</PlanDescription>

                                {item.displayDiscount ? <PlanDiscount>{item.displayDiscount}</PlanDiscount> : null}
                                {item.displayOriginalPrice ? <PlanOriginalPrice>{item.displayOriginalPrice}</PlanOriginalPrice> : null}

                                <PlanPrice>
                                    {item.displayPrice}
                                    {item.key !== "personalizado" ? <PlanPriceCycle>/mês</PlanPriceCycle> : null}
                                </PlanPrice>
                                <PlanBilling>{item.displayBillingLine}</PlanBilling>
                                <PlanSeat>{item.seatLabel}</PlanSeat>
                                <PlanMeta>{item.discountLabel}</PlanMeta>

                                <PlanHighlights>
                                    {item.highlights.map(highlight => (
                                        <PlanHighlightsItem key={highlight}>{highlight}</PlanHighlightsItem>
                                    ))}
                                </PlanHighlights>

                                <PlanButton type="button" onClick={item.action} $featured={item.key === "profissional"}>
                                    {item.cta}
                                </PlanButton>
                            </PlanCard>
                        ))}
                    </PlanGrid>
                </Section>

                <ClosingSection>
                    <ClosingCard>
                        <DashboardIconGlyph name="quickPrice" size={30} color="#2f64ff" />
                        <ClosingTitle>Pronto para otimizar seus cartazes?</ClosingTitle>
                        <ClosingText>
                            Acesse agora e veja como é simples criar cartazes promocionais profissionais, organizar promoções e manter a operação padronizada.
                        </ClosingText>

                        <HeroActions>
                            <HeroPrimaryButton type="button" onClick={goLogin}>
                                Acessar o SenaPrices
                            </HeroPrimaryButton>
                        </HeroActions>
                    </ClosingCard>
                </ClosingSection>

                <FooterBar>
                    <BrandButton type="button" onClick={goTop}>
                        <div>
                            <BrandNameText>Sena</BrandNameText>
                            <BrandNameAccent>Prices</BrandNameAccent>
                        </div>
                        <BrandCaption>Sistema promocional</BrandCaption>
                    </BrandButton>

                    <FooterCopy>
                        Sistema de cartazes de preços promocionais para o varejo brasileiro.
                        {contactEmail ? ` Contato: ${contactEmail}.` : ""}
                        {contactPhone ? ` Telefone: ${contactPhone}.` : ""}
                        {contactWhatsApp ? ` WhatsApp: ${contactWhatsApp}.` : ""}
                    </FooterCopy>

                    <FooterLinks>
                        <FooterLink type="button" onClick={goLogin}>Acessar o sistema</FooterLink>
                        <FooterLink type="button" onClick={scrollToPlans}>Planos</FooterLink>
                    </FooterLinks>
                </FooterBar>
            </PageShell>
        </ThemedComponent>
    );
}
