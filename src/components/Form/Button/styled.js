import styledCmp from 'styled-components'
import { RingLoader } from "react-spinners";

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const Load = styledCmp(RingLoader).attrs(props => ({
    color: props.theme.palette[props.theme.palette[props?.color] ? props?.color : "primary"]?.[props.outline ? "main" : "contrastText"],
    loading: true,
    cssOverride: {},
    size: 20,
    'aria-label': "Loading Spinner"
}))`
`;

const toneStyles = (theme, color, variant) => {
    if (color === 'ghostDark' && variant === 'outlined') {
        return {
            backgroundColor: theme.palette.ghostDark.main,
            color: theme.palette.ghostDark.contrastText,
            borderColor: theme.palette.ghostDark.border,
            '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                borderColor: theme.palette.ghostDark.border,
            },
        };
    }

    if (color === 'slateSoft') {
        return {
            backgroundColor: theme.palette.slateSoft.main,
            color: theme.palette.slateSoft.contrastText,
            borderColor: theme.palette.slateSoft.border,
            '&:hover': {
                backgroundColor: 'rgba(100, 116, 139, 0.14)',
                borderColor: theme.palette.slateSoft.border,
            },
        };
    }

    if (color === 'skySoft') {
        return {
            backgroundColor: theme.palette.skySoft.main,
            color: theme.palette.skySoft.contrastText,
            borderColor: theme.palette.skySoft.border,
            '&:hover': {
                backgroundColor: 'rgba(14, 165, 233, 0.14)',
                borderColor: theme.palette.skySoft.border,
            },
        };
    }

    if (color === 'violet' && variant === 'contained') {
        return {
            background: theme.palette.violet.main,
            color: theme.palette.violet.contrastText,
            borderColor: theme.palette.violet.main,
            '&:hover': {
                background: '#7C3AED',
                borderColor: '#7C3AED',
            },
        };
    }

    return {};
};

export const ColorButton = styled(Button)(({ theme, fit, nospace, rounded, small, large, shadow, fontSize, color, variant }) => ({
    width: fit ? 'fit-content' : '100%',
    borderRadius: rounded ? '34px' : '10px',
    minHeight: large ? '50.5px' : small ? '35.5px' : '45.5px',
    marginTop: nospace ? '0px' : '12px',
    paddingLeft: large ? '32px' : '20px',
    paddingRight: large ? '32px' : '20px',
    boxShadow: shadow ? '0px 4px 24px rgba(29, 78, 216, 0.33)' : 'none',
    fontFamily: 'Inter',
    fontSize: fontSize || (small ? '13px' : large ? '15px' : '14px'),
    fontWeight: large ? 800 : 700,
    textTransform: 'none',
    lineHeight: large ? '22.5px' : '19.5px',
    ...toneStyles(theme, color, variant),
}));
