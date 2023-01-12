import styled from "styled-components/native";
import { Container } from "components/common/styles/commonStyles";
import { FONTS } from "constants/constant";
import colors from "assets/themes/colors";

export const GetStartedContainer = styled(Container)`
    position: relative;
    align-items: center;
    justify-content: center;
`;

export const GetStartedButton = styled.View`
    justify-content: center;
    height: 100px;
    width: 90%;
`;

export const GetStartedBackground = styled.View``;
export const CircleBg1 = styled.View`
    width: 300px;
    height: 300px;
    position: absolute;
    left: -20%;
    top: -10%;
`;
export const CircleBg2 = styled.View`
    position: absolute;
    width: 300px;
    height: 300px;
    right: -50%;
    bottom: 0%;
`;

export const FigurePanel = styled.View`
    elevation: 10;
    width: 100%;
    background-color: white;
    border-radius: 10px;
    padding: 5%;
    height: 90%;
    align-items: center;
    justify-content: center;
`;

export const FigureTitle = styled.Text`
    font-size: 25px;
    font-family: ${FONTS.BLACK};
    color: ${colors.black};
    margin-top: 20px;
    text-align: center;
`;
export const FigureSub = styled.Text`
    font-size: 16px;
    font-family: ${FONTS.REGULAR};
    text-align: center;
    color: ${colors.darkgray};
    margin-top: 40px;
`;
