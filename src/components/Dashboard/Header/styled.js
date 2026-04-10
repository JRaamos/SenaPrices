import styled from "styled-components";

export const DashboardHeaderContainer = styled.header`
    height: 64px;
    width: 100%;
    padding: 0 14px;
    background: rgba(255, 255, 255, 0.94);
    border-bottom: 1px solid rgba(226, 232, 240, 0.92);
    backdrop-filter: blur(14px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 40;

    @media (max-width: 560px) {
        padding: 0 14px;
    }
`;

export const DashboardHeaderAction = styled.button`
    width: 36px;
    height: 36px;
    border-radius: 8px;
    border: 1px solid rgba(203, 213, 225, 0.9);
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background .2s ease, border-color .2s ease;

    &:hover {
        background: #f8fafc;
        border-color: rgba(148, 163, 184, 0.34);
    }
`;
