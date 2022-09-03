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
import userProfile from "assets/img/user-1.jpg";
import { ICON_NAMES } from "constants/constant";
import Button from "components/Button";
import colors from "assets/themes/colors";
import { useAuth } from "contexts/AuthContext";

const BUTTONDATA = [
    {
        id: 1,
        title: "Settings",
        iconName: ICON_NAMES.SETTINGS,
    },
    {
        id: 2,
        title: "Logout",
        iconName: ICON_NAMES.LOGOUT,
    },
];

const MoreScreen = () => {
    const { setIsLoggedIn } = useAuth();
    const username = "Username";
    const email = "Email@gamail.com";

    const circleWidth = 1000;
    const circleHeight = 275;

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
            onPress={() => setIsLoggedIn(false)}
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
                <UserProfile source={userProfile} />
                <Username>{username}</Username>
                <Email>{email}</Email>
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
