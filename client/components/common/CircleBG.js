import React from "react";
import PropTypes from "prop-types";
import { BgContainer } from "./styles/commonStyles";
import CircleSVG from "assets/illustrations/Circle-BG.svg";

const CircleBG = ({ circleSize }) => {
    return (
        <BgContainer size={circleSize}>
            <CircleSVG width={circleSize} height={circleSize} />
        </BgContainer>
    );
};

CircleBG.propTypes = {
    circleSize: PropTypes.number.isRequired,
};

export default CircleBG;
