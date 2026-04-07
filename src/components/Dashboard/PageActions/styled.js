import styled from 'styled-components'



export const FooterActions = styled.div.attrs({
})`
    position: fixed;
    bottom: 0;
    background: ${p => p.theme.palette.colors.white};
    padding: 8px 32px 16px;
    width: -webkit-fill-available;

    @media(max-width: 767px){
        padding: 8px 16px 8px;
    }
`;
