import colors from "assets/themes/colors";
import { FONTS } from "constants/constant";
import styled from "styled-components/native";

export const SwitchContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: transparent;
`;

const TextStyle = styled.Text`
    margin-horizontal: 20px;
    font-size: 25px;
    font-family: ${FONTS.BLACK};
`;

export const ExpenseText = styled(TextStyle)`
    color: ${({ enabled }) =>
        enabled ? colors.darkgray : colors.primary.colorFive};
`;

export const IncomeText = styled(TextStyle)`
    color: ${({ enabled }) =>
        enabled ? colors.primary.colorFive : colors.darkgray};
`;

// DARK MODE
export const ExpenseTextDark = styled(TextStyle)`
    color: ${({ enabled }) =>
        enabled ? colors.primary.colorOne : colors.white};
`;

export const IncomeTextDark = styled(TextStyle)`
    color: ${({ enabled }) =>
        enabled ? colors.white : colors.primary.colorOne};
`;

export const Line = styled.View`
    width: 5px;
    height: 30px;
    background-color: ${colors.primary.colorFive};
`;

export const LineDark = styled.View`
    width: 5px;
    height: 30px;
    background-color: ${colors.white};
`;
