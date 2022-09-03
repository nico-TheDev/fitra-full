import React from 'react'
import { Svg, Path } from "react-native-svg";

const FitnessIcon = ({size = 32 , color = "none"}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M34 19.7778C31.9343 18.8818 28.1053 15.3333 21.3684 20.6667C19.5975 19.6213 16.3158 17.1111 11.2632 21.5556C10.6728 19.0169 10.5549 13.2391 11.2632 8.22222C11.5579 7.47556 12.7739 6.94667 16.3158 10.8889L20.5263 6.44444C20.2316 4.50311 18 2 11.2632 2C8.73684 2 6.43116 4.28 5.36842 8.22222C4.04042 12.2533 2 21.5556 2 26.8889C2 28.5316 4.10526 32.2222 12.1053 32.2222C13.7895 32.2222 18.7158 32.4222 24.7368 29.5556L29.7895 34" stroke={color} strokeWidth="4" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  )
}

export default FitnessIcon
