import React from "react";
import { Svg, Path } from "react-native-svg";

const ChartsIcon = ({ size = 32, color = "none" }) => {
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M0 3.55556V28.4444C0 30.4053 1.59467 32 3.55556 32H28.4444C30.4053 32 32 30.4053 32 28.4444V3.55556C32 1.59467 30.4053 0 28.4444 0H3.55556C1.59467 0 0 1.59467 0 3.55556ZM28.4462 28.4444H3.55556V3.55556H28.4444L28.4462 28.4444Z"
                fill={color}
            />
            <Path
                d="M14.2222 7.11108H17.7778V24.8889H14.2222V7.11108ZM21.3333 12.4444H24.8889V24.8889H21.3333V12.4444ZM7.11111 16H10.6667V24.8889H7.11111V16Z"
                fill={color}
            />
        </Svg>
    );
};

export default ChartsIcon;
