import React from "react";
import { Svg, Path } from "react-native-svg";

const FunMoneyIcon = ({ size = 32, color = "none" }) => {
    return (
        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M16.0003 1.25C12.5878 1.24994 9.28088 2.4331 6.64294 4.59789C4.00504 6.76269 2.19934 9.77519 1.53351 13.1221C0.867688 16.4689 1.38294 19.9432 2.99149 22.9527C4.60004 25.9623 7.20231 28.3211 10.355 29.6271C13.5077 30.9331 17.0157 31.1055 20.2812 30.115C23.5468 29.1246 26.3679 27.0324 28.2639 24.1951C30.1599 21.3578 31.0134 17.9509 30.6791 14.5548C30.3447 11.1587 28.8432 7.98369 26.4303 5.57062C25.0606 4.20086 23.4346 3.11429 21.645 2.37295C19.8554 1.63162 17.9374 1.25004 16.0003 1.25ZM7.76969 13.1031C8.08838 12.6907 8.49488 12.3544 8.95975 12.1187C9.42463 11.8831 9.93612 11.7539 10.4572 11.7406C11.04 11.7181 11.6206 11.8239 12.1579 12.0507C12.6953 12.2776 13.1762 12.6198 13.5666 13.0531C13.644 13.1399 13.7036 13.2411 13.7421 13.3509C13.7804 13.4606 13.7968 13.5769 13.7902 13.6931C13.7837 13.8092 13.7543 13.9229 13.7038 14.0277C13.6533 14.1324 13.5827 14.2262 13.4959 14.3038C13.4092 14.3813 13.308 14.4409 13.1982 14.4792C13.0884 14.5176 12.9721 14.534 12.856 14.5274C12.7399 14.5209 12.6261 14.4915 12.5214 14.441C12.4166 14.3905 12.3228 14.3199 12.2453 14.2331C12.0293 13.9951 11.7634 13.8077 11.4666 13.6844C11.1698 13.561 10.8495 13.5047 10.5284 13.5194C10.2706 13.5198 10.0161 13.5784 9.784 13.6907C9.55194 13.803 9.34813 13.9662 9.18781 14.1681C9.10525 14.278 8.99831 14.3672 8.87544 14.4287C8.75256 14.4902 8.61706 14.5223 8.47969 14.5225C8.31475 14.523 8.15294 14.4774 8.01256 14.3908C7.87213 14.3043 7.75869 14.1802 7.68506 14.0326C7.61144 13.885 7.5805 13.7198 7.59581 13.5555C7.61106 13.3913 7.67194 13.2346 7.77156 13.1031H7.76969ZM24.1778 18.6462C23.8974 20.6153 22.9159 22.4171 21.4136 23.7206C19.9114 25.0241 17.9893 25.7418 16.0003 25.7418C14.0114 25.7418 12.0892 25.0241 10.5869 23.7206C9.08469 22.4171 8.10319 20.6153 7.82281 18.6462C7.80106 18.4936 7.81519 18.3381 7.86406 18.1919C7.91306 18.0512 7.99269 17.9231 8.09719 17.8169C8.20519 17.7088 8.33356 17.6232 8.47481 17.5649C8.61606 17.5067 8.7675 17.477 8.92031 17.4775H23.0802C23.2351 17.4763 23.3885 17.5062 23.5314 17.5656C23.6744 17.6249 23.8039 17.7126 23.9122 17.8231C24.0184 17.9311 24.0982 18.0623 24.1453 18.2062C24.1907 18.3492 24.2018 18.5007 24.1778 18.6488V18.6462ZM24.2603 14.2981C24.1734 14.3754 24.0721 14.4348 23.9622 14.4729C23.8524 14.5111 23.7361 14.5272 23.62 14.5203C23.5039 14.5134 23.3903 14.4838 23.2857 14.433C23.1811 14.3822 23.0875 14.3113 23.0103 14.2244C22.7941 13.9866 22.5282 13.7994 22.2314 13.676C21.9347 13.5526 21.6144 13.4962 21.2934 13.5106C21.0346 13.5119 20.7795 13.5717 20.5471 13.6856C20.3148 13.7994 20.1112 13.9644 19.9516 14.1681C19.869 14.278 19.7621 14.3672 19.6392 14.4287C19.5163 14.4902 19.3808 14.5223 19.2434 14.5225C19.0785 14.523 18.9167 14.4774 18.7763 14.3908C18.6359 14.3043 18.5225 14.1802 18.4488 14.0326C18.3752 13.885 18.3442 13.7198 18.3596 13.5555C18.3748 13.3913 18.4357 13.2346 18.5353 13.1031C18.8536 12.6911 19.2597 12.3551 19.7239 12.1194C20.1882 11.8837 20.6992 11.7544 21.2196 11.7406C21.8024 11.7189 22.3827 11.8252 22.9199 12.052C23.4571 12.2788 23.9381 12.6205 24.329 13.0531C24.4853 13.2283 24.5658 13.4584 24.5525 13.6927C24.5392 13.9271 24.4334 14.1467 24.2584 14.3031L24.2603 14.2981Z" fill={color} />
        </Svg>

    );
};

export default FunMoneyIcon;