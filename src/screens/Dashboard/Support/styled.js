import styled from "styled-components";

export const DashboardGrid = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: minmax(280px, 360px) minmax(0, 1fr);
    gap: 18px;
    align-items: start;

    @media(max-width: 1080px){
        grid-template-columns: 1fr;
    }
`;

export const DashboardSidebar = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const DashboardMain = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const DashboardCard = styled.div.attrs({
})`
    padding: 18px;
    background: ${props => props.theme.palette.colors.white};
    border-radius: 12px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
    display: flex;
    flex-direction: column;
`;

export const DashboardSectionTitle = styled.h2.attrs({
})`
    margin: 0;
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
`;

export const DashboardSectionText = styled.p.attrs({
})`
    margin: 4px 0 0;
    color: ${props => props.theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;

export const DashboardProfileName = styled.div.attrs({
})`
    margin-top: -4px;
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 22px;
    font-weight: 700;
    text-align: center;
`;

export const DashboardProfileEmail = styled.div.attrs({
})`
    margin-top: 6px;
    color: ${props => props.theme.palette.colors.slate};
    font-size: 14px;
    line-height: 21px;
    text-align: center;
    word-break: break-word;
`;

export const DashboardProfileMeta = styled.div.attrs({
})`
    margin-top: 16px;
    padding: 12px 14px;
    border-radius: 12px;
    background: ${props => props.theme.palette.colors.catskill};
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
    text-align: center;
`;

export const DashboardHighlightCard = styled(DashboardCard).attrs({
})`
    border-color: rgba(59, 130, 246, .2);
    background: linear-gradient(180deg, rgba(59, 130, 246, .06) 0%, rgba(255,255,255,1) 100%);
`;

export const DashboardHighlightLabel = styled.div.attrs({
})`
    width: fit-content;
    padding: 6px 12px;
    border-radius: 999px;
    background: rgba(59, 130, 246, .12);
    color: #1D4ED8;
    font-size: 11px;
    font-weight: 700;
    line-height: 16px;
    text-transform: uppercase;
    letter-spacing: .08em;
`;

export const DashboardHighlightTitle = styled.div.attrs({
})`
    margin-top: 14px;
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 18px;
    font-weight: 700;
    line-height: 26px;
`;

export const DashboardHighlightText = styled.div.attrs({
})`
    margin-top: 8px;
    color: ${props => props.theme.palette.colors.slate};
    font-size: 14px;
    line-height: 22px;
`;

export const DashboardQuickActionGrid = styled.div.attrs({
})`
    margin-top: 20px;
    display: grid;
    gap: 14px;
`;

export const DashboardQuickActionCard = styled.div.attrs({
})`
    padding: 18px;
    border-radius: 14px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: linear-gradient(180deg, rgba(240,244,248,0.72) 0%, rgba(255,255,255,1) 100%);
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const DashboardQuickActionIcon = styled.img.attrs({
    width: 22,
    height: 22,
})``;

export const DashboardQuickActionTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
`;

export const DashboardQuickActionText = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;

export const DashboardQuickActionButton = styled.button.attrs({
})`
    margin-top: 4px;
    border: 0;
    border-radius: 10px;
    min-height: 42px;
    padding: 10px 14px;
    background: ${props => props.theme.palette.colors.azure};
    color: ${props => props.theme.palette.colors.white};
    font-size: 13px;
    font-weight: 700;
    line-height: 19.5px;
    text-align: center;
    cursor: pointer;
    transition: all .2s ease;

    &:hover{
        background: ${props => props.theme.palette.colors.azureDark};
    }

    &:focus-visible{
        outline: 3px solid rgba(59, 130, 246, .22);
        outline-offset: 2px;
    }
`;

export const DashboardSummaryGrid = styled.div.attrs({
})`
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;

    @media(max-width: 980px){
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media(max-width: 640px){
        grid-template-columns: 1fr;
    }
`;

export const DashboardSummaryItem = styled.div.attrs({
})`
    padding: 16px;
    border-radius: 14px;
    background: ${props => props.theme.palette.colors.catskill};
    border: 1px solid ${props => props.theme.palette.colors.mystic};
`;

export const DashboardSummaryLabel = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.gull};
    font-size: 11px;
    font-weight: 700;
    line-height: 16.5px;
    text-transform: uppercase;
    letter-spacing: .08em;
`;

export const DashboardSummaryValue = styled.div.attrs({
})`
    padding-top: 8px;
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 22px;
    font-weight: 800;
    line-height: 28px;
    word-break: break-word;
`;

export const DashboardTableCard = styled(DashboardCard).attrs({
})``;

export const DashboardTableWrapper = styled.div.attrs({
})`
    margin-top: 20px;

    .MuiPaper-root {
        box-shadow: none;
        border: 1px solid ${props => props.theme.palette.colors.mystic};
        border-radius: 14px;
        overflow: hidden;
    }
`;

export const DashboardGuidelineGrid = styled.div.attrs({
})`
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;

    @media(max-width: 900px){
        grid-template-columns: 1fr;
    }
`;

export const DashboardGuidelineCard = styled.div.attrs({
})`
    padding: 18px;
    border-radius: 14px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: linear-gradient(180deg, rgba(248,250,252,1) 0%, rgba(255,255,255,1) 100%);
`;

export const DashboardGuidelineTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
`;

export const DashboardGuidelineText = styled.div.attrs({
})`
    margin-top: 8px;
    color: ${props => props.theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;

export const DashboardNoticeCard = styled(DashboardCard).attrs({
})`
    margin-bottom: 32px;
    border-color: rgba(232, 108, 48, .24);
    background: linear-gradient(180deg, rgba(232, 108, 48, .06) 0%, rgba(255,255,255,1) 100%);
`;

export const DashboardNoticeTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.secondary.main};
    font-size: 18px;
    font-weight: 700;
    line-height: 26px;
`;

export const DashboardNoticeText = styled.div.attrs({
})`
    margin-top: 8px;
    color: ${props => props.theme.palette.colors.slate};
    font-size: 14px;
    line-height: 22px;
`;
