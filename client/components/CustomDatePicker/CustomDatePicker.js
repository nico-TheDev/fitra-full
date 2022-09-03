import React from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import Icon from "components/common/Icon";
import { ICON_NAMES } from "constants/constant";
import colors from "assets/themes/colors";
import formatDate from "fitra/util/formatDate";
import {
    CustomInputContainer,
    CustomText,
    Input,
    InputContainer,
} from "./styles";
// onChange is required for it to work
// setting the date state on the parent component
const CustomDatePicker = ({ date, width = "100%", onChange, buttonProps }) => {
    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            dateFormat: "dayofweek day month",
            onChange,
            mode: "date",
            is24Hour: false,
        });
    };

    return (
        <CustomInputContainer
            width={width}
            onPress={() => showMode("date")}
            {...buttonProps}
        >
            <CustomText>Date</CustomText>
            <InputContainer>
                <Input>{formatDate(date)}</Input>
                <Icon
                    name={ICON_NAMES.CALENDAR}
                    color={colors.primary.colorFive}
                    size={24}
                />
            </InputContainer>
        </CustomInputContainer>
    );
};

export default CustomDatePicker;
