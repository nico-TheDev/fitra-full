import React from "react";
import { Svg, Path } from "react-native-svg";

const DropdownIcon = ({ size = 32, color = "none" }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M0 0L16 16L32 0H0Z" fill={color}/>
        </Svg>
    );
};

export default DropdownIcon;
