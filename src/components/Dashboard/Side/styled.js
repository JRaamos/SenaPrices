import styled from "styled-components";

const MENU_WIDTH = {
    open: "220px",
    collapsed: "60px",
    mobile: "260px",
};

const MENU_HEADER_HEIGHT = "64px";

export const DashboardMenuContainer = styled.div`
    ${({ fluid, opened }) => fluid ? `
        position: relative;
        width: ${opened ? MENU_WIDTH.open : MENU_WIDTH.collapsed};
        min-width: ${opened ? MENU_WIDTH.open : MENU_WIDTH.collapsed};
        transition: width .24s ease, min-width .24s ease;
        z-index: 20;

        @media (max-width: 1023px) {
            position: fixed;
            inset: 64px 0 0 0;
            width: 100%;
            min-width: 100%;
            background: ${opened ? "rgba(15, 23, 42, 0.42)" : "transparent"};
            pointer-events: ${opened ? "auto" : "none"};
            transition: background .24s ease;
        }
    ` : `
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, 0.42);
        z-index: 100;
    `}
`;

export const DashboardMenu = styled.aside.attrs({
    className: "menu-contant",
})`
    height: calc(100vh - 64px);
    background: #0f172a;
    color: #e2e8f0;
    display: flex;
    flex-direction: column;
    border-right: 1px solid rgba(148, 163, 184, 0.12);
    overflow: hidden;

    ${({ fluid, opened }) => fluid ? `
        width: ${opened ? MENU_WIDTH.open : MENU_WIDTH.collapsed};
        transition: width .24s ease, transform .24s ease;

        @media (max-width: 1023px) {
            width: ${MENU_WIDTH.mobile};
            transform: translateX(${opened ? "0" : "-100%"});
            height: calc(100vh - 64px);
            box-shadow: 4px 0 24px rgba(0, 0, 0, 0.4);
        }
    ` : `
        width: 296px;
    `}
`;

export const DashboardMenuHeader = styled.div`
    min-height: ${MENU_HEADER_HEIGHT};
    padding: ${({ $collapsed }) => $collapsed ? "16px 0" : "16px 14px"};
    display: flex;
    align-items: center;
    justify-content: ${({ $collapsed }) => $collapsed ? "center" : "space-between"};
    gap: 10px;
    border-bottom: 1px solid rgba(148, 163, 184, 0.1);
`;

export const DashboardBrandButton = styled.button`
    flex: 1;
    min-width: 0;
    padding: 0;
    border: 0;
    background: transparent;
    text-align: left;
    cursor: pointer;
`;

export const DashboardBrandRow = styled.div`
    display: flex;
    align-items: baseline;
    gap: 1px;
`;

export const DashboardBrandName = styled.span`
    color: #e2e8f0;
    font-size: 14px;
    font-weight: 300;
    line-height: 18px;
    letter-spacing: -0.04em;
    ${({ $collapsed }) => $collapsed ? "display: none;" : ""}
`;

export const DashboardBrandAccent = styled.span`
    color: #2f86ff;
    font-size: 14px;
    font-weight: 800;
    line-height: 18px;
    letter-spacing: -0.04em;
    ${({ $collapsed }) => $collapsed ? "display: none;" : ""}
`;

export const DashboardBrandMono = styled.div`
    width: 28px;
    height: 28px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1d4ed8 0%, #0ea5e9 100%);
    color: #ffffff;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: -0.04em;
    ${({ $collapsed }) => $collapsed ? "" : "display: none;"}
`;

export const DashboardBrandMeta = styled.div`
    margin-top: 1px;
    color: #475569;
    font-size: 8px;
    font-weight: 500;
    line-height: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    ${({ $collapsed }) => $collapsed ? "display: none;" : ""}
`;

export const DashboardMenuToggle = styled.button`
    padding: 4px;
    border: 0;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const DashboardCollapsedToggle = styled.button`
    width: 100%;
    min-height: 35px;
    padding: 10px 0;
    border: 0;
    border-bottom: 1px solid rgba(148, 163, 184, 0.1);
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const DashboardMenuHeaderUserContent = styled.div`
    padding: 14px 16px 0;
    display: ${({ $collapsed }) => $collapsed ? "none" : "flex"};
    flex-wrap: wrap;
    gap: 8px;
`;

export const DashboardContextPill = styled.span`
    display: inline-flex;
    align-items: center;
    min-height: 30px;
    padding: 6px 10px;
    border-radius: 999px;
    background: rgba(59, 130, 246, 0.14);
    color: #bfdbfe;
    font-size: 11px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
`;

export const DashboardMenuContent = styled.div`
    flex: 1;
    min-height: 0;
    padding: 6px 8px;
    overflow: hidden;

    @media (max-height: 860px) {
        padding: 5px 8px;
    }
`;

export const DashboardMenuFooter = styled.div`
    flex-shrink: 0;
    padding: 8px;
    border-top: 1px solid rgba(148, 163, 184, 0.1);
    display: flex;
    flex-direction: column;
    gap: 4px;

    @media (max-height: 860px) {
        padding: 6px 8px;
        gap: 3px;
    }
`;

export const DashboardFooterCard = styled.button`
    width: 100%;
    border: 0;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 6px;
    padding: ${({ $collapsed }) => $collapsed ? "6px 0" : "6px 8px"};
    display: flex;
    align-items: center;
    gap: 8px;
    color: #e2e8f0;
    cursor: pointer;
    transition: background .2s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.08);
    }

    ${({ $collapsed }) => $collapsed ? "justify-content: center;" : ""}
`;

export const DashboardFooterAvatar = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 999px;
    background: #1e3a5f;
    color: #93c5fd;
    font-size: 10px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    flex-shrink: 0;
`;

export const DashboardFooterInfo = styled.div`
    min-width: 0;
    display: ${({ $collapsed }) => $collapsed ? "none" : "flex"};
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
`;

export const DashboardFooterName = styled.div`
    max-width: 100%;
    color: #f8fafc;
    font-size: 11px;
    font-weight: 600;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const DashboardFooterHint = styled.div`
    color: rgba(148, 163, 184, 0.92);
    font-size: 9px;
    font-weight: 600;
    line-height: 12px;
`;

export const DashboardVersionContent = styled.div`
    display: ${({ $collapsed }) => $collapsed ? "none" : "block"};
`;

export const DashboardVersionText = styled.div`
    text-align: center;
    color: #334155;
    font-size: 9px;
    line-height: 12px;
`;

export const DashboardMobileBar = styled.nav`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 35;
    height: calc(56px + env(safe-area-inset-bottom));
    padding-bottom: env(safe-area-inset-bottom);
    background: #0f172a;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    display: none;
    align-items: stretch;

    @media (max-width: 767px) {
        display: flex;
    }
`;

export const DashboardMobileItem = styled.button`
    position: relative;
    flex: 1;
    border: 0;
    background: transparent;
    color: ${({ $active }) => $active ? "#93c5fd" : "#475569"};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    cursor: pointer;
`;

export const DashboardMobileItemIconWrap = styled.span`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

export const DashboardMobileItemLabel = styled.span`
    font-size: 9px;
    font-weight: ${({ $active }) => $active ? "700" : "400"};
    line-height: 1;
`;

export const DashboardMobileItemActiveBar = styled.span`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 2px;
    border-radius: 0 0 2px 2px;
    background: #3b82f6;
`;
