import styled from "styled-components";

export const CheckoutShell = styled.div`
    min-height: 100vh;
    padding: 32px 20px 48px;
    background:
        radial-gradient(circle at top left, rgba(6, 52, 107, 0.12), transparent 28%),
        radial-gradient(circle at bottom right, rgba(232, 108, 48, 0.12), transparent 24%),
        linear-gradient(180deg, #f5f9ff 0%, #eef3fb 52%, #f8fafc 100%);
`;

export const CheckoutLayout = styled.div`
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
    gap: 24px;

    @media(max-width: 980px){
        grid-template-columns: 1fr;
    }
`;

export const CheckoutCard = styled.section`
    padding: 28px;
    border-radius: 24px;
    border: 1px solid ${({ theme }) => theme.palette.colors.mystic};
    background: ${({ $tone, theme }) => {
        if ($tone === "green") return "linear-gradient(180deg, rgba(22,163,74,0.08) 0%, rgba(255,255,255,1) 100%)";
        if ($tone === "blue") return "linear-gradient(180deg, rgba(37,99,235,0.08) 0%, rgba(255,255,255,1) 100%)";
        return "linear-gradient(180deg, rgba(249,115,22,0.08) 0%, rgba(255,255,255,1) 100%)";
    }};
    box-shadow: 0 20px 48px rgba(15, 23, 42, 0.08);
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const CheckoutBadge = styled.span`
    width: fit-content;
    padding: 8px 12px;
    border-radius: 999px;
    background: ${({ $tone }) => {
        if ($tone === "green") return "rgba(22,163,74,0.12)";
        if ($tone === "blue") return "rgba(37,99,235,0.12)";
        return "rgba(249,115,22,0.12)";
    }};
    color: ${({ $tone, theme }) => {
        if ($tone === "green") return "#15803d";
        if ($tone === "blue") return theme.palette.primary.main;
        return theme.palette.secondary.main;
    }};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const CheckoutEyebrow = styled.span`
    color: ${({ theme }) => theme.palette.colors.gull};
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

export const CheckoutTitle = styled.h1`
    margin: 0;
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 34px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.05em;
`;

export const CheckoutText = styled.p`
    margin: 0;
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 15px;
    line-height: 24px;
`;

export const SummaryGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;

    @media(max-width: 640px){
        grid-template-columns: 1fr;
    }
`;

export const SummaryItem = styled.div`
    padding: 14px;
    border-radius: 16px;
    background: rgba(255,255,255,0.86);
    border: 1px solid ${({ theme }) => theme.palette.colors.mystic};
`;

export const SummaryLabel = styled.div`
    color: ${({ theme }) => theme.palette.colors.gull};
    font-size: 11px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const SummaryValue = styled.div`
    margin-top: 8px;
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
    word-break: break-word;
`;

export const ActionRow = styled.div`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
`;

export const ActionButton = styled.button`
    min-height: 46px;
    padding: 12px 16px;
    border-radius: 12px;
    border: 1px solid ${({ $primary, theme }) => $primary ? "rgba(59,130,246,0.18)" : theme.palette.colors.mystic};
    background: ${({ $primary, theme }) => $primary ? theme.palette.primary.main : theme.palette.colors.white};
    color: ${({ $primary, theme }) => $primary ? theme.palette.colors.white : theme.palette.colors.slate};
    font-size: 13px;
    font-weight: 700;
    line-height: 18px;
    cursor: pointer;

    @media(max-width: 560px){
        width: 100%;
    }
`;

export const GuideCard = styled.section`
    padding: 28px;
    border-radius: 24px;
    border: 1px solid ${({ theme }) => theme.palette.colors.mystic};
    background: ${({ theme }) => theme.palette.colors.white};
    box-shadow: 0 20px 48px rgba(15, 23, 42, 0.06);
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const GuideTitle = styled.h2`
    margin: 0;
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 22px;
    font-weight: 700;
    line-height: 30px;
`;

export const GuideText = styled.p`
    margin: 0;
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 14px;
    line-height: 22px;
`;

export const GuideList = styled.div`
    display: grid;
    gap: 14px;
`;

export const GuideItem = styled.div`
    padding: 16px;
    border-radius: 16px;
    background: rgba(248,250,252,0.92);
    border: 1px solid ${({ theme }) => theme.palette.colors.mystic};
`;

export const GuideItemTitle = styled.div`
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
`;

export const GuideItemText = styled.div`
    margin-top: 8px;
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;

export const HighlightList = styled.div`
    display: grid;
    gap: 10px;
`;

export const HighlightItem = styled.div`
    padding: 14px 16px;
    border-radius: 16px;
    background: rgba(248,250,252,0.92);
    border: 1px solid ${({ theme }) => theme.palette.colors.mystic};
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 14px;
    line-height: 21px;
`;
