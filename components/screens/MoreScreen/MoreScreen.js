import React from "react";

// LOCAL IMPORTS
import {
    MorescreenContainer,
    MorescreenBG,
    UserContainer,
    Username,
    Email,
    UserProfile,
} from "./styles";
import CircleBigBg from "assets/illustrations/Cirle-Big-Bg.svg";
import profileImgPlaceholder from "assets/img/user-placeholder.png";
import { ICON_NAMES } from "constants/constant";
import Button from "components/Button";
import colors from "assets/themes/colors";

import useAuthStore from "hooks/useAuthStore";
import useCategoriesStore from "hooks/useCategoriesData";

const MoreScreen = ({ navigation }) => {
    const resetCategories = useCategoriesStore((state) => state.reset);
    const logoutUser = useAuthStore((state) => state.logoutUser);
    const user = useAuthStore((state) => state.user);

    const circleWidth = 1000;
    const circleHeight = 275;

    const handleEditProfile = () => navigation.navigate("EditProfile");
    const handleAbout = () => navigation.navigate("About");
    const handleLogOut = () => {
        logoutUser();
        resetCategories();
    };

    return (
        <MorescreenContainer>
            {/* BACKGROUND */}
            <MorescreenBG>
                <CircleBigBg width={circleWidth} height={circleHeight} />
            </MorescreenBG>
            {/*USER*/}
            <UserContainer>
                <UserProfile
                    source={user.profile_img ? { uri: user.profile_img } : profileImgPlaceholder}
                />
                <Username>{user.name || "No Name"}</Username>
                <Email>{user.email || "No Email"}</Email>
            </UserContainer>
            {/*SCROLLVIEW*/}
            <Button
                title="Edit Profile"
                textSize={24}
                iconName={ICON_NAMES.SYSTEM_ICONS.USERPROFILE}
                iconSize={40}
                iconColor={colors.primary.colorFive}
                styles={{
                    justifyContent: "flex-start",
                    backgroundColor: "transparent",
                }}
                buttonLabelStyle={{ marginLeft: 20 }}
                onPress={handleEditProfile}
            />
            <Button
                title="About Us"
                textSize={24}
                iconName={ICON_NAMES.SYSTEM_ICONS.MORE}
                iconSize={40}
                iconColor={colors.primary.colorFive}
                styles={{
                    justifyContent: "flex-start",
                    backgroundColor: "transparent",
                }}
                buttonLabelStyle={{ marginLeft: 20 }}
                onPress={handleAbout}
            />
            <Button
                title="Log Out"
                textSize={24}
                iconName={ICON_NAMES.SYSTEM_ICONS.LOGOUT}
                iconSize={40}
                iconColor={colors.primary.colorFive}
                styles={{
                    justifyContent: "flex-start",
                    backgroundColor: "transparent",
                }}
                buttonLabelStyle={{ marginLeft: 20 }}
                onPress={handleLogOut}
            />
        </MorescreenContainer>
    );
};

export default MoreScreen;
