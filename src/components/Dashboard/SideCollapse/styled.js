import styled from "styled-components";
import { Icon } from "ui/styled";

const MENU_ICON_SIZE = "16px";

export const DashboardMenuOption = styled.button`
    width: 100%;
    min-height: 33px;
    padding: ${({ opened }) => opened ? "8px 10px" : "10px 0"};
    display: flex;
    align-items: center;
    justify-content: ${({ opened }) => opened ? "flex-start" : "center"};
    gap: ${({ opened }) => opened ? "10px" : "0"};
    border: 1px solid ${({ active }) => active ? "rgba(59, 130, 246, 0.26)" : "transparent"};
    background: ${({ active }) => active ? "rgba(37, 99, 235, 0.2)" : "transparent"};
    border-radius: ${({ opened }) => opened ? "7px" : "0"};
    cursor: pointer;
    transition: background .2s ease, border-color .2s ease, transform .2s ease;

    &:hover {
        background: ${({ active }) => active ? "rgba(37, 99, 235, 0.24)" : "rgba(255, 255, 255, 0.06)"};
        border-color: ${({ active }) => active ? "rgba(59, 130, 246, 0.32)" : "transparent"};
    }

    @media (max-height: 860px) {
        min-height: 31px;
        padding: ${({ opened }) => opened ? "7px 8px" : "8px 0"};
        gap: 7px;
    }
`;

export const DashboardMenuGlyph = styled.span`
    width: ${MENU_ICON_SIZE};
    height: ${MENU_ICON_SIZE};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

export const OptionContainer = styled.div`
    min-width: 0;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`;

export const OptionText = styled.div`
    min-width: 0;
    color: ${({ active }) => active ? "#f8fafc" : "#cbd5e1"};
    font-size: 13px;
    font-weight: ${({ active }) => active ? "600" : "400"};
    line-height: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const DashboardSubMenu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 3px 0 6px 34px;
`;

export const DashboardSubMenuItem = styled.button`
    padding: 5px 8px;
    border: 0;
    border-radius: 7px;
    background: ${({ active }) => active ? "rgba(255, 255, 255, 0.08)" : "transparent"};
    color: ${({ active }) => active ? "#f8fafc" : "#94a3b8"};
    font-size: 11px;
    font-weight: ${({ active }) => active ? "600" : "500"};
    line-height: 16px;
    text-align: left;
    cursor: pointer;
    transition: background .2s ease, color .2s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.06);
        color: #e2e8f0;
    }
`;

export const ChevronIcon = styled(Icon).attrs({
    icon: "chevron-up",
})`
    width: 14px;
    height: 14px;
    transform: ${({ active }) => active ? "rotate(0deg)" : "rotate(180deg)"};
    transition: transform .2s ease;
    filter: brightness(0) saturate(100%) invert(79%) sepia(11%) saturate(357%) hue-rotate(179deg) brightness(92%) contrast(91%);
`;

export const DashboardMenuBorder = styled.div`
    margin: 6px 6px;
    border-top: 1px solid rgba(148, 163, 184, 0.12);
`;
