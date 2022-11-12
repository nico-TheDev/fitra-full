import { FONTS } from "constants/constant";
import styled from "styled-components/native";

export const ScreenHeaderContainer = styled.View`
    width: 90%;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    height: 15%;
`;

export const BackBtn = styled.TouchableOpacity`
    margin-right: 30px;
`;

export const ScreenTitle = styled.Text`
    font-family: ${FONTS.BLACK};
    font-size: 25px;
`;

export const RightIcon = styled.TouchableOpacity`
    margin-left: auto;
`;
