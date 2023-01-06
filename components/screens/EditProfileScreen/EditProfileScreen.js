import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Alert } from "react-native";

import CircleBG from "components/common/CircleBG";
import CustomTextInput from "components/CustomTextInput";
import Button from "components/Button";
import ScreenHeader from "components/ScreenHeader";

import {
    EditProfileContainer,
    FunctionContainer,
    EditProfileBG
} from "./styles";

import useAuthStore from 'hooks/useAuthStore';

const EditProfileScreen = () => {
    // 

    const getDocument = useAuthStore(state => state.getDocument);
    const updateProfileName = useAuthStore(state => state.updateProfileName);
    const updateProfileEmail = useAuthStore(state => state.updateProfileEmail);
    const updateProfilePassword = useAuthStore(state => state.updateProfilePassword);
    const updateProfileDocument = useAuthStore(state => state.updateProfileDocument);

    const logoutUser = useAuthStore(state => state.logoutUser);
    const deleteUser = useAuthStore(state => state.deleteUser);
    const deleteDocument = useAuthStore(state => state.deleteDocument);

    
    const [currentProfile, setCurrentProfile] = useState(getDocument());
    
    const initialValues = {
        first_Name: currentProfile.first_Name,
        last_Name: currentProfile.last_Name,
        email: currentProfile.email,
        password: "",
    };

    useEffect(() => {
        setCurrentProfile(getDocument());
    }, []);

    const handleFormikSubmit = async (values) => {
        const newUser = {
            first_Name: values.first_Name,
            last_Name: values.last_Name,
            email: values.email,
        };

        updateProfileName({
            new_firstName : values.first_Name,
            new_lastName: values.last_Name,
        });
        updateProfileEmail({new_email: values.email});
        updateProfilePassword({new_password: values.password});
        updateProfileDocument(user.uid, newUser);
        Alert.alert("SUCCESS", "Document Updated");

        formik.resetForm();
    };

    const showDeletePrompt = () => {
        Alert.alert("Deleting file", "Are you sure ?", [{
            text: "Yes",
            onPress: handleDelete,
            style: "destructive"
        }, {
            text: "No",
            onPress: () => { },
            style: "cancel"
        }]);

    };

    const handleDelete = () => {
        deleteUser();
        deleteDocument();
        logoutUser();
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleFormikSubmit,
    });

    const EditButtonGroup = () => (
        <>
            <Button
                type="filled"
                width="45%"
                title="Save"
                rounded="8px"
                textSize={16}
                noBorder={false}
                onPress={formik.handleSubmit}
            />
            <Button
                type="outlined"
                width="45%"
                title="Delete"
                rounded="8px"
                textSize={16}
                noBorder={false}
                onPress={showDeletePrompt}
            />
        </>
    );

    return (
        <EditProfileContainer>
            <CircleBG circleSize={250} />
            <ScreenHeader title="Edit Profile" />
            <FunctionContainer>
                <CustomTextInput
                    inputProps={{
                        placeholder: "Edit Profile First Name",
                        onChangeText: formik.handleChange("first_Name"),
                        value: formik.values.first_Name,
                    }}
                    customLabel="Profile First Name:"
                />
                <CustomTextInput
                    inputProps={{
                        placeholder: "Edit Profile Last Name",
                        onChangeText: formik.handleChange("last_Name"),
                        value: formik.values.last_Name,
                    }}
                    customLabel="Profile Last Name:"
                />
                <CustomTextInput
                    inputProps={{
                        placeholder: "Edit Profile Email",
                        onChangeText: formik.handleChange("email"),
                        value: formik.values.email,
                    }}
                    customLabel="Profile Email:"
                />
                <CustomTextInput
                    inputProps={{
                        placeholder: "Edit Profile Password",
                        onChangeText: formik.handleChange("password"),
                        value: formik.values.password,
                    }}
                    customLabel="Profile Password:"
                />
                <EditButtonGroup />
            </FunctionContainer>
        </EditProfileContainer>
    )
}

export default EditProfileScreen