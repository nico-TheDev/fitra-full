import { TouchableOpacity } from "react-native";
import React from "react";
import { useFormik ,Formik } from "formik";

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
} from "./styles";
import userProfile from "assets/img/user-1.jpg";
import Button from "components/Button";
import { useAuth } from "contexts/AuthContext";
import useAuthentication  from 'hooks/useAuthentication';


const LoginScreen = ({ navigation }) => {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const verifyUser = useAuthentication(state => state.verifyUser);
    const initialValues = { email: "", password: "" };

    const handleFormikSubmit = (values) => {
        console.log(values);
        verifyUser({
            email: values.email,
            password: values.password
        })
        setIsLoggedIn(true);
        navigation.navigate("Dashboard");
    };

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleFormikSubmit,
    });

    const { googleSignIn } = useAuth();
    const handleGoogleSignIn = async () => {
        try{ 
            await googleSignIn();
        }catch(err){
            console.log(err)
        }
    }

    return (
        <LoginScreenContainer>
            <WelcomeTextContainer>
                <WelcomeText1>Welcome user !</WelcomeText1>
                <WelcomeText2>start monitoring your spending</WelcomeText2>
                <UserImg source={userProfile} />
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
                        <TouchableOpacity onPress={() => {}}>
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
                        <Button
                            title={"SIGN IN WITH GOOGLE"}
                            rounded={"10px"}
                            noBorder={false}
                            onPress={handleGoogleSignIn}
                        />
                    </LoginFormButtonsHolder>
                </LoginForm>
            <RegisterLinkBg>
                <EllipseBg width={"100%"} height={"100%"} />
            </RegisterLinkBg>
            <RegisterLinkHolder>
                <CreateAccountText>Don't have an account ? </CreateAccountText>
                <TouchableOpacity onPress={() => navigation.push("Register")}>
                    <RegisterHere>Register Here</RegisterHere>
                </TouchableOpacity>
            </RegisterLinkHolder>
        </LoginScreenContainer>
    );
};

export default LoginScreen;
