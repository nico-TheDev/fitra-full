import { TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import { HeadContainer, TextContainer, UserImg } from "./styles";
import { HeadingThree } from "components/common/styles/commonStyles";
import profileImgPlaceholder from "assets/img/user-placeholder.png";
import useAuthStore from "hooks/useAuthStore";

const DashboardHead = () => {
    const navigation = useNavigation();

    const user = useAuthStore(state => state.user);
    return (
        <HeadContainer>
            <TouchableOpacity onPress={() =>
                navigation.navigate("Dashboard", {
                    screen: "More",
                })}>
                <UserImg source={user.profile_img ? { uri: user.profile_img } : profileImgPlaceholder} />
            </TouchableOpacity>
            <TextContainer>
                <HeadingThree>Good Day !</HeadingThree>
                <HeadingThree>How is your spending ?</HeadingThree>
            </TextContainer>
        </HeadContainer>
    );
};

DashboardHead.propTypes = {
    // onPress: PropTypes.func.isRequired,
    sampleImg: PropTypes.string,
};

export default DashboardHead;
