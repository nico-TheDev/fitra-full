import React from "react";

import {
    AboutContainer,
    HolderContainer,
    LogoContainer,
    DevPanel,
    DetailsHolder,
    NameText,
    PositionText,
    DevImg,
    Title,
} from "./styles";

import Logo from "../../../assets/img/icon.png";
import xcImg from "../../../assets/img/xc.jpg";
import nicoImg from "../../../assets/img/nico.png";
import jianImg from "../../../assets/img/jian.jpg";
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
                <LogoContainer source={Logo} />
                <Title>FiTra: Financial Tracker</Title>
            </HolderContainer>
            <HolderContainer>
                <DevPanel>
                    <DevImg source={nicoImg} />
                    <DetailsHolder>
                        <NameText>Norberto G. Ignacio Jr.</NameText>
                        <PositionText>Lead Developer</PositionText>
                    </DetailsHolder>
                </DevPanel>
                <DevPanel>
                    <DevImg source={xcImg} />
                    <DetailsHolder>
                        <NameText>Jose Alexei C. Garcia</NameText>
                        <PositionText>Developer</PositionText>
                    </DetailsHolder>
                </DevPanel>
                <DevPanel>
                    <DevImg source={jianImg} />
                    <DetailsHolder>
                        <NameText>Jian Karlo E. Parcon</NameText>
                        <PositionText>Developer</PositionText>
                    </DetailsHolder>
                </DevPanel>
            </HolderContainer>
        </AboutContainer>
    );
};

export default AboutScreen;
