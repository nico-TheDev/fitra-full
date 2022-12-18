import React from "react";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";

import Icon from "components/common/Icon";
import { ICON_NAMES } from "constants/constant";
import colors from "assets/themes/colors";

import { BackBtn, RightIcon, ScreenHeaderContainer, ScreenTitle } from "./styles";

const ScreenHeader = ({ title, onPressIcon, iconName, iconSize }) => {
    const navigation = useNavigation();

    return (
        <ScreenHeaderContainer>
            <BackBtn onPress={() => navigation.goBack()}>
                <Icon name={ICON_NAMES.SYSTEM_ICONS.BACK} color={colors.primary.colorFive} />
            </BackBtn>
            <ScreenTitle>{title}</ScreenTitle>
            {iconName && (
                <RightIcon onPress={onPressIcon}>
                    <Icon name={iconName} color={colors.primary.colorFive} size={iconSize} />
                </RightIcon>
            )}
        </ScreenHeaderContainer>
    );
};

ScreenHeader.propTypes = {
    title: PropTypes.string.isRequired,
    onPressIcon: PropTypes.func,
    iconName: PropTypes.string,
    iconSize: PropTypes.number,
};

export default ScreenHeader;
