import styled from "styled-components";

export {
    CatalogCard,
    CatalogCardEyebrow,
    CatalogCardHeader,
    CatalogCardText,
    CatalogCardTitle,
    CatalogField,
    CatalogInput,
    CatalogLabel,
    CatalogSelect,
    ChecklistItem,
    ChecklistList,
    ChecklistText,
    ChecklistTitle,
    CreateItemLayout as HistoryLayout,
    CreateItemMain as HistoryMain,
    CreateItemSidebar as HistorySidebar,
    ErrorSummary,
    ErrorSummaryItem,
    ErrorSummaryTitle,
    FieldCounter,
    FieldError,
    FieldMeta,
    InlineNotice,
    RecentButton,
    RecentHeader,
    RecentItem,
    RecentList,
    RecentMeta,
    RecentTitle,
    StatusBadge,
    StatusCard,
    StatusText,
    StatusTitle,
    SummaryGrid,
    SummaryItem,
    SummaryLabel,
    SummaryValue,
} from "../CreateItem/styled";

export const EmptyState = styled.div.attrs({
})`
    padding: 28px;
    border-radius: 16px;
    border: 1px dashed ${props => props.theme.palette.colors.geyser};
    background: rgba(248,250,252,0.92);
    color: ${props => props.theme.palette.colors.slate};
    font-size: 14px;
    line-height: 22px;
    text-align: center;
`;

export const FilterToolbar = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) repeat(2, minmax(180px, 0.8fr));
    gap: 12px;

    @media(max-width: 1120px){
        grid-template-columns: 1fr 1fr;
    }

    @media(max-width: 720px){
        grid-template-columns: 1fr;
    }
`;

export const HistoryList = styled.div.attrs({
})`
    display: grid;
    gap: 14px;
`;

export const HistoryRow = styled.div.attrs({
})`
    padding: 18px;
    border-radius: 16px;
    border: 1px solid ${props => props.$tone === "green"
        ? "rgba(22,163,74,0.16)"
        : "rgba(249,115,22,0.16)"};
    background: ${props => props.$tone === "green"
        ? "rgba(240,253,244,0.92)"
        : "rgba(255,247,237,0.92)"};
    display: grid;
    gap: 16px;
`;

export const HistoryRowHeader = styled.div.attrs({
})`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;

    @media(max-width: 720px){
        flex-direction: column;
    }
`;

export const HistoryHeaderMain = styled.div.attrs({
})`
    display: grid;
    gap: 8px;
`;

export const HistoryTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 18px;
    font-weight: 700;
    line-height: 26px;
`;

export const HistoryText = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;

export const HistoryMeta = styled.div.attrs({
})`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

export const MetaBadge = styled.span.attrs({
})`
    display: inline-flex;
    align-items: center;
    width: fit-content;
    padding: 7px 12px;
    border-radius: 999px;
    background: ${props => props.$tone === "green"
        ? "rgba(22,163,74,0.12)"
        : props.$tone === "blue"
            ? "rgba(59,130,246,0.08)"
            : "rgba(255,255,255,0.8)"};
    color: ${props => props.$tone === "green"
        ? "#15803d"
        : props.$tone === "blue"
            ? props.theme.palette.primary.main
            : props.theme.palette.colors.slate};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const HistoryDetails = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;

    @media(max-width: 1120px){
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media(max-width: 720px){
        grid-template-columns: 1fr;
    }
`;

export const HistoryDetail = styled.div.attrs({
})`
    padding: 14px;
    border-radius: 14px;
    background: rgba(255,255,255,0.86);
    border: 1px solid ${props => props.theme.palette.colors.mystic};
`;

export const HistoryDetailLabel = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.gull};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

export const HistoryDetailValue = styled.div.attrs({
})`
    margin-top: 8px;
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 13px;
    font-weight: 700;
    line-height: 20px;
    word-break: break-word;
`;

export const HistoryActions = styled.div.attrs({
})`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

export const HistoryActionButton = styled.button.attrs({
    type: "button",
})`
    min-height: 38px;
    padding: 9px 14px;
    border-radius: 12px;
    border: 1px solid ${props => props.$tone === "danger"
        ? "rgba(239,68,68,0.18)"
        : "rgba(59,130,246,0.18)"};
    background: ${props => props.$tone === "danger"
        ? "rgba(254,242,242,0.96)"
        : "rgba(59,130,246,0.08)"};
    color: ${props => props.$tone === "danger"
        ? "#b91c1c"
        : props.theme.palette.primary.main};
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    cursor: pointer;

    &:focus-visible{
        outline: 3px solid rgba(59,130,246,0.16);
        outline-offset: 2px;
    }
`;
