import styled from "styled-components";

export const QuickPriceLayout = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
    gap: 24px;
    align-items: start;
    padding-bottom: 120px;

    @media(max-width: 1120px){
        grid-template-columns: 1fr;
        padding-bottom: 140px;
    }
`;

export const QuickPriceMain = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const QuickPriceSidebar = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const QuickCard = styled.section.attrs({
})`
    padding: 24px;
    border-radius: 18px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: ${props => props.theme.palette.colors.white};
    box-shadow: 0 10px 28px rgba(15, 23, 42, 0.06);
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const QuickCardHeader = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const QuickCardEyebrow = styled.span.attrs({
})`
    color: ${props => props.theme.palette.secondary.main};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const QuickCardTitle = styled.h2.attrs({
})`
    margin: 0;
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 22px;
    font-weight: 700;
    line-height: 30px;
`;

export const QuickCardText = styled.p.attrs({
})`
    margin: 0;
    color: ${props => props.theme.palette.colors.slate};
    font-size: 14px;
    line-height: 22px;
`;

export const SetupGrid = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;

    @media(max-width: 720px){
        grid-template-columns: 1fr;
    }
`;

export const QuickField = styled.label.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 8px;
    ${props => props.$full ? "grid-column: 1 / -1;" : ""}
`;

export const QuickLabel = styled.span.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
`;

const sharedFieldStyles = `
    min-height: 46px;
    padding: 12px 14px;
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

export const QuickInput = styled.input.attrs({
})`
    ${sharedFieldStyles}
`;

export const QuickSelect = styled.select.attrs({
})`
    ${sharedFieldStyles}
`;

export const QuickTextarea = styled.textarea.attrs({
    rows: 3,
})`
    ${sharedFieldStyles}
    min-height: 100px;
    resize: vertical;
`;

export const QuickFieldMeta = styled.div.attrs({
})`
    min-height: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
`;

export const QuickFieldError = styled.span.attrs({
})`
    color: ${props => props.theme.palette.error.main};
    font-size: 12px;
    line-height: 18px;
`;

export const QuickFieldCounter = styled.span.attrs({
})`
    color: ${props => props.theme.palette.colors.gull};
    font-size: 11px;
    line-height: 16px;
`;

export const PriceTypeGrid = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;

    @media(max-width: 720px){
        grid-template-columns: 1fr;
    }
`;

export const PriceTypeButton = styled.button.attrs({
})`
    padding: 16px;
    border-radius: 16px;
    border: 1px solid ${props => props.$active ? "rgba(59, 130, 246, 0.24)" : props.theme.palette.colors.mystic};
    background: ${props => props.$active ? "rgba(59, 130, 246, 0.08)" : "rgba(248, 250, 252, 0.92)"};
    text-align: left;
    cursor: pointer;
    transition: all .2s ease;

    &:hover{
        border-color: rgba(59, 130, 246, 0.24);
    }

    &:focus-visible{
        outline: 3px solid rgba(59, 130, 246, 0.16);
        outline-offset: 2px;
    }
`;

export const PriceTypeButtonTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
`;

export const PriceTypeButtonText = styled.div.attrs({
})`
    margin-top: 8px;
    color: ${props => props.theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;

export const RowList = styled.div.attrs({
})`
    display: grid;
    gap: 14px;
`;

export const RowCard = styled.div.attrs({
})`
    padding: 18px;
    border-radius: 16px;
    border: 1px solid ${props => props.$active ? "rgba(59, 130, 246, 0.24)" : props.theme.palette.colors.mystic};
    background: ${props => props.$active ? "rgba(59, 130, 246, 0.05)" : "rgba(248, 250, 252, 0.92)"};
    display: grid;
    gap: 14px;
`;

export const RowHeader = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
`;

export const RowBadge = styled.span.attrs({
})`
    display: inline-flex;
    align-items: center;
    padding: 7px 12px;
    border-radius: 999px;
    background: rgba(59, 130, 246, 0.1);
    color: ${props => props.theme.palette.primary.main};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const RowStatus = styled.span.attrs({
})`
    color: ${props => props.$valid ? "#15803d" : "#c2410c"};
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
`;

export const RowGrid = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: 2fr 1.2fr 1fr;
    gap: 12px;

    @media(max-width: 920px){
        grid-template-columns: 1fr;
    }
`;

export const RowField = styled(QuickField).attrs({
})``;

export const RowPriceGrid = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;

    @media(max-width: 920px){
        grid-template-columns: 1fr;
    }
`;

export const RowActions = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
`;

export const RowActionButton = styled.button.attrs({
})`
    border: 0;
    border-radius: 10px;
    min-height: 38px;
    padding: 9px 12px;
    background: ${props => props.$danger ? "rgba(239, 68, 68, 0.08)" : "rgba(59, 130, 246, 0.1)"};
    color: ${props => props.$danger ? props.theme.palette.error.main : props.theme.palette.primary.main};
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    cursor: pointer;

    &:focus-visible{
        outline: 3px solid rgba(59, 130, 246, 0.16);
        outline-offset: 2px;
    }
`;

export const DraftNotice = styled.div.attrs({
})`
    padding: 14px 16px;
    border-radius: 14px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(248, 250, 252, 0.92);
    color: ${props => props.theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;

export const StatusCard = styled(QuickCard).attrs({
})`
    background: ${props => props.$tone === "green"
        ? "linear-gradient(180deg, rgba(240,253,244,1) 0%, rgba(255,255,255,1) 100%)"
        : "linear-gradient(180deg, rgba(255,247,237,1) 0%, rgba(255,255,255,1) 100%)"};
    border-color: ${props => props.$tone === "green" ? "rgba(34, 197, 94, 0.2)" : "rgba(249, 115, 22, 0.18)"};
`;

export const StatusBadge = styled.span.attrs({
})`
    display: inline-flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 999px;
    background: ${props => props.$tone === "green" ? "rgba(34, 197, 94, 0.12)" : "rgba(249, 115, 22, 0.12)"};
    color: ${props => props.$tone === "green" ? "#15803d" : "#c2410c"};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const StatusTitle = styled.h3.attrs({
})`
    margin: 0;
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 20px;
    font-weight: 700;
    line-height: 28px;
`;

export const StatusText = styled.p.attrs({
})`
    margin: 0;
    color: ${props => props.theme.palette.colors.slate};
    font-size: 14px;
    line-height: 22px;
`;

export const SummaryGrid = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
`;

export const SummaryItem = styled.div.attrs({
})`
    padding: 14px;
    border-radius: 14px;
    background: rgba(255,255,255,0.88);
    border: 1px solid ${props => props.theme.palette.colors.mystic};
`;

export const SummaryLabel = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.gull};
    font-size: 11px;
    font-weight: 700;
    line-height: 16px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

export const SummaryValue = styled.div.attrs({
})`
    margin-top: 8px;
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
`;

export const ErrorSummary = styled.div.attrs({
})`
    padding: 14px 16px;
    border-radius: 14px;
    border: 1px solid rgba(239, 68, 68, 0.16);
    background: rgba(254, 242, 242, 0.92);
    display: grid;
    gap: 8px;
`;

export const ErrorSummaryTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.error.main};
    font-size: 13px;
    font-weight: 800;
    line-height: 19px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
`;

export const ErrorSummaryItem = styled.div.attrs({
})`
    color: #991b1b;
    font-size: 13px;
    line-height: 20px;
`;

export const WarningList = styled.div.attrs({
})`
    display: grid;
    gap: 10px;
`;

export const WarningItem = styled.div.attrs({
})`
    padding: 12px 14px;
    border-radius: 14px;
    background: rgba(255, 247, 237, 0.92);
    border: 1px solid rgba(249, 115, 22, 0.14);
    color: #9a3412;
    font-size: 13px;
    line-height: 20px;
`;

export const PreviewCard = styled(QuickCard).attrs({
})`
    background: linear-gradient(180deg, rgba(6,52,107,0.98) 0%, rgba(17,24,39,1) 100%);
    color: ${props => props.theme.palette.colors.white};
    border-color: ${props => props.$accentColor || "rgba(59, 130, 246, 0.18)"};
`;

export const PreviewBadge = styled.span.attrs({
})`
    display: inline-flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 999px;
    background: ${props => props.$accentColor ? `${props.$accentColor}24` : "rgba(255,255,255,0.14)"};
    color: ${props => props.theme.palette.colors.white};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const PreviewTitle = styled.h3.attrs({
})`
    margin: 0;
    color: inherit;
    font-size: ${props => `${props.$fontSize || 32}px`};
    font-weight: 800;
    line-height: 0.98;
    letter-spacing: -0.05em;
    text-align: ${props => props.$align || "left"};
    text-transform: ${props => props.$transform || "uppercase"};
    font-family: ${props => props.$fontFamily || "inherit"};
`;

export const PreviewSubtitle = styled.p.attrs({
})`
    margin: 0;
    color: rgba(255,255,255,0.76);
    font-size: ${props => `${props.$fontSize || 14}px`};
    line-height: 22px;
    text-align: ${props => props.$align || "left"};
    font-family: ${props => props.$fontFamily || "inherit"};
`;

export const PreviewPrice = styled.div.attrs({
})`
    color: ${props => props.$accentColor || "inherit"};
    font-size: ${props => `${props.$fontSize || 42}px`};
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.05em;
    text-align: ${props => props.$align || "left"};
    font-family: ${props => props.$fontFamily || "inherit"};
`;

export const PreviewSupportPrice = styled.div.attrs({
})`
    color: rgba(255,255,255,0.8);
    font-size: ${props => `${props.$fontSize || 15}px`};
    line-height: 22px;
    ${props => props.$strike ? "text-decoration: line-through;" : ""}
    text-align: ${props => props.$align || "left"};
    font-family: ${props => props.$fontFamily || "inherit"};
`;

export const PreviewSpecialLabel = styled.div.attrs({
})`
    display: inline-flex;
    align-items: center;
    padding: 9px 12px;
    border-radius: 12px;
    background: rgba(232, 108, 48, 0.18);
    color: ${props => props.$color || "#ffd9c7"};
    font-size: 13px;
    font-weight: 700;
    line-height: 19px;
    font-family: ${props => props.$fontFamily || "inherit"};
`;

export const PreviewMetaList = styled.div.attrs({
})`
    display: grid;
    gap: 12px;
`;

export const PreviewMetaItem = styled.div.attrs({
})`
    padding: 14px;
    border-radius: 14px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.08);
`;

export const PreviewMetaLabel = styled.div.attrs({
})`
    color: rgba(255,255,255,0.62);
    font-size: 11px;
    font-weight: 700;
    line-height: 16px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

export const PreviewMetaValue = styled.div.attrs({
})`
    margin-top: 8px;
    color: ${props => props.theme.palette.colors.white};
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
    word-break: break-word;
`;

export const ChecklistList = styled.div.attrs({
})`
    display: grid;
    gap: 14px;
`;

export const ChecklistItem = styled.div.attrs({
})`
    padding: 16px;
    border-radius: 14px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(248, 250, 252, 0.92);
`;

export const ChecklistTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
`;

export const ChecklistText = styled.div.attrs({
})`
    margin-top: 8px;
    color: ${props => props.theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;

export const RecentList = styled.div.attrs({
})`
    display: grid;
    gap: 12px;
`;

export const RecentItem = styled.div.attrs({
})`
    padding: 16px;
    border-radius: 14px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(248, 250, 252, 0.92);
    display: grid;
    gap: 10px;
`;

export const RecentHeader = styled.div.attrs({
})`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
`;

export const RecentTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
`;

export const RecentMeta = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;

export const RecentButton = styled.button.attrs({
})`
    border: 0;
    border-radius: 10px;
    min-height: 38px;
    padding: 9px 12px;
    background: rgba(59, 130, 246, 0.1);
    color: ${props => props.theme.palette.primary.main};
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    cursor: pointer;

    &:focus-visible{
        outline: 3px solid rgba(59, 130, 246, 0.16);
        outline-offset: 2px;
    }
`;

export const ShortcutList = styled.div.attrs({
})`
    display: grid;
    gap: 12px;
`;

export const ShortcutItem = styled.div.attrs({
})`
    padding: 14px;
    border-radius: 14px;
    background: rgba(248, 250, 252, 0.92);
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    display: grid;
    gap: 8px;
`;

export const ShortcutKey = styled.div.attrs({
})`
    color: ${props => props.theme.palette.primary.main};
    font-size: 12px;
    font-weight: 800;
    line-height: 18px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const ShortcutText = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;
