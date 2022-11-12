import colors from "assets/themes/colors";
import { Container } from "components/common/styles/commonStyles";
import { FONTS } from "constants/constant";
import styled from "styled-components/native";

export const TransactionHistoryContainer = styled(Container)`
    justify-content: flex-start;
`;

export const MainContainer = styled.View`
    width: 90%;
`;

export const PricePanel = styled.View`
    width: 100%;
    background-color: ${colors.primary.colorFive};
    elevation: 10;
    padding: 12px;
    border-radius: 10px;
    margin-bottom: 20px;
`;

export const PriceText = styled.Text`
    color: ${colors.white};
    font-family: ${FONTS.BLACK};
    font-size: 32px;
    text-align: center;
`;

export const DropdownContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const TransactionSection = styled.SectionList`
    margin-top: 20px;
    flex-grow: 0;
    height: 65%;
`;

export const SectionHeader = styled.Text`
    font-family: ${FONTS.BOLD};
    font-size: 20px;
    margin-bottom: 10px;
`;
