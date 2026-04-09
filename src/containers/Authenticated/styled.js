import styled from "styled-components";

export const DashboardPage = styled.div`
    min-height: 100vh;
    background: #eef3f8;
`;

export const DashboardBody = styled.div`
    position: relative;
    min-height: calc(100vh - 64px);
    background: #eef3f8;
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
    padding: 28px 28px 120px;
    min-height: calc(100vh - 64px);

    @media(max-width: 767px){
        padding: 18px 16px 112px;
    }

    @media(max-width: 480px){
        padding: 14px 12px 104px;
    }
`;

export const Content = styled.div`
    overflow: hidden;
`;
