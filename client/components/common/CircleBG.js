import React from "react";
import { BgContainer } from "./styles/commonStyles";
import CircleSVG from "assets/illustrations/Circle-BG.svg";

const CircleBG = ({ circleSize }) => {
    return (
        <BgContainer size={circleSize}>
            <CircleSVG width={circleSize} height={circleSize} />
        </BgContainer>
    );
};

export default CircleBG;
