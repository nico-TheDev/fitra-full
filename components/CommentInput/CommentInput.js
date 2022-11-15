import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { CustomImage, CustomInputContainer, CustomText, ImgButton, Input, InputContainer } from "./styles";
import Icon from "components/common/Icon";
import colors from "assets/themes/colors";
import { ICON_NAMES } from "constants/constant";

const CommentInput = ({ customLabel, inputProps, width = "100%", imageUri, onPress, filename }) => {
    return (
        <CustomInputContainer width={width}>
            {customLabel && <CustomText>{customLabel}</CustomText>}
            <InputContainer>
                <Input {...inputProps} multiline={true} textAlignVertical="top" />
                <ImgButton onPress={onPress}>
                    {!imageUri ? <Icon name={ICON_NAMES.ADD_PHOTO_V1} color={colors.white} size={45} /> : <CustomImage source={{ uri: imageUri.uri }} />}
                </ImgButton>
            </InputContainer>
            <Text>{filename ? filename : "No File Chosen"}</Text>
        </CustomInputContainer>
    );
};

CommentInput.propTypes = {
    customLabel: PropTypes.string,
    width: PropTypes.string,
    inputProps: PropTypes.object,
    imageUri: PropTypes.object,
    onPress: PropTypes.func,
    filename: PropTypes.string
};

export default CommentInput;
