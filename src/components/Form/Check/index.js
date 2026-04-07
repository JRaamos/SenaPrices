import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import {
    MaterialCheckbox
} from './styled'


import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';

import { ThemedComponent } from "ui/theme";


export const Check = ({ checked, value, active, onChange, onPress, label, title, secondary, disabled, children }) => {

    const safeChecked = typeof checked === 'boolean' ? checked : typeof active === 'boolean' ? active : !!value
    const safeLabel = label || children

    const [ internalActive, setActive ] = useState(safeChecked)

    const action = () => {
        if (disabled) {
            return
        }

        const nv = !internalActive
        if(onChange && typeof onChange === 'function'){ onChange(nv) }
        if(onPress && typeof onPress === 'function'){ onPress(nv) }
        setActive(nv)
    }

    useEffect(() => {
        setActive(safeChecked)
    }, [safeChecked])

    return (
        <>
            <ThemedComponent>
                <FormGroup>
                    { title ? <FormLabel component="legend"
                            color={ secondary ? 'secondary' : 'primary' } >{ title }</FormLabel> : null }
                    <FormControlLabel control={<MaterialCheckbox checked={internalActive}  onChange={action} color={ secondary ? 'secondary' : 'primary' }  />} label={safeLabel}  disabled={disabled} />
                </FormGroup>
            </ThemedComponent>

        </>
    );
}

Check.propTypes = {
    label: PropTypes.node,
    title: PropTypes.string,
    checked: PropTypes.bool,
    value: PropTypes.bool,
    active: PropTypes.bool,
    secondary: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.node,
    onChange: PropTypes.func,
    onPress: PropTypes.func,
};


Check.defaultProps = {
    label: '',
    title: '',
    checked: false,
    value: undefined,
    active: undefined,
    secondary: false,
    disabled: false,
    children: undefined,
    onChange: undefined,
    onPress: undefined,
};

export default Check;
