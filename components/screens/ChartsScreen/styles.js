import styled from "styled-components/native";
import { Container } from "components/common/styles/commonStyles";
import colors from "assets/themes/colors";

export const ChartsScreenContainer = styled(Container)`
    position: relative;
    flex: 1;
    justify-content: flex-start;
    align-items: center;
`;

export const TypeNavi = styled.FlatList`
    width: 90%;
    flex-grow: 0;
    height: 9%;
`;

export const ChartPanel = styled.View`
    background-color: ${colors.white};
    elevation: 5;
    width: 90%;
    margin-top: 20px;
    height: 40%;
    border-radius: 5px;
`;

export const CategoryContainer = styled.FlatList`
    margin-top: 20px;
    width: 90%;
    flex-grow: 0;
    height: 20%;
`;
