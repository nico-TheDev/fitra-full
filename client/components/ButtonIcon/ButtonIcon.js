import React, { memo } from "react";
import PropTypes from "prop-types";
import { ButtonContainer, ButtonLabel, ButtonIconContainer } from "./styles";

import Icon from "components/common/Icon";
import colors from "assets/themes/colors";

const ButtonIcon = ({ onPress, label, name, type, iconColor = colors.primary.colorFive, iconSize = 30, styles }) => {
    return (
        <ButtonContainer style={styles}>
            <ButtonIconContainer onPress={onPress} type={type} color={iconColor}>
                <Icon
                    name={name}
                    color={type === "filled" ? colors.white : iconColor}
                    size={iconSize}
                />
            </ButtonIconContainer>
            {label && (
                <ButtonLabel type={type} color={iconColor}>
                    {label.substring(0, 8)}
                </ButtonLabel>
            )}
        </ButtonContainer>
    );
};

ButtonIcon.propTypes = {
    onPress: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    iconColor: PropTypes.string,
    iconSize: PropTypes.number,
    styles: PropTypes.object,
};

export default memo(ButtonIcon);
