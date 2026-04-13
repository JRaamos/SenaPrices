import styled from 'styled-components'

export const MoreContainer = styled.section.attrs({})`
    background: ${p => p.theme.palette.gradients.dark};
    padding: 80px 32px;
`;

export const MoreWrap = styled.div.attrs({})`
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

export const MoreIcon = styled.img.attrs({})`
    width: 32px;
    height: 32px;
    margin-bottom: 16px;
`;

export const MoreTitle = styled.h2.attrs({})`
    margin: 0;
    color: ${p => p.theme.palette.colors.slate50};
    font-size: 30px;
    font-weight: 900;
    letter-spacing: -0.5px;
    line-height: 45px;
`;

export const MoreText = styled.p.attrs({})`
    margin: 14px 0 28px;
    color: ${p => p.theme.palette.colors.slate400};
    font-size: 14px;
    line-height: 23.1px;
`;
