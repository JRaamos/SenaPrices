import styled from 'styled-components'

export const CommomContainer = styled.section.attrs({})`
    background: ${p => p.theme.palette.colors.slate50};
    padding: 80px 32px 80px;
    text-align: center;
`;

export const CommomTitle = styled.h2.attrs({})`
    margin: 0;
    color: ${p => p.theme.palette.colors.slate900};
    font-size: 30px;
    font-weight: 900;
    letter-spacing: -0.5px;
    line-height: 45px;
`;

export const CommomSubtitle = styled.p.attrs({})`
    max-width: 520px;
    margin: 10px auto 0;
    color: ${p => p.theme.palette.colors.slate500};
    font-size: 14px;
    line-height: 23.1px;
`;

export const CommomGrid = styled.div.attrs({})`
    max-width: 1020px;
    margin: 56px auto 0;
`;

export const CommomHint = styled.div.attrs({})`
    margin-top: 24px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: ${p => p.theme.palette.colors.slate500};
    font-size: 12px;
    line-height: 18px;

    span:first-child {
        color: ${p => p.theme.palette.colors.yellow500};
    }
`;
