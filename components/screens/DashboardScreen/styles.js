import styled from "styled-components/native";
import { Container } from "components/common/styles/commonStyles";
import { FONTS } from "constants/constant";

export const DashboardContainer = styled(Container)`
    position: relative;
    flex: 1;
    justify-content: flex-start;
    padding-bottom: 20px;
`;

export const DashboardDate = styled.Text`
    font-family: ${FONTS.REGULAR};
    font-size: 20px;
    text-align: left;
    width: 90%;
    margin-bottom: 20px;
`;


export const DefaultTransactionPanel = styled.View`
    width:90%;
    height:200;
    justify-content: center;
    align-items: center;
`;

export const DefaultText = styled.Text`
    font-family:${FONTS.BOLD};
    font-size: 25px;
    text-align: center;
    `;