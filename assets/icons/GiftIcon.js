import React from "react";
import { Svg, Path, } from "react-native-svg";

const GiftIcon = ({ size = 32, color = "none" }) => {
    return (
        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M25.3333 10.6667H22.1973C22.4893 10.0573 22.6667 9.38533 22.6667 8.66667C22.6667 6.09333 20.5733 4 18 4C16.6947 4 15.5147 4.54267 14.6667 5.41067C13.8187 4.54267 12.6387 4 11.3333 4C8.75999 4 6.66666 6.09333 6.66666 8.66667C6.66666 9.38533 6.84399 10.0573 7.13599 10.6667H3.99999C3.26266 10.6667 2.66666 11.264 2.66666 12V17.3333C2.66666 18.0693 3.26266 18.6667 3.99999 18.6667V25.3333C3.99999 27.5387 5.79466 29.3333 7.99999 29.3333H21.3333C23.5387 29.3333 25.3333 27.5387 25.3333 25.3333V18.6667C26.0707 18.6667 26.6667 18.0693 26.6667 17.3333V12C26.6667 11.264 26.0707 10.6667 25.3333 10.6667ZM24 16H17.3333V13.3333H24V16ZM13.3333 9.33333H16V10.6667H13.3333V9.33333ZM16 13.3333V16H13.3333V13.3333H16ZM18 6.66667C19.1027 6.66667 20 7.564 20 8.66667C20 9.76933 19.1027 10.6667 18 10.6667C17.764 10.6667 17.5413 10.6147 17.3333 10.5373V9.33333C17.3333 8.63867 16.7947 8.084 16.116 8.024C16.3853 7.23733 17.124 6.66667 18 6.66667ZM9.33332 8.66667C9.33332 7.564 10.2307 6.66667 11.3333 6.66667C12.2093 6.66667 12.948 7.23733 13.2173 8.024C12.5387 8.084 12 8.63867 12 9.33333V10.5373C11.792 10.6147 11.5693 10.6667 11.3333 10.6667C10.2307 10.6667 9.33332 9.76933 9.33332 8.66667ZM12 13.3333V16H5.33332V13.3333H12ZM7.99999 26.6667C7.26532 26.6667 6.66666 26.068 6.66666 25.3333V17.3333H12V26.6667H7.99999ZM13.3333 26.6667V17.3333H16V26.6667H13.3333ZM21.3333 26.6667H17.3333V17.3333H22.6667V25.3333C22.6667 26.068 22.068 26.6667 21.3333 26.6667Z" fill={color} />
        </Svg>




    );
};

export default GiftIcon;
