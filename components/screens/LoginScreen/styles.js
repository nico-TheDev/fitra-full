import styled from "styled-components/native";
import { Container } from "components/common/styles/commonStyles";
import { FONTS } from "constants/constant";
import colors from "assets/themes/colors";

export const LoginScreenContainer = styled(Container)`
    position: relative;
    justify-content: center;
    flex: 1;
`;

export const UserImg = styled.Image`
    position: relative;
    border-radius: 100;
`;

export const UserImgContainer = styled.View`
    margin-top: 50px;
`;

export const WelcomeTextContainer = styled.View`
    margin-bottom: 10%;
    margin-top: 10%;
    width: 80%;
    align-items: center;
    justify-content: center;
    position: relative;
`;
export const WelcomeText1 = styled.Text`
    font-size: 36px;
    text-align: center;
    letter-spacing: -3px;
    font-family: ${FONTS.MEDIUM};
`;

export const WelcomeText2 = styled.Text`
    font-size: 16px;
    font-family: ${FONTS.REGULAR};
    text-align: center;
`;

export const LoginForm = styled.View`
    position: relative;
    align-items: center;
    justify-content: center;
    width: 100%;
`;
export const InputHolder = styled.View`
    background-color: white;
    margin-bottom: 5px;
    margin-top: 10px;
    position: relative;
    width: 90%;
    border-radius: 5px;
    elevation: 10;
`;
export const ForgotPasswordHolder = styled.View`
    position: relative;
    width: 90%;
    left: 50%;
`;
export const LoginFormButtonsHolder = styled.View`
    position: relative;
    margin-top: 40px;
    width: 92%;
    height: 120px;
    justify-content: space-around;
`;
export const RegisterLinkBg = styled.View`
    position: absolute;
    width: 100%;
    height: 10%;
    bottom: 0%;
    z-index: -1;
`;

export const RegisterLinkHolder = styled.View`
    position: relative;
    margin-top: 100px;
    flex-direction: row;
`;
export const RegisterHere = styled.Text`
    font-size: 14px;
    font-family: ${FONTS.BOLD};
    color: ${colors.white};
`;

export const Input = styled.TextInput`
    padding: 10px;
    width: 80%;
    height: 60px;
    font-size: 18px;
    font-family: ${FONTS.BOLD};
`;

export const ForgotPasswordText = styled.Text`
    font-size: 16px;
    font-family: ${FONTS.REGULAR};
    color: ${colors.primary.colorFive};
`;

export const CreateAccountText = styled.Text`
    color: ${colors.white};
    font-family: ${FONTS.REGULAR};
`;
