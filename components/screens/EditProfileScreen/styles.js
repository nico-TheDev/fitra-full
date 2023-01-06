import styled from "styled-components/native";

import { Container } from "components/common/styles/commonStyles";

export const EditProfileContainer = styled(Container)`
    justify-content: flex-start;
`;

export const FunctionContainer = styled.View`
    width: 90%;
`;

export const EditProfileBG = styled.View`
    position: absolute;
    top: -22%;
    right: -35%;
`;

export const ButtonHolder = styled.View`
    position: relative;
    width: 100%;
    flex-direction: row;
    margin-top: 8px;
    align-items: center;
    justify-content: space-between;
`;

export const ImgButton = styled.TouchableOpacity``;

export const UserImg = styled.Image`
    position: relative;
    height:100px;
    width:100px;
    border-radius: 100px;
`;
