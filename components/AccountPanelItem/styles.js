import styled from "styled-components/native";
import { FONTS } from "constants/constant";

export const ItemContainer = styled.TouchableOpacity`
    width: 100%;
    border-width: 2px;
    border-radius: 15px;
    border-color: ${(props) => props.color};
    padding: 10px;
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom: 10px;
    flex-direction: row;
    align-items: center;
`;

export const Title = styled.Text`
    font-family: ${FONTS.BOLD};
    font-size: 16px;
    color: ${(props) => props.color};
    padding: 2px;
    margin-left: 10px;
    text-align: center;
`;

export const PriceLabel = styled.Text`
    font-family: ${FONTS.BOLD};
    font-size: 15px;
    color: ${(props) => props.color};
    padding: 2px;
`;

export const LeftContainer = styled.View`
    margin-left: 30px;
`;

export const PriceContainer = styled.View`
    margin-left: auto;
`;

export const Subhead = styled.Text`
    font-family: ${FONTS.REGULAR};
    font-size: 14px;
    color: ${(props) => props.color};
    padding: 2px;
`;

export const TitleContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;
