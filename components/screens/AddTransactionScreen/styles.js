import styled from "styled-components/native";
import { Container } from "components/common/styles/commonStyles";
import { FONTS } from "constants/constant";
import colors from "assets/themes/colors";

export const AddTransactionScreenContainer = styled(Container)`
    position: relative;
    justify-content: flex-start;
    padding-bottom: 20px;
`;

export const TrasactionFormHolder = styled.View`
    padding-top: 40px;
    width: 90%;
    align-items: center;
    justify-content: flex-start;
`;

export const TransactionPanelHolder = styled.View`
    padding: 20px;
    width: 90%;
    height: 140px;
    border-color: ${colors.primary.colorFive};
    border-width: 4px;
    border-radius: 10px;
    align-items: center;
    justify-content: flex-start;
    background-color: ${colors.primary.colorFive};
`;

export const TransactionAmountInput = styled.TextInput`
    font-family: ${FONTS.BOLD};
    font-size: 30px;
    color: ${colors.white};
    text-align: center;
    width: 100%;
    height: 50px;
`;

export const SwitchCategoryHolder = styled.View`
    margin-top: 10px;
    position: relative;
    color: white;
    justify-content: center;
    border-radius: 10px;
    width: 100%;
    height: 50px;
`;

export const TransactionCategoryHolder = styled.View`
    margin-bottom: 30px;
    width: 100%;
    height: 120px;
    justify-content: flex-start;
`;

export const ButtonHolder = styled.View`
    position: relative;
    margin-top: 10px;
    background-color: ${colors.white};
    align-items: center;
    justify-content: flex-start;
`;

export const ScrollContainer = styled.ScrollView`
    width: 100%;
    flex-grow: 0;
    height: 35%;
`;
