import { Alert, TouchableOpacity } from "react-native";
import React from "react";
import { useFormik } from "formik";


// LOCAL IMPORTS
import EllipseBg from "assets/illustrations/Ellipse-Bg.svg";
import colors from "assets/themes/colors";
import {
    LoginScreenContainer,
    WelcomeTextContainer,
    WelcomeText1,
    WelcomeText2,
    UserImg,
    LoginForm,
    Input,
    InputHolder,
    ForgotPasswordHolder,
    ForgotPasswordText,
    LoginFormButtonsHolder,
    RegisterLinkHolder,
    RegisterHere,
    RegisterLinkBg,
    CreateAccountText,
    UserImgContainer
} from "./styles";
import userProfile from "assets/img/user-1.jpg";
import Button from "components/Button";
import useAuthStore from 'hooks/useAuthStore';
import Icon from "components/common/Icon";
import { ICON_NAMES } from "constants/constant";


const LoginScreen = ({ navigation }) => {
    const verifyUser = useAuthStore(state => state.verifyUser);
    const user = useAuthStore(state => state.user);
    const initialValues = { email: "", password: "" };

    const handleFormikSubmit = (values) => {
        if (values.email === "" || values.password === "") {
            Alert.alert("Incomplete Input", "Please fill up the email and password.");
        } else {
            verifyUser({
                email: values.email,
                password: values.password
            });
        };
    };

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleFormikSubmit,
    });

    return (
        <LoginScreenContainer>
            <WelcomeTextContainer>
                <WelcomeText1>Welcome !</WelcomeText1>
                <WelcomeText2>Start monitoring your spending</WelcomeText2>
                <UserImgContainer>{user.user_id ? <UserImg source={{ uri: user.profile_img }} /> : <Icon name={ICON_NAMES.SYSTEM_ICONS.USERPROFILE} size={100} color={colors.primary.colorFive} />}</UserImgContainer>
            </WelcomeTextContainer>
            <LoginForm>
                <InputHolder>
                    <Input
                        onChangeText={formik.handleChange("email")}
                        value={formik.values.email}
                        placeholder="Email"
                        placeholderTextColor={colors.primary.colorFive}
                    />
                </InputHolder>
                <InputHolder>
                    <Input
                        onChangeText={formik.handleChange("password")}
                        value={formik.values.password}
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor={colors.primary.colorFive}
                    />
                </InputHolder>
                <ForgotPasswordHolder>
                    <TouchableOpacity onPress={() => { }}>
                        <ForgotPasswordText>
                            Forgot your Password?
                        </ForgotPasswordText>
                    </TouchableOpacity>
                </ForgotPasswordHolder>
                <LoginFormButtonsHolder>
                    <Button
                        title={"LOGIN"}
                        type={"filled"}
                        rounded={"10px"}
                        onPress={formik.handleSubmit}
                    />
                    {/* <Button
                        title={"SIGN IN WITH GOOGLE"}
                        rounded={"10px"}
                        noBorder={false}
                        onPress={() => { console.log("GOOGLE"); }}
                    // onPress={handleGoogleSignIn}
                    /> */}
                </LoginFormButtonsHolder>
            </LoginForm>
            <RegisterLinkBg>
                <EllipseBg width={"100%"} height={"100%"} />
            </RegisterLinkBg>
            <RegisterLinkHolder>
                <CreateAccountText>Don't have an account ? </CreateAccountText>
                <TouchableOpacity onPress={() => navigation.push("Register")}>
                    <RegisterHere>REGISTER HERE</RegisterHere>
                </TouchableOpacity>
            </RegisterLinkHolder>
        </LoginScreenContainer>
    );
};

export default LoginScreen;
