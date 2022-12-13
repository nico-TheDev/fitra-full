import React from "react";
import { Svg, Path, Defs, ClipPath, Rect, G } from "react-native-svg";

const WashingMachineIcon = ({ size = 32, color = "none" }) => {
    return (
        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <G clip-path="url(#clip0_1216_4496)">
                <Path d="M30.6667 0H1.33333C0.533333 0 0 0.533333 0 1.33333V30.6667C0 31.4667 0.533333 32 1.33333 32H30.6667C31.4667 32 32 31.4667 32 30.6667V1.33333C32 0.533333 31.4667 0 30.6667 0ZM29.3333 29.3333H2.66667V9.33333H29.3333V29.3333ZM29.3333 8H2.66667V2.66667H29.3333V8Z" fill={color} />
                <Path d="M16 26.6666C20.4 26.6666 24 23.0666 24 18.6666C24 14.2666 20.4 10.6666 16 10.6666C11.6 10.6666 8 14.2666 8 18.6666C8 23.0666 11.6 26.6666 16 26.6666ZM16 13.3333C18.9333 13.3333 21.3333 15.7333 21.3333 18.6666C21.3333 21.6 18.9333 24 16 24C13.0667 24 10.6667 21.6 10.6667 18.6666C10.6667 15.7333 13.0667 13.3333 16 13.3333Z" fill={color} />
                <Path d="M5.33333 6.66667C6.06971 6.66667 6.66667 6.06971 6.66667 5.33333C6.66667 4.59695 6.06971 4 5.33333 4C4.59695 4 4 4.59695 4 5.33333C4 6.06971 4.59695 6.66667 5.33333 6.66667Z" fill={color} />
                <Path d="M9.33333 6.66667C10.0697 6.66667 10.6667 6.06971 10.6667 5.33333C10.6667 4.59695 10.0697 4 9.33333 4C8.59695 4 8 4.59695 8 5.33333C8 6.06971 8.59695 6.66667 9.33333 6.66667Z" fill={color} />
                <Path d="M13.3333 6.66667H26.6667C27.4667 6.66667 28 6.13333 28 5.33333C28 4.53333 27.4667 4 26.6667 4H13.3333C12.5333 4 12 4.53333 12 5.33333C12 6.13333 12.5333 6.66667 13.3333 6.66667Z" fill={color} />
            </G>
            <Defs>
                <ClipPath id="clip0_1216_4496">
                    <Rect width="32" height="32" fill="white" />
                </ClipPath>
            </Defs>
        </Svg>




    );
};

export default WashingMachineIcon;
