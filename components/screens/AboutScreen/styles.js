import styled from "styled-components/native";

import { Container } from "components/common/styles/commonStyles";
import { FONTS } from "constants/constant";
import colors from "assets/themes/colors";

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
    width: 100px;
    height: 100px;
    margin-left: auto;
    margin-right: auto;
`;

export const DevPanel = styled.TouchableOpacity`
    elevation: 10;
    width: 100%;
    background-color: ${colors.white};
    border-radius: 10px;
    padding: 10px;
    height: 120px;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    justify-content: space-around;
`;

export const DetailsHolder = styled.View`
    align-items: center;
`;

export const NameText = styled.Text`
    font-family: ${FONTS.BLACK};
    font-size: 16px;
    width: 100%;
`;

export const PositionText = styled.Text`
    font-family: ${FONTS.REGULAR};
    font-size: 12px;
    width: 100%;
    color: ${colors.darkgray};
`;

export const DevImg = styled.Image`
    width: 80px;
    height: 80px;
`;

export const Title = styled.Text`
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
`;
