import styled from 'styled-components'  

export const DashboardContainer = styled.div.attrs({
})`           
    padding: 24px;
    background: ${p => p.theme.palette.colors.white};
    border-radius: 8px;
    gap: 24px;
    display: flex;
    flex-direction: column;
    margin-bottom: 97px;
`;