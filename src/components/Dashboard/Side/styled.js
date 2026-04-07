import styled from 'styled-components'   
 

export const DashboardMenuContainer = styled.div.attrs({ 
})`           
    ${
        p => p.fluid ? `
            width: 100%;
            max-width: 320px;

            @media(max-width:767px){
                max-width: 180px;
            }
            @media(max-width:480px){
                max-width: 120px;
            }
                
            ${
                !p?.opened ? `
                    max-width: 60px !important;
                ` : ``
            }
        ` : `
            position: fixed;
            top:0;
            bottom: 0;
            right: 0;
            left: 0;
            z-index: 100;
            background: ${ p.theme.palette.colors.shadow };
        `
    }
`;

export const DashboardMenu = styled.div.attrs({ 
    className:'menu-contant'
})`           
    background: ${ props => props.theme.palette.colors.white };
    min-height: 100vh;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: auto;
    width: 100%;
    max-width: 389px;
    ${
        p => p.fluid ? `
            max-width: 320px;
            @media(max-width:767px){
                max-width: 180px;
            }
            @media(max-width:480px){
                max-width: 120px;
            }
            min-height: calc(100vh - 60px);
            max-height: calc(100vh - 60px);
            border-right: 1px solid ${ p.theme.palette.colors.lightshadow };
            ${
                !p?.opened ? `
                    max-width: 60px !important;
                ` : ``
            }
        ` : `
        `
    }
`;

export const DashboardMenuHeader = styled.div.attrs({ 
})`           
    height: 60px;
    width: 100%; 
    display: flex;
    align-items: center;
    padding: 0 20px;

    text-transform: uppercase;
    font-size: 15px;
    color: ${ props => props.theme.palette.colors.white };
    cursor: pointer;

    background: ${ props => props.theme.palette.primary.main };
    background: linear-gradient(48deg, rgba(${props => props.theme.palette.primary.main},1) 0%, rgba(${props => props.theme.palette.primary.main},.9) 21%, rgba(${props => props.theme.palette.primary.main},.75) 49%, rgba(${props => props.theme.palette.primary.main},.6) 87%, rgba(${props => props.theme.palette.primary.main},.45) 100%);
`;

export const DashboardMenuHeaderIcon = styled.img.attrs({ 
})`           
    margin-right: 20px;
    cursor: pointer;
`;

export const DashboardMenuHeaderUserContent = styled.div.attrs({ 
})`           
    padding: 27px 6px;
    margin-bottom: 6px;
    background: ${ props => props?.fluid ? 'none' : props.theme.palette.primary.main } ;
`;

export const DashboardMenuHeaderUserImage = styled.div.attrs({ 
})`           
    width: 96px;
    height: 96px; 
    border-radius: 48px; 
    background: ${ props => props.theme.palette.colors.grey } url(/logo1024.png) no-repeat center center / cover;
    margin: 0 auto 12px;
    overflow: hidden;
    ${
        p => !p?.opened ? `
            width: 48px;
            height: 48px; 
        ` : ``
    }
`;

export const DashboardMenuHeaderUserText = styled.div.attrs({ 
})`           
    font-size: 15px;
    font-weight: bold;
    color: ${ props => props.theme.palette.colors.grey };
    margin-bottom: 12px; 
`;

export const DashboardMenuContent = styled.div.attrs({ 
})` 
    flex:1; 
`;

export const DashboardMenuFooter = styled.div.attrs({ 
})`
    gap: 8px;
    display: flex;
    flex-direction: column;
`;

export const DashboardVersionContent = styled.div.attrs({ 
})` 
    margin: 24px 0;
`;

export const DashboardVersionText = styled.div.attrs({ 
})`
    font-size: 9px;
    font-weight: 300;
    color: ${ props => props.theme.palette.colors.border };
    text-align: center; 
`;


