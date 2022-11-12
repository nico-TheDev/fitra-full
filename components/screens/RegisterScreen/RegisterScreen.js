import { Text } from "react-native";
import React from "react";
import { Formik } from "formik";

// LOCAL IMPORTS
import Button from "components/Button";
import colors from "assets/themes/colors";
import CircleBigBg from "assets/illustrations/Cirle-Big-Bg.svg";
import RegisterScreenLogo from "assets/illustrations/Colored-Profile-Logo.svg";
import {
    GreetingsHolder,
    RegisterScreenBg,
    RegisterScreenContainer,
    RegisterWelcomeText1,
    RegisterWelcomeText2,
    RegisterWelcomeTextHolder,
    RegisterForm,
    RegisterFormButtonsHolder,
    InputHolder,
    Input,
} from "./styles";

const RegisterScreen = () => {
    const circleBigBgSize = 400;
    const registerScreenLogoSize = 100;

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    };

    const handleFormikSubmit = (values) => console.log(values);

    return (
        <RegisterScreenContainer>
            <RegisterScreenBg>
                <CircleBigBg width={circleBigBgSize} height={circleBigBgSize} />
            </RegisterScreenBg>
            <GreetingsHolder>
                <RegisterWelcomeTextHolder>
                    <RegisterWelcomeText1>Create Acount</RegisterWelcomeText1>
                    <RegisterWelcomeText2>
                        Start your financial journey !
                    </RegisterWelcomeText2>
                </RegisterWelcomeTextHolder>
                <RegisterScreenLogo
                    width={registerScreenLogoSize}
                    height={registerScreenLogoSize}
                />
            </GreetingsHolder>
            <RegisterForm>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleFormikSubmit}
                >
                    {({ values, handleChange }) => (
                        <>
                            <InputHolder>
                                <Input
                                    onChangeText={handleChange("FirstName")}
                                    value={values.firstName}
                                    placeholder="First Name"
                                    placeholderTextColor={
                                        colors.primary.colorFive
                                    }
                                />
                            </InputHolder>
                            <InputHolder>
                                <Input
                                    onChangeText={handleChange("lastName")}
                                    value={values.lastName}
                                    placeholder="Last Name"
                                    placeholderTextColor={
                                        colors.primary.colorFive
                                    }
                                />
                            </InputHolder>
                            <InputHolder>
                                <Input
                                    onChangeText={handleChange("email")}
                                    value={values.email}
                                    placeholder="Email"
                                    placeholderTextColor={
                                        colors.primary.colorFive
                                    }
                                />
                            </InputHolder>
                            <InputHolder>
                                <Input
                                    onChangeText={handleChange("password")}
                                    value={values.password}
                                    placeholder="Password"
                                    secureTextEntry={true}
                                    placeholderTextColor={
                                        colors.primary.colorFive
                                    }
                                />
                            </InputHolder>
                        </>
                    )}
                </Formik>

                <RegisterFormButtonsHolder>
                    <Button
                        title={"SIGN UP"}
                        rounded={"10px"}
                        type={"filled"}
                        width={"100%"}
                    />
                    <Text style={{ color: colors.primary.colorFive }}>
                        Lorem Ipsum Dolor amet
                    </Text>
                </RegisterFormButtonsHolder>
            </RegisterForm>
        </RegisterScreenContainer>
    );
};

export default RegisterScreen;
