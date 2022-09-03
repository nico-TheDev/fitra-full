import styled from "styled-components/native";
import { FONTS } from "constants/constant";

export const DropdownContainer = styled.View`
    width: ${({ width }) => width};
`;
export const CustomText = styled.Text`
    font-family: ${FONTS.BOLD};
    font-size: 20px;
    margin-bottom: 5px;
`;
