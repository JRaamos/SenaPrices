import styled from 'styled-components'

import Button from 'components/Form/Button'
import Core from 'components/Form/Core'

export const LoginShell = styled.div.attrs({
})`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

export const LoginTopBar = styled.div.attrs({
})`
    padding: 12px 16px 13px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.colors.mystic};
`;

export const LoginTopButton = styled.button.attrs({
})`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 0;
    background: transparent;
    padding: 7px 10px;
    border-radius: 8px;
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 13px;
    font-weight: 500;
    line-height: 19.5px;

    &:hover {
        background: rgba(255, 255, 255, 0.45);
    }
`;

export const BackAction = styled.span.attrs({
    children: '←',
})`
    font-size: 13px;
    line-height: 1;
`;

export const LoginWrapper = styled.div.attrs({
})`
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 18px;
    padding: 48px 16px;
`;

export const LoginLogoBlock = styled.div.attrs({
})`
    width: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const LoginLogo = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    gap: 1px;
    letter-spacing: -0.5px;
`;

export const LoginLogoText = styled.span.attrs({
})`
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 26px;
    font-weight: 300;
    line-height: 26px;
`;

export const LoginLogoAccent = styled.span.attrs({
})`
    color: ${({ theme }) => theme.palette.colors.sky};
    font-size: 26px;
    font-weight: 800;
    line-height: 26px;
`;

export const LoginLogoCaption = styled.span.attrs({
})`
    padding-top: 2px;
    color: ${({ theme }) => theme.palette.colors.gull};
    font-size: 10px;
    font-weight: 500;
    line-height: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
`;

export const LoginCard = styled.div.attrs({
})`
    width: 100%;
    max-width: 400px;
    padding: 38.5px 29px 29px;
    border-radius: 14px;
    border: 1px solid ${({ theme }) => theme.palette.colors.mystic};
    background: ${({ theme }) => theme.palette.colors.white};
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    gap: 18px;

    @media (max-width: 480px) {
        padding: 28px 18px 18px;
    }
`;

export const LoginCardTitle = styled.h2.attrs({
})`
    margin: 0;
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 17px;
    font-weight: 700;
    line-height: 25.5px;
`;

export const LoginTabs = styled.div.attrs({
})`
    width: 100%;
    padding: 4px;
    border-radius: 9px;
    background: ${({ theme }) => theme.palette.colors.catskill};
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
`;

export const LoginTab = styled.button.attrs({
})`
    border: 0;
    border-radius: 7px;
    min-height: 35.5px;
    padding: 8px;
    background: ${({ $active, theme }) => $active ? theme.palette.colors.azure : 'transparent'};
    color: ${({ $active, theme }) => $active ? theme.palette.colors.white : theme.palette.colors.slate};
    font-size: 13px;
    font-weight: ${({ $active }) => $active ? 600 : 400};
    line-height: 19.5px;
`;

export const StyledCore = styled(Core).attrs({
})`
    width: 100%;

    .MuiFormControl-root {
        margin-top: 0;
    }

    .MuiInputLabel-root {
        position: static;
        transform: none;
        margin-bottom: 6px;
        color: ${({ theme }) => theme.palette.colors.slate};
        font-size: 12px;
        font-weight: 600;
        line-height: 18px;
        text-transform: uppercase;
    }

    .MuiInputBase-root {
        background: #ffffff;
        border: 1px solid ${({ theme }) => theme.palette.colors.geyser};
        border-radius: 8px;
        min-height: 48px;
        padding: 0 15px;
    }

    .MuiInputBase-root::before,
    .MuiInputBase-root::after {
        display: none;
    }

    .MuiInputBase-input {
        padding: 0;
        color: ${({ theme }) => theme.palette.colors.ebony};
        font-size: 14px;
        line-height: normal;
    }

    .MuiInputBase-input::placeholder {
        color: rgba(17, 24, 39, 0.5);
        opacity: 1;
    }

    .MuiInputAdornment-root {
        margin-left: 8px;
    }

    .MuiIconButton-root {
        color: ${({ theme }) => theme.palette.colors.gull};
        padding: 0;
    }

    .MuiFormControl-root + .MuiFormControl-root {
        margin-top: 14px;
    }
`;

export const LoginActions = styled.div.attrs({
})`
    padding-top: 4px;
`;

export const StyledPrimaryButton = styled(Button).attrs({
    nospace: true,
})`
    min-height: 48.5px;
    border-radius: 9px;
    background: ${({ theme }) => theme.palette.colors.azure};
    color: ${({ theme }) => theme.palette.colors.white};
    box-shadow: none;
    font-size: 15px;
    font-weight: 700;
    line-height: 22.5px;
    text-transform: none;

    &:hover {
        background: ${({ theme }) => theme.palette.colors.azureDark};
        box-shadow: none;
    }
`;

export const CredentialsBox = styled.div.attrs({
})`
    padding: 11px 13px;
    border: 1px solid ${({ theme }) => theme.palette.colors.mystic};
    border-radius: 8px;
    background: ${({ theme }) => theme.palette.colors.catskill};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const CredentialsTitle = styled.strong.attrs({
})`
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 11px;
    font-weight: 600;
    line-height: 16.5px;
`;

export const CredentialsItem = styled.span.attrs({
})`
    padding-top: 4px;
    color: ${({ theme }) => theme.palette.colors.gull};
    font-size: 11px;
    font-weight: 400;
    line-height: 16.5px;
`;

export const CredentialsDescription = styled.button.attrs({
})`
    margin-top: 10px;
    padding: 0;
    border: 0;
    background: transparent;
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 12px;
    font-weight: 600;
    line-height: 18px;
`;

export const BackActionBottom = styled.button.attrs({
})`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 0;
    background: transparent;
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 13px;
    font-weight: 400;
    line-height: 19.5px;
`;
