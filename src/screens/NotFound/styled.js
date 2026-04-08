import styled from "styled-components";

export const NotFoundShell = styled.div.attrs({
})`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 20px;
`;

export const NotFoundLayout = styled.div.attrs({
})`
    width: 100%;
    max-width: 980px;
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(300px, 0.9fr);
    gap: 24px;

    @media(max-width: 960px){
        grid-template-columns: 1fr;
    }
`;

export const NotFoundCard = styled.section.attrs({
})`
    padding: 30px;
    border-radius: 24px;
    border: 1px solid ${({ theme }) => theme.palette.colors.mystic};
    background: ${({ theme }) => theme.palette.colors.white};
    box-shadow: 0 18px 48px rgba(15, 23, 42, 0.08);
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const NotFoundCode = styled.div.attrs({
})`
    color: ${({ theme }) => theme.palette.secondary.main};
    font-size: 72px;
    font-weight: 900;
    line-height: 1;
    letter-spacing: -0.08em;
`;

export const NotFoundEyebrow = styled.span.attrs({
})`
    color: ${({ theme }) => theme.palette.colors.gull};
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

export const NotFoundTitle = styled.h1.attrs({
})`
    margin: 0;
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 34px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.05em;
`;

export const NotFoundText = styled.p.attrs({
})`
    margin: 0;
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 15px;
    line-height: 24px;
`;

export const NotFoundActions = styled.div.attrs({
})`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
`;

export const NotFoundButton = styled.button.attrs({
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
    line-height: 19px;
    cursor: pointer;
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
    border: 1px solid ${({ theme }) => theme.palette.colors.mystic};
    background: linear-gradient(180deg, rgba(248,250,252,0.92) 0%, rgba(255,255,255,1) 100%);
`;

export const GuideTitle = styled.div.attrs({
})`
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
`;

export const GuideText = styled.div.attrs({
})`
    margin-top: 8px;
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;
