import styled, { css } from "styled-components";

export {
    CatalogCard as StudioCard,
    CatalogCardEyebrow as StudioCardEyebrow,
    CatalogCardHeader as StudioCardHeader,
    CatalogCardText as StudioCardText,
    CatalogCardTitle as StudioCardTitle,
    CatalogField as StudioField,
    CatalogGrid as StudioGrid,
    CatalogInput as StudioInput,
    CatalogLabel as StudioLabel,
    CatalogSelect as StudioSelect,
    ChecklistItem,
    ChecklistList,
    ChecklistText,
    ChecklistTitle,
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
    WarningItem,
    WarningList,
} from "../CreateItem/styled";

export const CreatePriceLayout = styled.div.attrs({})`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 286px;
    gap: 22px;
    align-items: start;
    padding-bottom: 124px;

    @media(max-width: 1160px){
        grid-template-columns: 1fr;
        padding-bottom: 136px;
    }
`;

export const CreatePriceMain = styled.div.attrs({})`
    display: grid;
    gap: 22px;
    min-width: 0;
`;

export const CreatePriceSidebar = styled.aside.attrs({})`
    display: grid;
    gap: 22px;
    position: sticky;
    top: 0;

    @media(max-width: 1160px){
        position: static;
    }
`;

export const CreatePriceTopGrid = styled.div.attrs({})`
    display: grid;
    gap: 22px;
`;

export const SearchPriceGrid = styled.div.attrs({})`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(340px, 0.92fr);
    gap: 22px;

    @media(max-width: 1080px){
        grid-template-columns: 1fr;
    }
`;

export const StudioTextarea = styled.textarea.attrs({})`
    min-height: 108px;
    padding: 12px 14px;
    resize: vertical;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.palette.colors.geyser};
    background: ${({ theme }) => theme.palette.colors.white};
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 14px;
    line-height: 21px;
    transition: border-color .2s ease, box-shadow .2s ease;

    &::placeholder{
        color: rgba(100, 116, 139, 0.72);
    }

    &:focus{
        outline: none;
        border-color: ${({ theme }) => theme.palette.colors.azure};
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.14);
    }
`;

export const FieldInlineGrid = styled.div.attrs({})`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;

    @media(max-width: 720px){
        grid-template-columns: 1fr;
    }
`;

export const SearchField = styled.div.attrs({})`
    position: relative;
    display: grid;
    gap: 10px;
`;

export const SearchInputWrap = styled.div.attrs({})`
    position: relative;
`;

export const SearchIconWrap = styled.span.attrs({})`
    position: absolute;
    top: 50%;
    left: 14px;
    transform: translateY(-50%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.palette.colors.gull};
    pointer-events: none;
`;

export const SearchInput = styled.input.attrs({})`
    width: 100%;
    min-height: 46px;
    padding: 12px 14px 12px 42px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.palette.colors.geyser};
    background: ${({ theme }) => theme.palette.colors.white};
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 14px;
    line-height: 21px;
    transition: border-color .2s ease, box-shadow .2s ease;

    &::placeholder{
        color: rgba(100, 116, 139, 0.72);
    }

    &:focus{
        outline: none;
        border-color: ${({ theme }) => theme.palette.colors.azure};
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.14);
    }
`;

export const SuggestionPanel = styled.div.attrs({})`
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    z-index: 12;
    max-height: 284px;
    overflow: auto;
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.palette.colors.mystic};
    background: ${({ theme }) => theme.palette.colors.white};
    box-shadow: 0 16px 36px rgba(15, 23, 42, 0.14);
`;

export const SuggestionButton = styled.button.attrs({
    type: "button",
})`
    width: 100%;
    padding: 14px 16px;
    border: 0;
    background: ${({ $active }) => $active ? "rgba(59,130,246,0.08)" : "transparent"};
    display: grid;
    gap: 4px;
    text-align: left;
    cursor: pointer;
    border-bottom: 1px solid rgba(226,232,240,0.92);

    &:last-child{
        border-bottom: 0;
    }
`;

export const SuggestionTitle = styled.div.attrs({})`
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
`;

export const SuggestionMeta = styled.div.attrs({})`
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;

export const SelectedItemPanel = styled.div.attrs({})`
    padding: 14px 16px;
    border-radius: 14px;
    border: 1px solid rgba(59,130,246,0.18);
    background: rgba(59,130,246,0.08);
    display: grid;
    gap: 6px;
`;

export const SelectedItemTitle = styled.div.attrs({})`
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
`;

export const SelectedItemMeta = styled.div.attrs({})`
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;

export const SelectedItemHint = styled.div.attrs({})`
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 12px;
    line-height: 18px;
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
    border: 1px solid ${({ theme }) => theme.palette.colors.mystic};
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

export const ToggleTextWrap = styled.div.attrs({})`
    display: grid;
    gap: 4px;
`;

export const ToggleTitle = styled.div.attrs({})`
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
`;

export const ToggleText = styled.div.attrs({})`
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;

export const HelperText = styled.div.attrs({})`
    color: ${({ theme }) => theme.palette.colors.gull};
    font-size: 12px;
    line-height: 18px;
`;

export const PreviewSection = styled.section.attrs({})`
    padding: 24px;
    border-radius: 18px;
    border: 1px solid ${({ theme }) => theme.palette.colors.mystic};
    background: ${({ theme }) => theme.palette.colors.white};
    box-shadow: 0 10px 28px rgba(15, 23, 42, 0.06);
    display: grid;
    gap: 22px;
`;

export const PreviewSectionHeader = styled.div.attrs({})`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
`;

export const PreviewSectionTextWrap = styled.div.attrs({})`
    display: grid;
    gap: 6px;
`;

export const PreviewSectionEyebrow = styled.span.attrs({})`
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const PreviewSectionTitle = styled.h3.attrs({})`
    margin: 0;
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 22px;
    font-weight: 700;
    line-height: 30px;
`;

export const PreviewSectionText = styled.p.attrs({})`
    margin: 0;
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 14px;
    line-height: 22px;
`;

export const SheetModeBadge = styled.span.attrs({})`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: 999px;
    background: rgba(59,130,246,0.08);
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 12px;
    font-weight: 800;
    line-height: 18px;
`;

export const PreviewWorkspace = styled.div.attrs({})`
    display: grid;
    gap: 20px;
    align-items: start;

    ${({ $orientation }) => $orientation === "portrait" ? css`
        grid-template-columns: minmax(0, 1fr) minmax(320px, 420px);
    ` : css`
        grid-template-columns: 1fr;
    `}

    @media(max-width: 1080px){
        grid-template-columns: 1fr;
    }
`;

export const PreviewRail = styled.div.attrs({})`
    display: grid;
    gap: 18px;
    min-width: 0;
`;

export const PreviewCanvasWrap = styled.div.attrs({})`
    display: grid;
    gap: 14px;
    min-width: 0;
`;

export const PreviewCanvasHeader = styled.div.attrs({})`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
`;

export const PreviewCanvasMeta = styled.div.attrs({})`
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;

export const PreviewCanvas = styled.div.attrs({})`
    width: 100%;
    padding: 20px;
    border-radius: 24px;
    border: 1px solid ${({ theme }) => theme.palette.colors.mystic};
    background: linear-gradient(180deg, #f8fbff 0%, #f2f6fd 100%);
    min-height: ${({ $orientation }) => $orientation === "portrait" ? "540px" : "420px"};

    @media(max-width: 1080px){
        min-height: auto;
    }
`;

export const PreviewSheet = styled.div.attrs({})`
    width: 100%;
    max-width: ${({ $orientation }) => $orientation === "portrait" ? "380px" : "100%"};
    margin: 0 auto;
    aspect-ratio: ${({ $aspectRatio }) => $aspectRatio || "210 / 297"};
    display: grid;
    grid-template-columns: repeat(${({ $columns }) => $columns || 1}, minmax(0, 1fr));
    grid-template-rows: repeat(${({ $rows }) => $rows || 1}, minmax(0, 1fr));
    gap: 14px;
`;

export const PreviewSlot = styled.div.attrs({})`
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
`;

export const PosterCard = styled.article.attrs({})`
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    padding: ${({ $padding }) => `${$padding || 26}px`};
    border-radius: ${({ $radius }) => `${$radius || 24}px`};
    border: 1px solid rgba(15,23,42,0.14);
    background: linear-gradient(180deg, #fff89e 0%, #fff37e 100%);
    box-shadow: 0 16px 34px rgba(15, 23, 42, 0.12);
    display: grid;
    align-content: space-between;
    gap: 14px;
    overflow: hidden;
`;

export const PosterHeader = styled.div.attrs({})`
    display: grid;
    gap: 8px;
`;

export const PosterBadgeRow = styled.div.attrs({})`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
`;

export const PosterBadge = styled.span.attrs({})`
    display: inline-flex;
    align-items: center;
    padding: 6px 10px;
    border-radius: 999px;
    background: ${({ $background }) => $background || "rgba(59,130,246,0.1)"};
    color: ${({ $color, theme }) => $color || theme.palette.primary.main};
    font-size: 10px;
    font-weight: 800;
    line-height: 14px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const PosterTitle = styled.h4.attrs({})`
    margin: 0;
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-family: ${({ $fontFamily }) => $fontFamily || "inherit"};
    font-size: ${({ $fontSize }) => `${$fontSize || 34}px`};
    font-weight: 800;
    line-height: 0.98;
    letter-spacing: -0.05em;
    text-align: ${({ $align }) => $align || "left"};
    text-transform: ${({ $transform }) => $transform || "none"};
    word-break: break-word;
`;

export const PosterSubtitle = styled.p.attrs({})`
    margin: 0;
    color: rgba(15, 23, 42, 0.74);
    font-family: ${({ $fontFamily }) => $fontFamily || "inherit"};
    font-size: ${({ $fontSize }) => `${$fontSize || 14}px`};
    line-height: 1.45;
    text-align: ${({ $align }) => $align || "left"};
    word-break: break-word;
`;

export const PosterHeaderMetaList = styled.div.attrs({})`
    display: grid;
    gap: 8px;
`;

export const PosterHeaderMetaItem = styled.div.attrs({})`
    padding: 10px 12px;
    border-radius: 12px;
    background: rgba(255,255,255,0.46);
    border: 1px solid rgba(15,23,42,0.08);
`;

export const PosterPriceSection = styled.div.attrs({})`
    display: grid;
    gap: 10px;
    justify-items: ${({ $align }) => (
        $align === "center" ? "center" : $align === "right" ? "end" : "start"
    )};
`;

export const PosterPriceRaw = styled.div.attrs({})`
    color: ${({ $color, theme }) => $color || theme.palette.primary.main};
    font-family: ${({ $fontFamily }) => $fontFamily || "inherit"};
    font-size: ${({ $fontSize }) => `${$fontSize || 56}px`};
    font-weight: 800;
    line-height: 0.94;
    letter-spacing: -0.05em;
    text-align: ${({ $align }) => $align || "left"};
`;

export const PosterPriceLine = styled.div.attrs({})`
    display: inline-flex;
    align-items: flex-end;
    gap: 6px;
`;

export const PosterCurrencySymbol = styled.span.attrs({})`
    display: inline-flex;
    align-items: center;
    color: ${({ $color, theme }) => $color || theme.palette.primary.main};
    font-family: ${({ $fontFamily }) => $fontFamily || "inherit"};
    font-size: ${({ $fontSize }) => `${$fontSize || 18}px`};
    font-weight: 800;
    line-height: 1;
    transform: translate(${({ $offsetX = 0 }) => $offsetX}px, ${({ $offsetY = 0 }) => $offsetY}px);
`;

export const PosterPriceInteger = styled.span.attrs({})`
    color: ${({ $color, theme }) => $color || theme.palette.primary.main};
    font-family: ${({ $fontFamily }) => $fontFamily || "inherit"};
    font-size: ${({ $fontSize }) => `${$fontSize || 56}px`};
    font-weight: 800;
    line-height: 0.88;
    letter-spacing: -0.06em;
`;

export const PosterCentsGroup = styled.span.attrs({})`
    display: inline-flex;
    align-items: ${({ $align }) => (
        $align === "bottom" ? "flex-end" : $align === "center" ? "center" : "flex-start"
    )};
    gap: 1px;
    transform: translate(${({ $offsetX = 0 }) => $offsetX}px, ${({ $offsetY = 0 }) => $offsetY}px);
`;

export const PosterPriceComma = styled.span.attrs({})`
    color: ${({ $color, theme }) => $color || theme.palette.primary.main};
    font-family: ${({ $fontFamily }) => $fontFamily || "inherit"};
    font-size: ${({ $fontSize }) => `${$fontSize || 18}px`};
    font-weight: 800;
    line-height: 1;
    transform: translate(${({ $offsetX = 0 }) => $offsetX}px, ${({ $offsetY = 0 }) => $offsetY}px);
`;

export const PosterPriceCents = styled.span.attrs({})`
    color: ${({ $color, theme }) => $color || theme.palette.primary.main};
    font-family: ${({ $fontFamily }) => $fontFamily || "inherit"};
    font-size: ${({ $fontSize }) => `${$fontSize || 24}px`};
    font-weight: 800;
    line-height: 1;
`;

export const PosterPriceUnit = styled.span.attrs({})`
    display: inline-flex;
    align-items: center;
    color: rgba(15,23,42,0.72);
    font-family: ${({ $fontFamily }) => $fontFamily || "inherit"};
    font-size: ${({ $fontSize }) => `${$fontSize || 16}px`};
    font-weight: 700;
    line-height: 1.2;
    transform: translate(${({ $offsetX = 0 }) => $offsetX}px, ${({ $offsetY = 0 }) => $offsetY}px);
`;

export const PosterSupportPrice = styled.div.attrs({})`
    color: rgba(15,23,42,0.74);
    font-family: ${({ $fontFamily }) => $fontFamily || "inherit"};
    font-size: ${({ $fontSize }) => `${$fontSize || 18}px`};
    font-weight: 700;
    line-height: 1.32;
    text-align: ${({ $align }) => $align || "left"};
    text-decoration: ${({ $strike }) => $strike ? "line-through" : "none"};
`;

export const PosterSpecialLabel = styled.div.attrs({})`
    display: inline-flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 12px;
    background: ${({ $background }) => $background || "rgba(232,108,48,0.14)"};
    color: ${({ $color }) => $color || "#e86c30"};
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
`;

export const PosterMetaGrid = styled.div.attrs({})`
    display: grid;
    gap: 10px;
    grid-template-columns: ${({ $layout }) => $layout === "stacked" ? "1fr" : "repeat(2, minmax(0, 1fr))"};

    @media(max-width: 560px){
        grid-template-columns: 1fr;
    }
`;

export const PosterMetaCard = styled.div.attrs({})`
    padding: 10px 12px;
    border-radius: 12px;
    background: rgba(255,255,255,0.48);
    border: 1px solid rgba(15,23,42,0.08);
`;

export const PosterMetaLabel = styled.div.attrs({})`
    color: rgba(15,23,42,0.56);
    font-size: 10px;
    font-weight: 800;
    line-height: 14px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const PosterMetaValue = styled.div.attrs({})`
    margin-top: 6px;
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    word-break: break-word;
`;

export const PosterFooter = styled.div.attrs({})`
    display: grid;
    gap: 8px;
`;
