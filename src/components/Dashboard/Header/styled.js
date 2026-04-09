import styled from "styled-components";

export const DashboardHeaderContainer = styled.header`
    height: 64px;
    width: 100%;
    padding: 0 20px;
    background: rgba(255, 255, 255, 0.92);
    border-bottom: 1px solid rgba(148, 163, 184, 0.18);
    backdrop-filter: blur(16px);
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
    width: 42px;
    height: 42px;
    border-radius: 14px;
    border: 1px solid rgba(148, 163, 184, 0.2);
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background .2s ease, border-color .2s ease;

    &:hover {
        background: #f8fafc;
        border-color: rgba(148, 163, 184, 0.3);
    }
`;
