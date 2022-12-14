import React from "react";
import { Svg, Path } from "react-native-svg";

const CarRepairIcon = ({ size = 32, color = "none" }) => {
    return (
        <Svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M10.5 34.5C9.60999 34.5 8.73996 34.2361 7.99994 33.7416C7.25991 33.2472 6.68314 32.5443 6.34254 31.7221C6.00195 30.8998 5.91283 29.995 6.08647 29.1221C6.2601 28.2492 6.68868 27.4474 7.31802 26.818C7.94736 26.1887 8.74918 25.7601 9.6221 25.5865C10.495 25.4128 11.3998 25.5019 12.2221 25.8425C13.0443 26.1831 13.7471 26.7599 14.2416 27.4999C14.7361 28.24 15 29.11 15 30C15 31.1935 14.5259 32.3381 13.682 33.182C12.8381 34.0259 11.6935 34.5 10.5 34.5ZM10.5 28.5C10.2033 28.5 9.91332 28.588 9.66665 28.7528C9.41997 28.9176 9.22771 29.1519 9.11418 29.426C9.00065 29.7001 8.97095 30.0017 9.02882 30.2926C9.0867 30.5836 9.22956 30.8509 9.43934 31.0607C9.64912 31.2704 9.91639 31.4133 10.2074 31.4712C10.4983 31.5291 10.7999 31.4994 11.074 31.3858C11.3481 31.2723 11.5824 31.08 11.7472 30.8334C11.912 30.5867 12 30.2967 12 30C12 29.6022 11.842 29.2206 11.5607 28.9393C11.2794 28.658 10.8978 28.5 10.5 28.5Z" fill={color} />
            <Path d="M27 34.5C26.11 34.5 25.24 34.2361 24.4999 33.7416C23.7599 33.2472 23.1831 32.5443 22.8425 31.7221C22.5019 30.8998 22.4128 29.995 22.5865 29.1221C22.7601 28.2492 23.1887 27.4474 23.818 26.818C24.4474 26.1887 25.2492 25.7601 26.1221 25.5865C26.995 25.4128 27.8998 25.5019 28.7221 25.8425C29.5443 26.1831 30.2472 26.7599 30.7416 27.4999C31.2361 28.24 31.5 29.11 31.5 30C31.5 31.1935 31.0259 32.3381 30.182 33.182C29.3381 34.0259 28.1935 34.5 27 34.5ZM27 28.5C26.7033 28.5 26.4133 28.588 26.1666 28.7528C25.92 28.9176 25.7277 29.1519 25.6142 29.426C25.5007 29.7001 25.4709 30.0017 25.5288 30.2926C25.5867 30.5836 25.7296 30.8509 25.9393 31.0607C26.1491 31.2704 26.4164 31.4133 26.7074 31.4712C26.9983 31.5291 27.2999 31.4994 27.574 31.3858C27.8481 31.2723 28.0824 31.08 28.2472 30.8334C28.412 30.5867 28.5 30.2967 28.5 30C28.5 29.6022 28.342 29.2206 28.0607 28.9393C27.7794 28.658 27.3978 28.5 27 28.5Z" fill={color} />
            <Path d="M7.5 31.5H4.5C3.70435 31.5 2.94129 31.1839 2.37868 30.6213C1.81607 30.0587 1.5 29.2957 1.5 28.5V24C1.5 22.8065 1.97411 21.6619 2.81802 20.818C3.66193 19.9741 4.80653 19.5 6 19.5H6.57L8.325 15.99C8.69916 15.2405 9.27509 14.6104 9.98795 14.1705C10.7008 13.7306 11.5223 13.4984 12.36 13.5H18.255C19.4481 13.5011 20.5919 13.9759 21.435 14.82L26.115 19.5H29.22C30.6191 19.504 31.9598 20.0615 32.9492 21.0509C33.9385 22.0402 34.496 23.3809 34.5 24.78V25.5C34.5 25.8978 34.342 26.2794 34.0607 26.5607C33.7794 26.842 33.3978 27 33 27C32.6022 27 32.2206 26.842 31.9393 26.5607C31.658 26.2794 31.5 25.8978 31.5 25.5V24.78C31.5 24.1753 31.2598 23.5954 30.8322 23.1678C30.4046 22.7402 29.8247 22.5 29.22 22.5H25.5C25.3026 22.5011 25.1069 22.4633 24.9241 22.3887C24.7414 22.314 24.5752 22.204 24.435 22.065L19.32 16.935C19.1798 16.796 19.0136 16.686 18.8309 16.6114C18.6481 16.5367 18.4524 16.4989 18.255 16.5H12.36C12.0805 16.4981 11.8059 16.5743 11.5674 16.72C11.3288 16.8658 11.1358 17.0754 11.01 17.325L8.835 21.675C8.71035 21.9224 8.51964 22.1304 8.284 22.276C8.04836 22.4216 7.777 22.4992 7.5 22.5H6C5.60218 22.5 5.22064 22.658 4.93934 22.9393C4.65804 23.2207 4.5 23.6022 4.5 24V28.5H7.5C7.89782 28.5 8.27936 28.658 8.56066 28.9393C8.84196 29.2207 9 29.6022 9 30C9 30.3978 8.84196 30.7794 8.56066 31.0607C8.27936 31.342 7.89782 31.5 7.5 31.5Z" fill={color} />
            <Path d="M25.5 21H19.5C18.7044 21 17.9413 20.6839 17.3787 20.1213C16.8161 19.5587 16.5 18.7956 16.5 18V15H19.5L25.5 21Z" fill={color} />
            <Path d="M24 31.5H13.5C13.1022 31.5 12.7206 31.342 12.4393 31.0607C12.158 30.7794 12 30.3978 12 30C12 29.6022 12.158 29.2206 12.4393 28.9393C12.7206 28.658 13.1022 28.5 13.5 28.5H24C24.3978 28.5 24.7794 28.658 25.0607 28.9393C25.342 29.2206 25.5 29.6022 25.5 30C25.5 30.3978 25.342 30.7794 25.0607 31.0607C24.7794 31.342 24.3978 31.5 24 31.5Z" fill={color} />
            <Path d="M19.5 21H15C14.6022 21 14.2206 20.842 13.9393 20.5607C13.658 20.2794 13.5 19.8978 13.5 19.5C13.5 19.1022 13.658 18.7206 13.9393 18.4393C14.2206 18.158 14.6022 18 15 18H19.5C19.8978 18 20.2794 18.158 20.5607 18.4393C20.842 18.7206 21 19.1022 21 19.5C21 19.8978 20.842 20.2794 20.5607 20.5607C20.2794 20.842 19.8978 21 19.5 21Z" fill={color} />
            <Path d="M21.42 9H13.5C12.9033 9 12.331 8.76295 11.909 8.34099C11.4871 7.91903 11.25 7.34674 11.25 6.75C11.25 6.15326 11.4871 5.58097 11.909 5.15901C12.331 4.73705 12.9033 4.5 13.5 4.5H21.42C22.0167 4.5 22.589 4.73705 23.011 5.15901C23.4329 5.58097 23.67 6.15326 23.67 6.75C23.67 7.34674 23.4329 7.91903 23.011 8.34099C22.589 8.76295 22.0167 9 21.42 9Z" fill={color} />
            <Path d="M26.25 12C24.8576 12 23.5222 11.4469 22.5377 10.4623C21.5531 9.47775 21 8.14239 21 6.75001C20.9867 6.05642 21.1126 5.36721 21.3702 4.72311C21.6279 4.07901 22.012 3.4931 22.5 3.00001C23.503 2.02148 24.8487 1.47375 26.25 1.47375C27.6512 1.47375 28.997 2.02148 30 3.00001C30.2804 3.28246 30.4372 3.66476 30.4358 4.06281C30.4344 4.46086 30.2749 4.84204 29.9925 5.12251C29.71 5.40297 29.3277 5.55975 28.9297 5.55834C28.5316 5.55693 28.1504 5.39746 27.87 5.11501C27.4425 4.70433 26.8727 4.47498 26.28 4.47498C25.6872 4.47498 25.1174 4.70433 24.69 5.11501C24.2686 5.53688 24.032 6.10875 24.032 6.70501C24.032 7.30126 24.2686 7.87313 24.69 8.29501C25.1174 8.70568 25.6872 8.93504 26.28 8.93504C26.8727 8.93504 27.4425 8.70568 27.87 8.29501C28.1624 8.01255 28.555 7.85782 28.9615 7.86485C29.368 7.87189 29.755 8.04011 30.0375 8.33251C30.3199 8.62491 30.4747 9.01754 30.4676 9.42402C30.4606 9.83051 30.2924 10.2176 30 10.5C29.5069 10.988 28.921 11.3721 28.2769 11.6298C27.6328 11.8874 26.9436 12.0133 26.25 12V12Z" fill={color} />
            <Path d="M8.65499 12C7.96665 12.0076 7.2836 11.879 6.64516 11.6216C6.00673 11.3641 5.42552 10.983 4.93499 10.5C4.65561 10.219 4.4988 9.83877 4.4988 9.4425C4.4988 9.04622 4.65561 8.66604 4.93499 8.385C5.07443 8.2444 5.24033 8.13281 5.42312 8.05666C5.60591 7.98051 5.80197 7.9413 5.99999 7.9413C6.198 7.9413 6.39406 7.98051 6.57685 8.05666C6.75964 8.13281 6.92554 8.2444 7.06499 8.385C7.27287 8.59543 7.52045 8.76251 7.79339 8.87654C8.06633 8.99057 8.35919 9.04929 8.65499 9.04929C8.95079 9.04929 9.24364 8.99057 9.51658 8.87654C9.78952 8.76251 10.0371 8.59543 10.245 8.385C10.6627 7.9612 10.8969 7.39005 10.8969 6.795C10.8969 6.19994 10.6627 5.62879 10.245 5.205C10.0371 4.99456 9.78952 4.82748 9.51658 4.71345C9.24364 4.59942 8.95079 4.5407 8.65499 4.5407C8.35919 4.5407 8.06633 4.59942 7.79339 4.71345C7.52045 4.82748 7.27287 4.99456 7.06499 5.205C6.92554 5.34559 6.75964 5.45718 6.57685 5.53333C6.39406 5.60949 6.198 5.64869 5.99999 5.64869C5.80197 5.64869 5.60591 5.60949 5.42312 5.53333C5.24033 5.45718 5.07443 5.34559 4.93499 5.205C4.78273 5.06453 4.66122 4.89405 4.57811 4.7043C4.49499 4.51456 4.45209 4.30965 4.45209 4.1025C4.45209 3.89534 4.49499 3.69044 4.57811 3.50069C4.66122 3.31094 4.78273 3.14046 4.93499 3C5.42744 2.51246 6.01111 2.1267 6.65265 1.86474C7.29419 1.60277 7.98105 1.46973 8.674 1.47321C9.36696 1.47669 10.0524 1.61663 10.6913 1.88503C11.3302 2.15343 11.91 2.54504 12.3975 3.0375C12.885 3.52995 13.2708 4.11361 13.5327 4.75516C13.7947 5.3967 13.9278 6.08356 13.9243 6.77651C13.9208 7.46947 13.7809 8.15496 13.5125 8.79383C13.2441 9.43271 12.8524 10.0125 12.36 10.5C11.8722 10.9825 11.2936 11.3635 10.6577 11.621C10.0217 11.8785 9.34104 12.0073 8.65499 12V12Z" fill={color} />
        </Svg>




    );
};

export default CarRepairIcon;