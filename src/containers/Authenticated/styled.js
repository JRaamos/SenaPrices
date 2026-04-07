import styled from 'styled-components'  
 
export const DashboardPage = styled.div.attrs({ 
})`            
`;

export const DashboardBody = styled.div.attrs({ 
})`       
    position: relative;
    min-height: calc(100vh - 60px);
    max-height: calc(100vh - 60px);
    background: ${ props => props.theme.palette.colors.white };

    display: flex;
    align-items: flex-start;     
    overflow: auto;
    width: 100vw;
    max-width: 100vw;
    flex:1;
`;

export const DashboardBodyContainer = styled.div.attrs({ 
    id:"body-scroll"
})`
    flex:1;
    ${
        p => p?.fluid ? `
            overflow:auto;
            min-height: calc(100vh - 60px);
            max-height: calc(100vh - 60px);
        ` : ``
    }
`;

export const DashboardBodyContent = styled.div.attrs({ 
})`
    margin: 24px;
    background: ${ props => props.theme.palette.colors.white };
    padding: 35px 20px;
    border-radius: 11px;
    min-height: calc(100vh - 108px);
    @media(max-width: 767px){
        margin: 12px;
        padding: 17px 10px;
    }
    @media(max-width: 480px){
        margin: 6px;
        padding: 8px 5px;
    }
`;

export const Content = styled.div.attrs({ 
})`           
    overflow: hidden;
`; 