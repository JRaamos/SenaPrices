import styled from 'styled-components'

export const PlanCard = styled.div.attrs({})`
    position: relative;
    background: ${p => p.accent === 'featured' ? p.theme.palette.colors.slate900 : p.theme.palette.colors.white};
    border: ${p => p.accent === 'featured' ? `2px solid ${p.theme.palette.colors.purple500}` : `1px solid ${p.theme.palette.colors.slate200}`};
    border-radius: 16px;
    box-shadow: ${p => p.accent === 'featured' ? '0px 12px 40px rgba(139, 92, 246, 0.2)' : '0px 2px 12px rgba(0, 0, 0, 0.04)'};
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: ${p => p.accent === 'featured' ? '30px' : '29px'};
`;

export const PlanTag = styled.div.attrs({})`
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: ${p => p.accent === 'featured' ? p.theme.palette.colors.purple500 : p.theme.palette.colors.blue500};
    border-radius: 20px;
    color: ${p => p.theme.palette.colors.white};
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.5px;
    line-height: 15px;
    padding: 4px 16px;
    text-transform: uppercase;
    white-space: nowrap;
`;

export const PlanCardHeader = styled.div.attrs({})`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-bottom: 16px;
`;

export const PlanHeadline = styled.div.attrs({})`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
`;

export const PlanLabel = styled.div.attrs({})`
    color: ${p => p.accent === 'featured' ? p.theme.palette.colors.purple500 : p.accent === 'custom' ? p.theme.palette.colors.blue500 : p.theme.palette.colors.slate500};
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1px;
    line-height: 18px;
    text-transform: uppercase;
`;

export const PlanPill = styled.div.attrs({})`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 9px;
    border-radius: 5px;
    border: 1px solid ${p => p.theme.palette.colors.blue100};
    background: ${p => p.theme.palette.colors.slate100};
    color: ${p => p.theme.palette.colors.blue600};
    font-size: 10px;
    font-weight: 700;
    line-height: 15px;
    white-space: nowrap;

    img {
        width: 9px;
        height: 9px;
    }
`;

export const PlanText = styled.p.attrs({})`
    margin: 0;
    min-height: 38px;
    color: ${p => p.accent === 'featured' ? p.theme.palette.colors.slate400 : p.theme.palette.colors.slate500};
    font-size: 12px;
    font-weight: 400;
    line-height: 18.6px;
`;

export const PlanPriceLine = styled.div.attrs({})`
    display: flex;
    align-items: flex-end;
    gap: 2px;
`;

export const PlanPriceCurrency = styled.div.attrs({})`
    color: ${p => p.accent === 'featured' ? p.theme.palette.colors.slate400 : p.theme.palette.colors.slate500};
    font-size: 13px;
    line-height: 19.5px;
    padding-bottom: 7px;
`;

export const PlanPrice = styled.div.attrs({})`
    color: ${p => p.accent === 'featured' ? p.theme.palette.colors.white : p.theme.palette.colors.slate900};
    font-size: ${p => p.consultation ? '22px' : '38px'};
    font-weight: 900;
    letter-spacing: ${p => p.consultation ? '-0.5px' : '-2px'};
    line-height: ${p => p.consultation ? '22px' : '38px'};
`;

export const PlanPriceSuffix = styled.div.attrs({})`
    color: ${p => p.accent === 'featured' ? p.theme.palette.colors.slate600 : p.theme.palette.colors.slate400};
    font-size: 12px;
    line-height: 18px;
    padding-bottom: 6px;
`;

export const PlanBadge = styled.div.attrs({})`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    width: fit-content;
    padding: 6px 11px;
    border-radius: 6px;
    border: 1px solid ${p => p.accent === 'featured' ? 'rgba(255,255,255,0.1)' : p.theme.palette.colors.slate200};
    background: ${p => p.accent === 'featured' ? 'rgba(255,255,255,0.06)' : p.theme.palette.colors.slate50};

    img {
        width: 10px;
        height: 10px;
    }
`;

export const PlanPillPrimary = styled.div.attrs({})`
    color: ${p => p.accent === 'featured' ? p.theme.palette.colors.slate300 : p.theme.palette.colors.slate500};
    font-size: 11px;
    font-weight: 700;
    line-height: 16.5px;
`;

export const PlanPillMeta = styled.div.attrs({})`
    color: ${p => p.accent === 'featured' ? p.theme.palette.colors.slate600 : p.theme.palette.colors.slate400};
    font-size: 10px;
    line-height: 15px;
`;

export const PlanSeparator = styled.div.attrs({})`
    height: 1px;
    background: ${p => p.accent === 'featured' ? 'rgba(255,255,255,0.07)' : p.theme.palette.colors.slate100};
    margin-bottom: 16px;
`;

export const PlanCardBody = styled.div.attrs({})`
    display: flex;
    flex-direction: column;
    gap: 9px;
    flex: 1;
`;

export const PlanFeature = styled.div.attrs({})`
    display: flex;
    align-items: flex-start;
    gap: 8px;
`;

export const PlanFeatureDot = styled.div.attrs({})`
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 16px;

    img {
        width: 10px;
        height: 10px;
    }
`;

export const PlanFeatureText = styled.div.attrs({})`
    color: ${p => {
        if (!p.enabled) return p.accent === 'featured' ? p.theme.palette.colors.slate600 : p.theme.palette.colors.slate300
        return p.accent === 'featured' ? p.theme.palette.colors.slate300 : p.theme.palette.colors.slate700
    }};
    font-size: 12px;
    font-weight: 400;
    line-height: 24px;
    text-decoration: ${p => p.enabled ? 'none' : 'line-through'};
`;

export const PlanWebHint = styled.span.attrs({})`
    color: ${p => p.theme.palette.colors.yellow500};
    font-size: 9px;
    font-weight: 700;
    line-height: 13.5px;
    margin-left: 6px;
`;

export const PlanFooter = styled.div.attrs({})`
    padding-top: 22px;
`;

export const PlanCardNote = styled.div.attrs({})`
    color: ${p => p.theme.palette.colors.slate500};
    font-size: 11px;
    line-height: 16px;
    margin-top: 10px;
    text-align: center;
`;
