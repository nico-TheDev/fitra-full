import React from "react";
import { Svg, Path, G } from "react-native-svg";
const CalculatorIcon = ({ size = 32, color = "none" }) => {
    return (
        <Svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            style="enable-background:new 0 0 512 512;"
        >
            <G>
                <G>
                    <G>
                        <Path
                            d="M488.727,0H23.273C10.42,0,0,10.42,0,23.273v465.455C0,501.58,10.42,512,23.273,512h465.455
               C501.58,512,512,501.58,512,488.727V23.273C512,10.42,501.58,0,488.727,0z M465.455,232.727H279.273V46.545h186.182V232.727z
                M232.727,46.545v186.182H46.545V46.545H232.727z M46.545,279.273h186.182v186.182H46.545V279.273z M279.273,465.455V279.273
               h186.182v186.182H279.273z"
                            stroke="none"
                            fill={color}
                        />
                        <Path
                            d="M93.091,162.909h23.273v23.273c0,12.853,10.42,23.273,23.273,23.273c12.853,0,23.273-10.419,23.273-23.273v-23.273
               h23.273c12.853,0,23.273-10.42,23.273-23.273c0-12.853-10.419-23.273-23.273-23.273h-23.273V93.091
               c0-12.853-10.42-23.273-23.273-23.273c-12.853,0-23.273,10.42-23.273,23.273v23.273H93.091c-12.853,0-23.273,10.42-23.273,23.273
               C69.818,152.49,80.238,162.909,93.091,162.909z"
                            stroke="none"
                            fill={color}
                        />
                        <Path
                            d="M172.549,372.364l16.447-16.447c9.089-9.089,9.089-23.824,0-32.913c-9.089-9.089-23.824-9.089-32.913,0l-16.447,16.447
               l-16.456-16.456c-9.089-9.089-23.824-9.089-32.913,0s-9.089,23.824,0,32.913l16.456,16.456L90.268,388.82
               c-9.089,9.089-9.089,23.824,0,32.913s23.824,9.089,32.913,0l16.456-16.456l16.447,16.447c9.089,9.089,23.824,9.089,32.913,0
               c9.089-9.089,9.089-23.824,0-32.913L172.549,372.364z"
                            stroke="none"
                            fill={color}
                        />
                        <Path
                            d="M325.818,162.909h93.091c12.853,0,23.273-10.42,23.273-23.273c0-12.853-10.42-23.273-23.273-23.273h-93.091
               c-12.853,0-23.273,10.42-23.273,23.273C302.545,152.49,312.965,162.909,325.818,162.909z"
                            stroke="none"
                            fill={color}
                        />
                        <Path
                            d="M418.909,372.364h-93.091c-12.853,0-23.273,10.42-23.273,23.273c0,12.853,10.42,23.273,23.273,23.273h93.091
               c12.853,0,23.273-10.42,23.273-23.273C442.182,382.783,431.762,372.364,418.909,372.364z"
                            stroke="none"
                            fill={color}
                        />
                        <Path
                            d="M418.909,302.545h-93.091c-12.853,0-23.273,10.42-23.273,23.273s10.42,23.273,23.273,23.273h93.091
               c12.853,0,23.273-10.42,23.273-23.273S431.762,302.545,418.909,302.545z"
                            stroke="none"
                            fill={color}
                        />
                    </G>
                </G>
            </G>
            <G></G>
            <G></G>
            <G></G>
            <G></G>
            <G></G>
            <G></G>
            <G></G>
            <G></G>
            <G></G>
            <G></G>
            <G></G>
            <G></G>
            <G></G>
            <G></G>
            <G></G>
        </Svg>
    );
};

export default CalculatorIcon;
