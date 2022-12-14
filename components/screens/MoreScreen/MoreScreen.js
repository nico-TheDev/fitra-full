import React from "react";

// LOCAL IMPORTS
import {
    MorescreenContainer,
    MorescreenBG,
    UserContainer,
    Username,
    Email,
    UserProfile,
    MoreButtonList,
} from "./styles";
import CircleBigBg from "assets/illustrations/Cirle-Big-Bg.svg";
import profileImgPlaceholder from "assets/img/user-placeholder.png";
import { ICON_NAMES } from "constants/constant";
import Button from "components/Button";
import colors from "assets/themes/colors";

import useAuthStore from 'hooks/useAuthStore';
import useCategoriesStore from "hooks/useCategoriesData";

const BUTTONDATA = [
    {
        id: 1,
        title: "Settings",
        iconName: ICON_NAMES.SYSTEM_ICONS.SETTINGS,
    },
    {
        id: 2,
        title: "Logout",
        iconName: ICON_NAMES.SYSTEM_ICONS.LOGOUT,
    },
];

const MoreScreen = ({ navigation }) => {
    const resetCategories = useCategoriesStore(state => state.reset);
    const logoutUser = useAuthStore(state => state.logoutUser);
    const user = useAuthStore(state => state.user);

    const circleWidth = 1000;
    const circleHeight = 275;

    const handleLogOut = () => {
        logoutUser();
        resetCategories();
    };

    const renderItem = ({ item }) => (
        <Button
            title={item.title}
            textSize={24}
            iconName={item.iconName}
            iconSize={40}
            iconColor={colors.primary.colorFive}
            styles={{
                justifyContent: "flex-start",
                backgroundColor: "transparent",
            }}
            buttonLabelStyle={{ marginLeft: 20 }}
            onPress={handleLogOut}
        />
    );

    return (
        <MorescreenContainer>
            {/* BACKGROUND */}
            <MorescreenBG>
                <CircleBigBg width={circleWidth} height={circleHeight} />
            </MorescreenBG>
            {/*USER*/}
            <UserContainer>
                <UserProfile source={user.profile_img ? { uri: user.profile_img } : profileImgPlaceholder} />
                <Username>{user.name || "No Name"}</Username>
                <Email>{user.email || "No Email"}</Email>
            </UserContainer>
            {/*SCROLLVIEW*/}
            <MoreButtonList
                data={BUTTONDATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </MorescreenContainer>
    );
};

export default MoreScreen;
