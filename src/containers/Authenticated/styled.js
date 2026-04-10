import styled from "styled-components";

export const DashboardPage = styled.div`
    min-height: 100vh;
    background: #f8fafc;
`;

export const DashboardBody = styled.div`
    position: relative;
    min-height: calc(100vh - 64px);
    background: #f8fafc;
    display: flex;
    align-items: stretch;
    overflow: hidden;
    width: 100%;
    flex: 1;
`;

export const DashboardBodyContainer = styled.div.attrs({
    id: "body-scroll",
})`
    flex: 1;
    overflow: auto;
    min-height: calc(100vh - 64px);
    max-height: calc(100vh - 64px);
`;

export const DashboardBodyContent = styled.div`
    padding: clamp(12px, 4vw, 28px) clamp(12px, 4.5vw, 32px) 108px;
    min-height: calc(100vh - 64px);

    @media(max-width: 767px){
        padding: 16px 14px 106px;
    }

    @media(max-width: 480px){
        padding: 14px 12px 102px;
    }
`;

export const Content = styled.div`
    overflow: hidden;
`;
