import React from "react";
import { Svg, Path } from "react-native-svg";

const BackIcon = ({ size = 32, color = "none" }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M2 16.3696L13.1764 2V9.98312C32.2608 9.98312 34.4626 25.4352 33.9325 33.9325C33.131 29.6455 32.759 22.7561 13.1764 22.7561V30.7392L2 16.3696Z" stroke={color} strokeWidth="3" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    );
};

export default BackIcon;
