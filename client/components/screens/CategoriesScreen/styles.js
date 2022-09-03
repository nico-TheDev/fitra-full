import styled from "styled-components/native";
import { Container } from "components/common/styles/commonStyles";
import colors from "assets/themes/colors";

export const CategoriesScreenContainer = styled(Container)`
    justify-content: flex-start;
`;

export const CategoryPanel = styled.View`
    elevation: 10;
    height: 100px;
    width: 90%;
    background-color: ${colors.white};
`;

export const CategoryList = styled.FlatList`
    width: 90%;
    margin-top: 30px;
    padding: 10px;
    height: 60%;
    flex-grow: 0;
`;
