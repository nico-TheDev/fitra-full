import { TouchableOpacity } from "react-native";
import React from "react";
import { useFormik ,Formik } from "formik";

import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";

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
import {auth} from "fitra/firebase.config.js"


const LoginScreen = ({ navigation }) => {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const provider = new GoogleAuthProvider();
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

    const handleGoogleSignIn = async () => {
        await signInWithRedirect(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    };

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
                            onPress={() => handleGoogleSignIn()}
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
