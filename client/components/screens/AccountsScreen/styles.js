import styled from "styled-components/native";

import { Container } from "components/common/styles/commonStyles";
import { FONTS } from "constants/constant";
import colors from "assets/themes/colors";

export const AccountsContainer = styled(Container)`
    position: relative;
    flex: 1;
    justify-content: flex-start;
    padding-bottom: 20px;
`;

export const TotalBalanceContainer = styled.View`
    width: 90%;
    height: 110px;
    padding: 20px;
    background-color: ${colors.primary.colorFive};
    border-radius: 10px;
    align-items: center;
`;

export const TotalBalanceLabel = styled.Text`
    font-family: ${FONTS.REGULAR};
    font-size: 15px;
    color: ${colors.white};
    text-align: center;
`;

export const TotalAmountBalanceLabel = styled.Text`
    font-family: ${FONTS.BOLD};
    font-size: 30px;
    color: ${colors.white};
    text-align: center;
`;

export const HolderContainer = styled.View`
    flex: 1;
    width: 90%;
`;
