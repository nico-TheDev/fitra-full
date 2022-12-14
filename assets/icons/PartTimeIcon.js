import React from "react";
import { Svg, Path, G, Defs, ClipPath, Rect } from "react-native-svg";

const PartTimeIcon = ({ size = 33, color = "none" }) => {
    return (
        <Svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/Svg">
            <G clip-path="url(#clip0_1216_4503)">
                <Path d="M16 31C13.0333 31 10.1332 30.1203 7.66645 28.4721C5.19972 26.8238 3.27713 24.4812 2.14181 21.7403C1.0065 18.9994 0.709449 15.9834 1.28823 13.0737C1.86701 10.1639 3.29562 7.49119 5.3934 5.3934C7.49119 3.29562 10.1639 1.86701 13.0737 1.28823C15.9834 0.709449 18.9994 1.0065 21.7403 2.14181C24.4812 3.27713 26.8238 5.19972 28.4721 7.66645C30.1203 10.1332 31 13.0333 31 16" stroke={color} strokeWidth="3" stroke-linejoin="round" />
                <Path d="M16 5V16L9 23" stroke={color} strokeWidth="3" stroke-linejoin="round" />
                <Path d="M25 19V29" stroke={color} strokeWidth="3" stroke-linejoin="round" />
                <Path d="M30 24H20" stroke={color} strokeWidth="3" stroke-linejoin="round" />
            </G>
            <Defs>
                <ClipPath id="clip0_1216_4503">
                    <Rect width="33" height="33" fill="white" />
                </ClipPath>
            </Defs>
        </Svg>







    );
};

export default PartTimeIcon;
