import styled from 'styled-components'



export const UserContent = styled.div.attrs({
})`
    height: 40px;
    min-width: 0;
    max-width: min(42vw, 260px);
    border-radius: 8px;
    background: ${p => p.theme.palette.colors.backgroundgrey};
    align-items: center;
    display: flex;
    gap: 8px;
    padding: 8px;
    cursor: pointer;
    &:hover {
        transform: scale(1.05);
        transition: all 0.7s;
    }

    @media(max-width: 560px){
        max-width: 48px;
        justify-content: center;
    }
`;

export const UserName = styled.div.attrs({
})`
    min-width: 0;
    font-weight: 600;
    font-size: 14px;
    color: ${p => p.theme.palette.colors.black};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media(max-width: 560px){
        display: none;
    }
`;

export const UserInitial = styled.div.attrs({
})`
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background: ${props => props.theme.palette.primary.main};    
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    color: ${p => p.theme.palette.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
`;

export const InfoContainer = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
`;
