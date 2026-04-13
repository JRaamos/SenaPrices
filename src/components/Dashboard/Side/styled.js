import styled from 'styled-components'

export const DashboardMenuContainer = styled.div.attrs({
})`
    ${props => props.fluid ? `
            width: 100%;
            max-width: ${props.opened ? `220px` : `60px`};
            min-width: ${props.opened ? `220px` : `60px`};
            transition: all .2s ease;
        ` : `
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 100;
            background: ${props.theme.palette.colors.shadow};
        `
    }
`;

export const DashboardMenuShell = styled.div.attrs({
    className: 'menu-contant'
})`
    width: 100%;
    max-width: ${props => props.opened ? `220px` : `60px`};
    min-width: ${props => props.opened ? `220px` : `60px`};
    min-height: 100vh;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: ${props => props.theme.palette.colors.slate900};
    border-right: 1px solid rgba(255, 255, 255, 0.06);
    transition: all .2s ease;
`;

export const DashboardMenuBrand = styled.div.attrs({
})`
    min-height: 64px;
    padding: ${props => props.opened ? `16px 14px 15px` : `17px 0`};
    display: flex;
    align-items: center;
    justify-content: ${props => props.opened ? `space-between` : `center`};
    gap: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

export const DashboardMenuBrandText = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

export const DashboardMenuBrandTitle = styled.div.attrs({
})`
    display: flex;
    align-items: baseline;
    gap: 1px;
    font-size: 15px;
    line-height: 15px;
    letter-spacing: -0.5px;

    span {
        color: ${props => props.theme.palette.colors.slate100};
        font-weight: 300;
    }

    strong {
        color: ${props => props.theme.palette.secondary.main};
        font-weight: 800;
    }
`;

export const DashboardMenuBrandSubtitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate600};
    font-size: 8px;
    font-weight: 500;
    line-height: 8px;
    letter-spacing: 1px;
    text-transform: uppercase;
`;

export const DashboardCollapseButton = styled.button.attrs({
    type: 'button'
})`
    background: transparent;
    border: 0;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    img {
        width: 16px;
        height: 16px;
        opacity: .7;
        transform: rotate(180deg);
    }
`;

export const DashboardMenuList = styled.div.attrs({
})`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1px;
    padding: 6px 8px;
    overflow: auto;
`;

export const DashboardMenuItem = styled.button.attrs({
    type: 'button'
})`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: ${props => props.opened ? `flex-start` : `center`};
    gap: 10px;
    padding: ${props => props.opened ? `8px 10px` : `10px 0`};
    border: 0;
    border-radius: 7px;
    background: ${props => props.active ? `rgba(59, 130, 246, 0.18)` : `transparent`};
    cursor: ${props => props.disabled ? `default` : `pointer`};
    opacity: ${props => props.disabled ? `.55` : `1`};
    text-align: left;

    img {
        width: 16px;
        height: 16px;
        opacity: ${props => props.active ? `1` : `.74`};
    }
`;

export const DashboardMenuItemLabel = styled.span.attrs({
})`
    color: ${props => props.active ? props.theme.palette.colors.textBlue : props.theme.palette.colors.slate500};
    font-size: 13px;
    font-weight: ${props => props.active ? `600` : `400`};
    line-height: 19.5px;
    white-space: nowrap;
`;

export const DashboardMenuFooter = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    align-items: ${props => props.opened ? `stretch` : `center`};
`;

export const DashboardUserCard = styled.button.attrs({
    type: 'button'
})`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
    border: 0;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.03);
    cursor: pointer;
`;

export const DashboardUserCardAvatar = styled.div.attrs({
})`
    width: ${props => props.opened ? `24px` : `28px`};
    height: ${props => props.opened ? `24px` : `28px`};
    min-width: ${props => props.opened ? `24px` : `28px`};
    border-radius: 50%;
    background: ${props => props.theme.palette.colors.slate800};
    color: ${props => props.theme.palette.colors.textBlue};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${props => props.opened ? `10px` : `11px`};
    font-weight: 700;
    line-height: 1;
`;

export const DashboardUserCardContent = styled.div.attrs({
})`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
`;

export const DashboardUserCardTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate300};
    font-size: 11px;
    font-weight: 600;
    line-height: 13.2px;
    white-space: nowrap;
`;

export const DashboardUserCardCode = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.blue600};
    font-family: Menlo, monospace;
    font-size: 9px;
    line-height: 13.5px;
`;

export const DashboardUserCardAction = styled.button.attrs({
    type: 'button'
})`
    background: transparent;
    border: 0;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    img {
        width: 13px;
        height: 13px;
        opacity: .75;
    }
`;

export const DashboardMenuVersion = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate700};
    font-size: 9px;
    font-weight: 400;
    line-height: 13.5px;
    text-align: center;
`;
