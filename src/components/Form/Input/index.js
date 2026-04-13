import React, { useState } from "react";
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import {
    InputRequired,
    MaterialInput,
    StyledInputLabel
} from "./styled";

import CurrencyFormat from "react-currency-format";

import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

import { ThemedComponent } from "ui/theme";
import { Icon } from "ui/styled";
import { withMask } from 'use-mask-input';


export const InputRaw = (props) => {
    const [visible, setVisible] = useState(false)

    const value = typeof props.value === 'undefined' ? '' : props.value
    const safeType = props.type === 'password' || props.password ? 'password' : props.type
    const safeDisabled = typeof props.disabled === 'boolean' ? props.disabled : !!props.readOnly
    const safeOnChange = typeof props.onChange === 'function'
        ? props.onChange
        : typeof props.onChangeText === 'function'
            ? (event) => props.onChangeText(event?.target?.value)
            : undefined

    const handleClickShowPassword = () => {
        setVisible(!visible);
    };

    const handleMouseDown = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <ThemedComponent>
                {/* standard | outlined | filled */}
                <FormControl fullWidth variant={"standard"} style={{ marginTop: (props.label || props.required) ? 16 : (props.space) ? 8 : 0 }}>
                    {(!props.label && !props.required) ? null : <StyledInputLabel htmlFor={props.id} shrink color={props.secondary ? 'secondary' : 'black'} >{props.label} {props?.required ? <InputRequired>*</InputRequired> : null} </StyledInputLabel>}
                    <MaterialInput
                        id={props.id}
                        disableUnderline
                        small={props.small}
                        dense={props.dense}
                        surface={props.surface}
                        type={safeType === 'password' ? visible ? 'text' : 'password' : safeType}
                        multiline={props.type === 'textarea' || props.multiline}
                        inputRef={props.inputRef}
                        value={value}
                        onChange={safeOnChange}
                        onBlur={props.onBlur}
                        min={props.min}
                        max={props.max}
                        placeholder={props?.placeholder}
                        onKeyDown={ev => typeof props.onSubmitEditing === 'function' ? (ev.keyCode === 13 ? props.onSubmitEditing() : null) : props.onKeyDown}
                        disabled={safeDisabled}
                        color={props.secondary ? 'secondary' : 'primary'}
                        startAdornment={props.startAdornment}

                        endAdornment={safeType === 'password' || props.icon || props.search ?
                            <InputAdornment position="end">

                                {props.icon ?
                                    <IconButton>
                                        <Icon icon={props.icon} />
                                    </IconButton>
                                    :
                                    props.search ?
                                        <IconButton>
                                            <Icon icon='search' />
                                        </IconButton>
                                        : null
                                }
                                {
                                    safeType === 'password' ?
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDown} >
                                            {visible ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                        : null
                                }
                            </InputAdornment>
                            : null
                        }
                    />
                </FormControl>
            </ThemedComponent>
        </>
    );
}

export const MaskedInput = (props) => {
    
    return (
        <InputRaw {...props} type="tel" inputRef={withMask(props?.mask, { jitMasking: true })} />
    )
}

export const CurrencyInput = ({ value, onChange, ...props }) => (
    <CurrencyFormat
        {...props}
        value={value}
        onValueChange={(values) => onChange({ target: { value: values.floatValue } })}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        customInput={Input}
    />
);

MaskedInput.propTypes = {
    type: PropTypes.oneOf(['password', 'text']),
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    secondary: PropTypes.bool,
    onSubmitEditing: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    mask: PropTypes.string.isRequired
};


MaskedInput.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    value: '',
    secondary: false,
    onSubmitEditing: undefined,
    onChange: undefined,
    onBlur: undefined,
    mask: ''
};

export default function Input({
    type,
    label,
    placeholder,
    value,
    secondary,
    disabled,
    dense,
    surface,
    onSubmitEditing,
    onChange,
    onChangeText,
    onBlur,
    ...rest
}) {
    return (
        <InputRaw
            type={type}
            label={label}
            placeholder={placeholder}
            value={value}
            secondary={secondary}
            disabled={disabled}
            dense={dense}
            surface={surface}
            onSubmitEditing={onSubmitEditing}
            onChange={onChange}
            onChangeText={onChangeText}
            onBlur={onBlur}
            {...rest}
        />
    )
};


Input.propTypes = {
    type: PropTypes.oneOf(['password', 'text']),
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    secondary: PropTypes.bool,
    disabled: PropTypes.bool,
    onSubmitEditing: PropTypes.func,
    onChange: PropTypes.func,
    onChangeText: PropTypes.func,
    onBlur: PropTypes.func,
};


Input.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    value: '',
    secondary: false,
    disabled: false,
    onSubmitEditing: undefined,
    onChange: undefined,
    onChangeText: undefined,
    onBlur: undefined,
};
