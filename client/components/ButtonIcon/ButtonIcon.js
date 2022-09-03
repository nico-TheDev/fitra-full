import React from "react";

import { ButtonContainer, ButtonLabel, ButtonIconContainer } from "./styles";

import Icon from "components/common/Icon";
import colors from "assets/themes/colors";

const ButtonIcon = ({
    onPress,
    label,
    name,
    type,
    iconColor,
    iconSize,
    styles,
}) => {
    return (
        <ButtonContainer style={styles}>
            <ButtonIconContainer
                onPress={onPress}
                type={type}
                color={iconColor}
            >
                <Icon
                    name={name}
                    color={type === "filled" ? colors.white : iconColor}
                    size={iconSize}
                />
            </ButtonIconContainer>
            <ButtonLabel type={type} color={iconColor}>
                {label.substring(0, 8)}
            </ButtonLabel>
        </ButtonContainer>
    );
};

export default ButtonIcon;
