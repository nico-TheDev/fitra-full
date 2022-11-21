import { Text } from "react-native";
import React from "react";
import { useFormik } from "formik";
import uuid from 'react-native-uuid';

// LOCAL IMPORTS
import Button from "components/Button";
import colors from "assets/themes/colors";
import { ICON_NAMES } from "constants/constant";

import CircleBigBg from "assets/illustrations/Cirle-Big-Bg.svg";
import RegisterScreenLogo from "assets/illustrations/Colored-Profile-Logo.svg";
import ButtonIcon from "components/ButtonIcon";

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

import useAuthentication from 'hooks/useAuthentication';
import useUploadImage from "hooks/useUploadImage";

const RegisterScreen = ({ navigation }) => {
    let photoId = uuid.v4();
    
    const circleBigBgSize = 400;
    const registerScreenLogoSize = 100;

    const [image, chooseImage, uploadImage, filename] = useUploadImage(photoId, "users/");

    const addUser = useAuthentication(state => state.addUser);

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    };

    const handleFormikSubmit = async (values, { resetForm }) => {
        console.log(values);
        let imgFile;
        if (image) {
            imgFile = await uploadImage();
        }
        addUser({
            user_id: uuid.v4(),
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            profile_img_ref: imgFile ? imgFile.imgRef : "",
            profile_img: imgFile ? imgFile.imgUri : "",
        });
        resetForm();
    };

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleFormikSubmit,
    });

    return (
        <RegisterScreenContainer>
            <RegisterScreenBg>
                <CircleBigBg width={circleBigBgSize} height={circleBigBgSize} />
            </RegisterScreenBg>
            <GreetingsHolder>
                <RegisterWelcomeTextHolder>
                    <RegisterWelcomeText1>Create Account</RegisterWelcomeText1>
                    <RegisterWelcomeText2>
                        Start your financial journey !
                    </RegisterWelcomeText2>
                </RegisterWelcomeTextHolder>
                <ButtonIcon
                    name={ICON_NAMES.ADD_PHOTO_V1}
                    iconColor={colors.primary.colorFive}
                    type={'filled'}
                    imageUri={image}
                    onPress={chooseImage}
                    filename={filename}
                />
            </GreetingsHolder>
            <RegisterForm>
                <InputHolder>
                    <Input
                        onChangeText={formik.handleChange("firstName")}
                        value={formik.values.firstName}
                        placeholder="First Name"
                        placeholderTextColor={
                        colors.primary.colorFive
                        }
                    />
                </InputHolder>
                <InputHolder>
                    <Input
                        onChangeText={formik.handleChange("lastName")}
                        value={formik.values.lastName}
                        placeholder="Last Name"
                        placeholderTextColor={
                        colors.primary.colorFive
                        }
                    />
                </InputHolder>
                <InputHolder>
                    <Input
                        onChangeText={formik.handleChange("email")}
                        value={formik.values.email}
                        placeholder="Email"
                        placeholderTextColor={
                        colors.primary.colorFive
                        }
                    />
                </InputHolder>
                <InputHolder>
                    <Input
                        onChangeText={formik.handleChange("password")}
                        value={formik.values.password}
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor={
                        colors.primary.colorFive
                        }
                    />
                </InputHolder>

                <RegisterFormButtonsHolder>
                    <Button
                        title={"SIGN UP"}
                        rounded={"10px"}
                        type={"filled"}
                        width={"100%"}
                        onPress={formik.handleSubmit}
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
