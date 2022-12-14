import React from "react";
import { Svg, Path, G, Defs, ClipPath, Rect } from "react-native-svg";

const JewelryIcon = ({ size = 32, color = "none" }) => {
    return (
        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <G clip-path="url(#clip0_1239_4577)">
                <Path d="M26.6666 16C26.6666 12.6067 25.08 9.58667 22.6066 7.63333L21.3333 0H10.6666L9.39331 7.63333C6.91998 9.58667 5.33331 12.6067 5.33331 16C5.33331 19.3933 6.91998 22.4133 9.39331 24.3667L10.6666 32H21.3333L22.6066 24.3667C25.08 22.4133 26.6666 19.3933 26.6666 16ZM7.99998 16C7.99998 11.58 11.58 8 16 8C20.42 8 24 11.58 24 16C24 20.42 20.42 24 16 24C11.58 24 7.99998 20.42 7.99998 16Z" fill={color} />
            </G>
            <Defs>
                <ClipPath id="clip0_1239_4577">
                    <Rect width="32" height="32" fill="white" />
                </ClipPath>
            </Defs>
        </Svg>





    );
};

export default JewelryIcon;
