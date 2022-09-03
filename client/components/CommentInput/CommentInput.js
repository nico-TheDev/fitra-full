import React from "react";
import {
    CustomInputContainer,
    CustomText,
    ImgButton,
    Input,
    InputContainer,
} from "./styles";
import Icon from "components/common/Icon";
import colors from "assets/themes/colors";
import { ICON_NAMES } from "constants/constant";

const CommentInput = ({ customLabel, inputProps, width = "100%" }) => {
    return (
        <CustomInputContainer width={width}>
            {customLabel && <CustomText>{customLabel}</CustomText>}
            <InputContainer>
                <Input
                    {...inputProps}
                    multiline={true}
                    textAlignVertical="top"
                />
                <ImgButton>
                    <Icon
                        name={ICON_NAMES.ADD_PHOTO_V1}
                        color={colors.white}
                        size={45}
                    />
                </ImgButton>
            </InputContainer>
        </CustomInputContainer>
    );
};

export default CommentInput;
