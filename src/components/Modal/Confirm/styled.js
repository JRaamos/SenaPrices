import styled from "styled-components";

export const CompanyButtonContainer = styled.div.attrs({
})`
    width: 100%;
    gap: 16px;
    padding-top: 16px;
`;

export const ModalBody = styled.div.attrs({
})`
    padding: 16px 0 0 0;
    border-top: 1px solid ${props => props.theme.palette.colors.border};
`;

export const CloseContainer = styled.div.attrs({
})`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`;