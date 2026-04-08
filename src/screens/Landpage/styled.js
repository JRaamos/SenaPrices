import styled from "styled-components";

export const PageShell = styled.div.attrs({
})`
    min-height: 100vh;
    background:
        radial-gradient(circle at top left, rgba(59, 130, 246, 0.16), transparent 32%),
        linear-gradient(180deg, #f8fbff 0%, #eef4fb 48%, #f9fafb 100%);
`;

export const TopBar = styled.header.attrs({
})`
    width: min(1180px, calc(100% - 32px));
    margin: 0 auto;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    @media(max-width: 720px){
        flex-direction: column;
        align-items: flex-start;
    }
`;

export const BrandButton = styled.button.attrs({
})`
    padding: 0;
    border: 0;
    background: transparent;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    cursor: pointer;
`;

export const BrandNameText = styled.span.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 32px;
    font-weight: 300;
    line-height: 32px;
    letter-spacing: -0.04em;
`;

export const BrandNameAccent = styled.span.attrs({
})`
    color: ${props => props.theme.palette.colors.sky};
    font-size: 32px;
    font-weight: 800;
    line-height: 32px;
    letter-spacing: -0.04em;
`;

export const BrandCaption = styled.span.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const TopActions = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    gap: 12px;

    @media(max-width: 520px){
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
`;

export const TopActionButton = styled.button.attrs({
})`
    min-height: 44px;
    padding: 10px 18px;
    border-radius: 12px;
    border: 1px solid ${props => props.$primary ? "transparent" : props.theme.palette.colors.mystic};
    background: ${props => props.$primary ? props.theme.palette.colors.azure : "rgba(255,255,255,0.86)"};
    color: ${props => props.$primary ? props.theme.palette.colors.white : props.theme.palette.colors.ebony};
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
    cursor: pointer;
    transition: all .2s ease;

    &:hover{
        transform: translateY(-1px);
        background: ${props => props.$primary ? props.theme.palette.colors.azureDark : props.theme.palette.colors.white};
    }

    &:focus-visible{
        outline: 3px solid rgba(59, 130, 246, 0.2);
        outline-offset: 2px;
    }
`;

export const HeroSection = styled.section.attrs({
})`
    width: min(1180px, calc(100% - 32px));
    margin: 0 auto;
    padding: 34px 0 16px;
`;

export const HeroGrid = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(340px, 0.95fr);
    gap: 24px;
    align-items: stretch;

    @media(max-width: 1080px){
        grid-template-columns: 1fr;
    }
`;

export const HeroBadge = styled.span.attrs({
})`
    display: inline-flex;
    align-items: center;
    padding: 8px 14px;
    border-radius: 999px;
    background: rgba(6, 52, 107, 0.08);
    color: ${props => props.theme.palette.primary.main};
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const HeroTitle = styled.h1.attrs({
})`
    max-width: 760px;
    margin: 18px 0 0;
    color: ${props => props.theme.palette.colors.ebony};
    font-size: clamp(42px, 6vw, 72px);
    font-weight: 800;
    line-height: 0.94;
    letter-spacing: -0.06em;
`;

export const HeroDescription = styled.p.attrs({
})`
    max-width: 620px;
    margin: 20px 0 0;
    color: ${props => props.theme.palette.colors.slate};
    font-size: 18px;
    line-height: 30px;
`;

export const HeroActions = styled.div.attrs({
})`
    margin-top: 28px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
`;

export const HeroPrimaryButton = styled.button.attrs({
})`
    min-height: 50px;
    padding: 12px 22px;
    border-radius: 14px;
    border: 0;
    background: linear-gradient(135deg, ${props => props.theme.palette.primary.main} 0%, ${props => props.theme.palette.colors.azure} 100%);
    color: ${props => props.theme.palette.colors.white};
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
    cursor: pointer;
    box-shadow: 0 18px 32px rgba(6, 52, 107, 0.18);
    transition: transform .2s ease, box-shadow .2s ease;

    &:hover{
        transform: translateY(-1px);
        box-shadow: 0 22px 36px rgba(6, 52, 107, 0.22);
    }

    &:focus-visible{
        outline: 3px solid rgba(59, 130, 246, 0.2);
        outline-offset: 2px;
    }
`;

export const HeroSecondaryButton = styled.button.attrs({
})`
    min-height: 50px;
    padding: 12px 22px;
    border-radius: 14px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(255,255,255,0.88);
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
    cursor: pointer;
    transition: all .2s ease;

    &:hover{
        transform: translateY(-1px);
        background: ${props => props.theme.palette.colors.white};
    }

    &:focus-visible{
        outline: 3px solid rgba(59, 130, 246, 0.2);
        outline-offset: 2px;
    }
`;

export const HeroChipRow = styled.div.attrs({
})`
    margin-top: 28px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
`;

export const HeroChip = styled.div.attrs({
})`
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-height: 42px;
    padding: 10px 14px;
    border-radius: 999px;
    background: rgba(255,255,255,0.84);
    border: 1px solid rgba(148, 163, 184, 0.24);
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 13px;
    font-weight: 600;
    line-height: 19px;
`;

export const HeroChipIcon = styled.img.attrs({
    width: 18,
    height: 18,
})``;

export const HeroPanel = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const HeroHighlightCard = styled.div.attrs({
})`
    padding: 28px;
    border-radius: 24px;
    border: 1px solid rgba(59, 130, 246, 0.14);
    background: linear-gradient(180deg, rgba(6, 52, 107, 0.92) 0%, rgba(18, 87, 170, 0.96) 100%);
    color: ${props => props.theme.palette.colors.white};
    box-shadow: 0 24px 42px rgba(6, 52, 107, 0.24);
`;

export const HeroLabel = styled.div.attrs({
})`
    color: rgba(255,255,255,0.76);
    font-size: 11px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
`;

export const HeroHighlightTitle = styled.h2.attrs({
})`
    margin: 16px 0 0;
    color: ${props => props.theme.palette.colors.white};
    font-size: 28px;
    font-weight: 700;
    line-height: 34px;
`;

export const HeroHighlightText = styled.p.attrs({
})`
    margin: 14px 0 0;
    color: rgba(255,255,255,0.82);
    font-size: 15px;
    line-height: 24px;
`;

export const HeroIndicatorRow = styled.div.attrs({
})`
    margin-top: 20px;
    display: flex;
    gap: 8px;
`;

export const HeroIndicator = styled.span.attrs({
})`
    width: ${props => props.$active ? "32px" : "10px"};
    height: 10px;
    border-radius: 999px;
    background: ${props => props.$active ? props.theme.palette.colors.white : "rgba(255,255,255,0.35)"};
    transition: all .2s ease;
`;

export const HeroQuickActionGrid = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;

    @media(max-width: 560px){
        grid-template-columns: 1fr;
    }
`;

export const HeroQuickActionCard = styled.div.attrs({
})`
    min-height: 196px;
    padding: 20px;
    border-radius: 20px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(255,255,255,0.9);
    box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08);
    display: flex;
    flex-direction: column;
`;

export const HeroQuickActionTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 17px;
    font-weight: 700;
    line-height: 24px;
`;

export const HeroQuickActionText = styled.div.attrs({
})`
    margin-top: 10px;
    color: ${props => props.theme.palette.colors.slate};
    font-size: 13px;
    line-height: 21px;
`;

export const HeroQuickActionButton = styled.button.attrs({
})`
    margin-top: auto;
    min-height: 42px;
    padding: 10px 14px;
    border-radius: 12px;
    border: 1px solid rgba(59, 130, 246, 0.18);
    background: rgba(59, 130, 246, 0.08);
    color: ${props => props.theme.palette.primary.main};
    font-size: 13px;
    font-weight: 700;
    line-height: 19px;
    cursor: pointer;
    transition: all .2s ease;

    &:hover{
        background: rgba(59, 130, 246, 0.12);
    }

    &:focus-visible{
        outline: 3px solid rgba(59, 130, 246, 0.2);
        outline-offset: 2px;
    }
`;

export const Section = styled.section.attrs({
})`
    width: min(1180px, calc(100% - 32px));
    margin: 0 auto;
    padding: 72px 0 0;
`;

export const SectionHeader = styled.div.attrs({
})`
    max-width: 760px;
`;

export const SectionEyebrow = styled.div.attrs({
})`
    color: ${props => props.theme.palette.secondary.main};
    font-size: 12px;
    font-weight: 800;
    line-height: 18px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
`;

export const SectionTitle = styled.h2.attrs({
})`
    margin: 14px 0 0;
    color: ${props => props.theme.palette.colors.ebony};
    font-size: clamp(30px, 4.5vw, 48px);
    font-weight: 800;
    line-height: 1.02;
    letter-spacing: -0.05em;
`;

export const SectionDescription = styled.p.attrs({
})`
    margin: 14px 0 0;
    color: ${props => props.theme.palette.colors.slate};
    font-size: 16px;
    line-height: 27px;
`;

export const PlatformGrid = styled.div.attrs({
})`
    margin-top: 28px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;

    @media(max-width: 780px){
        grid-template-columns: 1fr;
    }
`;

export const PlatformCard = styled.div.attrs({
})`
    padding: 28px;
    border-radius: 22px;
    border: 1px solid rgba(148, 163, 184, 0.2);
    background: linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(240, 244, 248, 0.92) 100%);
    box-shadow: 0 16px 30px rgba(15, 23, 42, 0.06);
`;

export const PlatformCardIcon = styled.img.attrs({
    width: 26,
    height: 26,
})`
    margin-bottom: 18px;
`;

export const PlatformCardTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 22px;
    font-weight: 700;
    line-height: 30px;
`;

export const PlatformCardText = styled.p.attrs({
})`
    margin: 10px 0 0;
    color: ${props => props.theme.palette.colors.slate};
    font-size: 14px;
    line-height: 24px;
`;

export const FeatureGrid = styled.div.attrs({
})`
    margin-top: 28px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;

    @media(max-width: 960px){
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media(max-width: 680px){
        grid-template-columns: 1fr;
    }
`;

export const FeatureCard = styled.div.attrs({
})`
    padding: 24px;
    border-radius: 20px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(255,255,255,0.92);
    display: flex;
    flex-direction: column;
    gap: 14px;
`;

export const FeatureCardIcon = styled.img.attrs({
    width: 22,
    height: 22,
})``;

export const FeatureCardTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 18px;
    font-weight: 700;
    line-height: 25px;
`;

export const FeatureCardText = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 14px;
    line-height: 23px;
`;

export const BillingPill = styled.div.attrs({
})`
    margin-top: 28px;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    padding: 12px 16px;
    border-radius: 999px;
    background: rgba(255,255,255,0.92);
    border: 1px solid ${props => props.theme.palette.colors.mystic};
`;

export const BillingPillText = styled.span.attrs({
})`
    color: ${props => props.$active ? props.theme.palette.primary.main : props.theme.palette.colors.slate};
    font-size: 13px;
    font-weight: ${props => props.$active ? 700 : 600};
    line-height: 19px;
`;

export const BillingToggle = styled.button.attrs({
})`
    width: 58px;
    height: 32px;
    padding: 3px;
    border: 0;
    border-radius: 999px;
    background: rgba(59, 130, 246, 0.18);
    cursor: pointer;

    &:focus-visible{
        outline: 3px solid rgba(59, 130, 246, 0.2);
        outline-offset: 2px;
    }
`;

export const BillingToggleThumb = styled.span.attrs({
})`
    display: block;
    width: 26px;
    height: 26px;
    border-radius: 999px;
    background: ${props => props.theme.palette.colors.white};
    box-shadow: 0 8px 18px rgba(15, 23, 42, 0.14);
    transform: translateX(${props => props.$active ? "26px" : "0"});
    transition: transform .2s ease;
`;

export const BillingHelper = styled.span.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;

export const PlanGrid = styled.div.attrs({
})`
    margin-top: 28px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;

    @media(max-width: 980px){
        grid-template-columns: 1fr;
    }
`;

export const PlanCard = styled.div.attrs({
})`
    padding: 28px;
    border-radius: 24px;
    border: 1px solid ${props => props.$featured ? "rgba(59, 130, 246, 0.24)" : props.theme.palette.colors.mystic};
    background: ${props => props.$featured
        ? "linear-gradient(180deg, rgba(6,52,107,0.96) 0%, rgba(18,87,170,0.98) 100%)"
        : "rgba(255,255,255,0.94)"};
    color: ${props => props.$featured ? props.theme.palette.colors.white : props.theme.palette.colors.ebony};
    box-shadow: ${props => props.$featured ? "0 24px 40px rgba(6,52,107,0.22)" : "0 16px 28px rgba(15,23,42,0.06)"};
`;

export const PlanBadge = styled.span.attrs({
})`
    display: inline-flex;
    align-items: center;
    padding: 7px 12px;
    border-radius: 999px;
    background: rgba(232, 108, 48, 0.12);
    color: ${props => props.theme.palette.secondary.main};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const PlanName = styled.h3.attrs({
})`
    margin: 18px 0 0;
    color: inherit;
    font-size: 24px;
    font-weight: 700;
    line-height: 31px;
`;

export const PlanPrice = styled.div.attrs({
})`
    margin-top: 18px;
    color: inherit;
    font-size: 40px;
    font-weight: 800;
    line-height: 42px;
    letter-spacing: -0.04em;
`;

export const PlanMeta = styled.div.attrs({
})`
    margin-top: 8px;
    color: inherit;
    opacity: 0.72;
    font-size: 12px;
    font-weight: 600;
    line-height: 18px;
`;

export const PlanDescription = styled.p.attrs({
})`
    margin: 18px 0 0;
    color: inherit;
    opacity: 0.88;
    font-size: 14px;
    line-height: 24px;
`;

export const PlanHighlights = styled.div.attrs({
})`
    margin-top: 22px;
    display: grid;
    gap: 10px;
`;

export const PlanHighlightsItem = styled.div.attrs({
})`
    position: relative;
    padding-left: 18px;
    color: inherit;
    font-size: 13px;
    line-height: 20px;
    opacity: 0.9;

    &::before{
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: currentColor;
        opacity: 0.45;
        position: absolute;
        top: 6px;
        left: 0;
    }
`;

export const PlanButton = styled.button.attrs({
})`
    width: 100%;
    margin-top: 26px;
    min-height: 46px;
    padding: 11px 18px;
    border-radius: 14px;
    border: 0;
    background: ${props => props.theme.palette.secondary.main};
    color: ${props => props.theme.palette.colors.white};
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
    cursor: pointer;
    transition: all .2s ease;

    &:hover{
        transform: translateY(-1px);
        filter: brightness(0.98);
    }

    &:focus-visible{
        outline: 3px solid rgba(232, 108, 48, 0.18);
        outline-offset: 2px;
    }
`;

export const FaqGrid = styled.div.attrs({
})`
    margin-top: 28px;
    display: grid;
    gap: 14px;
`;

export const FaqCard = styled.button.attrs({
})`
    width: 100%;
    padding: 22px 24px;
    border-radius: 18px;
    border: 1px solid ${props => props.$open ? "rgba(59, 130, 246, 0.24)" : props.theme.palette.colors.mystic};
    background: ${props => props.$open ? "rgba(59,130,246,0.06)" : "rgba(255,255,255,0.9)"};
    text-align: left;
    cursor: pointer;
    transition: all .2s ease;

    &:hover{
        border-color: rgba(59, 130, 246, 0.24);
    }

    &:focus-visible{
        outline: 3px solid rgba(59, 130, 246, 0.2);
        outline-offset: 2px;
    }
`;

export const FaqQuestion = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 17px;
    font-weight: 700;
    line-height: 25px;
`;

export const FaqQuestionIcon = styled.span.attrs({
})`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 999px;
    background: ${props => props.$open ? "rgba(59,130,246,0.16)" : "rgba(148,163,184,0.12)"};
    color: ${props => props.$open ? props.theme.palette.primary.main : props.theme.palette.colors.slate};
    font-size: 18px;
    font-weight: 700;
    line-height: 18px;
`;

export const FaqAnswer = styled.p.attrs({
})`
    max-width: 860px;
    margin: 14px 0 0;
    color: ${props => props.theme.palette.colors.slate};
    font-size: 14px;
    line-height: 24px;
`;

export const ClosingSection = styled.section.attrs({
})`
    width: min(1180px, calc(100% - 32px));
    margin: 0 auto;
    padding: 72px 0 0;
`;

export const ClosingCard = styled.div.attrs({
})`
    padding: 36px;
    border-radius: 28px;
    background:
        radial-gradient(circle at top right, rgba(232, 108, 48, 0.18), transparent 32%),
        linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(240,244,248,0.96) 100%);
    border: 1px solid rgba(148, 163, 184, 0.18);
    box-shadow: 0 18px 32px rgba(15, 23, 42, 0.06);
`;

export const ClosingTitle = styled.h2.attrs({
})`
    max-width: 720px;
    margin: 14px 0 0;
    color: ${props => props.theme.palette.colors.ebony};
    font-size: clamp(30px, 4.2vw, 46px);
    font-weight: 800;
    line-height: 1.02;
    letter-spacing: -0.05em;
`;

export const ClosingText = styled.p.attrs({
})`
    max-width: 720px;
    margin: 16px 0 0;
    color: ${props => props.theme.palette.colors.slate};
    font-size: 16px;
    line-height: 27px;
`;

export const FooterBar = styled.footer.attrs({
})`
    width: min(1180px, calc(100% - 32px));
    margin: 0 auto;
    padding: 28px 0 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;

    @media(max-width: 820px){
        flex-direction: column;
        align-items: flex-start;
    }
`;

export const FooterCopy = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;

export const FooterLinks = styled.div.attrs({
})`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
`;

export const FooterLink = styled.button.attrs({
})`
    padding: 0;
    border: 0;
    background: transparent;
    color: ${props => props.theme.palette.primary.main};
    font-size: 13px;
    font-weight: 700;
    line-height: 19px;
    cursor: pointer;
`;
