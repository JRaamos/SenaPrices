import styled from 'styled-components'

export const FeatureCard = styled.div.attrs({})`
    background: ${p => p.theme.palette.colors.white};
    border: 1px solid ${p => p.theme.palette.colors.slate100};
    border-radius: 12px;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 21px;
    height: 100%;
`;

export const FeatureCardIconWrap = styled.div.attrs({})`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: ${p => p.theme.palette.colors.slate50};
    border: 1px solid ${p => p.theme.palette.colors.slate100};
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 20px;
        height: 20px;
    }
`;

export const FeatureCardTitle = styled.h3.attrs({})`
    margin: 0;
    color: ${p => p.theme.palette.colors.slate900};
    font-size: 13px;
    font-weight: 700;
    line-height: 19.5px;
    padding-top: 5px;
`;

export const FeatureCardDescription = styled.p.attrs({})`
    color: ${p => p.theme.palette.colors.slate500};
    font-size: 12px;
    font-weight: 400;
    line-height: 19.8px;
    margin: 0;
`;
