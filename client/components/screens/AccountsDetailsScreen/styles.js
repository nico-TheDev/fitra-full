import styled from "styled-components/native";

import { Container } from "components/common/styles/commonStyles";

export const AccountsContainer = styled(Container)`
    justify-content: flex-start;
`;

export const FunctionContainer = styled.View`
    width: 90%;
`;

export const AccountsBG = styled.View`
    position: absolute;
    top: -22%;
    right: -35%;
`;

export const ButtonContainer = styled.View`
    width: 90%;
    flex-direction: row;
    justify-content: ${({ mode }) =>
        mode === "edit" ? "space-between" : "flex-end"};
    margin-top: 20px;
`;
