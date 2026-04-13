import styledCmp from 'styled-components'

import { styled } from '@mui/material/styles';
import Input from '@mui/material/Input'; // standard (material)
import { InputLabel } from '@mui/material';
// import Input from '@mui/material/FilledInput'; 
// import Input from '@mui/material/OutlinedInput'; 


export const MaterialInput = styled(Input)(({ theme, type, small, dense, surface }) => ({
    background: surface === 'white' ? theme.palette.colors.white : theme.palette.colors.backgroundgrey,
    height: dense ? 32 : small ? 40 : 48,
    borderRadius: dense ? 7 : 4,
    border: surface === 'white' ? `1px solid ${theme.palette.colors.slate300}` : '1px solid transparent',
    ...(type === 'textarea' ? {
        minHeight: 180,
        verticalAlign: "top",
        display: "block",
        padding: 8,
        overflow:"auto"
    } : {
        padding: '0 8px'
    })
}));

export const InputIcon = styledCmp.img.attrs({
})`
`;


export const InputRequired = styledCmp.b.attrs({
})`
    font-size: 14px;
    color: ${p => p.theme.palette.colors.lightgrey};
`;

export const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
    fontSize: "1rem",
    transform: "translate(0, -8px) scale(1)",
    transformOrigin: "top left",
}));
