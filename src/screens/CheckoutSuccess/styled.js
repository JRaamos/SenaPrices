import styled from "styled-components";

export const SuccessShell = styled.div.attrs({
})`
    min-height: 100vh;
    padding: 32px 20px 48px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SuccessLayout = styled.div.attrs({
})`
    width: 100%;
    max-width: 1080px;
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
    gap: 24px;

    @media(max-width: 960px){
        grid-template-columns: 1fr;
    }
`;

export const SuccessCard = styled.section.attrs({
})`
    padding: 28px;
    border-radius: 24px;
    border: 1px solid ${({ theme }) => theme.palette.colors.mystic};
    background: ${({ $tone, theme }) => $tone === "green"
        ? "linear-gradient(180deg, rgba(22,163,74,0.08) 0%, rgba(255,255,255,1) 100%)"
        : "linear-gradient(180deg, rgba(249,115,22,0.08) 0%, rgba(255,255,255,1) 100%)"};
    box-shadow: 0 20px 48px rgba(15, 23, 42, 0.08);
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const SuccessBadge = styled.span.attrs({
})`
    width: fit-content;
    padding: 8px 12px;
    border-radius: 999px;
    background: ${({ $tone }) => $tone === "green" ? "rgba(22,163,74,0.12)" : "rgba(249,115,22,0.12)"};
    color: ${({ $tone, theme }) => $tone === "green" ? "#15803d" : theme.palette.secondary.main};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const SuccessEyebrow = styled.span.attrs({
})`
    color: ${({ theme }) => theme.palette.colors.gull};
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

export const SuccessTitle = styled.h1.attrs({
})`
    margin: 0;
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 34px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.05em;
`;

export const SuccessText = styled.p.attrs({
})`
    margin: 0;
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 15px;
    line-height: 24px;
`;

export const SuccessActionRow = styled.div.attrs({
})`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
`;

export const SuccessActionButton = styled.button.attrs({
    type: "button",
})`
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

export const SummaryGrid = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;

    @media(max-width: 640px){
        grid-template-columns: 1fr;
    }
`;

export const SummaryItem = styled.div.attrs({
})`
    padding: 14px;
    border-radius: 16px;
    background: rgba(255,255,255,0.86);
    border: 1px solid ${({ theme }) => theme.palette.colors.mystic};
`;

export const SummaryLabel = styled.div.attrs({
})`
    color: ${({ theme }) => theme.palette.colors.gull};
    font-size: 11px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const SummaryValue = styled.div.attrs({
})`
    margin-top: 8px;
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
    word-break: break-word;
`;

export const GuideCard = styled.section.attrs({
})`
    padding: 28px;
    border-radius: 24px;
    border: 1px solid ${({ theme }) => theme.palette.colors.mystic};
    background: ${({ theme }) => theme.palette.colors.white};
    box-shadow: 0 20px 48px rgba(15, 23, 42, 0.06);
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const GuideTitle = styled.h2.attrs({
})`
    margin: 0;
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 22px;
    font-weight: 700;
    line-height: 30px;
`;

export const GuideText = styled.p.attrs({
})`
    margin: 0;
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 14px;
    line-height: 22px;
`;

export const GuideList = styled.div.attrs({
})`
    display: grid;
    gap: 14px;
`;

export const GuideItem = styled.div.attrs({
})`
    padding: 16px;
    border-radius: 16px;
    background: rgba(248,250,252,0.92);
    border: 1px solid ${({ theme }) => theme.palette.colors.mystic};
`;

export const GuideItemTitle = styled.div.attrs({
})`
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
`;

export const GuideItemText = styled.div.attrs({
})`
    margin-top: 8px;
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;
