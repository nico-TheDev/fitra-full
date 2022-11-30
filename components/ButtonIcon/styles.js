import styled from "styled-components/native";

import colors from "assets/themes/colors";
import { FONTS } from "fitra/constants/constant";

export const ButtonContainer = styled.View`
    justify-content: center;
    align-items: center;
`;

export const ButtonIconContainer = styled.TouchableOpacity`
    width: 60px;
    height: 60px;
    padding: 6px;
    border-width: 2px;
    border-radius: 15px;
    background-color: ${(props) =>
        props.type === "filled" ? props.color : colors.white};
    border-color: ${(props) =>
        props.type === "filled" ? "transparent" : props.color};
    justify-content: center;
    align-items: center;
`;

export const ButtonLabel = styled.Text`
    font-size: 12px;
    text-align: center;
    font-family: ${FONTS.BOLD};
    font-weight: 400;
    text-transform: capitalize;
    margin-top: 5px;
    color: ${(props) => props.color};
`;

export const CustomImage = styled.Image`
    width:100%;
    height:100%
`;
