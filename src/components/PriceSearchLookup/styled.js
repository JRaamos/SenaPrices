import styled from 'styled-components'

export const PriceSearchLookupContainer = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const PriceSearchLookupResult = styled.button.attrs({
    type: 'button'
})`
    width: 100%;
    padding: 6px 10px;
    border-radius: 4px;
    border: 1px solid ${props => props.theme.palette.colors.green100};
    background: #eefcf4;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    cursor: pointer;
`;

export const PriceSearchLookupResultLabel = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate700};
    font-size: 11px;
    font-weight: 600;
    line-height: 16px;

    span {
        color: ${props => props.theme.palette.colors.slate400};
        font-weight: 400;
        margin-left: 4px;
    }
`;

export const PriceSearchLookupResultMeta = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate400};
    font-size: 8px;
    line-height: 12px;
`;

export const PriceSearchLookupEmpty = styled.div.attrs({
})`
    width: 100%;
    min-height: 22px;
    border-radius: 4px;
    background: ${props => props.theme.palette.colors.slate100};
    color: ${props => props.theme.palette.colors.slate400};
    font-size: 10px;
    line-height: 22px;
    text-align: center;
`;
