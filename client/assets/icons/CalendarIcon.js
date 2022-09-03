import React from "react";
import { Svg, Path } from "react-native-svg";

const CalendarIcon = ({ size = 32, color = "none" }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M30.72 2.88H24V0.32C24 0.144 23.856 0 23.68 0H21.44C21.264 0 21.12 0.144 21.12 0.32V2.88H10.88V0.32C10.88 0.144 10.736 0 10.56 0H8.32C8.144 0 8 0.144 8 0.32V2.88H1.28C0.572 2.88 0 3.452 0 4.16V30.72C0 31.428 0.572 32 1.28 32H30.72C31.428 32 32 31.428 32 30.72V4.16C32 3.452 31.428 2.88 30.72 2.88ZM29.12 29.12H2.88V13.92H29.12V29.12ZM2.88 11.2V5.76H8V7.68C8 7.856 8.144 8 8.32 8H10.56C10.736 8 10.88 7.856 10.88 7.68V5.76H21.12V7.68C21.12 7.856 21.264 8 21.44 8H23.68C23.856 8 24 7.856 24 7.68V5.76H29.12V11.2H2.88Z" fill={color}/>
        </Svg>
    );
};

export default CalendarIcon;
