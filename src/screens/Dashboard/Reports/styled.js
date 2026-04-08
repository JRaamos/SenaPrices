import styled from "styled-components";

export {
    CatalogCard,
    CatalogCardEyebrow,
    CatalogCardHeader,
    CatalogCardText,
    CatalogCardTitle,
    ChecklistItem,
    ChecklistList,
    ChecklistText,
    ChecklistTitle,
    CreateItemLayout as ReportsLayout,
    CreateItemMain as ReportsMain,
    CreateItemSidebar as ReportsSidebar,
    InlineNotice,
    StatusBadge,
    StatusCard,
    StatusText,
    StatusTitle,
    SummaryGrid,
    SummaryItem,
    SummaryLabel,
    SummaryValue,
} from "../CreateItem/styled";

export const StatsGrid = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;

    @media(max-width: 720px){
        grid-template-columns: 1fr;
    }
`;

export const StatCard = styled.article.attrs({
})`
    padding: 18px;
    border-radius: 18px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(248,250,252,0.94) 100%);
    display: grid;
    gap: 8px;
`;

export const StatLabel = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.gull};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const StatValue = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 30px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.05em;
`;

export const StatMeta = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;

export const PeriodToolbar = styled.div.attrs({
})`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
`;

export const PeriodButton = styled.button.attrs({
    type: "button",
})`
    min-height: 38px;
    padding: 9px 14px;
    border-radius: 12px;
    border: 1px solid ${props => props.$active
        ? "rgba(59,130,246,0.18)"
        : props.theme.palette.colors.mystic};
    background: ${props => props.$active
        ? "rgba(59,130,246,0.1)"
        : "rgba(248,250,252,0.92)"};
    color: ${props => props.$active
        ? props.theme.palette.primary.main
        : props.theme.palette.colors.slate};
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    cursor: pointer;
`;

export const TrendGrid = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 10px;
    align-items: end;
    min-height: 220px;

    @media(max-width: 960px){
        grid-template-columns: repeat(6, minmax(0, 1fr));
    }
`;

export const TrendColumn = styled.div.attrs({
})`
    display: grid;
    gap: 8px;
    align-items: end;
`;

export const TrendBarWrap = styled.div.attrs({
})`
    min-height: 160px;
    display: flex;
    align-items: end;
`;

export const TrendBar = styled.div.attrs({
})`
    width: 100%;
    min-height: 12px;
    border-radius: 14px 14px 6px 6px;
    background: linear-gradient(180deg, rgba(37,99,235,0.82) 0%, rgba(14,165,233,0.92) 100%);
    height: ${props => `${props.$height}px`};
`;

export const TrendValue = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    text-align: center;
`;

export const TrendLabel = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.gull};
    font-size: 11px;
    line-height: 16px;
    text-align: center;
`;

export const BreakdownList = styled.div.attrs({
})`
    display: grid;
    gap: 12px;
`;

export const BreakdownItem = styled.div.attrs({
})`
    padding: 14px 16px;
    border-radius: 14px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(248,250,252,0.92);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
`;

export const BreakdownMain = styled.div.attrs({
})`
    display: grid;
    gap: 4px;
`;

export const BreakdownTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
`;

export const BreakdownMeta = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;

export const BreakdownValue = styled.div.attrs({
})`
    color: ${props => props.theme.palette.primary.main};
    font-size: 20px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.04em;
`;

export const ActivityList = styled.div.attrs({
})`
    display: grid;
    gap: 14px;
`;

export const ActivityItem = styled.div.attrs({
})`
    padding: 16px;
    border-radius: 16px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(248,250,252,0.92);
    display: grid;
    gap: 8px;
`;

export const ActivityHeader = styled.div.attrs({
})`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
`;

export const ActivityTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
`;

export const ActivityMeta = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.gull};
    font-size: 11px;
    font-weight: 700;
    line-height: 16px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

export const ActivityText = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;

export const AccessActions = styled.div.attrs({
})`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`;

export const AccessButton = styled.button.attrs({
    type: "button",
})`
    min-height: 38px;
    padding: 9px 14px;
    border-radius: 12px;
    border: 1px solid ${props => props.$primary
        ? "rgba(59,130,246,0.18)"
        : props.theme.palette.colors.mystic};
    background: ${props => props.$primary
        ? "rgba(59,130,246,0.1)"
        : "rgba(248,250,252,0.92)"};
    color: ${props => props.$primary
        ? props.theme.palette.primary.main
        : props.theme.palette.colors.slate};
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    cursor: pointer;
`;
