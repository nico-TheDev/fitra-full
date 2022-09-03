import styled from "styled-components/native";

import { Container } from "components/common/styles/commonStyles";

export const CategoriesContainer = styled(Container)`
    position: relative;
    flex: 1;
    justify-content: flex-start;
    padding-bottom: 20px;
`;

export const FunctionContainer = styled.View`
    width: 90%;
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