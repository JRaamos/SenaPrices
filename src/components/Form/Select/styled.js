import styledCmp from 'styled-components' 

import { styled } from '@mui/material/styles'; 
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';

export const MaterialSelect = styled(Select)(({ theme, ...props }) => ({  
    background: props.surface === 'white' ? theme.palette.colors.white : theme.palette.colors.backgroundgrey,
    height: props.dense ? 34 : props.small ? 40 : 48,
    borderRadius: props.dense ? 7 : 4,
    border: props.surface === 'white' ? `1px solid ${theme.palette.colors.slate300}` : '1px solid transparent',
}));

export const InputRequired = styledCmp.b.attrs({ 
})`
    font-size: 14px;
    color: ${ p => p.theme.palette.colors.lightgrey };
`;

export const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
    fontSize: "1rem",
    transform: "translate(0, -24px) scale(1)",
    transformOrigin: "top left"
}));
