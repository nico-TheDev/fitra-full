import React from "react";
import { Svg, Path } from "react-native-svg";

const TransferIcon = ({ size = 32, color = "none" }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M20.8 16L28.8 8L20.8 0V5.998H0V9.998H20.8V16ZM32 22H11.2V16L3.2 24L11.2 32V26H32V22Z" fill={color}/>
        </Svg>
        
    );
};

export default TransferIcon;
