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
    CreateItemLayout as ItemsLayout,
    CreateItemMain as ItemsMain,
    CreateItemSidebar as ItemsSidebar,
    ErrorSummary,
    ErrorSummaryItem,
    ErrorSummaryTitle,
    FieldCounter,
    FieldError,
    FieldMeta,
    PreviewBadge,
    PreviewCard,
    PreviewMetaItem,
    PreviewMetaLabel,
    PreviewMetaList,
    PreviewMetaValue,
    PreviewSubtitle,
    PreviewTitle,
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
    WarningItem,
    WarningList,
} from "../CreateItem/styled";

export const SearchToolbar = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) repeat(4, minmax(150px, 1fr));
    gap: 12px;

    @media(max-width: 1280px){
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media(max-width: 720px){
        grid-template-columns: 1fr;
    }
`;

export const EditorGrid = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;

    @media(max-width: 720px){
        grid-template-columns: 1fr;
    }
`;

export const SearchField = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 8px;

    @media(min-width: 1281px){
        grid-column: span 1;
    }
`;

export const SearchMeta = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;

export const FilterBadge = styled.span.attrs({
})`
    display: inline-flex;
    align-items: center;
    padding: 6px 10px;
    border-radius: 999px;
    background: rgba(59, 130, 246, 0.08);
    color: ${props => props.theme.palette.primary.main};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const EditorBadge = styled.span.attrs({
})`
    display: inline-flex;
    align-items: center;
    padding: 7px 12px;
    border-radius: 999px;
    background: ${props => props.$active ? "rgba(249,115,22,0.12)" : "rgba(59,130,246,0.12)"};
    color: ${props => props.$active ? "#c2410c" : props.theme.palette.primary.main};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const ItemsTable = styled.div.attrs({
})`
    display: grid;
    gap: 12px;
`;

export const ItemsTableHeader = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: minmax(220px, 1.4fr) minmax(180px, 0.9fr) minmax(180px, 0.9fr) minmax(140px, 0.7fr) minmax(220px, 1fr);
    gap: 12px;
    padding: 0 4px;

    @media(max-width: 1120px){
        display: none;
    }
`;

export const ItemsTableHeaderCell = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.gull};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

export const ItemRow = styled.button.attrs({
    type: "button",
})`
    width: 100%;
    padding: 18px;
    border-radius: 16px;
    border: 1px solid ${props => props.$active ? "rgba(59,130,246,0.24)" : props.theme.palette.colors.mystic};
    background: ${props => props.$active ? "rgba(59,130,246,0.05)" : "rgba(248,250,252,0.92)"};
    display: grid;
    grid-template-columns: minmax(220px, 1.4fr) minmax(180px, 0.9fr) minmax(180px, 0.9fr) minmax(140px, 0.7fr) minmax(220px, 1fr);
    gap: 12px;
    text-align: left;
    cursor: pointer;
    transition: border-color .2s ease, background .2s ease;

    &:hover{
        border-color: rgba(59,130,246,0.18);
    }

    &:focus-visible{
        outline: 3px solid rgba(59,130,246,0.16);
        outline-offset: 2px;
    }

    @media(max-width: 1120px){
        grid-template-columns: 1fr;
    }
`;

export const ItemCell = styled.div.attrs({
})`
    display: grid;
    gap: 8px;
`;

export const ItemTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
`;

export const ItemSubtitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;

export const ItemCode = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 13px;
    font-weight: 700;
    line-height: 20px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
`;

export const ItemMeta = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;

export const ItemTag = styled.span.attrs({
})`
    display: inline-flex;
    align-items: center;
    width: fit-content;
    padding: 6px 10px;
    border-radius: 999px;
    background: rgba(59,130,246,0.08);
    color: ${props => props.theme.palette.primary.main};
    font-size: 11px;
    font-weight: 700;
    line-height: 16px;
`;

export const ItemActions = styled.div.attrs({
})`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: flex-end;

    @media(max-width: 1120px){
        justify-content: flex-start;
    }
`;

export const ItemActionButton = styled.button.attrs({
    type: "button",
})`
    min-height: 36px;
    padding: 8px 12px;
    border-radius: 10px;
    border: 1px solid ${props => props.$tone === "danger" ? "rgba(239,68,68,0.18)" : "rgba(59,130,246,0.18)"};
    background: ${props => props.$tone === "danger" ? "rgba(254,242,242,0.96)" : "rgba(59,130,246,0.08)"};
    color: ${props => props.$tone === "danger" ? "#b91c1c" : props.theme.palette.primary.main};
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    cursor: pointer;

    &:focus-visible{
        outline: 3px solid rgba(59,130,246,0.16);
        outline-offset: 2px;
    }
`;

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
