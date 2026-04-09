import styled from "styled-components";

export const DashboardMenuContainer = styled.div`
    ${({ fluid, opened }) => fluid ? `
        position: relative;
        width: ${opened ? "248px" : "84px"};
        min-width: ${opened ? "248px" : "84px"};
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
    background: linear-gradient(180deg, #0f172a 0%, #111827 100%);
    color: #e2e8f0;
    display: flex;
    flex-direction: column;
    border-right: 1px solid rgba(148, 163, 184, 0.12);
    box-shadow: 18px 0 40px rgba(15, 23, 42, 0.14);
    overflow: hidden;

    ${({ fluid, opened }) => fluid ? `
        width: ${opened ? "248px" : "84px"};
        transition: width .24s ease, transform .24s ease;

        @media (max-width: 1023px) {
            width: 248px;
            transform: translateX(${opened ? "0" : "-100%"});
            height: calc(100vh - 64px);
        }
    ` : `
        width: 296px;
    `}
`;

export const DashboardMenuHeader = styled.div`
    padding: 18px 14px 12px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
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
    align-items: center;
    gap: 2px;
`;

export const DashboardBrandName = styled.span`
    color: #e2e8f0;
    font-size: 17px;
    font-weight: 300;
    line-height: 22px;
    letter-spacing: -0.04em;
    ${({ $collapsed }) => $collapsed ? "display: none;" : ""}
`;

export const DashboardBrandAccent = styled.span`
    color: #3b82f6;
    font-size: 17px;
    font-weight: 800;
    line-height: 22px;
    letter-spacing: -0.04em;
    ${({ $collapsed }) => $collapsed ? "display: none;" : ""}
`;

export const DashboardBrandMono = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(37, 99, 235, 0.22) 0%, rgba(59, 130, 246, 0.12) 100%);
    color: #e2e8f0;
    font-size: 15px;
    font-weight: 800;
    letter-spacing: -0.04em;
    ${({ $collapsed }) => $collapsed ? "" : "display: none;"}
`;

export const DashboardBrandMeta = styled.div`
    margin-top: 6px;
    color: rgba(148, 163, 184, 0.88);
    font-size: 11px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    ${({ $collapsed }) => $collapsed ? "display: none;" : ""}
`;

export const DashboardMenuToggle = styled.button`
    width: 38px;
    height: 38px;
    border-radius: 12px;
    border: 1px solid rgba(148, 163, 184, 0.14);
    background: rgba(255, 255, 255, 0.04);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background .2s ease, border-color .2s ease, transform .2s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(148, 163, 184, 0.22);
    }
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
    padding: 10px 10px 8px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
`;

export const DashboardMenuFooter = styled.div`
    flex-shrink: 0;
    padding: 6px 10px 12px;
    border-top: 1px solid rgba(148, 163, 184, 0.1);
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const DashboardFooterCard = styled.button`
    width: 100%;
    border: 1px solid rgba(148, 163, 184, 0.12);
    background: rgba(255, 255, 255, 0.04);
    border-radius: 16px;
    padding: ${({ $collapsed }) => $collapsed ? "10px 8px" : "12px"};
    display: flex;
    align-items: center;
    gap: 12px;
    color: #e2e8f0;
    cursor: pointer;
    transition: background .2s ease, border-color .2s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(148, 163, 184, 0.22);
    }

    ${({ $collapsed }) => $collapsed ? "justify-content: center;" : ""}
`;

export const DashboardFooterAvatar = styled.div`
    width: 34px;
    height: 34px;
    border-radius: 11px;
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    color: #eff6ff;
    font-size: 15px;
    font-weight: 800;
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
    gap: 3px;
`;

export const DashboardFooterName = styled.div`
    max-width: 100%;
    color: #f8fafc;
    font-size: 13px;
    font-weight: 700;
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const DashboardFooterHint = styled.div`
    color: rgba(148, 163, 184, 0.92);
    font-size: 10px;
    font-weight: 600;
    line-height: 16px;
`;

export const DashboardVersionContent = styled.div`
    display: ${({ $collapsed }) => $collapsed ? "none" : "block"};
`;

export const DashboardVersionText = styled.div`
    text-align: center;
    color: rgba(148, 163, 184, 0.78);
    font-size: 10px;
    line-height: 15px;
`;
