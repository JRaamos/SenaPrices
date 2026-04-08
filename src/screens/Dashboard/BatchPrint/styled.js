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
    CreateItemLayout as BatchPrintLayout,
    CreateItemMain as BatchPrintMain,
    CreateItemSidebar as BatchPrintSidebar,
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
    grid-template-columns: minmax(0, 1.25fr) repeat(2, minmax(180px, 0.75fr));
    gap: 12px;

    @media(max-width: 1120px){
        grid-template-columns: 1fr 1fr;
    }

    @media(max-width: 720px){
        grid-template-columns: 1fr;
    }
`;

export const ToolbarActions = styled.div.attrs({
})`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

export const ToolbarButton = styled.button.attrs({
    type: "button",
})`
    min-height: 38px;
    padding: 9px 14px;
    border-radius: 12px;
    border: 1px solid ${props => props.$tone === "primary"
        ? "rgba(59,130,246,0.18)"
        : props.$tone === "danger"
            ? "rgba(239,68,68,0.18)"
            : props.theme.palette.colors.mystic};
    background: ${props => props.$tone === "primary"
        ? "rgba(59,130,246,0.08)"
        : props.$tone === "danger"
            ? "rgba(254,242,242,0.96)"
            : "rgba(248,250,252,0.92)"};
    color: ${props => props.$tone === "primary"
        ? props.theme.palette.primary.main
        : props.$tone === "danger"
            ? "#b91c1c"
            : props.theme.palette.colors.slate};
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
    opacity: ${props => props.disabled ? 0.56 : 1};

    &:focus-visible{
        outline: 3px solid rgba(59,130,246,0.16);
        outline-offset: 2px;
    }
`;

export const BatchList = styled.div.attrs({
})`
    display: grid;
    gap: 14px;
`;

export const BatchRow = styled.button.attrs({
    type: "button",
})`
    width: 100%;
    padding: 18px;
    border-radius: 16px;
    border: 1px solid ${props => props.$selected
        ? "rgba(59,130,246,0.24)"
        : props.$tone === "green"
            ? "rgba(22,163,74,0.14)"
            : props.$tone === "blue"
                ? "rgba(59,130,246,0.14)"
                : props.theme.palette.colors.mystic};
    background: ${props => props.$selected
        ? "rgba(59,130,246,0.08)"
        : props.$tone === "green"
            ? "rgba(240,253,244,0.92)"
            : props.$tone === "blue"
                ? "rgba(239,246,255,0.92)"
                : "rgba(248,250,252,0.92)"};
    display: grid;
    gap: 16px;
    text-align: left;
    cursor: pointer;

    &:focus-visible{
        outline: 3px solid rgba(59,130,246,0.16);
        outline-offset: 2px;
    }
`;

export const BatchRowHeader = styled.div.attrs({
})`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;

    @media(max-width: 720px){
        flex-direction: column;
    }
`;

export const BatchHeaderMain = styled.div.attrs({
})`
    display: grid;
    gap: 8px;
`;

export const BatchRowTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 18px;
    font-weight: 700;
    line-height: 26px;
`;

export const BatchRowText = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;

export const BatchMeta = styled.div.attrs({
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
            : "rgba(255,255,255,0.84)"};
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

export const BatchSelectionMark = styled.div.attrs({
})`
    width: 20px;
    height: 20px;
    border-radius: 6px;
    border: 2px solid ${props => props.$selected ? props.theme.palette.primary.main : props.theme.palette.colors.geyser};
    background: ${props => props.$selected ? props.theme.palette.primary.main : "transparent"};
    flex-shrink: 0;
`;

export const BatchDetails = styled.div.attrs({
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

export const BatchDetail = styled.div.attrs({
})`
    padding: 14px;
    border-radius: 14px;
    background: rgba(255,255,255,0.9);
    border: 1px solid ${props => props.theme.palette.colors.mystic};
`;

export const BatchDetailLabel = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.gull};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

export const BatchDetailValue = styled.div.attrs({
})`
    margin-top: 8px;
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 13px;
    font-weight: 700;
    line-height: 20px;
    word-break: break-word;
`;
