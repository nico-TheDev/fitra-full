import styled from "styled-components/native";

// Import themes
import colors from "assets/themes/colors";
import { FONTS } from "constants/constant";

export const ColorPickerPanelContainer = styled.View`
    width: 90%;
    margin-bottom: 20px;
`;

export const ColorPanel = styled.View`
    width: 90%;
    margin-top: 30px;
    padding: 10px;
    height: 60%;
    flex-grow: 0;
`;

export const ColorContainer = styled.FlatList`
    width: 100%;
`;

export const ColorButton = styled.TouchableOpacity`
    border-radius: 100px;
    width: 50px;
    height: 50px;
    background-color: ${(props) => props.color};
    margin-left: 5px;
    margin-right: 5px;
    justify-content: center;
    align-content: center;
`;

export const AddColorBtn = styled.TouchableOpacity`
    margin-right: 5px;
`;
export const ListContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const TextLabel = styled.Text`
    font-family: ${FONTS.BOLD};
    font-size: 20px;
    margin-bottom: 10px;
`;

export const Selected = styled.Text`
    font-family: ${FONTS.BLACK};
    font-size: 20px;
    text-align: center;
    color: white;
`;
