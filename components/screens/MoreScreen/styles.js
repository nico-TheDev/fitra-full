import styled from "styled-components/native";
import { Container } from "components/common/styles/commonStyles";
import { FONTS } from "constants/constant";
import colors from "assets/themes/colors";

export const MorescreenContainer = styled(Container)`
    position: relative;
    flex: 1;
    padding: 1px;
    justify-content: flex-start;
`;
export const UserContainer = styled.View`
    position: relative;
    justify-content: center;
    padding-top: 80px;
    padding-bottom: 20px;
    align-items: center;
    margin-bottom: 20px;
`;
export const Email = styled.Text`
    color: ${colors.white};
`;
export const UserProfile = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 100px;
    position: relative;
`;
export const Username = styled.Text`
    position: relative;
    font-size: 32px;
    font-family: ${FONTS.BLACK};
    color: ${colors.white};
`;
export const MorescreenBG = styled.View`
    position: absolute;
`;

export const MoreButtonList = styled.FlatList`
    margin-top: 10%;
    width: 90%;
    flex-grow: 0;
    height: 50%;
`;
