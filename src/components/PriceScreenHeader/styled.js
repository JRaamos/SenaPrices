import styled from 'styled-components'

export const PriceHeaderContainer = styled.div.attrs({
})`
    padding: 14px 18px;
    border-bottom: 1px solid ${props => props.theme.palette.colors.slate200};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    background: ${props => props.theme.palette.colors.slate50};

    @media (max-width: 991px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

export const PriceHeaderText = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

export const PriceHeaderTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate900};
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
`;

export const PriceHeaderSubtitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate500};
    font-size: 10px;
    font-weight: 400;
    line-height: 15px;
`;

export const PriceHeaderActions = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
`;
