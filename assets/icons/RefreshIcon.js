import React from "react";
import { Svg, Path } from "react-native-svg";

const RefreshIcon = ({ size = 32, color = "none" }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M16 0C11.2437 0 6.98125 2.0875 4.05625 5.3875L0 1.33125V12H10.6687L6.90625 8.2375C9.1 5.65625 12.3438 4 16 4C22.625 4 28 9.36875 28 16C28 22.6313 22.625 28 16 28C12.6875 28 9.6875 26.6562 7.5125 24.4875L4.6875 27.3125C7.5875 30.2062 11.5875 32 16 32C24.8375 32 32 24.8375 32 16C32 7.1625 24.8375 0 16 0ZM14.6687 6.66875V17.3375H22.6688V14.6687H17.3375V6.66875H14.6687Z" fill={color}/>
        </Svg>
        
    );
};

export default RefreshIcon;
