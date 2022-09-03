import React from "react";
import { useNavigation } from "@react-navigation/native";

import Icon from "components/common/Icon";
import { ICON_NAMES } from "constants/constant";
import colors from "assets/themes/colors";

import {
    BackBtn,
    RightIcon,
    ScreenHeaderContainer,
    ScreenTitle,
} from "./styles";

/*
    title = required to display title text of the screen | string
    onPressIcon = function to fire when the right icon is clicked | function
    iconName = place an iconName prop to show another icon in the right side of the screen header | string
    iconSize = optional but you can resize the icon in the screen header | number
*/
const ScreenHeader = ({ title, onPressIcon, iconName, iconSize }) => {
    const navigation = useNavigation();

    return (
        <ScreenHeaderContainer>
            <BackBtn onPress={() => navigation.goBack()}>
                <Icon name={ICON_NAMES.BACK} color={colors.primary.colorFive} />
            </BackBtn>
            <ScreenTitle>{title}</ScreenTitle>
            {iconName && (
                <RightIcon onPress={onPressIcon}>
                    <Icon
                        name={iconName}
                        color={colors.primary.colorFive}
                        size={iconSize}
                    />
                </RightIcon>
            )}
        </ScreenHeaderContainer>
    );
};

export default ScreenHeader;
