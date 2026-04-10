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

export const SettingsLayout = styled.div.attrs({})`
    display: grid;
    grid-template-columns: 168px minmax(0, 1fr);
    gap: 18px;
    align-items: start;
    padding-bottom: 96px;

    @media(max-width: 1080px){
        grid-template-columns: 1fr;
        padding-bottom: 112px;
    }
`;

export const SettingsSidebar = styled.aside.attrs({})`
    position: sticky;
    top: 0;
    padding: 24px 0;
    border-radius: 0;
    border-right: 1px solid ${({ theme }) => theme.palette.colors.mystic};
    border-top: 0;
    border-left: 0;
    border-bottom: 0;
    background: ${({ theme }) => theme.palette.colors.white};
    display: grid;
    gap: 10px;

    @media(max-width: 1080px){
        position: static;
        padding: 16px 12px 12px;
        border: 1px solid ${({ theme }) => theme.palette.colors.mystic};
        border-radius: 12px;
        box-shadow: 0 8px 22px rgba(15, 23, 42, 0.05);
    }
`;

export const SettingsMain = styled.main.attrs({})`
    display: flex;
    flex-direction: column;
    gap: 18px;
    min-width: 0;
`;

export const SettingsNavTitle = styled.h2.attrs({})`
    margin: 0;
    padding: 0 14px 3px;
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: -0.03em;
`;

export const SettingsNavList = styled.div.attrs({})`
    display: flex;
    flex-direction: column;
    gap: 0;
`;

export const SettingsNavButton = styled.button.attrs({
    type: "button",
})`
    width: 100%;
    min-height: 34px;
    padding: 8px 14px;
    border: 0;
    border-left: 3px solid ${({ $active, theme }) => $active ? theme.palette.primary.main : "transparent"};
    border-radius: 0;
    background: ${({ $active }) => $active ? "rgba(59,130,246,0.08)" : "transparent"};
    color: ${({ $active, theme }) => $active ? theme.palette.primary.main : theme.palette.colors.slate};
    display: flex;
    align-items: center;
    gap: 7px;
    cursor: pointer;
    text-align: left;
    transition: background .2s ease, color .2s ease, border-color .2s ease;

    &:hover {
        background: rgba(59,130,246,0.06);
        color: ${({ theme }) => theme.palette.primary.main};
    }
`;

export const SettingsNavIconWrap = styled.span.attrs({})`
    width: 14px;
    height: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

export const SettingsNavLabel = styled.span.attrs({})`
    font-size: 12px;
    font-weight: 600;
    line-height: 17px;
`;

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
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid ${props => props.$active ? "rgba(59,130,246,0.22)" : props.theme.palette.colors.mystic};
    background: ${props => props.$active ? "rgba(59,130,246,0.08)" : "rgba(248,250,252,0.92)"};
    display: grid;
    gap: 6px;
    text-align: left;
    cursor: pointer;
`;

export const TabHeader = styled.div.attrs({})`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const TabIcon = styled.img.attrs({})`
    width: 18px;
    height: 18px;
`;

export const TabTitle = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 13px;
    font-weight: 700;
    line-height: 19px;
`;

export const TabText = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 11px;
    line-height: 16px;
`;

export const ActionRow = styled.div.attrs({})`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
`;

export const ActionButton = styled.button.attrs({
    type: "button",
})`
    min-height: 38px;
    padding: 9px 14px;
    border-radius: 8px;
    border: 1px solid ${props => props.$primary ? "rgba(59,130,246,0.18)" : props.theme.palette.colors.mystic};
    background: ${props => props.$primary ? props.theme.palette.primary.main : "rgba(248,250,252,0.92)"};
    color: ${props => props.$primary ? props.theme.palette.colors.white : props.theme.palette.colors.slate};
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    cursor: pointer;
    opacity: ${props => props.disabled ? 0.56 : 1};
`;

export const ToggleList = styled.div.attrs({})`
    display: grid;
    gap: 8px;
`;

export const ToggleRow = styled.label.attrs({})`
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 10px 14px;
    border-radius: 8px;
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
    font-size: 13px;
    font-weight: 700;
    line-height: 19px;
`;

export const ToggleText = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;

export const SectionList = styled.div.attrs({})`
    display: grid;
    gap: 8px;
`;

export const SectionRow = styled.div.attrs({})`
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(248,250,252,0.92);
    display: grid;
    gap: 10px;
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
    font-size: 13px;
    font-weight: 700;
    line-height: 19px;
`;

export const SectionMeta = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;

export const SectionBadge = styled.span.attrs({})`
    width: fit-content;
    padding: 5px 10px;
    border-radius: 999px;
    background: ${props => props.$tone === "orange" ? "rgba(249,115,22,0.12)" : "rgba(59,130,246,0.12)"};
    color: ${props => props.$tone === "orange" ? "#c2410c" : props.theme.palette.primary.main};
    font-size: 10px;
    font-weight: 700;
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
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(248,250,252,0.92);
    display: grid;
    gap: 12px;
`;

export const MatrixTitle = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 13px;
    font-weight: 700;
    line-height: 19px;
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
    border-radius: 8px;
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
    padding: 5px 10px;
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
    font-size: 10px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const UserList = styled.div.attrs({})`
    display: grid;
    gap: 8px;
`;

export const UserRow = styled.div.attrs({})`
    padding: 13px 14px;
    border-radius: 10px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(248,250,252,0.92);
    display: grid;
    gap: 6px;
`;

export const UserName = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 13px;
    font-weight: 700;
    line-height: 19px;
`;

export const UserMeta = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 11px;
    line-height: 16px;
`;

export const ShortcutGrid = styled.div.attrs({})`
    display: grid;
    gap: 8px;
`;

export const ShortcutCard = styled.div.attrs({})`
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(248,250,252,0.92);
    display: grid;
    gap: 8px;
`;

export const ShortcutTitle = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 13px;
    font-weight: 700;
    line-height: 19px;
`;

export const ShortcutText = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;

export const PreviewGrid = styled.div.attrs({})`
    display: grid;
    gap: 16px;
`;

export const PreviewSheetStage = styled.div.attrs({})`
    padding: 18px;
    border-radius: 24px;
    border: 1px solid ${({ theme }) => theme.palette.colors.mystic};
    background: linear-gradient(180deg, #f8fbff 0%, #f2f6fd 100%);
`;

export const PreviewSheetFrame = styled.div.attrs({})`
    width: 100%;
    max-width: ${({ $orientation }) => $orientation === "portrait" ? "420px" : "100%"};
    margin: 0 auto;
    aspect-ratio: ${({ $aspectRatio }) => $aspectRatio || "210 / 297"};
    display: grid;
    grid-template-columns: repeat(${({ $columns }) => $columns || 1}, minmax(0, 1fr));
    grid-template-rows: repeat(${({ $rows }) => $rows || 1}, minmax(0, 1fr));
    gap: 12px;
    align-items: stretch;
`;

export const PreviewSheetSlot = styled.div.attrs({})`
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    display: flex;
`;

export const PreviewCard = styled.div.attrs({})`
    padding: ${props => props.$padding ? `${props.$padding}px` : "28px"};
    border-radius: ${props => props.$radius ? `${props.$radius}px` : "24px"};
    background: linear-gradient(180deg, ${props => props.$accentColor || "#06346b"} 0%, rgba(17,24,39,1) 100%);
    border: 1px solid rgba(148,163,184,0.16);
    color: ${props => props.theme.palette.colors.white};
    display: grid;
    gap: 16px;
`;

export const PreviewBadgeRow = styled.div.attrs({})`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
`;

export const PreviewBadge = styled.span.attrs({})`
    display: inline-flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 999px;
    background: rgba(255,255,255,0.14);
    color: ${props => props.theme.palette.colors.white};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const PreviewBadgeMetaList = styled.div.attrs({})`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 8px;
`;

export const PreviewBadgeMeta = styled.span.attrs({})`
    display: inline-flex;
    align-items: center;
    padding: 7px 11px;
    border-radius: 999px;
    background: rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.92);
    font-size: 11px;
    font-weight: 700;
    line-height: 16px;
`;

export const PreviewTitle = styled.h3.attrs({})`
    margin: 0;
    color: inherit;
    font-family: ${props => props.$fontFamily || "inherit"};
    font-size: ${props => props.$fontSize ? `${props.$fontSize}px` : "34px"};
    font-weight: 800;
    line-height: 0.98;
    letter-spacing: -0.05em;
    text-align: ${props => props.$align || "left"};
    text-transform: ${props => props.$transform || "none"};
`;

export const PreviewSubtitle = styled.p.attrs({})`
    margin: 0;
    color: rgba(255,255,255,0.78);
    font-family: ${props => props.$fontFamily || "inherit"};
    font-size: ${props => props.$fontSize ? `${props.$fontSize}px` : "14px"};
    line-height: 22px;
    text-align: ${props => props.$align || "left"};
`;

export const PreviewHeaderMetaList = styled.div.attrs({})`
    display: grid;
    gap: 8px;
`;

export const PreviewHeaderMetaItem = styled.div.attrs({})`
    padding: 10px 12px;
    border-radius: 12px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.08);
`;

export const PreviewPriceBlock = styled.div.attrs({})`
    display: grid;
    justify-items: ${props => props.$align === "center" ? "center" : props.$align === "right" ? "end" : "start"};
    gap: 8px;
`;

export const PreviewPriceStack = styled.div.attrs({})`
    display: grid;
    justify-items: inherit;
    gap: 6px;
`;

export const PreviewPriceTopRow = styled.div.attrs({})`
    display: flex;
    justify-content: inherit;
`;

export const PreviewPriceLine = styled.div.attrs({})`
    display: inline-flex;
    align-items: flex-end;
    gap: 3px;
    flex-wrap: nowrap;
`;

export const PreviewCurrencySymbol = styled.span.attrs({})`
    color: ${props => props.$accentColor || "inherit"};
    font-family: ${props => props.$fontFamily || "inherit"};
    font-size: ${props => props.$fontSize ? `${props.$fontSize}px` : "24px"};
    font-weight: 800;
    line-height: 1;
    transform: translate(${props => props.$offsetX || 0}px, ${props => props.$offsetY || 0}px);
`;

export const PreviewPriceInteger = styled.span.attrs({})`
    color: ${props => props.$accentColor || "inherit"};
    font-family: ${props => props.$fontFamily || "inherit"};
    font-size: ${props => props.$fontSize ? `${props.$fontSize}px` : "42px"};
    font-weight: 800;
    line-height: 0.92;
    letter-spacing: -0.06em;
`;

export const PreviewCentsGroup = styled.span.attrs({})`
    display: inline-flex;
    align-items: ${props => props.$align === "center" ? "center" : props.$align === "bottom" ? "flex-end" : "flex-start"};
    gap: 1px;
    transform: translate(${props => props.$offsetX || 0}px, ${props => props.$offsetY || 0}px);
`;

export const PreviewPriceComma = styled.span.attrs({})`
    color: ${props => props.$accentColor || "inherit"};
    font-family: ${props => props.$fontFamily || "inherit"};
    font-size: ${props => props.$fontSize ? `${props.$fontSize}px` : "26px"};
    font-weight: 800;
    line-height: 1;
    transform: translate(${props => props.$offsetX || 0}px, ${props => props.$offsetY || 0}px);
`;

export const PreviewPriceCents = styled.span.attrs({})`
    color: ${props => props.$accentColor || "inherit"};
    font-family: ${props => props.$fontFamily || "inherit"};
    font-size: ${props => props.$fontSize ? `${props.$fontSize}px` : "24px"};
    font-weight: 800;
    line-height: 1;
`;

export const PreviewPriceUnit = styled.span.attrs({})`
    display: inline-flex;
    align-items: center;
    color: rgba(255,255,255,0.86);
    font-family: ${props => props.$fontFamily || "inherit"};
    font-size: ${props => props.$fontSize ? `${props.$fontSize}px` : "16px"};
    font-weight: 700;
    line-height: 1.1;
    transform: translate(${props => props.$offsetX || 0}px, ${props => props.$offsetY || 0}px);
`;

export const PreviewPrice = styled.div.attrs({})`
    color: ${props => props.$accentColor || "inherit"};
    font-family: ${props => props.$fontFamily || "inherit"};
    font-size: ${props => props.$fontSize ? `${props.$fontSize}px` : "42px"};
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.05em;
    text-align: ${props => props.$align || "left"};
`;

export const PreviewSupportPrice = styled.div.attrs({})`
    color: rgba(255,255,255,0.8);
    font-family: ${props => props.$fontFamily || "inherit"};
    font-size: ${props => props.$fontSize ? `${props.$fontSize}px` : "15px"};
    line-height: 22px;
    text-align: ${props => props.$align || "left"};
    ${props => props.$strike ? "text-decoration: line-through;" : ""}
`;

export const PreviewSpecialLabel = styled.div.attrs({})`
    display: inline-flex;
    align-items: center;
    padding: 9px 12px;
    border-radius: 12px;
    background: ${props => props.$backgroundColor || "rgba(232, 108, 48, 0.18)"};
    color: ${props => props.$color || "#ffd9c7"};
    font-family: ${props => props.$fontFamily || "inherit"};
    font-size: ${props => props.$fontSize ? `${props.$fontSize}px` : "13px"};
    font-weight: 700;
    line-height: 19px;
`;

export const PreviewMetaList = styled.div.attrs({})`
    display: grid;
    gap: 12px;
    grid-template-columns: ${props => props.$layout === "stacked" ? "1fr" : "repeat(auto-fit, minmax(160px, 1fr))"};
`;

export const PreviewMetaItem = styled.div.attrs({})`
    padding: 14px;
    border-radius: 14px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.08);
`;

export const PreviewMetaLabel = styled.div.attrs({})`
    color: rgba(255,255,255,0.62);
    font-size: 11px;
    font-weight: 700;
    line-height: 16px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

export const PreviewMetaValue = styled.div.attrs({})`
    margin-top: 8px;
    color: ${props => props.theme.palette.colors.white};
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
    word-break: break-word;
`;

export const PreviewFooterMetaList = styled.div.attrs({})`
    display: grid;
    gap: 10px;
`;

export const LabelPreviewCard = styled.div.attrs({})`
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

export const LabelPreviewTitle = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.ebony};
    font-family: ${props => props.$fontFamily || "inherit"};
    font-size: ${props => props.$fontSize ? `${props.$fontSize}px` : "18px"};
    font-weight: 800;
    line-height: 1.02;
    letter-spacing: -0.03em;
`;

export const LabelPreviewText = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.slate};
    font-family: ${props => props.$fontFamily || "inherit"};
    font-size: ${props => props.$fontSize ? `${props.$fontSize}px` : "12px"};
    line-height: 18px;
`;

export const LabelPreviewPrice = styled.div.attrs({})`
    color: ${props => props.$accentColor || props.theme.palette.primary.main};
    font-family: ${props => props.$fontFamily || "inherit"};
    font-size: ${props => props.$fontSize ? `${props.$fontSize}px` : "26px"};
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.05em;
`;

export const LabelPreviewMeta = styled.div.attrs({})`
    color: ${props => props.theme.palette.colors.slate};
    font-family: ${props => props.$fontFamily || "inherit"};
    font-size: ${props => props.$fontSize ? `${props.$fontSize}px` : "11px"};
    line-height: 16px;
`;
