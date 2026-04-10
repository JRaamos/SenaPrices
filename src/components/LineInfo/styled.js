import styled from "styled-components";

export const LineInfoContainer = styled.div.attrs({})`
    display: flex;
    padding: 5px 8px;
    align-items: center;
    gap: 6px;
    border-radius: 20px;
    border: ${p => p.theme.palette.colors.lightblue};
    background: ${p => p.theme.palette.colors.shadowBlue};
    width: 100%;
    max-width: 344px;
    max-height: 30px;
    margin: 28px 0px;
`;

export const LineInfoText = styled.div.attrs({})`
    color:  ${p => p.theme.palette.colors.textBlue};
    text-align: center;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
`;
