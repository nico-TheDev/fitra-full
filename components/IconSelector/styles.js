import styled from "styled-components/native";
import { FONTS } from "constants/constant";

export const IconSelectorContainer = styled.View`
    width: 90%;
    margin-bottom: 10px;
`;

export const Title = styled.Text`
    font-family: ${FONTS.BOLD};
    font-size: 20px;
    margin-bottom: 10px;
`;

export const IconList = styled.FlatList`
    flex-grow: 0;
    height: 100px;
`;
