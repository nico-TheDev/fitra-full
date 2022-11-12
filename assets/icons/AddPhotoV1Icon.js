import React from "react";
import { Svg, Path } from "react-native-svg";

const AddPhotoV1Icon = ({ size = 32, color = "none" }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M24.381 28.9524H3.04762V7.61905H16.7619V4.57143H3.04762C1.37143 4.57143 0 5.94286 0 7.61905V28.9524C0 30.6286 1.37143 32 3.04762 32H24.381C26.0571 32 27.4286 30.6286 27.4286 28.9524V15.2381H24.381V28.9524ZM12.5105 24.1219L9.52381 20.5257L5.33333 25.9048H22.0952L16.701 18.7276L12.5105 24.1219ZM27.4286 4.57143V0H24.381V4.57143H19.8095C19.8248 4.58667 19.8095 7.61905 19.8095 7.61905H24.381V12.1752C24.3962 12.1905 27.4286 12.1752 27.4286 12.1752V7.61905H32V4.57143H27.4286Z" 
        fill={color}/>
        </Svg>
    );
};

export default AddPhotoV1Icon;
