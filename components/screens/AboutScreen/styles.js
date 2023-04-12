import styled from "styled-components/native";

import { Container } from "components/common/styles/commonStyles";
import { FONTS } from "constants/constant";

export const AboutContainer = styled(Container)`
    position: relative;
    flex: 1;
    justify-content: flex-start;
    padding-bottom: 20px;
`;

export const HolderContainer = styled.View`
    width: 90%;
`;

export const LogoContainer = styled.Image`
    width: 90%;
`;

export const DevPanel = styled.TouchableOpacity`
    elevation: 10;
    width: 100%;
    height: 250px;
    background-color: ${colors.white};
    border-radius: 10px;
    padding: 10px;
    height: 180px;
    padding-left: 20px;
    padding-top: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

export const DetailsHolder = styled.View`
    align-items: center;
`;

export const NameText = styled.Text`
    font-family: ${FONTS.BLACK};
    font-size: 16px;
    width:50%;
`;

export const PositionText = styled.Text`
    font-family: ${FONTS.REGULAR};
    font-size: 12px;
    width:50%;
    color: ${colors.darkgray};
`;

export const DevImg = styled.Image`
    width: 100px;
    height: 100px;
`;