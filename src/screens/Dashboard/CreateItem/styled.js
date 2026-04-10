import styled from "styled-components";

const PANEL_GAP = "18px";
const PANEL_PADDING = "18px";
const PANEL_RADIUS = "10px";
const FIELD_RADIUS = "8px";
const FIELD_HEIGHT = "40px";
const FIELD_FONT_SIZE = "13px";
const ACTION_HEIGHT = "38px";

export const CreateItemLayout = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: ${props => props.$singleColumn
        ? "minmax(0, 1fr)"
        : "minmax(0, 1fr) minmax(220px, 240px)"};
    gap: ${PANEL_GAP};
    align-items: start;
    padding-bottom: 96px;

    @media(max-width: 1120px){
        grid-template-columns: 1fr;
        padding-bottom: 112px;
    }
`;

export const CreateItemMain = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: ${PANEL_GAP};
`;

export const CreateItemSidebar = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: ${PANEL_GAP};
`;

export const CatalogCard = styled.section.attrs({
})`
    padding: ${PANEL_PADDING};
    border-radius: ${PANEL_RADIUS};
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: ${props => props.theme.palette.colors.white};
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
    display: flex;
    flex-direction: column;
    gap: 14px;
`;

export const CatalogCardHeader = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const CatalogCardEyebrow = styled.span.attrs({
})`
    color: ${props => props.theme.palette.secondary.main};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const CatalogCardTitle = styled.h2.attrs({
})`
    margin: 0;
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
`;

export const CatalogCardText = styled.p.attrs({
})`
    margin: 0;
    color: ${props => props.theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;

export const InlineNotice = styled.div.attrs({
})`
    padding: 10px 14px;
    border-radius: 8px;
    background: rgba(59, 130, 246, 0.08);
    border: 1px solid rgba(59, 130, 246, 0.14);
    color: ${props => props.theme.palette.primary.main};
    font-size: 13px;
    line-height: 20px;
`;

export const CatalogGrid = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;

    @media(max-width: 720px){
        grid-template-columns: 1fr;
    }
`;

export const CatalogField = styled.label.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 6px;
    ${props => props.$full ? "grid-column: 1 / -1;" : ""}
`;

export const CatalogLabel = styled.span.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 11px;
    font-weight: 600;
    line-height: 16px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
`;

const sharedFieldStyles = `
    min-height: ${FIELD_HEIGHT};
    padding: 10px 12px;
    border-radius: ${FIELD_RADIUS};
    border: 1px solid ${({ theme }) => theme.palette.colors.geyser};
    background: ${({ theme }) => theme.palette.colors.white};
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: ${FIELD_FONT_SIZE};
    line-height: 19px;
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

export const CatalogInput = styled.input.attrs({
})`
    ${sharedFieldStyles}
`;

export const CatalogSelect = styled.select.attrs({
})`
    ${sharedFieldStyles}
`;

export const FieldMeta = styled.div.attrs({
})`
    min-height: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`;

export const FieldError = styled.span.attrs({
})`
    color: ${props => props.theme.palette.error.main};
    font-size: 12px;
    line-height: 18px;
`;

export const FieldCounter = styled.span.attrs({
})`
    color: ${props => props.theme.palette.colors.gull};
    font-size: 11px;
    line-height: 16px;
`;

export const StatusCard = styled(CatalogCard).attrs({
})`
    background: ${props => props.$tone === "green"
        ? "linear-gradient(180deg, rgba(22,163,74,0.08) 0%, rgba(255,255,255,1) 100%)"
        : "linear-gradient(180deg, rgba(249,115,22,0.08) 0%, rgba(255,255,255,1) 100%)"};
    border-color: ${props => props.$tone === "green"
        ? "rgba(22,163,74,0.14)"
        : "rgba(249,115,22,0.14)"};
`;

export const StatusBadge = styled.span.attrs({
})`
    width: fit-content;
    padding: 6px 10px;
    border-radius: 999px;
    background: ${props => props.$tone === "green" ? "rgba(22,163,74,0.12)" : "rgba(249,115,22,0.12)"};
    color: ${props => props.$tone === "green" ? "#15803d" : "#c2410c"};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const StatusTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
`;

export const StatusText = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;

export const SummaryGrid = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
`;

export const SummaryItem = styled.div.attrs({
})`
    padding: 12px;
    border-radius: 8px;
    background: rgba(255,255,255,0.92);
    border: 1px solid ${props => props.theme.palette.colors.mystic};
`;

export const SummaryLabel = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.gull};
    font-size: 10px;
    font-weight: 600;
    line-height: 16px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

export const SummaryValue = styled.div.attrs({
})`
    margin-top: 6px;
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    word-break: break-word;
`;

export const ErrorSummary = styled.div.attrs({
})`
    padding: 18px;
    border-radius: 10px;
    background: rgba(254, 242, 242, 0.96);
    border: 1px solid rgba(248, 113, 113, 0.18);
    display: grid;
    gap: 10px;
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
    padding: 10px 14px;
    border-radius: 10px;
    background: rgba(255, 247, 237, 0.92);
    border: 1px solid rgba(249, 115, 22, 0.14);
    color: #9a3412;
    font-size: 13px;
    line-height: 20px;
`;

export const PreviewCard = styled(CatalogCard).attrs({
})`
    background: linear-gradient(180deg, rgba(6,52,107,0.98) 0%, rgba(17,24,39,1) 100%);
    color: ${props => props.theme.palette.colors.white};
`;

export const PreviewBadge = styled.span.attrs({
})`
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

export const PreviewTitle = styled.h3.attrs({
})`
    margin: 0;
    color: inherit;
    font-size: 32px;
    font-weight: 800;
    line-height: 0.98;
    letter-spacing: -0.05em;
`;

export const PreviewSubtitle = styled.p.attrs({
})`
    margin: 0;
    color: rgba(255,255,255,0.76);
    font-size: 14px;
    line-height: 22px;
`;

export const PreviewMetaList = styled.div.attrs({
})`
    display: grid;
    gap: 12px;
`;

export const PreviewMetaItem = styled.div.attrs({
})`
    padding: 12px;
    border-radius: 10px;
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
    gap: 10px;
`;

export const ChecklistItem = styled.div.attrs({
})`
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(248, 250, 252, 0.92);
`;

export const ChecklistTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 13px;
    font-weight: 700;
    line-height: 19px;
`;

export const ChecklistText = styled.div.attrs({
})`
    margin-top: 6px;
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;

export const RecentList = styled.div.attrs({
})`
    display: grid;
    gap: 10px;
`;

export const RecentItem = styled.div.attrs({
})`
    padding: 12px 14px;
    border-radius: 10px;
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
    font-size: 13px;
    font-weight: 700;
    line-height: 19px;
`;

export const RecentMeta = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 11px;
    line-height: 16px;
`;

export const RecentButton = styled.button.attrs({
})`
    border: 0;
    border-radius: 8px;
    min-height: ${ACTION_HEIGHT};
    padding: 9px 14px;
    background: rgba(59, 130, 246, 0.1);
    color: ${props => props.theme.palette.primary.main};
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    cursor: pointer;

    &:focus-visible{
        outline: 3px solid rgba(59, 130, 246, 0.16);
        outline-offset: 2px;
    }
`;
