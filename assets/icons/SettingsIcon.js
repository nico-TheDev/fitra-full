import React from "react";
import { Svg, Path } from "react-native-svg";

const SettingsIcon = ({ size = 32, color = "none" }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M3.55556 32C2.57778 32 1.74044 31.6521 1.04356 30.9564C0.347852 30.2596 0 29.4222 0 28.4444V3.55556C0 2.57778 0.347852 1.74044 1.04356 1.04356C1.74044 0.347852 2.57778 0 3.55556 0H28.4444C29.4222 0 30.2596 0.347852 30.9564 1.04356C31.6521 1.74044 32 2.57778 32 3.55556V28.4444C32 29.4222 31.6521 30.2596 30.9564 30.9564C30.2596 31.6521 29.4222 32 28.4444 32H3.55556ZM3.55556 28.4444H28.4444V3.55556H3.55556V28.4444ZM14.2222 24.8889H17.7778L18.3111 22.2222C18.6667 22.0741 19.0003 21.9188 19.312 21.7564C19.6225 21.5929 19.9407 21.3926 20.2667 21.1556L22.8444 21.9556L24.6222 18.9333L22.5778 17.1556C22.637 16.7407 22.6667 16.3556 22.6667 16C22.6667 15.6444 22.637 15.2593 22.5778 14.8444L24.6222 13.0667L22.8444 10.0444L20.2667 10.8444C19.9407 10.6074 19.6225 10.4071 19.312 10.2436C19.0003 10.0812 18.6667 9.92593 18.3111 9.77778L17.7778 7.11111H14.2222L13.6889 9.77778C13.3333 9.92593 12.9997 10.0812 12.688 10.2436C12.3775 10.4071 12.0593 10.6074 11.7333 10.8444L9.15555 10.0444L7.37778 13.0667L9.42222 14.8444C9.36296 15.2593 9.33333 15.6444 9.33333 16C9.33333 16.3556 9.36296 16.7407 9.42222 17.1556L7.37778 18.9333L9.15555 21.9556L11.7333 21.1556C12.0593 21.3926 12.3775 21.5929 12.688 21.7564C12.9997 21.9188 13.3333 22.0741 13.6889 22.2222L14.2222 24.8889ZM16 19.5556C15.0222 19.5556 14.1855 19.2071 13.4898 18.5102C12.7929 17.8145 12.4444 16.9778 12.4444 16C12.4444 15.0222 12.7929 14.1849 13.4898 13.488C14.1855 12.7923 15.0222 12.4444 16 12.4444C16.9778 12.4444 17.8151 12.7923 18.512 13.488C19.2077 14.1849 19.5556 15.0222 19.5556 16C19.5556 16.9778 19.2077 17.8145 18.512 18.5102C17.8151 19.2071 16.9778 19.5556 16 19.5556ZM3.55556 28.4444V3.55556V28.4444Z" fill={color}/>
        </Svg>
        
    );
};

export default SettingsIcon;