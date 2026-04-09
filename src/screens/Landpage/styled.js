import styled from "styled-components";

export const PageShell = styled.div`
    min-height: 100vh;
    background: linear-gradient(180deg, #15203a 0 640px, #f5f9ff 640px 100%);
`;

export const TopBar = styled.header`
    width: 100%;
    min-height: 72px;
    padding: 12px 32px;
    background: rgba(19, 28, 48, 0.96);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    position: sticky;
    top: 0;
    z-index: 12;
    backdrop-filter: blur(12px);

    @media(max-width: 720px){
        padding: 12px 18px;
        flex-direction: column;
        align-items: flex-start;
    }
`;

export const BrandButton = styled.button`
    padding: 0;
    border: 0;
    background: transparent;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 3px;
    cursor: pointer;
`;

export const BrandNameText = styled.span`
    color: #f8fafc;
    font-size: 20px;
    font-weight: 300;
    line-height: 1;
    letter-spacing: -0.04em;
`;

export const BrandNameAccent = styled.span`
    color: #2f86ff;
    font-size: 20px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.04em;
`;

export const BrandCaption = styled.span`
    color: rgba(171, 186, 214, 0.72);
    font-size: 11px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
`;

export const TopActions = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    @media(max-width: 520px){
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
`;

export const TopActionButton = styled.button`
    min-height: 44px;
    padding: 10px 20px;
    border-radius: 14px;
    border: 1px solid ${props => props.$primary ? "transparent" : "rgba(255, 255, 255, 0.12)"};
    background: ${props => props.$primary ? "linear-gradient(135deg, #2c63f5 0%, #23b2ff 100%)" : "rgba(255, 255, 255, 0.03)"};
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    cursor: pointer;
    transition: transform .2s ease, background .2s ease, border-color .2s ease;

    &:hover{
        transform: translateY(-1px);
        border-color: rgba(255, 255, 255, 0.22);
        background: ${props => props.$primary ? "linear-gradient(135deg, #2a5ae0 0%, #1ea2ea 100%)" : "rgba(255, 255, 255, 0.07)"};
    }

    &:focus-visible{
        outline: 3px solid rgba(76, 148, 255, 0.24);
        outline-offset: 2px;
    }
`;

export const HeroSection = styled.section`
    width: min(1180px, calc(100% - 40px));
    margin: 0 auto;
    padding: 110px 0 88px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    @media(max-width: 720px){
        width: min(1180px, calc(100% - 24px));
        padding: 72px 0 64px;
    }
`;

export const HeroBrand = styled.div`
    margin-bottom: 26px;
`;

export const HeroBadge = styled.span`
    display: inline-flex;
    align-items: center;
    min-height: 36px;
    padding: 8px 16px;
    border-radius: 999px;
    background: rgba(39, 88, 183, 0.22);
    border: 1px solid rgba(75, 133, 255, 0.18);
    color: #8fb6ff;
    font-size: 13px;
    font-weight: 700;
    line-height: 19px;
`;

export const HeroTitle = styled.h1`
    max-width: 820px;
    margin: 24px 0 0;
    color: #ffffff;
    font-size: clamp(44px, 6vw, 76px);
    font-weight: 800;
    line-height: 0.96;
    letter-spacing: -0.06em;
`;

export const HeroDescription = styled.p`
    max-width: 760px;
    margin: 22px 0 0;
    color: rgba(212, 223, 245, 0.86);
    font-size: 20px;
    line-height: 33px;

    @media(max-width: 720px){
        font-size: 17px;
        line-height: 28px;
    }
`;

export const HeroActions = styled.div`
    margin-top: 34px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 14px;

    @media(max-width: 520px){
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
    }
`;

export const HeroPrimaryButton = styled.button`
    min-height: 56px;
    padding: 14px 28px;
    border-radius: 16px;
    border: 0;
    background: linear-gradient(135deg, #2c63f5 0%, #23b2ff 100%);
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
    line-height: 22px;
    cursor: pointer;
    box-shadow: 0 18px 40px rgba(15, 67, 157, 0.28);
    transition: transform .2s ease, box-shadow .2s ease;

    &:hover{
        transform: translateY(-1px);
        box-shadow: 0 22px 46px rgba(15, 67, 157, 0.34);
    }

    &:focus-visible{
        outline: 3px solid rgba(76, 148, 255, 0.24);
        outline-offset: 2px;
    }
`;

export const HeroSecondaryButton = styled.button`
    min-height: 56px;
    padding: 14px 28px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.06);
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
    line-height: 22px;
    cursor: pointer;
    transition: transform .2s ease, background .2s ease;

    &:hover{
        transform: translateY(-1px);
        background: rgba(255, 255, 255, 0.1);
    }

    &:focus-visible{
        outline: 3px solid rgba(76, 148, 255, 0.24);
        outline-offset: 2px;
    }
`;

export const HeroChipRow = styled.div`
    margin-top: 34px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
`;

export const HeroChip = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-height: 40px;
    padding: 10px 16px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.05);
    color: rgba(223, 232, 247, 0.88);
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
`;

export const HeroChipIcon = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

export const HeroIndicatorRow = styled.div`
    margin-top: 34px;
    display: flex;
    gap: 8px;
`;

export const HeroIndicator = styled.span`
    width: ${props => props.$active ? "34px" : "10px"};
    height: 10px;
    border-radius: 999px;
    background: ${props => props.$active ? "#4f8dff" : "rgba(255, 255, 255, 0.18)"};
    transition: all .2s ease;
`;

export const HeroMetricGrid = styled.div`
    width: 100%;
    max-width: 880px;
    margin-top: 34px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;

    @media(max-width: 720px){
        grid-template-columns: 1fr;
    }
`;

export const HeroMetricCard = styled.div`
    padding: 18px 18px 16px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.04);
`;

export const HeroMetricValue = styled.div`
    color: #ffffff;
    font-size: 30px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.04em;
`;

export const HeroMetricText = styled.div`
    margin-top: 8px;
    color: rgba(204, 217, 240, 0.84);
    font-size: 13px;
    line-height: 20px;
`;

export const Section = styled.section`
    width: min(1180px, calc(100% - 40px));
    margin: 0 auto;
    padding: 76px 0;
    position: relative;
    z-index: 0;

    &::before{
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100vw;
        height: 100%;
        background: ${props => props.$soft ? "#eef4fb" : "transparent"};
        z-index: -1;
    }

    @media(max-width: 720px){
        width: min(1180px, calc(100% - 24px));
        padding: 56px 0;
    }
`;

export const SectionHeader = styled.div`
    max-width: 860px;
    margin: ${props => props.$center ? "0 auto" : "0"};
    text-align: ${props => props.$center ? "center" : "left"};
`;

export const SectionEyebrow = styled.div`
    color: #2f64ff;
    font-size: 12px;
    font-weight: 800;
    line-height: 18px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
`;

export const SectionTitle = styled.h2`
    margin: 14px 0 0;
    color: #0f172a;
    font-size: clamp(34px, 4.2vw, 56px);
    font-weight: 800;
    line-height: 1.04;
    letter-spacing: -0.05em;
`;

export const SectionDescription = styled.p`
    margin: 16px 0 0;
    color: #5b6f90;
    font-size: 17px;
    line-height: 29px;
`;

export const PlatformGrid = styled.div`
    max-width: 1020px;
    margin: 40px auto 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;

    @media(max-width: 920px){
        grid-template-columns: 1fr;
    }
`;

export const PlatformCard = styled.div`
    padding: 30px;
    border-radius: 24px;
    border: 1px solid rgba(198, 215, 240, 0.9);
    background: #ffffff;
    box-shadow: 0 14px 28px rgba(15, 23, 42, 0.05);
`;

export const PlatformCardIcon = styled.div`
    width: 52px;
    height: 52px;
    border-radius: 16px;
    background: rgba(47, 100, 255, 0.08);
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

export const PlatformCardTitle = styled.div`
    margin-top: 20px;
    color: #111827;
    font-size: 18px;
    font-weight: 800;
    line-height: 26px;
`;

export const PlatformCardBadge = styled.span`
    display: inline-flex;
    align-items: center;
    min-height: 28px;
    margin-top: 12px;
    padding: 5px 12px;
    border-radius: 999px;
    background: ${props => props.$tone === "green" ? "rgba(34, 197, 94, 0.12)" : "rgba(47, 100, 255, 0.1)"};
    color: ${props => props.$tone === "green" ? "#10b981" : "#2f64ff"};
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
`;

export const PlatformCardEyebrow = styled.div`
    margin-top: 10px;
    color: #94a3b8;
    font-size: 12px;
    font-weight: 800;
    line-height: 18px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const PlatformCardText = styled.p`
    margin: 16px 0 0;
    color: #64748b;
    font-size: 15px;
    line-height: 27px;
`;

export const PlatformBulletList = styled.div`
    margin-top: 18px;
    display: grid;
    gap: 10px;
`;

export const PlatformBulletItem = styled.div`
    position: relative;
    padding-left: 24px;
    color: #344256;
    font-size: 15px;
    line-height: 22px;

    &::before{
        content: "✓";
        position: absolute;
        top: 0;
        left: 0;
        color: #10b981;
        font-weight: 800;
    }
`;

export const FeatureGrid = styled.div`
    max-width: 1120px;
    margin: 38px auto 0;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 18px;

    @media(max-width: 1100px){
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media(max-width: 680px){
        grid-template-columns: 1fr;
    }
`;

export const FeatureCard = styled.div`
    min-height: 220px;
    padding: 22px;
    border-radius: 22px;
    border: 1px solid rgba(216, 226, 241, 0.92);
    background: #ffffff;
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.04);
`;

export const FeatureCardIcon = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 16px;
    background: #f8fbff;
    border: 1px solid rgba(226, 232, 240, 0.88);
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

export const FeatureCardTitle = styled.div`
    margin-top: 18px;
    color: #111827;
    font-size: 18px;
    font-weight: 800;
    line-height: 27px;
`;

export const FeatureCardText = styled.div`
    margin-top: 10px;
    color: #64748b;
    font-size: 15px;
    line-height: 27px;
`;

export const FeatureFootnote = styled.div`
    margin-top: 28px;
    text-align: center;
    color: #64748b;
    font-size: 14px;
    line-height: 22px;
`;

export const BillingPill = styled.div`
    margin: 32px auto 0;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    padding: 12px 16px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid rgba(204, 217, 240, 0.92);
`;

export const BillingPillText = styled.span`
    color: ${props => props.$active ? "#0f172a" : "#94a3b8"};
    font-size: 15px;
    font-weight: ${props => props.$active ? 700 : 600};
    line-height: 22px;
`;

export const BillingToggle = styled.button`
    width: 60px;
    height: 34px;
    padding: 4px;
    border: 0;
    border-radius: 999px;
    background: ${props => props.theme.palette.mode === "dark" ? "#d1d5db" : "#cfd8e6"};
    cursor: pointer;

    &:focus-visible{
        outline: 3px solid rgba(76, 148, 255, 0.24);
        outline-offset: 2px;
    }
`;

export const BillingToggleThumb = styled.span`
    display: block;
    width: 26px;
    height: 26px;
    border-radius: 999px;
    background: ${props => props.$active ? "#16a34a" : "#ffffff"};
    box-shadow: 0 8px 18px rgba(15, 23, 42, 0.16);
    transform: translateX(${props => props.$active ? "26px" : "0"});
    transition: transform .2s ease, background .2s ease;
`;

export const BillingHelper = styled.span`
    color: #16a34a;
    font-size: 13px;
    font-weight: 700;
    line-height: 18px;
`;

export const PlanGrid = styled.div`
    margin-top: 34px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;

    @media(max-width: 1100px){
        grid-template-columns: 1fr;
    }
`;

export const PlanCard = styled.div`
    position: relative;
    padding: 30px;
    border-radius: 26px;
    border: 1px solid ${props => props.$featured ? "rgba(138, 92, 255, 0.5)" : "rgba(204, 217, 240, 0.92)"};
    background: ${props => props.$featured ? "#141b31" : "#ffffff"};
    color: ${props => props.$featured ? "#ffffff" : "#111827"};
    box-shadow: ${props => props.$featured ? "0 22px 44px rgba(20, 27, 49, 0.24)" : "0 14px 28px rgba(15, 23, 42, 0.05)"};
`;

export const PlanBadge = styled.span`
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    display: inline-flex;
    align-items: center;
    min-height: 28px;
    padding: 5px 16px;
    border-radius: 999px;
    background: #8b5cf6;
    color: #ffffff;
    font-size: 12px;
    font-weight: 800;
    line-height: 16px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
`;

export const PlanModeBadge = styled.span`
    display: inline-flex;
    align-items: center;
    min-height: 28px;
    padding: 5px 12px;
    border-radius: 999px;
    background: ${props => props.$featured ? "rgba(255, 255, 255, 0.08)" : "rgba(47, 100, 255, 0.08)"};
    color: ${props => props.$featured ? "#d7e4ff" : "#2f64ff"};
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
`;

export const PlanName = styled.h3`
    margin: 18px 0 0;
    color: inherit;
    font-size: 18px;
    font-weight: 800;
    line-height: 26px;
    letter-spacing: 0.08em;
`;

export const PlanDescription = styled.p`
    margin: 16px 0 0;
    color: inherit;
    opacity: 0.88;
    font-size: 15px;
    line-height: 27px;
`;

export const PlanDiscount = styled.div`
    margin-top: 18px;
    display: inline-flex;
    align-items: center;
    min-height: 28px;
    padding: 6px 12px;
    border-radius: 12px;
    background: rgba(34, 197, 94, 0.12);
    color: #16a34a;
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
`;

export const PlanOriginalPrice = styled.div`
    margin-top: 16px;
    color: #94a3b8;
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
    text-decoration: line-through;
`;

export const PlanPrice = styled.div`
    margin-top: 10px;
    color: inherit;
    font-size: 56px;
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.05em;
`;

export const PlanPriceCycle = styled.span`
    margin-left: 6px;
    color: inherit;
    opacity: 0.6;
    font-size: 20px;
    font-weight: 700;
`;

export const PlanBilling = styled.div`
    margin-top: 10px;
    color: inherit;
    opacity: 0.72;
    font-size: 14px;
    line-height: 22px;
`;

export const PlanSeat = styled.div`
    margin-top: 18px;
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid rgba(203, 213, 225, 0.28);
    background: rgba(255, 255, 255, 0.04);
    color: inherit;
    opacity: 0.86;
    font-size: 13px;
    line-height: 20px;
`;

export const PlanMeta = styled.div`
    margin-top: 18px;
    padding-top: 18px;
    border-top: 1px solid rgba(203, 213, 225, 0.18);
    color: inherit;
    opacity: 0.7;
    font-size: 12px;
    line-height: 18px;
`;

export const PlanHighlights = styled.div`
    margin-top: 20px;
    display: grid;
    gap: 12px;
`;

export const PlanHighlightsItem = styled.div`
    position: relative;
    padding-left: 18px;
    color: inherit;
    font-size: 15px;
    line-height: 26px;
    opacity: 0.92;

    &::before{
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: currentColor;
        position: absolute;
        top: 9px;
        left: 0;
        opacity: 0.35;
    }
`;

export const PlanButton = styled.button`
    width: 100%;
    margin-top: 24px;
    min-height: 52px;
    padding: 14px 18px;
    border-radius: 16px;
    border: 1px solid ${props => props.$featured ? "transparent" : "rgba(47, 100, 255, 0.18)"};
    background: ${props => props.$featured ? "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)" : "linear-gradient(135deg, #2c63f5 0%, #23b2ff 100%)"};
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
    line-height: 22px;
    cursor: pointer;
    transition: transform .2s ease, filter .2s ease;

    &:hover{
        transform: translateY(-1px);
        filter: brightness(0.98);
    }

    &:focus-visible{
        outline: 3px solid rgba(76, 148, 255, 0.24);
        outline-offset: 2px;
    }
`;

export const ClosingSection = styled.section`
    width: 100%;
    margin-top: 32px;
    padding: 96px 24px 0;
    background: #15203a;
`;

export const ClosingCard = styled.div`
    width: min(980px, 100%);
    margin: 0 auto;
    padding: 36px 24px 88px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: #ffffff;
`;

export const ClosingTitle = styled.h2`
    max-width: 680px;
    margin: 22px 0 0;
    color: #ffffff;
    font-size: clamp(34px, 4.2vw, 56px);
    font-weight: 800;
    line-height: 1.04;
    letter-spacing: -0.05em;
`;

export const ClosingText = styled.p`
    max-width: 760px;
    margin: 16px 0 0;
    color: rgba(212, 223, 245, 0.82);
    font-size: 18px;
    line-height: 31px;
`;

export const FooterBar = styled.footer`
    width: 100%;
    padding: 42px 24px 56px;
    background: #11182b;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
    text-align: center;
`;

export const FooterCopy = styled.div`
    max-width: 760px;
    color: rgba(171, 186, 214, 0.78);
    font-size: 14px;
    line-height: 24px;
`;

export const FooterLinks = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 14px;
`;

export const FooterLink = styled.button`
    padding: 0;
    border: 0;
    background: transparent;
    color: #8fb6ff;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    cursor: pointer;
`;

export const FaqGrid = styled.div``;
export const FaqCard = styled.div``;
export const FaqQuestion = styled.div``;
export const FaqQuestionIcon = styled.span``;
export const FaqAnswer = styled.p``;
