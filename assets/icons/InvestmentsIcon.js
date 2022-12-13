import React from "react";
import { Svg, Path } from "react-native-svg";

const InsvestmentIcon = ({ size = 32, color = "none" }) => {
    return (
        <Svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M24.4262 22.604C24.3142 22.5743 21.6594 21.9093 19.6214 23.5015C18.8811 24.0969 18.3199 24.8854 18 25.78C17.6798 24.8855 17.1186 24.0971 16.3782 23.5018C14.3397 21.91 11.686 22.5751 11.5733 22.6042C11.4764 22.6295 11.388 22.6801 11.3172 22.7509C11.2464 22.8218 11.1959 22.9102 11.1707 23.0072C11.1416 23.1189 10.4759 25.7727 12.0683 27.8118C13.0797 29.1061 14.744 29.8261 17.0154 29.9661V33.8418C17.0154 34.1028 17.1191 34.3532 17.3037 34.5378C17.4883 34.7224 17.7387 34.8261 17.9998 34.8261C18.2609 34.8261 18.5113 34.7224 18.6959 34.5378C18.8805 34.3532 18.9842 34.1028 18.9842 33.8418V29.9661C21.2559 29.8258 22.9204 29.1055 23.9314 27.8115C25.5238 25.7724 24.858 23.1187 24.8289 23.0066C24.8037 22.9097 24.7531 22.8213 24.6823 22.7506C24.6115 22.6798 24.5231 22.6292 24.4262 22.604Z" fill={color} />
            <Path d="M18.2495 0.802124C16.3314 0.802113 14.4563 1.37088 12.8615 2.43651C11.2666 3.50214 10.0236 5.01677 9.28957 6.78886C8.55554 8.56095 8.36348 10.5109 8.73767 12.3921C9.11187 14.2734 10.0355 16.0014 11.3918 17.3577C12.7481 18.714 14.4761 19.6377 16.3574 20.0119C18.2386 20.3861 20.1886 20.1941 21.9607 19.46C23.7328 18.726 25.2474 17.483 26.313 15.8881C27.3787 14.2933 27.9475 12.4183 27.9475 10.5002C27.9475 7.92811 26.9257 5.46138 25.107 3.64264C23.2883 1.8239 20.8215 0.802139 18.2495 0.802124ZM17.5417 9.85978H18.9314C19.5503 9.86523 20.142 10.1148 20.5779 10.5541C21.0139 10.9935 21.2587 11.5871 21.2593 12.206C21.2599 12.825 21.0161 13.4191 20.581 13.8592C20.1459 14.2994 19.5547 14.55 18.9358 14.5567V15.7137C18.9383 15.8149 18.9205 15.9156 18.8834 16.0099C18.8464 16.1042 18.7909 16.19 18.7201 16.2625C18.6494 16.335 18.5649 16.3926 18.4715 16.4319C18.3782 16.4713 18.2779 16.4915 18.1767 16.4915C18.0754 16.4915 17.9751 16.4713 17.8818 16.4319C17.7885 16.3926 17.7039 16.335 17.6332 16.2625C17.5625 16.19 17.5069 16.1042 17.4699 16.0099C17.4329 15.9156 17.4151 15.8149 17.4175 15.7137V14.5574H15.8333C15.6319 14.5574 15.4387 14.4774 15.2963 14.335C15.1539 14.1926 15.0739 13.9995 15.0739 13.7981C15.0739 13.5967 15.1539 13.4035 15.2963 13.2611C15.4387 13.1187 15.6319 13.0387 15.8333 13.0387H18.9314C19.041 13.0396 19.1496 13.0188 19.2511 12.9775C19.3526 12.9362 19.4449 12.8752 19.5227 12.7981C19.6005 12.7209 19.6622 12.6291 19.7043 12.528C19.7465 12.4268 19.7682 12.3184 19.7682 12.2088C19.7682 12.0992 19.7465 11.9908 19.7043 11.8896C19.6622 11.7885 19.6005 11.6967 19.5227 11.6196C19.4449 11.5424 19.3526 11.4814 19.2511 11.4401C19.1496 11.3988 19.041 11.378 18.9314 11.3789H17.5417C16.8982 11.3803 16.2798 11.1299 15.8186 10.6812C15.3574 10.2325 15.0902 9.62117 15.0739 8.97794C15.0577 8.33471 15.2939 7.71067 15.7318 7.2393C16.1698 6.76793 16.7748 6.48666 17.4175 6.45564V5.28649C17.4151 5.18524 17.4329 5.08452 17.4699 4.99026C17.5069 4.896 17.5625 4.8101 17.6332 4.73762C17.7039 4.66514 17.7885 4.60754 17.8818 4.56821C17.9751 4.52889 18.0754 4.50863 18.1767 4.50863C18.2779 4.50863 18.3782 4.52889 18.4715 4.56821C18.5649 4.60754 18.6494 4.66514 18.7201 4.73762C18.7909 4.8101 18.8464 4.896 18.8834 4.99026C18.9205 5.08452 18.9383 5.18524 18.9358 5.28649V6.44276H20.6656C20.867 6.44276 21.0602 6.52277 21.2026 6.66518C21.345 6.80759 21.425 7.00074 21.425 7.20214C21.425 7.40354 21.345 7.59669 21.2026 7.7391C21.0602 7.88151 20.867 7.96151 20.6656 7.96151H17.5417C17.4164 7.96055 17.2922 7.98438 17.1762 8.03165C17.0602 8.07891 16.9547 8.14867 16.8658 8.23689C16.7769 8.32512 16.7063 8.43007 16.6582 8.5457C16.61 8.66132 16.5852 8.78534 16.5852 8.91059C16.5852 9.03584 16.61 9.15986 16.6582 9.27548C16.7063 9.39111 16.7769 9.49606 16.8658 9.58429C16.9547 9.67251 17.0602 9.74227 17.1762 9.78953C17.2922 9.83679 17.4164 9.86063 17.5417 9.85967V9.85978Z" fill={color} />
        </Svg>




    );
};

export default InsvestmentIcon;
