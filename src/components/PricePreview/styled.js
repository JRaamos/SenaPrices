import styled from 'styled-components'

export const PricePreviewContainer = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding-bottom: 8px;
`;

export const PricePreviewHeading = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    gap: 6px;
`;

export const PricePreviewTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate400};
    font-size: 10px;
    font-weight: 700;
    line-height: 15px;
    letter-spacing: 0.8px;
    text-transform: uppercase;
`;

export const PricePreviewFormat = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate400};
    font-size: 9px;
    line-height: 13.5px;
`;

export const PricePreviewReady = styled.div.attrs({
})`
    padding: 2px 8px;
    border-radius: 10px;
    border: 1px solid #bbf7d0;
    background: #f0fdf4;
    color: #15803d;
    font-size: 10px;
    line-height: 15px;
`;

export const PricePreviewPlaceholder = styled.div.attrs({
})`
    width: 230px;
    height: 80px;
    border-radius: 8px;
    border: 1px dashed ${props => props.theme.palette.colors.slate200};
    background: rgba(255, 255, 255, 0.6);
    color: ${props => props.theme.palette.colors.slate400};
    font-size: 12px;
    line-height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 24px;
`;

export const PricePreviewCard = styled.div.attrs({
})`
    width: 230px;
    height: 326px;
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid ${props => props.theme.palette.colors.slate200};
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    background: #ffff99;
    padding: 18px 12px 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const PricePreviewTop = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    margin-top: 8px;
`;

export const PricePreviewTopLine = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.black};
    font-family: Arial, sans-serif;
    font-size: 9px;
    font-weight: 700;
    line-height: 10px;
    text-transform: uppercase;
`;

export const PricePreviewProduct = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.black};
    font-family: Arial, sans-serif;
    font-size: 6.6px;
    font-weight: 700;
    line-height: 8px;
`;

export const PricePreviewPrice = styled.div.attrs({
})`
    position: relative;
    margin-top: 92px;
    color: ${props => props.theme.palette.colors.black};
    font-family: Arial, sans-serif;
    font-size: 78px;
    font-weight: 700;
    line-height: 1;
`;

export const PricePreviewPriceCurrency = styled.span.attrs({
})`
    position: absolute;
    top: -8px;
    left: -14px;
    font-size: 15px;
`;

export const PricePreviewPriceDecimals = styled.span.attrs({
})`
    position: absolute;
    top: 10px;
    right: -46px;
    font-size: 36px;
`;

export const PricePreviewUnit = styled.div.attrs({
})`
    margin-top: 24px;
    color: #555555;
    font-family: Arial, sans-serif;
    font-size: 4.5px;
    font-weight: 700;
    line-height: 6.75px;
    text-transform: lowercase;
`;

export const PricePreviewCode = styled.div.attrs({
})`
    position: absolute;
    top: 2px;
    left: 1px;
    color: #999999;
    opacity: 0.6;
    font-family: Menlo, monospace;
    font-size: 2.9px;
    line-height: 4.32px;
`;

export const PricePreviewBadge = styled.div.attrs({
})`
    position: absolute;
    right: -10px;
    bottom: 34px;
    width: 142px;
    height: 82px;
    border: 2px solid ${props => props.theme.palette.colors.black};
    border-radius: 50%;
    opacity: 0.18;
`;

export const PricePreviewBarcode = styled.div.attrs({
})`
    position: absolute;
    left: 82px;
    bottom: 14px;
    width: 66px;
    height: 18px;
    background:
        repeating-linear-gradient(
            90deg,
            #000 0px,
            #000 2px,
            transparent 2px,
            transparent 4px
        );
    opacity: 0.92;
`;
