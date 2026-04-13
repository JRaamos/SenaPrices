import styled from 'styled-components'  
 
export const ScreenContent = styled.div.attrs({
})`
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 19px;
`;

export const Brand = styled.div.attrs({
})`
    width: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const BrandHeading = styled.div.attrs({
})`
    color: ${ props => props.theme.palette.colors.slate700 };
    font-size: 35px;
    font-weight: 700;
    line-height: 26px;
    letter-spacing: -0.03em;
`;

export const BrandHighlight = styled.span.attrs({
})`
    color: ${ props => props.theme.palette.colors.blue400 };
`;

export const BrandSubheading = styled.div.attrs({
})`
    margin-top: 2px;
    color: ${ props => props.theme.palette.colors.slate400 };
    font-size: 10px;
    font-weight: 600;
    line-height: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const Card = styled.div.attrs({
})`
    width: 100%;
    background: ${ props => props.theme.palette.colors.white };
    border: 1px solid ${ props => props.theme.palette.colors.slate200 };
    border-radius: 14px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
    padding: 37.5px 29px 29px;
    display: flex;
    flex-direction: column;
    gap: 18px;

    @media(max-width: 480px){
        padding: 28px 20px 24px;
    }
`;

export const Title = styled.div.attrs({
})`
    color: ${ props => props.theme.palette.colors.slate900 };
    font-size: 17px;
    font-weight: 700;
    line-height: 25.5px;
`;

export const Tabs = styled.div.attrs({
})`
    width: 100%;
    padding: 4px;
    border-radius: 9px;
    background: ${ props => props.theme.palette.colors.slate100 };
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 4px;
`;

export const TabButton = styled.button.attrs({
})`
    min-height: 36px;
    border: 0;
    border-radius: 7px;
    background: ${ props => props.active ? props.theme.palette.colors.blue400 : `transparent` };
    color: ${ props => props.active ? props.theme.palette.colors.white : props.theme.palette.colors.slate500 };
    font-size: 13px;
    font-weight: ${ props => props.active ? 600 : 400 };
    line-height: 19.5px;
    text-align: center;
`;

export const CredentialsForm = styled.div.attrs({
})`
    width: 100%;

    > div > div + div {
        padding: 1.5px 0 0;
        gap: 14px;
    }

    .MuiFormControl-root {
        margin-top: 0 !important;
    }

    .MuiInputLabel-root {
        color: ${ props => props.theme.palette.colors.slate500 };
        font-size: 12px;
        font-weight: 600;
        line-height: 18px;
        text-transform: uppercase;
    }

    .MuiInputBase-root {
        height: 45px;
        padding: 0 15px;
        border-radius: 8px;
        background: ${ props => props.theme.palette.colors.blue050 };
        border: 1px solid ${ props => props.theme.palette.colors.slate300 };
    }

    .MuiInputBase-input {
        padding: 0;
        color: ${ props => props.theme.palette.colors.black };
        font-size: 14px;
        line-height: 21px;
    }

    .MuiInputBase-input::placeholder {
        color: ${ props => props.theme.palette.colors.slate400 };
        opacity: 1;
    }

    .MuiInputAdornment-positionEnd {
        margin-right: -4px;
    }

    .MuiInputAdornment-positionEnd button {
        padding: 2px;
    }

    .MuiSvgIcon-root {
        color: ${ props => props.theme.palette.colors.slate400 };
        font-size: 16px;
    }
`;

export const PrimaryActionWrapper = styled.div.attrs({
})`
    width: 100%;
    margin-top: -1px;
`;

export const PinIntro = styled.div.attrs({
})`
    width: 100%;
    padding-top: 1.5px;
    color: ${ props => props.theme.palette.colors.slate500 };
    font-size: 13px;
    font-weight: 400;
    line-height: 19.5px;
    text-align: center;
`;

export const PinInputShell = styled.div.attrs({
})`
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    padding: 17.5px 49px 19.5px 21px;
    border-radius: 8px;
    border: 1px solid ${ props => props.theme.palette.colors.slate300 };
    background: ${ props => props.theme.palette.colors.white };
`;

export const PinInput = styled.input.attrs({
})`
    width: 100%;
    border: 0;
    outline: 0;
    background: transparent;
    color: ${ props => props.theme.palette.colors.slate900Alpha50 };
    font-size: 22px;
    font-weight: 700;
    line-height: 27px;
    letter-spacing: 8px;
    text-align: center;

    ::placeholder {
        color: ${ props => props.theme.palette.colors.slate900Alpha50 };
    }
`;

export const PinVisibilityButton = styled.button.attrs({
})`
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    padding: 2px;
    border: 0;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 16px;
        height: 16px;
        margin: 0;
        opacity: 0.65;
    }
`;

export const SupportBox = styled.div.attrs({
})`
    width: 100%;
    background: ${ props => props.theme.palette.colors.slate100 };
    border: 1px solid ${ props => props.theme.palette.colors.slate200 };
    border-radius: 8px;
    padding: 11px 13px;
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

export const SupportTitle = styled.div.attrs({
})`
    color: ${ props => props.theme.palette.colors.slate500 };
    font-size: 11px;
    font-weight: 600;
    line-height: 16.5px;
`;

export const SupportItem = styled.div.attrs({
})`
    font-size: 11px;
    line-height: 16.5px;
`;

export const SupportLabel = styled.span.attrs({
})`
    font-weight: 600;
    color: ${ props => (
        props.color === 'violet' ? props.theme.palette.colors.violet300 :
        props.color === 'yellow' ? props.theme.palette.colors.yellow500 :
        props.color === 'purple' ? props.theme.palette.violet.main :
        props.theme.palette.colors.blue400
    ) };
`;

export const SupportValue = styled.span.attrs({
})`
    color: ${ props => props.theme.palette.colors.slate400 };
    font-weight: 400;
`;

export const BackLink = styled.button.attrs({
})`
    border: 0;
    background: transparent;
    padding: 0;
    display: inline-flex;
    align-items: center;
    gap: 3px;

    img {
        width: 13px;
        height: 13px;
        margin: 0;
        opacity: 0.72;
    }
`;

export const BackLinkText = styled.span.attrs({
})`
    color: ${ props => props.theme.palette.colors.slate500 };
    font-size: 11px;
    line-height: 20px;
    font-weight: 400;
`;
