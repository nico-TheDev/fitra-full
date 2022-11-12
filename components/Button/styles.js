import styled from "styled-components/native";

// Import themes
import colors from "assets/themes/colors";
import { FONTS } from "fitra/constants/constant";

export const ButtonContainer = styled.TouchableOpacity`
    width: ${({ width }) => width};
    padding: 10px;
    border-width: 2px;
    background-color: ${(props) =>
        props.type === "filled" ? colors.primary.colorFive : colors.white};
    border-color: ${(props) =>
        props.type === "filled" || props.noBorder
            ? "transparent"
            : colors.primary.colorFive};
    border-radius: ${({ rounded }) => rounded};
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

export const ButtonLabel = styled.Text`
    font-size: ${({ textSize }) => textSize}px;
    text-align: center;
    font-family: ${FONTS.BOLD};
    text-transform: uppercase;
    color: ${(props) =>
        props.type === "filled" ? colors.white : colors.primary.colorFive};
`;
