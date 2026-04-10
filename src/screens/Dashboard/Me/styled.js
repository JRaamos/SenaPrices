import styled from 'styled-components'  

import Core from 'components/Form/Core'

export const DashboardGrid = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: minmax(300px, 320px) minmax(0, 1fr);
    gap: 18px;
    align-items: start;

    @media(max-width: 1080px){
        grid-template-columns: 1fr;
    }
`;

export const DashboardSidebar = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const DashboardMain = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const DashboardStack = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const DashboardInfoGrid = styled.div.attrs({
})`
    margin-top: 16px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;

    @media(max-width: 920px){
        grid-template-columns: 1fr;
    }
`;

export const DashboardInfoLabel = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.gull};
    font-size: 11px;
    font-weight: 600;
    line-height: 16px;
    text-transform: uppercase;
    letter-spacing: .08em;
`;

export const DashboardInfoValue = styled.div.attrs({
})`
    margin-top: 6px;
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 15px;
    font-weight: 700;
    line-height: 21px;
    word-break: break-word;
`;

export const DashboardIdentifier = styled(DashboardInfoValue).attrs({
})`
    color: ${props => props.theme.palette.colors.azure};
    font-size: 20px;
    font-family: monospace;
`;

export const DashboardInfoNote = styled.div.attrs({
})`
    margin-top: 12px;
    padding: 10px 14px;
    border-radius: 8px;
    background: ${props => props.theme.palette.colors.catskill};
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;

export const DashboardCard = styled.div.attrs({
})`           
    padding: 18px;
    background: ${p => p.theme.palette.colors.white};
    border-radius: 12px;
    border: 1px solid ${p => p.theme.palette.colors.mystic};
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
    display: flex;
    flex-direction: column;
`;

export const DashboardContainer = styled(DashboardCard).attrs({
})`
    margin-bottom: 97px;
`;

export const DashboardSectionTitle = styled.h2.attrs({
})`
    margin: 0;
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
`;

export const DashboardSectionText = styled.p.attrs({
})`
    margin: 4px 0 0;
    color: ${props => props.theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;

export const DashboardProfileName = styled.div.attrs({
})`
    margin-top: -4px;
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 22px;
    font-weight: 700;
    text-align: center;
`;

export const DashboardProfileEmail = styled.div.attrs({
})`
    margin-top: 6px;
    color: ${props => props.theme.palette.colors.slate};
    font-size: 14px;
    line-height: 21px;
    text-align: center;
    word-break: break-word;
`;

export const DashboardProfileMeta = styled.div.attrs({
})`
    margin-top: 14px;
    padding: 10px 12px;
    border-radius: 12px;
    background: ${props => props.theme.palette.colors.catskill};
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
    text-align: center;
`;

export const DashboardQuickActionGrid = styled.div.attrs({
})`
    margin-top: 16px;
    display: grid;
    gap: 10px;
`;

export const DashboardQuickActionCard = styled.div.attrs({
})`
    padding: 14px;
    border-radius: 10px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: linear-gradient(180deg, rgba(240,244,248,0.72) 0%, rgba(255,255,255,1) 100%);
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const DashboardQuickActionIcon = styled.div.attrs({
})`
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: rgba(59, 130, 246, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const DashboardQuickActionTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 13px;
    font-weight: 700;
    line-height: 19px;
`;

export const DashboardQuickActionText = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;

export const DashboardQuickActionButton = styled.button.attrs({
})`
    margin-top: 4px;
    border: 0;
    border-radius: 8px;
    min-height: 40px;
    padding: 10px 14px;
    background: ${props => props.theme.palette.colors.azure};
    color: ${props => props.theme.palette.colors.white};
    font-size: 13px;
    font-weight: 700;
    line-height: 19.5px;
    text-align: center;
    cursor: pointer;
    transition: all .2s ease;

    &:hover{
        background: ${props => props.theme.palette.colors.azureDark};
    }

    &:focus-visible{
        outline: 3px solid rgba(59, 130, 246, .22);
        outline-offset: 2px;
    }
`;

export const DashboardActionRow = styled.div.attrs({
})`
    margin-top: 16px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
`;

export const DashboardActionButton = styled.button.attrs({
    type: "button",
})`
    min-height: 38px;
    padding: 9px 14px;
    border-radius: 8px;
    border: 1px solid ${props => props.$primary
        ? "rgba(59,130,246,0.18)"
        : props.theme.palette.colors.mystic};
    background: ${props => props.$primary
        ? props.theme.palette.primary.main
        : "rgba(248,250,252,0.92)"};
    color: ${props => props.$primary
        ? props.theme.palette.colors.white
        : props.theme.palette.colors.slate};
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    cursor: pointer;
    opacity: ${props => props.disabled ? 0.56 : 1};
`;

export const DashboardSummaryGrid = styled.div.attrs({
})`
    margin-top: 16px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;

    @media(max-width: 768px){
        grid-template-columns: 1fr;
    }
`;

export const DashboardSummaryItem = styled.div.attrs({
})`
    padding: 12px;
    border-radius: 8px;
    background: ${props => props.theme.palette.colors.catskill};
    border: 1px solid ${props => props.theme.palette.colors.mystic};
`;

export const DashboardSummaryLabel = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.gull};
    font-size: 10px;
    font-weight: 600;
    line-height: 16.5px;
    text-transform: uppercase;
    letter-spacing: .08em;
`;

export const DashboardSummaryValue = styled.div.attrs({
})`
    padding-top: 6px;
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    word-break: break-word;
`;

export const DashboardFeatureGrid = styled.div.attrs({
})`
    margin-top: 16px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;

    @media(max-width: 880px){
        grid-template-columns: 1fr;
    }
`;

export const DashboardFeatureCard = styled.div.attrs({
})`
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid ${props => props.$active
        ? "rgba(22,163,74,0.16)"
        : props.theme.palette.colors.mystic};
    background: ${props => props.$active
        ? "rgba(240,253,244,0.92)"
        : "rgba(248,250,252,0.92)"};
    display: grid;
    gap: 8px;
`;

export const DashboardFeatureHeader = styled.div.attrs({
})`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
`;

export const DashboardFeatureTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 13px;
    font-weight: 700;
    line-height: 19px;
`;

export const DashboardFeatureText = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;

export const DashboardFeatureBadge = styled.span.attrs({
})`
    width: fit-content;
    padding: 5px 10px;
    border-radius: 999px;
    background: ${props => props.$active ? "rgba(22,163,74,0.12)" : "rgba(148,163,184,0.12)"};
    color: ${props => props.$active ? "#15803d" : props.theme.palette.colors.slate};
    font-size: 10px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const DashboardNotice = styled.div.attrs({
})`
    margin-top: 16px;
    padding: 10px 14px;
    border-radius: 8px;
    background: rgba(59,130,246,0.08);
    border: 1px solid rgba(59,130,246,0.14);
    color: ${props => props.theme.palette.primary.main};
    font-size: 13px;
    line-height: 20px;
`;

export const DashboardFieldGrid = styled.div.attrs({
})`
    margin-top: 16px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;

    @media(max-width: 720px){
        grid-template-columns: 1fr;
    }
`;

export const DashboardField = styled.label.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 6px;
    ${props => props.$full ? "grid-column: 1 / -1;" : ""}
`;

export const DashboardFieldLabel = styled.span.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 11px;
    font-weight: 600;
    line-height: 16px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
`;

const sharedFieldStyles = `
    min-height: 40px;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.palette.colors.geyser};
    background: ${({ theme }) => theme.palette.colors.white};
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 13px;
    line-height: 19px;

    &::placeholder{
        color: rgba(100, 116, 139, 0.72);
    }

    &:focus{
        outline: none;
        border-color: ${({ theme }) => theme.palette.colors.azure};
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.14);
    }
`;

export const DashboardInput = styled.input.attrs({
})`
    ${sharedFieldStyles}
`;

export const DashboardSelect = styled.select.attrs({
})`
    ${sharedFieldStyles}
`;

export const DashboardUserList = styled.div.attrs({
})`
    margin-top: 16px;
    display: grid;
    gap: 8px;
`;

export const DashboardUserRow = styled.div.attrs({
})`
    padding: 13px 14px;
    border-radius: 10px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(248,250,252,0.92);
    display: grid;
    gap: 6px;
`;

export const DashboardUserHeader = styled.div.attrs({
})`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
`;

export const DashboardUserName = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 13px;
    font-weight: 700;
    line-height: 19px;
`;

export const DashboardUserMeta = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 11px;
    line-height: 16px;
`;

export const DashboardUserBadge = styled.span.attrs({
})`
    width: fit-content;
    padding: 5px 10px;
    border-radius: 999px;
    background: ${props => props.$tone === "blue"
        ? "rgba(59,130,246,0.12)"
        : props.$tone === "orange"
            ? "rgba(249,115,22,0.12)"
            : "rgba(22,163,74,0.12)"};
    color: ${props => props.$tone === "blue"
        ? props.theme.palette.primary.main
        : props.$tone === "orange"
            ? "#c2410c"
            : "#15803d"};
    font-size: 10px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const StyledCore = styled(Core).attrs({
    flat: true,
})`
    width: 100%;
    padding-top: 16px;

    .MuiFormControl-root {
        margin-top: 0;
    }

    .MuiInputLabel-root {
        position: static;
        transform: none;
        margin-bottom: 6px;
        color: ${({ theme }) => theme.palette.colors.slate};
        font-size: 12px;
        font-weight: 700;
        line-height: 18px;
        text-transform: uppercase;
    }

    .MuiInputBase-root {
        background: #ffffff;
        border: 1px solid ${({ theme }) => theme.palette.colors.geyser};
        border-radius: 8px;
        min-height: 40px;
        padding: 0 12px;
    }

    .MuiInputBase-root::before,
    .MuiInputBase-root::after {
        display: none;
    }

    .MuiInputBase-input {
        padding: 0;
        color: ${({ theme }) => theme.palette.colors.ebony};
        font-size: 13px;
        line-height: normal;
    }

    .MuiInputBase-input::placeholder {
        color: rgba(17, 24, 39, 0.45);
        opacity: 1;
    }

    .MuiFormControl-root + .MuiFormControl-root {
        margin-top: 14px;
    }
`;

export const DashboardWarningCard = styled(DashboardCard).attrs({
})`
    border-color: rgba(232, 108, 48, .24);
    background: linear-gradient(180deg, rgba(232, 108, 48, .06) 0%, rgba(255,255,255,1) 100%);
`;

export const DashboardWarningTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.secondary.main};
    font-size: 18px;
    font-weight: 700;
    line-height: 26px;
`;

export const DashboardWarningText = styled.div.attrs({
})`
    margin-top: 8px;
    color: ${props => props.theme.palette.colors.slate};
    font-size: 14px;
    line-height: 22px;
`;
