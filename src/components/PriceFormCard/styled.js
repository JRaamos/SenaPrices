import styled from 'styled-components'

export const PriceFormCardContainer = styled.div.attrs({
})`
    border: 1px solid ${props => props.theme.palette.colors.slate200};
    border-radius: 10px;
    background: ${props => props.theme.palette.colors.white};
    padding: 13px 15px 15px;
    display: flex;
    flex-direction: column;
    gap: 7px;
`;

export const PriceFormCardHeader = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    gap: 6px;
`;

export const PriceFormCardStep = styled.div.attrs({
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

export const PriceFormCardTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate500};
    font-size: 11px;
    font-weight: 700;
    line-height: 16.5px;
`;

export const PriceFormCardBody = styled.div.attrs({
})`
    .MuiFormControl-root {
        margin-top: 0 !important;
    }

    .MuiFormControl-root + .MuiFormControl-root {
        margin-top: 8px !important;
    }

    .MuiFormControlLabel-root {
        margin-left: 0;
    }

    .MuiFormControlLabel-label {
        color: ${props => props.theme.palette.colors.slate500};
        font-size: 12px;
        line-height: 18px;
    }

    .MuiInputBase-input,
    .MuiSelect-select {
        color: ${props => props.theme.palette.colors.slate900};
        font-size: 13px;
        line-height: 19.5px;
    }
`;
