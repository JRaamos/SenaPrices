import React from "react";
import PropTypes from 'prop-types';

import { ColorButton, Load } from "./styled";
import { ThemedComponent } from "ui/theme";
import { theme } from "ui/theme-color";
import { Icon } from 'ui/styled';

export const Button = ({
  className,
  children,
  title,
  label,
  text,
  loading,
  color = 'white',
  outline,
  link,
  nospace,
  centred,
  onClick,
  onPress,
  rounded,
  fit,
  leftIcon,
  rightIcon,
  icon,
  small,
  disabled,
}) => {
    const safeColor = theme.palette?.[color] ? color : "primary"
    const safeOnClick = typeof onClick === 'function' ? onClick : onPress
    const safeLeftIcon = leftIcon ?? icon
    const safeChildren = children ?? title ?? label ?? text
    return (
        <>
          <ThemedComponent>
              <ColorButton className={className} variant={ link ? "text" : outline ? "outlined" : "contained" } color={ safeColor } nospace={nospace} centred={centred} rounded={rounded} fit={fit} small={small} onClick={safeOnClick} disabled={disabled}>
                { safeLeftIcon && <Icon icon={safeLeftIcon} /> }
                {
                  loading ? <Load color={ safeColor } outline={outline} /> : <>
                    { safeChildren }
                  </>
                }
                { rightIcon && <Icon icon={rightIcon} /> }
              </ColorButton>
          </ThemedComponent>
        </>
    );
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.node,
  label: PropTypes.node,
  text: PropTypes.node,
  color: PropTypes.string,
  outline: PropTypes.bool,
  link: PropTypes.bool,
  nospace: PropTypes.bool,
  centred: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  rounded: PropTypes.bool,
  fit: PropTypes.bool,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  icon: PropTypes.string,
  small: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  className: undefined,
  children: undefined,
  title: undefined,
  label: undefined,
  text: undefined,
  color: 'primary',
  outline: false,
  link: false,
  nospace: false,
  centred: false,
  loading: false,
  onClick: undefined,
  onPress: undefined,
  rounded: false,
  fit: false,
  leftIcon: null,
  rightIcon: null,
  icon: null,
  small: false,
  disabled: false,
};

export default Button;
