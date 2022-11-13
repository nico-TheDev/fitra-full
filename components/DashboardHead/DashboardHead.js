import { TouchableOpacity } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { HeadContainer, TextContainer, UserImg } from "./styles";
import { HeadingThree } from "components/common/styles/commonStyles";
import sampleImg from "assets/img/user-1.jpg";

const DashboardHead = () => {
    const handlePress = () => {};
    return (
        <HeadContainer>
            <TouchableOpacity onPress={handlePress}>
                <UserImg source={sampleImg} />
            </TouchableOpacity>
            <TextContainer>
                <HeadingThree>Good Afternoon !</HeadingThree>
                <HeadingThree>How is your spending ?</HeadingThree>
            </TextContainer>
        </HeadContainer>
    );
};

DashboardHead.propTypes = {
    onPress: PropTypes.func.isRequired,
    sampleImg: PropTypes.string,
};

export default DashboardHead;
