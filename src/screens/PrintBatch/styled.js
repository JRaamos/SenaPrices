import styled from "styled-components";

export const PrintBatchPage = styled.div.attrs({
})`
    min-height: 100vh;
    padding: 16px 18px 78px;
    background: ${props => props.theme.palette.colors.slate100};

    @media (max-width: 768px) {
        padding: 16px 12px 88px;
    }
`;

export const PrintBatchHeader = styled.div.attrs({
})`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 2px 6px 0;
`;

export const PrintBatchHeaderIcon = styled.div.attrs({
})`
    width: 20px;
    min-width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3px;

    img {
        width: 14px;
        height: 14px;
    }
`;

export const PrintBatchTitle = styled.h1.attrs({
})`
    margin: 0;
    color: ${props => props.theme.palette.colors.slate900};
    font-size: 18px;
    font-weight: 700;
    line-height: 27px;
`;

export const PrintBatchSubtitle = styled.p.attrs({
})`
    margin: 2px 0 0;
    color: ${props => props.theme.palette.colors.slate400};
    font-size: 10px;
    font-weight: 400;
    line-height: 15px;
`;

export const PrintBatchBody = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 126px;
    gap: 10px;
    align-items: start;

    @media (max-width: 1100px) {
        grid-template-columns: 1fr;
    }
`;

export const PrintBatchMain = styled.div.attrs({
})`
    min-width: 0;
`;

export const PrintBatchSearchRow = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 108px;
    gap: 8px;
    margin-top: 4px;
    margin-bottom: 0;

    .MuiFormControl-root {
        margin-top: 0 !important;
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const PrintBatchSelectAllButton = styled.button.attrs({
    type: "button",
})`
    min-height: 32px;
    border-radius: 7px;
    border: 1px solid ${props => props.theme.palette.colors.slate200};
    background: ${props => props.theme.palette.colors.slate50};
    color: ${props => props.theme.palette.colors.slate400};
    font-size: 10px;
    line-height: 15px;
    padding: 0 12px;
    cursor: pointer;

    &:disabled {
        cursor: default;
        opacity: 0.55;
    }
`;

export const PrintBatchListCard = styled.div.attrs({
})`
    margin-top: 8px;
    border: 1px solid ${props => props.theme.palette.colors.slate200};
    border-radius: 10px;
    overflow: hidden;
    background: ${props => props.theme.palette.colors.white};
`;

export const PrintBatchListEmpty = styled.div.attrs({
})`
    padding: 30px 20px;
    color: ${props => props.theme.palette.colors.slate400};
    font-size: 12px;
    line-height: 18px;
    text-align: center;
`;

export const PrintBatchListItem = styled.label.attrs({
})`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 16px;
    border-bottom: 1px solid ${props => props.theme.palette.colors.slate100};
    cursor: pointer;

    &:last-child {
        border-bottom: 0;
    }
`;

export const PrintBatchCheckbox = styled.input.attrs({
    type: "checkbox",
})`
    width: 15px;
    min-width: 15px;
    height: 15px;
    margin: 0;
    accent-color: ${props => props.theme.palette.colors.blue400};
`;

export const PrintBatchItemContent = styled.div.attrs({
})`
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

export const PrintBatchItemTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate900};
    font-size: 11px;
    font-weight: 700;
    line-height: 16px;
    text-transform: uppercase;
`;

export const PrintBatchItemMeta = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate400};
    font-size: 9px;
    font-weight: 400;
    line-height: 13.5px;
`;

export const PrintBatchItemTags = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
    flex-wrap: wrap;
`;

export const PrintBatchTypeBadge = styled.div.attrs({
})`
    padding: 2px 7px;
    border-radius: 10px;
    background: #fef2f2;
    color: ${props => props.theme.palette.colors.blue400};
    font-size: 10px;
    font-weight: 600;
    line-height: 15px;
    white-space: nowrap;
`;

export const PrintBatchSizeBadge = styled.div.attrs({
})`
    padding: 2px 7px;
    border-radius: 6px;
    border: 1px solid ${props => props.theme.palette.colors.slate200};
    background: ${props => props.theme.palette.colors.slate100};
    color: ${props => props.theme.palette.colors.slate400};
    font-size: 10px;
    line-height: 15px;
    white-space: nowrap;
`;

export const PrintBatchCode = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate400};
    font-size: 8px;
    line-height: 15px;
    white-space: nowrap;
`;

export const PrintBatchAside = styled.div.attrs({
})`
    border: 1px solid ${props => props.theme.palette.colors.slate200};
    border-radius: 10px;
    background: ${props => props.theme.palette.colors.white};
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    @media (max-width: 1100px) {
        max-width: 320px;
    }
`;

export const PrintBatchAsideCount = styled.div.attrs({
})`
    padding: 10px;
    border-radius: 7px;
    background: ${props => props.theme.palette.colors.slate100};
    color: ${props => props.theme.palette.colors.slate500};
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    text-align: center;
`;

export const PrintBatchAsideActions = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const PrintBatchAsideHint = styled.div.attrs({
})`
    padding: 10px;
    border-radius: 7px;
    background: ${props => props.theme.palette.colors.slate100};
    color: ${props => props.theme.palette.colors.slate400};
    font-size: 11px;
    line-height: 16.5px;
`;

export const PrintBatchBottomBar = styled.div.attrs({
})`
    position: sticky;
    bottom: 0;
    margin-top: 14px;
    padding: 8px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    background: rgba(15, 23, 42, 0.97);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

export const PrintBatchBottomCount = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate400};
    font-size: 12px;
    line-height: 18px;
`;

export const PrintBatchBottomActions = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: flex-end;

    @media (max-width: 768px) {
        justify-content: stretch;

        > * {
            flex: 1;
        }
    }
`;
