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
    CreateItemLayout as PdvLayout,
    CreateItemMain as PdvMain,
    CreateItemSidebar as PdvSidebar,
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
} from "../CreateItem/styled";

export const TypeGrid = styled.div.attrs({})`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;

    @media(max-width: 720px){
        grid-template-columns: 1fr;
    }
`;

export const TypeCard = styled.button.attrs({
    type: "button",
})`
    padding: 16px;
    border-radius: 16px;
    border: 1px solid ${props => props.$active
        ? "rgba(59,130,246,0.22)"
        : props.theme.palette.colors.mystic};
    background: ${props => props.$active
        ? "rgba(59,130,246,0.08)"
        : "rgba(248,250,252,0.92)"};
    display: grid;
    gap: 10px;
    text-align: left;
    cursor: ${props => props.disabled ? "default" : "pointer"};
    opacity: ${props => props.disabled && !props.$active ? 0.56 : 1};
`;

export const TypeIcon = styled.img.attrs({})`
    width: 22px;
    height: 22px;
`;

export const TypeTitle = styled.div.attrs({})`
    color: ${props => props.$active
        ? props.theme.palette.primary.main
        : props.theme.palette.colors.ebony};
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
`;

export const TypeText = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;

export const SwitchList = styled.div.attrs({})`
    display: grid;
    gap: 12px;
`;

export const SwitchRow = styled.div.attrs({})`
    padding: 14px 0;
    border-bottom: 1px solid ${props => props.$last ? "transparent" : props.theme.palette.colors.mystic};
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    opacity: ${props => props.$disabled ? 0.58 : 1};
`;

export const SwitchMain = styled.div.attrs({})`
    display: grid;
    gap: 4px;
`;

export const SwitchTitle = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
`;

export const SwitchText = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;

export const ToggleButton = styled.button.attrs({
    type: "button",
})`
    width: 44px;
    min-width: 44px;
    height: 24px;
    border: 0;
    border-radius: 999px;
    background: ${props => props.$active
        ? props.theme.palette.primary.main
        : props.theme.palette.colors.gull};
    cursor: ${props => props.disabled ? "default" : "pointer"};
    position: relative;

    &::after{
        content: "";
        position: absolute;
        top: 3px;
        left: ${props => props.$active ? "23px" : "3px"};
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: ${props => props.theme.palette.colors.white};
        transition: left .2s ease;
    }
`;

export const HistoryList = styled.div.attrs({})`
    display: grid;
    gap: 12px;
`;

export const HistoryItem = styled.div.attrs({})`
    padding: 14px 16px;
    border-radius: 14px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(248,250,252,0.92);
    display: grid;
    gap: 8px;
`;

export const HistoryHeader = styled.div.attrs({})`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
`;

export const HistoryTitle = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
`;

export const HistoryMeta = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;

export const SyncBadge = styled.span.attrs({})`
    width: fit-content;
    padding: 7px 10px;
    border-radius: 999px;
    background: ${props => props.$tone === "green"
        ? "rgba(22,163,74,0.12)"
        : props.$tone === "orange"
            ? "rgba(249,115,22,0.12)"
            : "rgba(59,130,246,0.12)"};
    color: ${props => props.$tone === "green"
        ? "#15803d"
        : props.$tone === "orange"
            ? "#c2410c"
            : props.theme.palette.primary.main};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const ActionRow = styled.div.attrs({})`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`;

export const ActionButton = styled.button.attrs({
    type: "button",
})`
    min-height: 40px;
    padding: 10px 14px;
    border-radius: 12px;
    border: 1px solid ${props => props.$primary
        ? "rgba(59,130,246,0.18)"
        : props.theme.palette.colors.mystic};
    background: ${props => props.$primary
        ? props.theme.palette.primary.main
        : "rgba(248,250,252,0.92)"};
    color: ${props => props.$primary
        ? props.theme.palette.colors.white
        : props.theme.palette.colors.slate};
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    cursor: pointer;
    opacity: ${props => props.disabled ? 0.56 : 1};
`;

export const StepList = styled.div.attrs({})`
    display: grid;
    gap: 12px;
`;

export const StepCard = styled.div.attrs({})`
    padding: 16px;
    border-radius: 16px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(248,250,252,0.92);
    display: grid;
    gap: 12px;
`;

export const StepHeader = styled.div.attrs({})`
    display: flex;
    align-items: flex-start;
    gap: 12px;
`;

export const StepNumber = styled.div.attrs({})`
    width: 28px;
    min-width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(59,130,246,0.12);
    color: ${props => props.theme.palette.primary.main};
    font-size: 12px;
    font-weight: 800;
    line-height: 1;
`;

export const StepMain = styled.div.attrs({})`
    display: grid;
    gap: 6px;
`;

export const StepTitle = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
`;

export const StepText = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;

export const CodeBlock = styled.pre.attrs({})`
    margin: 0;
    padding: 14px 16px;
    border-radius: 14px;
    background: #0f172a;
    color: #cbd5e1;
    font-size: 12px;
    line-height: 19px;
    overflow: auto;
    white-space: pre-wrap;
    word-break: break-word;
`;

export const CompatibilityGrid = styled.div.attrs({})`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
`;

export const CompatibilityItem = styled.div.attrs({})`
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(248,250,252,0.92);
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    font-weight: 600;
    line-height: 18px;
`;
