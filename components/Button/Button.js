import React from "react";
import { TouchableOpacity } from "react-native";
// Import Styled Components
import { ButtonContainer, ButtonLabel } from "./styles";
import Icon from "components/common/Icon";
import colors from "assets/themes/colors";
import PropTypes from "prop-types";

// Default Styles Of active BUttons
TouchableOpacity.defaultProps = {
    activeOpacity: 0.6,
};

const Button = ({
    onPress,
    title,
    type,
    width = "100%",
    rounded = "1px",
    textSize = 20,
    iconColor,
    iconSize,
    iconName,
    noBorder = true,
    styles,
    buttonProps,
    buttonLabelStyle,
}) => {
    // USE THE ELEMENTS
    return (
        <ButtonContainer
            onPress={onPress}
            type={type}
            width={width}
            rounded={rounded}
            noBorder={noBorder}
            style={styles}
            {...buttonProps}>
            {iconName && (
                <Icon
                    name={iconName}
                    color={type === "filled" ? colors.white : iconColor}
                    size={iconSize}
                />
            )}

            <ButtonLabel type={type} textSize={textSize} style={buttonLabelStyle}>
                {title}
            </ButtonLabel>
        </ButtonContainer>
    );
};

Button.propTypes = {
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
    textSize: PropTypes.number,
    iconName: PropTypes.string,
    iconColor: PropTypes.string,
    iconSize: PropTypes.number,
    buttonProps: PropTypes.object,
    buttonLabelStyle: PropTypes.object,
    styles: PropTypes.object,
    rounded: PropTypes.string,
    width: PropTypes.string,
};

export default Button;
