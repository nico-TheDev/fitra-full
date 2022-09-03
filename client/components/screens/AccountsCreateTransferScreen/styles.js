import styled from "styled-components/native";

import { Container } from "components/common/styles/commonStyles";
import { FONTS } from "constants/constant";

export const AccountsContainer = styled(Container)`
    position: relative;
    flex: 1;
    justify-content: flex-start;
    padding-bottom: 20px;
`;

export const ScrollContainer = styled.ScrollView`
    height: 40%;
    width: 90%;
`;
