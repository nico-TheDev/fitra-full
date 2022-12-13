import React from "react";
import { Svg, Path, G, Defs, ClipPath, Rect } from "react-native-svg";

const GasIcon = ({ size = 32, color = "none" }) => {
    return (
        <Svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <G clip-path="url(#clip0_1216_4602)">
                <Path opacity="0.2" d="M7.875 30.375V7.875C7.875 7.27826 8.11205 6.70597 8.53401 6.28401C8.95597 5.86205 9.52826 5.625 10.125 5.625H21.375C21.9717 5.625 22.544 5.86205 22.966 6.28401C23.3879 6.70597 23.625 7.27826 23.625 7.875V30.375" fill={color} />
                <Path d="M7.875 30.375V7.875C7.875 7.27826 8.11205 6.70597 8.53401 6.28401C8.95597 5.86205 9.52826 5.625 10.125 5.625H21.375C21.9717 5.625 22.544 5.86205 22.966 6.28401C23.3879 6.70597 23.625 7.27826 23.625 7.875V30.375" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M4.5 30.375H27" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M23.625 15.75H27C27.5967 15.75 28.169 15.9871 28.591 16.409C29.0129 16.831 29.25 17.4033 29.25 18V23.625C29.25 24.2217 29.4871 24.794 29.909 25.216C30.331 25.6379 30.9033 25.875 31.5 25.875C32.0967 25.875 32.669 25.6379 33.091 25.216C33.5129 24.794 33.75 24.2217 33.75 23.625V12.1781C33.7474 11.5821 33.51 11.0111 33.0891 10.5891L30.375 7.875" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M19.125 15.75H12.375" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </G>
            <Defs>
                <ClipPath id="clip0_1216_4602">
                    <Rect width="36" height="36" fill="white" />
                </ClipPath>
            </Defs>
        </Svg>



    );
};

export default GasIcon;
