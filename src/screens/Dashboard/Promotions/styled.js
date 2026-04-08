import styled from "styled-components";

export {
    CatalogCard,
    CatalogCardEyebrow,
    CatalogCardHeader,
    CatalogCardText,
    CatalogCardTitle,
    CatalogField,
    CatalogGrid,
    CatalogInput,
    CatalogLabel,
    CatalogSelect,
    ChecklistItem,
    ChecklistList,
    ChecklistText,
    ChecklistTitle,
    CreateItemLayout as PromotionsLayout,
    CreateItemMain as PromotionsMain,
    CreateItemSidebar as PromotionsSidebar,
    ErrorSummary,
    ErrorSummaryItem,
    ErrorSummaryTitle,
    FieldCounter,
    FieldError,
    FieldMeta,
    InlineNotice,
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

export const SelectionToolbar = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(220px, 0.8fr);
    gap: 12px;

    @media(max-width: 720px){
        grid-template-columns: 1fr;
    }
`;

export const SelectionList = styled.div.attrs({
})`
    display: grid;
    gap: 12px;
`;

export const SelectionRow = styled.button.attrs({
    type: "button",
})`
    width: 100%;
    padding: 16px;
    border-radius: 16px;
    border: 1px solid ${props => props.$selected ? "rgba(59,130,246,0.22)" : props.theme.palette.colors.mystic};
    background: ${props => props.$selected ? "rgba(59,130,246,0.06)" : "rgba(248,250,252,0.92)"};
    display: grid;
    gap: 12px;
    text-align: left;
    cursor: pointer;

    &:focus-visible{
        outline: 3px solid rgba(59,130,246,0.16);
        outline-offset: 2px;
    }
`;

export const SelectionHeader = styled.div.attrs({
})`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
`;

export const SelectionTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
`;

export const SelectionText = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;

export const SelectionMeta = styled.div.attrs({
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
            : "rgba(148,163,184,0.12)"};
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

export const SelectionMarker = styled.div.attrs({
})`
    width: 18px;
    height: 18px;
    border-radius: 5px;
    border: 2px solid ${props => props.$selected ? props.theme.palette.primary.main : props.theme.palette.colors.geyser};
    background: ${props => props.$selected ? props.theme.palette.primary.main : "transparent"};
    flex-shrink: 0;
`;

export const OrderList = styled.div.attrs({
})`
    display: grid;
    gap: 14px;
`;

export const OrderCard = styled.div.attrs({
})`
    padding: 18px;
    border-radius: 16px;
    border: 1px solid ${props => props.$expired
        ? "rgba(148,163,184,0.2)"
        : "rgba(59,130,246,0.16)"};
    background: ${props => props.$expired
        ? "rgba(248,250,252,0.92)"
        : "rgba(239,246,255,0.74)"};
    display: grid;
    gap: 14px;
`;

export const OrderHeader = styled.div.attrs({
})`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;

    @media(max-width: 720px){
        flex-direction: column;
    }
`;

export const OrderTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 17px;
    font-weight: 700;
    line-height: 24px;
`;

export const OrderText = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;

export const OrderDetails = styled.div.attrs({
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

export const OrderDetail = styled.div.attrs({
})`
    padding: 14px;
    border-radius: 14px;
    background: rgba(255,255,255,0.88);
    border: 1px solid ${props => props.theme.palette.colors.mystic};
`;

export const OrderDetailLabel = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.gull};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

export const OrderDetailValue = styled.div.attrs({
})`
    margin-top: 8px;
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 13px;
    font-weight: 700;
    line-height: 20px;
    word-break: break-word;
`;

export const OrderActions = styled.div.attrs({
})`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

export const OrderActionButton = styled.button.attrs({
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
