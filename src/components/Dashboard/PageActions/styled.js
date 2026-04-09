import styled from "styled-components";

export const FooterActions = styled.div`
    position: sticky;
    bottom: 0;
    z-index: 20;
    margin: -16px 0 0;
    padding: 20px 0 0;
    background: linear-gradient(180deg, rgba(238, 243, 248, 0) 0%, rgba(238, 243, 248, 0.82) 32%, rgba(238, 243, 248, 1) 100%);

    @media(max-width: 767px){
        padding-top: 14px;
        margin-top: -8px;
    }
`;

export const FooterActionsCard = styled.div`
    padding: 14px 16px;
    border-radius: 18px;
    background: linear-gradient(180deg, #0f172a 0%, #111827 100%);
    border: 1px solid rgba(148, 163, 184, 0.14);
    box-shadow: 0 16px 30px rgba(15, 23, 42, 0.12);

    @media(max-width: 767px){
        padding: 12px;
        border-radius: 16px;
    }
`;
