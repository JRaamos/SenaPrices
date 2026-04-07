import styled from 'styled-components'  

import {
    Animation
} from 'ui/styled'

export const DashboardTitle = styled.div.attrs({ 
})`            
    font-size: 22px;
    font-weight: bold;
    color: ${ props => props.theme.palette.colors.black };
    margin-bottom: 12px;
    ${
        props => props.centred ? `
            text-align: center;
        ` : ``
    }
`;

export const DashboardText = styled.div.attrs({ 
})`            
    font-size: 16px;
    line-height: 26px;
    opacity: .4;
    color: ${ props => props.theme.palette.colors.black };
    ${
        props => props.centred ? `
            text-align: center;
        ` : ``
    }
    margin: 12px 0 24px;
`;

export const DashboardAnimation = styled(Animation).attrs({ 
    width: '100%',
    height: 420
})`             
`;

export const DashboardInput = styled.div.attrs({ 
})`            
    padding: 0 0 24px;
`;

export const DashboardButton = styled.div.attrs({ 
})`            
    max-width: 320px;
    margin: 0 auto;
`;

export const DarboardUserImage = styled.div.attrs({ 
})`            
    position: relative;
    max-width: 180px;
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    margin: 0 auto 32px;
    background: ${ props => props.theme.palette.secondary.main } url(${ props => props.image }) no-repeat center center / cover;

    display: flex;
    align-items: center;
    justify-content: center;

    

`;

export const DarboardUserImageAction = styled.div.attrs({ 
})`            
    position: absolute;
    max-width: 60px;
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    margin: 0 auto 32px;
    background: ${ props => props.theme.palette.secondary.main };
    box-shadow: 0px 3px 6px ${ props => props.theme.palette.colors.shadow };
    bottom: -30px;
    right: -15px;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    transition: all .3s ease;
    &:hover{
        transform: scale(1.05);
    }
`;

export const DarboardUserImageActionIcon = styled.img.attrs({ 
    src:'/icons/cam.svg',
    alt:'cam-icon',
    width: 24
})`            
`;




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

export const FooterActions = styled.div.attrs({
})`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${p => p.theme.palette.colors.white};
    padding: 20px 32px;


    left: ${p => p.less ? '60px' : '264px'};

    @media(max-width: 1080px){
        left: 60px;
    }
`;


export const CheckContainer = styled.div.attrs({
})`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    padding: 16px 0;
    max-width: 720px;
    width: 100%;
`;

export const Title = styled.div.attrs({
})`           
    font-family: Raleway;
    font-weight: 700;
    font-size: 18px;
    color: ${props => props.theme.palette.colors.black};
`;
