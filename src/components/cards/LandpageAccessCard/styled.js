import styled from 'styled-components'

export const AccessCard = styled.div.attrs({})`
    background: ${p => p.theme.palette.colors.slate50};
    border: 1px solid ${p => p.tone === 'green' ? p.theme.palette.colors.green100 : p.theme.palette.colors.blue100};
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 29px;
    min-height: 362px;
`;

export const AccessCardHeader = styled.div.attrs({})`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
`;

export const AccessCardIconWrap = styled.div.attrs({})`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
`;

export const AccessCardTitle = styled.h3.attrs({})`
    margin: 0;
    color: ${p => p.theme.palette.colors.slate900};
    font-size: 16px;
    font-weight: 800;
    line-height: 24px;
`;

export const AccessCardBadge = styled.div.attrs({})`
    background: ${p => p.theme.palette.colors.slate100};
    border: 1px solid ${p => p.tone === 'green' ? p.theme.palette.colors.green100 : p.theme.palette.colors.blue100};
    border-radius: 5px;
    color: ${p => p.tone === 'green' ? p.theme.palette.colors.green600 : p.theme.palette.colors.blue600};
    font-size: 10px;
    font-weight: 700;
    line-height: 15px;
    padding: 3px 9px;
`;

export const AccessCardEyebrow = styled.div.attrs({})`
    color: ${p => p.theme.palette.colors.slate400};
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.5px;
    line-height: 16.5px;
    margin-top: 4px;
    text-transform: uppercase;
`;

export const AccessCardDescription = styled.p.attrs({})`
    color: ${p => p.theme.palette.colors.slate500};
    font-size: 13px;
    font-weight: 400;
    line-height: 21.45px;
    margin: 2px 0 0;
`;

export const AccessCardList = styled.div.attrs({})`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 12px;
`;

export const AccessCardItem = styled.div.attrs({})`
    display: flex;
    align-items: flex-start;
    gap: 8px;

    img {
        width: 12px;
        height: 12px;
        margin-top: 3px;
    }
`;

export const AccessCardItemText = styled.div.attrs({})`
    color: ${p => p.theme.palette.colors.slate700};
    font-size: 12px;
    font-weight: 400;
    line-height: 17.4px;
`;
