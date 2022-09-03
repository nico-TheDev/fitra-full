import colors from "assets/themes/colors";
import { Panel } from "components/common/styles/commonStyles";
import { FONTS } from "constants/constant";
import styled from "styled-components/native";

export const RecentPanel = styled.TouchableOpacity`
    elevation: 10;
    width: 100%;
    height: 250px;
    background-color: ${colors.white};
    border-radius: 10px;
    padding: 10px;
    height: 180px;
    padding-left: 20px;
    padding-top: 20px;
`;

export const DetailsHolder = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

export const Comment = styled.Text`
    font-family: ${FONTS.REGULAR};
    font-size: 16px;
    color: ${colors.darkgray};
`;

export const CommentImg = styled.Image`
    width: 100px;
    height: 100px;
`;
