import styled from 'styled-components'

export const CookieBarWrap = styled.div.attrs({})`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(2, 6, 23, 0.96);
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    padding: 17px 20px 16px;
    z-index: 30;
`;

export const CookieContent = styled.div.attrs({})`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    gap: 12px;

    > img:first-child {
        width: 20px;
        height: 20px;
        margin-top: 1px;
    }
`;

export const CookieText = styled.div.attrs({})`
    flex: 1;
    color: ${p => p.theme.palette.colors.slate300};
    font-size: 11px;
    line-height: 14px;
`;

export const CookieClose = styled.button.attrs({ type: 'button' })`
    background: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;

    img {
        width: 16px;
        height: 16px;
        margin: 0;
    }
`;

export const CookieActions = styled.div.attrs({})`
    max-width: 1200px;
    margin: 12px auto 0;
    display: flex;
    justify-content: center;
    gap: 10px;
`;
