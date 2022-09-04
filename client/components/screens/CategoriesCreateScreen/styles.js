import styled from "styled-components/native";

import { Container } from "components/common/styles/commonStyles";
import colors from "assets/themes/colors";

export const CategoriesContainer = styled(Container)`
    position: relative;
    flex: 1;
    justify-content: flex-start;
    padding-bottom: 20px;
`;

export const FunctionContainer = styled.View`
    width: 90%;
`;

export const ColorPickerContainer = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    align-items: center;
    z-index: 999;
`;

export const ColorPickerBody = styled.View`
    background-color: white;
    width: 100%;
    height: 100%;
    padding: 20px;
`;

export const SwitchContainer = styled.View`
    elevation: 10;
    width: 90%;
    height: 35px;
`;

export const IconPanel = styled.View`
    width: 100%;
`;

export const IconHolder = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

export const IconContainer = styled.View`
    margin-left: 1px;
`;

export const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    margin-top: 20px;
`;

export const CloseBtn = styled.TouchableOpacity`
    position: absolute;
    top: 10%;
    right: 10%;
    width: 50px;
    height: 50px;
    border-radius: 10000px;
    background: ${colors.primary.colorFive};
    z-index: 9999;
    align-items: center;
    justify-content: center;
`;
