import styled from "styled-components";
import { Icon } from "ui/styled";

export const DashboardMenuOption = styled.button`
    width: 100%;
    min-height: 42px;
    padding: ${({ opened }) => opened ? "9px 12px" : "9px 10px"};
    display: flex;
    align-items: center;
    justify-content: ${({ opened }) => opened ? "flex-start" : "center"};
    gap: 10px;
    border: 1px solid ${({ active }) => active ? "rgba(59, 130, 246, 0.26)" : "transparent"};
    background: ${({ active }) => active ? "rgba(37, 99, 235, 0.2)" : "transparent"};
    border-radius: 12px;
    cursor: pointer;
    transition: background .2s ease, border-color .2s ease, transform .2s ease;

    &:hover {
        background: ${({ active }) => active ? "rgba(37, 99, 235, 0.24)" : "rgba(255, 255, 255, 0.06)"};
        border-color: ${({ active }) => active ? "rgba(59, 130, 246, 0.32)" : "transparent"};
    }
`;

export const DashboardMenuGlyph = styled.span`
    width: 20px;
    height: 20px;
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
    font-size: 14px;
    font-weight: ${({ active }) => active ? "700" : "600"};
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const DashboardSubMenu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 6px 0 8px 44px;
`;

export const DashboardSubMenuItem = styled.button`
    padding: 8px 10px;
    border: 0;
    border-radius: 12px;
    background: ${({ active }) => active ? "rgba(255, 255, 255, 0.08)" : "transparent"};
    color: ${({ active }) => active ? "#f8fafc" : "#94a3b8"};
    font-size: 13px;
    font-weight: ${({ active }) => active ? "700" : "600"};
    line-height: 19px;
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
    margin: 10px 6px;
    border-top: 1px solid rgba(148, 163, 184, 0.12);
`;
