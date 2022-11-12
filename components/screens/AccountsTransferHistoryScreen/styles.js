import { Container } from "components/common/styles/commonStyles";
import { FONTS } from "constants/constant";
import styled from "styled-components/native";

export const TransferHistoryContainer = styled(Container)`
    justify-content: flex-start;
`;

export const TransferSectionList = styled.SectionList`
    width: 90%;
`;

export const SectionHeader = styled.Text`
    font-family: ${FONTS.BOLD};
    font-size: 20px;
    margin-bottom: 10px;
`;
