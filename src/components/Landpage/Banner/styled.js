import styled from 'styled-components'

export const BannerHero = styled.section.attrs({})`
    background: ${p => p.theme.palette.gradients.hero};
    min-height: 804px;
    padding: 62px 32px 118px;
`;

export const BannerContent = styled.div.attrs({})`
    max-width: 760px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

export const BannerBrand = styled.div.attrs({})`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;

    img {
        width: 40px;
        height: 40px;
    }
`;

export const BannerBrandText = styled.div.attrs({})`
    display: flex;
    gap: 1px;
    color: ${p => p.theme.palette.colors.white};
    font-size: 34px;
    font-weight: 800;
    line-height: 34px;

    span:last-child {
        color: ${p => p.theme.palette.colors.blue500};
    }
`;

export const BannerBrandEyebrow = styled.div.attrs({})`
    color: ${p => p.theme.palette.colors.slate400};
    font-size: 11px;
    line-height: 11px;
`;

export const BannerBadge = styled.div.attrs({})`
    margin-top: 40px;
    padding: 6px 17px;
    border-radius: 999px;
    background: rgba(30, 41, 59, 0.72);
    border: 1px solid rgba(59, 130, 246, 0.18);
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: ${p => p.theme.palette.colors.slate300};
    font-size: 11px;
    line-height: 18px;

    img {
        width: 11px;
        height: 11px;
    }
`;

export const BannerTitle = styled.h1.attrs({})`
    margin: 28px 0 0;
    color: ${p => p.theme.palette.colors.white};
    font-size: 51px;
    font-weight: 900;
    letter-spacing: -0.5px;
    line-height: 51px;
    max-width: 674px;
`;

export const BannerDescription = styled.p.attrs({})`
    margin: 19px 0 0;
    color: ${p => p.theme.palette.colors.slate400};
    font-size: 14px;
    line-height: 28px;
    max-width: 580px;
`;

export const BannerSubtitle = styled.div.attrs({})``;

export const BannerActions = styled.div.attrs({})`
    margin-top: 28px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
`;

export const BannerFeatures = styled.div.attrs({})`
    margin-top: 28px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
`;

export const BannerFeature = styled.div.attrs({})`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.56);
    border: 1px solid rgba(59, 130, 246, 0.12);
    color: ${p => p.theme.palette.colors.slate400};
    font-size: 11px;
    line-height: 17px;

    img {
        width: 11px;
        height: 11px;
    }
`;

export const BannerVerticalLine = styled.div.attrs({})`
    width: 1px;
    height: 40px;
    background: rgba(255, 255, 255, 0.14);
    margin-top: 32px;
`;
