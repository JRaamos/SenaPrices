import styled from 'styled-components'

export const FooterContainer = styled.footer.attrs({})`
    background: ${p => p.theme.palette.colors.slate900};
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 34px 32px 28px;
    text-align: center;
`;

export const FooterLogo = styled.div.attrs({})`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
`;

export const FooterLogoRow = styled.div.attrs({})`
    display: flex;
    gap: 1px;
    color: ${p => p.theme.palette.colors.white};
    font-size: 15px;
    font-weight: 800;
    line-height: 15px;

    span:last-child {
        color: ${p => p.theme.palette.colors.blue500};
    }
`;

export const FooterLogoEyebrow = styled.div.attrs({})`
    color: ${p => p.theme.palette.colors.slate400};
    font-size: 8px;
    line-height: 8px;
`;

export const FooterLinks = styled.div.attrs({})`
    display: flex;
    gap: 20px;
    margin-top: 22px;

    a {
        color: ${p => p.theme.palette.colors.slate300};
        font-size: 13px;
        line-height: 18px;
        text-decoration: none;
    }
`;

export const FooterDescription = styled.div.attrs({})`
    color: ${p => p.theme.palette.colors.slate300};
    font-size: 12px;
    line-height: 17px;
    margin-top: 6px;
`;

export const FooterLegal = styled.div.attrs({})`
    color: ${p => p.theme.palette.colors.slate400};
    font-size: 10px;
    line-height: 15px;
    margin-top: 12px;
`;

export const FooterCopy = styled.div.attrs({})`
    display: none;
`;
