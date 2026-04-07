import React, { useState } from "react";
import PropTypes from 'prop-types';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import {
    InputRequired,
    MaterialSelect,
    StyledInputLabel
} from "./styled";
import { ThemedComponent } from "ui/theme";

export const Select = ({
    placeholder,
    options,
    small,
    value,
    selected,
    onChange,
    onSelect,
    id,
    secondary,
    disabled,
    required,
    multirequired,
    label,
    title,
    space,
    optionLabelKey,
    optionValueKey,
}) => {

    const [opened, setOpened] = useState(false)
    const safeLabel = title ?? label
    const safeValue = typeof value === 'undefined' ? selected : value
    const safeOptionLabelKey = optionLabelKey ?? 'title'
    const safeOptionValueKey = optionValueKey ?? 'id'

    const toggleOpen = () => {
        setOpened(!opened)
    }

    const optionAction = item => {
        const nextValue = item.target.value
        if(onChange && typeof onChange === 'function'){
            onChange(nextValue)
        }
        if(onSelect && typeof onSelect === 'function'){
            const selectedOption = options?.find(option => `${option?.[safeOptionValueKey]}` === `${nextValue}`)
            onSelect(nextValue, selectedOption)
        }
        toggleOpen()
    }

    return (
        <>
            <ThemedComponent>
                {/* <FormControl variant="outlined" fullWidth fullWidth sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}> */}
                <FormControl variant="outlined" fullWidth sx={{
                    marginTop: (safeLabel || required) ? 4 : (space) ? 2 : 0,
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' } ,
                    '& .MuiFilledInput-root': {
                        '&:before': {
                            borderBottom: 'none',
                        },
                        '&:after': {
                            borderBottom: 'none',
                        },
                        '&:hover:not(.Mui-disabled):before': {
                            borderBottom: 'none',
                        },
                    },
                    '& .last-label.MuiInputLabel-shrink': {
                        transform: "translate(6px, 1px) scale(.6)",
                    },
                    '& .last-label': {
                        transform: "translate(8px, 12px) scale(1)",
                        opacity: .75
                    },
                }}>
                    { safeLabel && <StyledInputLabel>{ safeLabel }</StyledInputLabel> }
                        <InputLabel id={id} color={ secondary ? 'secondary' : 'primary' } className="last-label">{ placeholder } { (required||multirequired) ? <InputRequired>*</InputRequired> : null } </InputLabel>
                        <MaterialSelect
                            small={small}
                            labelId={id}
                            color={ secondary ? 'secondary' : 'primary' }
                            id={`select-${id}`}
                            value={safeValue ?? ''}
                            onChange={optionAction}
                            label={placeholder}
                            disabled={disabled}
                        >
                            {
                                options?.map((item, key) =>
                                    <MenuItem key={key} value={`${ item?.[safeOptionValueKey] }`}>{ item?.[safeOptionLabelKey] }</MenuItem>
                                )
                            }
                        </MaterialSelect>
                </FormControl>
            </ThemedComponent>
        </>
    )
}


Select.propTypes = {
    placeholder: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    label: PropTypes.string,
    title: PropTypes.string,
    small: PropTypes.bool,
    secondary: PropTypes.bool,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    multirequired: PropTypes.bool,
    optionLabelKey: PropTypes.string,
    optionValueKey: PropTypes.string,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
};


Select.defaultProps = {
    placeholder: '',
    options: [],
    value: undefined,
    selected: undefined,
    label: '',
    title: '',
    small: false,
    secondary: false,
    disabled: false,
    required: false,
    multirequired: false,
    optionLabelKey: undefined,
    optionValueKey: undefined,
    onChange: undefined,
    onSelect: undefined,
};

export default Select;
