import colors from "assets/themes/colors";
import { FONTS } from "constants/constant";
import styled from "styled-components/native";

export const InputContainer = styled.View`
    elevation: 5;
    width: 100%;
    background-color: ${colors.white};
    border-radius: 5px;
    position: relative;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    padding-left: 5px;
    padding-right: 20px;
    margin-bottom: 20px;
`;

export const Input = styled.Text`
    padding: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 8px;
    font-family: ${FONTS.REGULAR};
    font-size: 16px;
    flex: 1;
    margin-right: 20px;
`;

export const CustomInputContainer = styled.TouchableOpacity`
    width: ${({ width }) => width};
`;

export const CustomText = styled.Text`
    font-family: ${FONTS.BOLD};
    font-size: 20px;
    margin-bottom: 5px;
`;
