import colors from "assets/themes/colors";
import { FONTS } from "constants/constant";
import styled from "styled-components/native";

export const Category = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

export const CategoryName = styled.Text`
    font-size: 20px;
    font-family: ${FONTS.BOLD};
`;

export const CategoryTotal = styled.Text`
    font-size: 16px;
    font-family: ${FONTS.REGULAR};
    color: ${colors.darkgray};
`;

export const TextHolder = styled.View`
    margin-left: 15px;
    width: 100%;
`;
