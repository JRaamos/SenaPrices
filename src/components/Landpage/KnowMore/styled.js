import styled from 'styled-components'

export const KnowContent = styled.section.attrs({})`
    background: ${p => p.theme.palette.colors.slate50};
    padding: 80px 32px 128px;
    text-align: center;
`;

export const MoreTitle = styled.h2.attrs({})`
    margin: 0;
    color: ${p => p.theme.palette.colors.slate900};
    font-size: 30px;
    font-weight: 900;
    letter-spacing: -0.5px;
    line-height: 45px;
`;

export const MoreText = styled.p.attrs({})`
    max-width: ${p => p.footer ? '100%' : '580px'};
    margin: ${p => p.footer ? '18px auto 0' : '10px auto 0'};
    color: ${p => p.theme.palette.colors.slate500};
    font-size: ${p => p.footer ? '12px' : '14px'};
    line-height: ${p => p.footer ? '18px' : '23.1px'};
`;

export const PlansToggle = styled.div.attrs({})`
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin: 24px 0 36px;
`;

export const PlansToggleLabel = styled.div.attrs({})`
    color: ${p => p.active ? p.theme.palette.colors.green600 : p.theme.palette.colors.slate700};
    font-size: 12px;
    font-weight: ${p => p.active ? 700 : 600};
    line-height: 18px;
`;

export const PlansToggleBullet = styled.div.attrs({})`
    width: 34px;
    height: 18px;
    border-radius: 999px;
    background: ${p => p.theme.palette.colors.slate200};
    position: relative;

    ::after {
        content: '';
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: ${p => p.theme.palette.colors.white};
        position: absolute;
        top: 2px;
        left: 2px;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
    }
`;
