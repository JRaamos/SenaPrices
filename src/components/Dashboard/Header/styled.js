import styled from 'styled-components'   
 
export const DashboardHeaderContainer = styled.div.attrs({ 
})`           
    height: 60px;
    width: 100%;

    background: ${ props => props.theme.palette.primary.main };
    background: linear-gradient(45deg, rgba(${props => props.theme.palette.primary.main}, .45) 0%, rgba(${props => props.theme.palette.primary.main}, .6) 25%, rgba(${props => props.theme.palette.primary.main}, .75) 50%, rgba(${props => props.theme.palette.primary.main}, .9) 75%, rgba(${props => props.theme.palette.primary.main}, 1) 100%);
    padding: 0 20px;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const DashboardHeaderAction = styled.div.attrs({ 
})`           
    color: ${ props => props.theme.palette.colors.white };
    font-size: 15px;
    text-transform: uppercase;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const AppLogo = styled.img.attrs({ 
    src:`/logo1024.png`,
    alt:"logo-icon",
    height:50
})`            
`;

export const DashboardHeaderActionIcon = styled.img.attrs({ 
})`           
    margin-right: 10px;
`;
