import styled from "styled-components";

export {
    DashboardCard,
    DashboardGuidelineCard,
    DashboardGuidelineGrid,
    DashboardGuidelineText,
    DashboardGuidelineTitle,
    DashboardNoticeCard,
    DashboardNoticeText,
    DashboardNoticeTitle,
    DashboardSectionText,
    DashboardSectionTitle,
} from "../Support/styled";

export const AuditPage = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 120px;
`;

export const AuditBanner = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    border-radius: 12px;
    border: 1px solid ${({ $tone }) => $tone === "green"
        ? "rgba(22, 163, 74, 0.18)"
        : "rgba(217, 119, 6, 0.22)"};
    background: ${({ $tone }) => $tone === "green"
        ? "rgba(240, 253, 244, 0.96)"
        : "rgba(255, 251, 235, 0.96)"};
    color: ${({ $tone }) => $tone === "green" ? "#15803d" : "#92400e"};
    font-size: 13px;
    font-weight: 600;
    line-height: 20px;
`;

export const AuditBannerDot = styled.span.attrs({
})`
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: ${({ $tone }) => $tone === "green" ? "#16a34a" : "#d97706"};
    flex-shrink: 0;
`;

export const AuditStatGrid = styled.div.attrs({
})`
    margin-top: 18px;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 10px;

    @media(max-width: 980px){
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media(max-width: 560px){
        grid-template-columns: 1fr;
    }
`;

export const AuditStatCard = styled.div.attrs({
})`
    padding: 12px 16px;
    border-radius: 12px;
    border: 1px solid ${({ $tone }) => $tone === "orange"
        ? "rgba(180, 83, 9, 0.14)"
        : $tone === "purple"
            ? "rgba(124, 58, 237, 0.14)"
            : $tone === "teal"
                ? "rgba(15, 118, 110, 0.14)"
                : "rgba(59, 130, 246, 0.14)"};
    background: ${({ $tone }) => $tone === "orange"
        ? "#fef3c7"
        : $tone === "purple"
            ? "#f5f3ff"
            : $tone === "teal"
                ? "#f0fdfa"
                : "rgba(59,130,246,0.08)"};
`;

export const AuditStatValue = styled.div.attrs({
})`
    color: ${({ $tone }) => $tone === "orange"
        ? "#b45309"
        : $tone === "purple"
            ? "#7c3aed"
            : $tone === "teal"
                ? "#0f766e"
                : "#2563eb"};
    font-size: 24px;
    font-weight: 800;
    line-height: 1.1;
    word-break: break-word;
`;

export const AuditStatLabel = styled.div.attrs({
})`
    margin-top: 4px;
    color: ${({ $tone }) => $tone === "orange"
        ? "#92400e"
        : $tone === "purple"
            ? "#6d28d9"
            : $tone === "teal"
                ? "#115e59"
                : "#1d4ed8"};
    font-size: 11px;
    font-weight: 600;
    line-height: 16px;
`;

export const AccessSearchInput = styled.input.attrs({
})`
    min-height: 46px;
    width: 100%;
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.palette.colors.geyser};
    background: ${({ theme }) => theme.palette.colors.white};
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 14px;
    line-height: 21px;

    &::placeholder{
        color: rgba(100, 116, 139, 0.76);
    }

    &:focus{
        outline: none;
        border-color: ${({ theme }) => theme.palette.colors.azure};
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.14);
    }
`;

export const AccessFormGrid = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;

    @media(max-width: 760px){
        grid-template-columns: 1fr;
    }
`;

export const AccessField = styled.label.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 8px;
    ${({ $full }) => $full ? "grid-column: 1 / -1;" : ""}
`;

export const AccessLabel = styled.span.attrs({
})`
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
`;

const sharedFieldStyles = `
    min-height: 46px;
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.palette.colors.geyser};
    background: ${({ theme }) => theme.palette.colors.white};
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 14px;
    line-height: 21px;

    &::placeholder{
        color: rgba(100, 116, 139, 0.76);
    }

    &:focus{
        outline: none;
        border-color: ${({ theme }) => theme.palette.colors.azure};
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.14);
    }
`;

export const AccessInput = styled.input.attrs({
})`
    ${sharedFieldStyles}
`;

export const AccessTextarea = styled.textarea.attrs({
    rows: 4,
})`
    ${sharedFieldStyles}
    resize: vertical;
    min-height: 120px;
`;

export const AccessActionRow = styled.div.attrs({
})`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`;

export const AccessActionButton = styled.button.attrs({
    type: "button",
})`
    min-height: 40px;
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid ${({ $primary, theme }) => $primary ? "rgba(59,130,246,0.18)" : theme.palette.colors.mystic};
    background: ${({ $primary, theme }) => $primary ? theme.palette.colors.azure : theme.palette.colors.white};
    color: ${({ $primary, theme }) => $primary ? theme.palette.colors.white : theme.palette.colors.slate};
    font-size: 13px;
    font-weight: 700;
    line-height: 19px;
    cursor: pointer;
`;

export const AccessTable = styled.div.attrs({
})`
    margin-top: 18px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.palette.colors.mystic};
    overflow: hidden;
    background: ${({ theme }) => theme.palette.colors.white};
`;

export const AccessTableHeader = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: 110px 140px 160px minmax(0, 1fr) 90px 78px;
    background: ${({ theme }) => theme.palette.colors.catskill};
    border-bottom: 1px solid ${({ theme }) => theme.palette.colors.mystic};

    @media(max-width: 900px){
        display: none;
    }
`;

export const AccessTableHeadCell = styled.div.attrs({
})`
    padding: 10px 14px;
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 11px;
    font-weight: 700;
    line-height: 16px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

export const AccessTableRow = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: 110px 140px 160px minmax(0, 1fr) 90px 78px;
    align-items: center;
    border-bottom: 1px solid ${({ $last, theme }) => $last ? "transparent" : theme.palette.colors.mystic};

    @media(max-width: 900px){
        grid-template-columns: 1fr;
        gap: 10px;
        padding: 14px;
        background: ${({ theme }) => theme.palette.colors.white};
    }
`;

export const AccessTableCell = styled.div.attrs({
})`
    padding: 12px 14px;
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
    word-break: break-word;

    @media(max-width: 900px){
        padding: 0;
    }
`;

export const AccessTablePrimaryCell = styled(AccessTableCell).attrs({
})`
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-weight: 600;
`;

export const AccessCellLabel = styled.div.attrs({
})`
    display: none;

    @media(max-width: 900px){
        display: block;
        margin-bottom: 2px;
        color: ${({ theme }) => theme.palette.colors.gull};
        font-size: 10px;
        font-weight: 700;
        line-height: 15px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
    }
`;

export const AccessTicketPill = styled.span.attrs({
})`
    display: inline-flex;
    align-items: center;
    padding: 4px 9px;
    border-radius: 999px;
    background: #f5f3ff;
    color: #7c3aed;
    font-size: 11px;
    font-weight: 700;
    line-height: 16px;
`;

export const AccessDeleteButton = styled.button.attrs({
    type: "button",
})`
    min-height: 32px;
    padding: 6px 10px;
    border-radius: 8px;
    border: 1px solid transparent;
    background: transparent;
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: background .2s ease, color .2s ease, border-color .2s ease;

    &:hover {
        background: #fef2f2;
        border-color: #fecaca;
        color: #dc2626;
    }
`;

export const EmptyState = styled.div.attrs({
})`
    margin-top: 18px;
    padding: 28px 24px;
    border-radius: 12px;
    border: 1px dashed ${({ theme }) => theme.palette.colors.mystic};
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
    text-align: center;
`;
