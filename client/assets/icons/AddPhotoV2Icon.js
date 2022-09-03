import React from "react";
import { Svg, Path } from "react-native-svg";

const AddPhotoV2Icon = ({ size = 32, color = "none" }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M3.6 24.4C5.8448 24.0256 9.4192 23.9312 13.112 24.7888M24.4 32.4C21.6736 27.9712 17.3168 25.7632 13.112 24.7888M13.112 24.7888C16.232 21.176 22.0928 18 32.4 18H34M12.4 10C11.6 10 10 10.48 10 12.4C10 14.32 11.6 14.8 12.4 14.8C13.2 14.8 14.8 14.32 14.8 12.4C14.8 10.48 13.2 10 12.4 10Z" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M34 18C34 26.8368 26.8368 34 18 34C9.1632 34 2 26.8368 2 18C2 9.1632 9.1632 2 18 2M29.2 2V6.8M29.2 11.6V6.8M29.2 6.8H34M29.2 6.8H24.4" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
        
    );
};

export default AddPhotoV2Icon;
