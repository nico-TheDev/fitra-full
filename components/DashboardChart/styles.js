import colors from "assets/themes/colors";
import { FONTS } from "constants/constant";
import styled from "styled-components/native";

export const Title = styled.Text`
    font-family: ${FONTS.BLACK};
    font-size: 24px;
    text-align: center;
`;

export const Chart = styled.View`
    flex: 1;
`;

export const FigureContainer = styled.View`
    width: 100%;
    flex: 1;
    flex-direction: row;
    align-items: center;
`;

export const CategoryListContainer = styled.View`
    flex: 1;
`;

export const CategoryList = styled.FlatList``;

export const TitleContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 10px;
`;
