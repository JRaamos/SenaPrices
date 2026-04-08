import styled from "styled-components";

export {
    DashboardCard,
    DashboardGrid,
    DashboardGuidelineCard,
    DashboardGuidelineGrid,
    DashboardGuidelineText,
    DashboardGuidelineTitle,
    DashboardHighlightCard,
    DashboardHighlightLabel,
    DashboardHighlightText,
    DashboardHighlightTitle,
    DashboardMain,
    DashboardNoticeCard,
    DashboardNoticeText,
    DashboardNoticeTitle,
    DashboardProfileEmail,
    DashboardProfileMeta,
    DashboardProfileName,
    DashboardQuickActionButton,
    DashboardQuickActionCard,
    DashboardQuickActionGrid,
    DashboardQuickActionIcon,
    DashboardQuickActionText,
    DashboardQuickActionTitle,
    DashboardSectionText,
    DashboardSectionTitle,
    DashboardSidebar,
    DashboardSummaryGrid,
    DashboardSummaryItem,
    DashboardSummaryLabel,
    DashboardSummaryValue,
} from "../Support/styled";

export const AccessSearchInput = styled.input.attrs({
})`
    min-height: 46px;
    width: 100%;
    padding: 12px 14px;
    border-radius: 12px;
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
    border-radius: 12px;
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
    min-height: 42px;
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

export const AccessLogList = styled.div.attrs({
})`
    margin-top: 18px;
    display: grid;
    gap: 14px;
`;

export const AccessLogItem = styled.div.attrs({
})`
    padding: 18px;
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.palette.colors.mystic};
    background: linear-gradient(180deg, rgba(248,250,252,0.92) 0%, rgba(255,255,255,1) 100%);
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const AccessLogHeader = styled.div.attrs({
})`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;

    @media(max-width: 640px){
        flex-direction: column;
    }
`;

export const AccessLogTitle = styled.div.attrs({
})`
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
`;

export const AccessLogMeta = styled.div.attrs({
})`
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;

export const AccessLogText = styled.div.attrs({
})`
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;

export const AccessBadgeRow = styled.div.attrs({
})`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
`;

export const AccessBadge = styled.span.attrs({
})`
    width: fit-content;
    padding: 7px 10px;
    border-radius: 999px;
    background: ${({ $tone }) => $tone === "orange" ? "rgba(249,115,22,0.12)" : "rgba(59,130,246,0.12)"};
    color: ${({ $tone, theme }) => $tone === "orange" ? theme.palette.secondary.main : theme.palette.colors.azure};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const EmptyState = styled.div.attrs({
})`
    margin-top: 18px;
    padding: 28px 24px;
    border-radius: 16px;
    border: 1px dashed ${({ theme }) => theme.palette.colors.mystic};
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
    text-align: center;
`;
