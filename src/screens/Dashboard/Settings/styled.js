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
    CreateItemLayout as SettingsLayout,
    CreateItemMain as SettingsMain,
    CreateItemSidebar as SettingsSidebar,
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

export const TabsGrid = styled.div.attrs({})`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;

    @media(max-width: 720px){
        grid-template-columns: 1fr;
    }
`;

export const TabButton = styled.button.attrs({
    type: "button",
})`
    padding: 16px;
    border-radius: 16px;
    border: 1px solid ${props => props.$active ? "rgba(59,130,246,0.22)" : props.theme.palette.colors.mystic};
    background: ${props => props.$active ? "rgba(59,130,246,0.08)" : "rgba(248,250,252,0.92)"};
    display: grid;
    gap: 8px;
    text-align: left;
    cursor: pointer;
`;

export const TabHeader = styled.div.attrs({})`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const TabIcon = styled.img.attrs({})`
    width: 20px;
    height: 20px;
`;

export const TabTitle = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
`;

export const TabText = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
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
    border: 1px solid ${props => props.$primary ? "rgba(59,130,246,0.18)" : props.theme.palette.colors.mystic};
    background: ${props => props.$primary ? props.theme.palette.primary.main : "rgba(248,250,252,0.92)"};
    color: ${props => props.$primary ? props.theme.palette.colors.white : props.theme.palette.colors.slate};
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    cursor: pointer;
    opacity: ${props => props.disabled ? 0.56 : 1};
`;

export const ToggleList = styled.div.attrs({})`
    display: grid;
    gap: 12px;
`;

export const ToggleRow = styled.label.attrs({})`
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 16px;
    border-radius: 14px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(248,250,252,0.92);
    cursor: pointer;
`;

export const ToggleInput = styled.input.attrs({
    type: "checkbox",
})`
    width: 16px;
    height: 16px;
    margin-top: 3px;
    accent-color: ${({ theme }) => theme.palette.primary.main};
`;

export const ToggleMain = styled.div.attrs({})`
    display: grid;
    gap: 4px;
`;

export const ToggleTitle = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
`;

export const ToggleText = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;

export const SectionList = styled.div.attrs({})`
    display: grid;
    gap: 12px;
`;

export const SectionRow = styled.div.attrs({})`
    padding: 16px;
    border-radius: 16px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(248,250,252,0.92);
    display: grid;
    gap: 12px;
`;

export const SectionHeader = styled.div.attrs({})`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
`;

export const SectionMain = styled.div.attrs({})`
    display: grid;
    gap: 4px;
`;

export const SectionTitle = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
`;

export const SectionMeta = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;

export const SectionBadge = styled.span.attrs({})`
    width: fit-content;
    padding: 7px 10px;
    border-radius: 999px;
    background: ${props => props.$tone === "orange" ? "rgba(249,115,22,0.12)" : "rgba(59,130,246,0.12)"};
    color: ${props => props.$tone === "orange" ? "#c2410c" : props.theme.palette.primary.main};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const SectionActions = styled.div.attrs({})`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
`;

export const InlineForm = styled.div.attrs({})`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 10px;

    @media(max-width: 640px){
        grid-template-columns: 1fr;
    }
`;

export const EmptyState = styled.div.attrs({})`
    padding: 18px;
    border-radius: 14px;
    border: 1px dashed ${props => props.theme.palette.colors.mystic};
    color: ${props => props.theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
    text-align: center;
`;

export const MatrixGrid = styled.div.attrs({})`
    display: grid;
    gap: 12px;
`;

export const MatrixCard = styled.div.attrs({})`
    padding: 16px;
    border-radius: 16px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(248,250,252,0.92);
    display: grid;
    gap: 12px;
`;

export const MatrixTitle = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
`;

export const MatrixRow = styled.div.attrs({})`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;

    @media(max-width: 640px){
        grid-template-columns: 1fr;
    }
`;

export const MatrixCell = styled.div.attrs({})`
    padding: 12px;
    border-radius: 12px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(255,255,255,0.92);
`;

export const MatrixLabel = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.gull};
    font-size: 11px;
    font-weight: 700;
    line-height: 16px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

export const PermissionBadge = styled.div.attrs({})`
    margin-top: 8px;
    width: fit-content;
    padding: 7px 10px;
    border-radius: 999px;
    background: ${props => props.$tone === "green"
        ? "rgba(22,163,74,0.12)"
        : props.$tone === "blue"
            ? "rgba(59,130,246,0.12)"
            : "rgba(249,115,22,0.12)"};
    color: ${props => props.$tone === "green"
        ? "#15803d"
        : props.$tone === "blue"
            ? props.theme.palette.primary.main
            : "#c2410c"};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const UserList = styled.div.attrs({})`
    display: grid;
    gap: 12px;
`;

export const UserRow = styled.div.attrs({})`
    padding: 14px 16px;
    border-radius: 14px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(248,250,252,0.92);
    display: grid;
    gap: 6px;
`;

export const UserName = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
`;

export const UserMeta = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;

export const ShortcutGrid = styled.div.attrs({})`
    display: grid;
    gap: 12px;
`;

export const ShortcutCard = styled.div.attrs({})`
    padding: 16px;
    border-radius: 16px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(248,250,252,0.92);
    display: grid;
    gap: 8px;
`;

export const ShortcutTitle = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
`;

export const ShortcutText = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;
