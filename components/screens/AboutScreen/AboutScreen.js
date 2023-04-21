import { View, Text } from 'react-native'
import React from 'react'

import {
    AboutContainer,
    HolderContainer,
    LogoContainer,
    DevPanel,
    DetailsHolder,
    NameText, 
    PositionText,
    DevImg
} from "./styles";

import Logo from '../../../assets/img/icon.png';
import xcImg from '../../../assets/img/xc.jpg';
import nicoImg from '../../../assets/img/nico.png';
import ScreenHeader from "components/ScreenHeader";

const AboutScreen = () => {
    return (
        <AboutContainer>
            <ScreenHeader 
                title="About"
                onPressIcon={() =>
                    navigation.navigate("Dashboard", {
                        screen: "DashboardMain",
                    })
                }
            />
            <HolderContainer>
                <LogoContainer source={Logo}/>
            </HolderContainer>
            <HolderContainer>
                <DevPanel>
                    <DevImg source={xcImg}/>
                    <DetailsHolder>
                        <NameText>Jose Alexei C. Garcia</NameText>
                        <PositionText>Backend Developer</PositionText>
                    </DetailsHolder>
                </DevPanel>
            </HolderContainer>
        </AboutContainer>
    )
}

export default AboutScreen