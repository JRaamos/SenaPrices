import styled from "styled-components";

import Core from "components/Form/Core";
import { Icon } from "ui/styled";

export const QuickCreatePage = styled.div.attrs({
})`
    min-height: 100vh;
    background: ${props => props.theme.palette.colors.slate100};
`;

export const QuickCreateContent = styled.div.attrs({
})`
    width: 100%;
    padding: 28px 32px;

    @media (max-width: 768px) {
        padding: 20px 16px;
    }
`;

export const QuickCreateHeader = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    margin-bottom: 10px;
`;

export const QuickCreateHeaderIcon = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: #FEF2F2;

    img {
        width: 20px;
        height: 20px;
    }
`;

export const QuickCreateTitle = styled.h1.attrs({
})`
    margin: 0;
    color: ${props => props.theme.palette.colors.slate900};
    font-size: 22px;
    font-weight: 700;
    line-height: 33px;
`;

export const QuickCreateSubtitle = styled.p.attrs({
})`
    margin: 0;
    color: ${props => props.theme.palette.colors.slate500};
    font-size: 13px;
    font-weight: 400;
    line-height: 19.5px;
`;

export const QuickCreateCard = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 27px 17px 15px;
    border: 1px solid ${props => props.theme.palette.colors.slate200};
    border-radius: 10px;
    background: ${props => props.theme.palette.colors.white};
`;

export const QuickCreateFiltersHeader = styled.div.attrs({
})`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
`;

export const QuickCreateTypeLabel = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate500};
    font-size: 12px;
    font-weight: 600;
    line-height: 18px;
`;

export const QuickCreateTypeTabs = styled.div.attrs({
})`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
`;

export const QuickCreateTypeButton = styled.button.attrs({
})`
    border: 1px solid ${props => props.active ? props.theme.palette.colors.blue400 : props.theme.palette.colors.slate200};
    border-radius: 7px;
    background: ${props => props.active ? props.theme.palette.colors.blue400 : props.theme.palette.colors.slate100};
    color: ${props => props.active ? props.theme.palette.colors.white : props.theme.palette.colors.slate500};
    padding: 7px 15px;
    font-size: 13px;
    font-weight: ${props => props.active ? 600 : 400};
    line-height: 19.5px;
`;

export const QuickCreateFiltersGrid = styled.div.attrs({
})`
    width: 100%;

    @media (max-width: 980px) {
        width: 100%;
    }

    @media (max-width: 560px) {
        width: 100%;
    }
`;


export const QuickCreateTableCard = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    padding: 1px 1px 15px;
    margin-top: 10px;
    border: 1px solid ${props => props.theme.palette.colors.slate200};
    border-radius: 10px;
    background: ${props => props.theme.palette.colors.white};
`;

export const QuickCreateTableHead = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: 36px minmax(0, 1fr) 160px 36px;
    align-items: center;
    gap: 8px;
    min-height: 35.5px;
    padding: 9px 14px 10px;
    border-bottom: 1px solid ${props => props.theme.palette.colors.slate200};
    border-radius: 10px 10px 0 0;
    background: ${props => props.theme.palette.colors.slate100};
    color: ${props => props.theme.palette.colors.slate400};
    font-size: 11px;
    font-weight: 600;
    line-height: 16.5px;
    text-transform: uppercase;

    @media (max-width: 640px) {
        grid-template-columns: 28px minmax(0, 1fr) 110px 32px;
        padding-left: 10px;
        padding-right: 10px;
    }
`;

export const QuickCreateTableRow = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: 36px minmax(0, 1fr) 160px 36px;
    align-items: center;
    gap: 8px;
    padding: 10px 14px 0;

    @media (max-width: 640px) {
        grid-template-columns: 28px minmax(0, 1fr) 110px 32px;
        padding-left: 10px;
        padding-right: 10px;
    }
`;

export const QuickCreateRowNumber = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate400};
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    text-align: center;
`;

export const QuickCreateRowField = styled.div.attrs({
})`
    width: 100%;

    .MuiFormControl-root,
    .MuiInputBase-root {
        width: 100%;
    }
`;

export const QuickCreateRowAction = styled.button.attrs({
})`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 1px solid #FCA5A5;
    border-radius: 6px;
    background: #FEF2F2;
`;

export const QuickCreateIcon = styled(Icon).attrs({
})`
    width: 14px;
    height: 14px;
`;

export const QuickCreateActions = styled.div.attrs({
})`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding-top: 23px;
`;

export const QuickCreateActionsGroup = styled.div.attrs({
})`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-left: auto;
`;

export const QuickCreateActionButton = styled.button.attrs({
})`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 39.5px;
    padding: 0 14px;
    border: 1px solid ${props => (
        props.danger ? '#FCA5A5' : props.theme.palette.colors.slate200
    )};
    border-radius: 8px;
    background: ${props => (
        props.danger ? '#FEF2F2' : props.theme.palette.colors.slate100
    )};
    color: ${props => (
        props.danger ? props.theme.palette.colors.red500 : props.disabled ? props.theme.palette.colors.slate400 : props.theme.palette.colors.slate500
    )};
    font-size: 13px;
    font-weight: ${props => props.disabled ? 600 : 400};
    line-height: 19.5px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    pointer-events: ${props => props.disabled ? 'none' : 'auto'};
    opacity: 1;
`;

export const QuickCreateTip = styled.p.attrs({
})`
    margin: 0;
    padding-top: 12px;
    color: ${props => props.theme.palette.colors.slate400};
    font-size: 11px;
    line-height: 16.5px;
`;
