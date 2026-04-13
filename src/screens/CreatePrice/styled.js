import styled from 'styled-components'

export const CreatePriceScreen = styled.div.attrs({
})`
    min-height: 100vh;
    background: ${props => props.theme.palette.colors.slate100};
`;

export const CreatePriceLayout = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 260px;
    gap: 15px;
    padding: 14px 12px;

    @media (max-width: 1100px) {
        grid-template-columns: 1fr;
    }
`;

export const CreatePriceMain = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const CreatePriceRow = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 360px;
    gap: 10px;

    @media (max-width: 991px) {
        grid-template-columns: 1fr;
    }
`;

export const CreatePriceSearchCard = styled.div.attrs({
})`
    border: 1px solid ${props => props.theme.palette.colors.slate200};
    border-radius: 10px;
    background: ${props => props.theme.palette.colors.white};
    padding: 13px 15px 15px;
    display: flex;
    flex-direction: column;
    gap: 7px;
`;

export const CreatePriceSearchHeader = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    gap: 6px;
`;

export const CreatePriceSearchStep = styled.div.attrs({
})`
    width: 18px;
    height: 18px;
    border-radius: 9px;
    background: ${props => props.theme.palette.colors.blue400};
    color: ${props => props.theme.palette.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 700;
    line-height: 15px;
`;

export const CreatePriceSearchTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate500};
    font-size: 11px;
    font-weight: 700;
    line-height: 16.5px;
`;

export const CreatePriceAside = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
`;
