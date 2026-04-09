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
    CreateItemLayout as LabelsLayout,
    CreateItemMain as LabelsMain,
    CreateItemSidebar as LabelsSidebar,
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

export const FiltersGrid = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(180px, 0.8fr);
    gap: 12px;

    @media(max-width: 720px){
        grid-template-columns: 1fr;
    }
`;

export const SettingsGrid = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;

    @media(max-width: 720px){
        grid-template-columns: 1fr;
    }
`;

export const ToggleGrid = styled.div.attrs({
})`
    display: grid;
    gap: 12px;
`;

export const ToggleItem = styled.label.attrs({
})`
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 16px;
    border-radius: 14px;
    background: rgba(248,250,252,0.92);
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    cursor: pointer;
`;

export const ToggleInput = styled.input.attrs({
    type: "checkbox",
})`
    margin-top: 2px;
    width: 16px;
    height: 16px;
    accent-color: ${props => props.theme.palette.primary.main};
`;

export const ToggleText = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;

    strong{
        display: block;
        margin-bottom: 2px;
        color: ${props => props.theme.palette.colors.ebony};
        font-size: 14px;
    }
`;

export const ItemList = styled.div.attrs({
})`
    display: grid;
    gap: 14px;
`;

export const ItemRow = styled.button.attrs({
    type: "button",
})`
    width: 100%;
    padding: 18px;
    border-radius: 16px;
    border: 1px solid ${props => props.$selected
        ? "rgba(59,130,246,0.24)"
        : props.$tone === "green"
            ? "rgba(22,163,74,0.16)"
            : "rgba(249,115,22,0.16)"};
    background: ${props => props.$selected
        ? "rgba(59,130,246,0.08)"
        : props.$tone === "green"
            ? "rgba(240,253,244,0.92)"
            : "rgba(255,247,237,0.92)"};
    display: grid;
    gap: 14px;
    text-align: left;
    cursor: ${props => props.$disabled ? "not-allowed" : "pointer"};
    opacity: ${props => props.$disabled ? 0.76 : 1};

    &:focus-visible{
        outline: 3px solid rgba(59,130,246,0.16);
        outline-offset: 2px;
    }
`;

export const ItemRowHeader = styled.div.attrs({
})`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;

    @media(max-width: 720px){
        flex-direction: column;
    }
`;

export const ItemHeaderMain = styled.div.attrs({
})`
    display: grid;
    gap: 8px;
`;

export const ItemRowTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 18px;
    font-weight: 700;
    line-height: 26px;
`;

export const ItemRowText = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;

export const ItemMeta = styled.div.attrs({
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

export const ItemRowActions = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const ItemSelectionMark = styled.div.attrs({
})`
    width: 20px;
    height: 20px;
    border-radius: 6px;
    border: 2px solid ${props => props.$selected ? props.theme.palette.primary.main : props.theme.palette.colors.geyser};
    background: ${props => props.$selected ? props.theme.palette.primary.main : "transparent"};
    flex-shrink: 0;
`;

export const CopiesControl = styled.div.attrs({
})`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border-radius: 14px;
    background: rgba(255,255,255,0.9);
    border: 1px solid ${props => props.theme.palette.colors.mystic};
`;

export const CopiesButton = styled.button.attrs({
    type: "button",
})`
    width: 28px;
    height: 28px;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(248,250,252,0.92);
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    cursor: pointer;

    &:focus-visible{
        outline: 3px solid rgba(59,130,246,0.16);
        outline-offset: 2px;
    }
`;

export const CopiesValue = styled.div.attrs({
})`
    min-width: 28px;
    text-align: center;
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
`;

export const PreviewGrid = styled.div.attrs({
})`
    display: grid;
    gap: 12px;
`;

export const PreviewLabelCard = styled.div.attrs({
})`
    width: 100%;
    max-width: 280px;
    min-height: ${props => props.$heightMm ? `${Math.round(props.$heightMm * 3.1)}px` : "120px"};
    padding: 14px;
    border-radius: 18px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(248,250,252,1) 100%);
    box-shadow: 0 8px 20px rgba(15,23,42,0.06);
    display: grid;
    gap: 8px;
    text-align: ${props => props.$textAlign || "left"};
`;

export const PreviewLabelTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-family: ${props => props.$fontFamily || "inherit"};
    font-size: ${props => props.$fontSize ? `${props.$fontSize}px` : "18px"};
    font-weight: 800;
    line-height: 1.02;
    letter-spacing: -0.03em;
`;

export const PreviewLabelText = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-family: ${props => props.$fontFamily || "inherit"};
    font-size: ${props => props.$fontSize ? `${props.$fontSize}px` : "12px"};
    line-height: 18px;
`;

export const PreviewLabelPrice = styled.div.attrs({
})`
    color: ${props => props.$accentColor || props.theme.palette.primary.main};
    font-family: ${props => props.$fontFamily || "inherit"};
    font-size: ${props => props.$fontSize ? `${props.$fontSize}px` : "26px"};
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.05em;
`;

export const PreviewLabelMeta = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-family: ${props => props.$fontFamily || "inherit"};
    font-size: ${props => props.$fontSize ? `${props.$fontSize}px` : "11px"};
    line-height: 16px;
`;

export const ModalOverlay = styled.div.attrs({
})`
    position: fixed;
    inset: 0;
    background: rgba(15,23,42,0.72);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    z-index: 110;
`;

export const ModalCard = styled.div.attrs({
})`
    width: min(860px, 100%);
    max-height: 84vh;
    border-radius: 20px;
    background: ${props => props.theme.palette.colors.white};
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    box-shadow: 0 24px 48px rgba(15,23,42,0.24);
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
`;

export const ModalHeader = styled.div.attrs({
})`
    padding: 18px 20px;
    border-bottom: 1px solid ${props => props.theme.palette.colors.mystic};
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
`;

export const ModalTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 18px;
    font-weight: 700;
    line-height: 26px;
`;

export const ModalText = styled.div.attrs({
})`
    margin-top: 6px;
    color: ${props => props.theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;

export const ModalCloseButton = styled.button.attrs({
    type: "button",
})`
    min-width: 38px;
    min-height: 38px;
    border-radius: 12px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(248,250,252,0.92);
    color: ${props => props.theme.palette.colors.slate};
    cursor: pointer;
`;

export const CodeBlock = styled.pre.attrs({
})`
    margin: 0;
    padding: 18px 20px;
    overflow: auto;
    background: #0f172a;
    color: #cbd5e1;
    font-size: 11px;
    line-height: 18px;
    font-family: Consolas, "Courier New", monospace;
    white-space: pre-wrap;
    word-break: break-word;
`;

export const ModalActions = styled.div.attrs({
})`
    padding: 16px 20px;
    border-top: 1px solid ${props => props.theme.palette.colors.mystic};
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    flex-wrap: wrap;
`;

export const ActionButton = styled.button.attrs({
    type: "button",
})`
    min-height: 38px;
    padding: 9px 14px;
    border-radius: 12px;
    border: 1px solid ${props => props.$tone === "primary"
        ? "rgba(59,130,246,0.18)"
        : props.theme.palette.colors.mystic};
    background: ${props => props.$tone === "primary"
        ? "rgba(59,130,246,0.08)"
        : "rgba(248,250,252,0.92)"};
    color: ${props => props.$tone === "primary"
        ? props.theme.palette.primary.main
        : props.theme.palette.colors.slate};
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    cursor: pointer;
`;
