import React from "react";
import { Svg, Path } from "react-native-svg";

const MoreIcon = ({ size = 32, color = "none" }) => {
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 34 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M2 2H32"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M2 15H32"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M2 28H32"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default MoreIcon;
