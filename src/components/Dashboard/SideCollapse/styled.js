import styled from 'styled-components'   
import { Icon } from 'ui/styled';

export const DashboardMenuOption = styled.div.attrs({
})`           
    padding: 11px 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer; 
    width: 100%;
    background: transparent;
    border-radius: 4px;
    cursor: pointer;
    
    ${ props => props.active ? ` background: ${props.theme.palette.primary.main}; ` : `` }
    ${ props => !props.opened ? `justify-content: center;` : `` }

`;

export const OptionContainer = styled.div.attrs({
})` 
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
`;


export const OptionText = styled.div.attrs({
})` 
    font-weight: 500;
    font-size: 15px;
    color: ${p => p.theme.palette.colors.text};
    ${p => p.active ? `
        color: ${p.theme.palette.colors.white};
        font-weight: 600;
    ` : ``
    }
    cursor: pointer;
    
`;


export const DashboardSubMenu = styled.div.attrs({})`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 0px 8px 11px 8px;

`;

export const DashboardSubMenuItem = styled.div.attrs({})`
    font-size: 14px;
    font-weight: 400;
    color: ${p => p.theme.palette.colors.text};
    padding: 6px 0;
    cursor: pointer;
    &:hover {
        color: ${p => p.theme.palette.primary.main};
    }
`;

export const ChevronIcon = styled(Icon).attrs({
    icon: 'chevron-up'
})` 
    transform: rotate(90deg);
    transition: all 0.3s;
    ${p => p.active ? `
        transform: rotate(0deg);
        ` : ``};
`;

export const DashboardMenuBorder = styled.div.attrs({
})`           
    border-top: .5px solid ${p => p.theme.palette.colors.lightshadow };
`;
