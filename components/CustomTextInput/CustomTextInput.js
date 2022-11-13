import React from "react";
import PropTypes from "prop-types";
import Icon from "components/common/Icon";
import colors from "assets/themes/colors";
import {
    CustomInputContainer,
    CustomText,
    Input,
    InputContainer,
} from "./styles";

const CustomTextInput = ({
    customLabel,
    iconName,
    inputProps,
    width = "100%",
}) => {
    return (
        <CustomInputContainer width={width}>
            {customLabel && <CustomText>{customLabel}</CustomText>}
            <InputContainer iconName={iconName}>
                <Input {...inputProps} />
                {iconName && (
                    <Icon
                        name={iconName}
                        color={colors.primary.colorFive}
                        size={24}
                    />
                )}
            </InputContainer>
        </CustomInputContainer>
    );
};

export default CustomTextInput;
