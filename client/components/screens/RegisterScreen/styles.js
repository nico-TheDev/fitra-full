import styled from "styled-components/native";
import { Container } from "components/common/styles/commonStyles";
import { FONTS } from "constants/constant";
import colors from "assets/themes/colors";

export const RegisterScreenContainer = styled(Container)`
    position: relative;
    flex: 1;
    height: 100%;
`;
export const GreetingsHolder = styled.View`
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10%;
`;
export const RegisterScreenBg = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30%;
`;
export const RegisterScreenLogoHolder = styled.View``;
export const RegisterWelcomeTextHolder = styled.View`
    width: 90%;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 10%;
`;

export const RegisterWelcomeText1 = styled.Text`
    font-size: 36px;
    text-align: center;
    font-family: ${FONTS.MEDIUM};
    color: ${colors.white};
`;

export const RegisterWelcomeText2 = styled.Text`
    font-size: 16px;
    font-family: ${FONTS.REGULAR};
    text-align: center;
    color: ${colors.white};
`;

export const RegisterForm = styled.View`
    align-items: center;
    width: 90%;
    margin-top: 20px;
`;

export const InputHolder = styled.View`
    background-color: white;
    margin-top: 5px;
    margin-bottom: 5px;
    position: relative;
    width: 100%;
    border-radius: 5px;
    elevation: 10;
    height: 60px;
    align-items: center;
    justify-content: center;
`;

export const Input = styled.TextInput`
    width: 90%;
    height: 100%;
    font-size: 20px;
    font-family: ${FONTS.BOLD};
`;

export const RegisterFormButtonsHolder = styled.View`
    position: relative;
    width: 100%;
    height: 100px;
    margin-top: 10%;
    justify-content: space-around;
    align-items: center;
`;
