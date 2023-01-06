import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Alert } from "react-native";
import uuid from 'react-native-uuid';

import CircleBG from "components/common/CircleBG";
import CustomTextInput from "components/CustomTextInput";
import Button from "components/Button";
import ScreenHeader from "components/ScreenHeader";
import ButtonIcon from "components/ButtonIcon";

import { ICON_NAMES } from "constants/constant";
import colors from "assets/themes/colors";

import {
    EditProfileContainer,
    FunctionContainer,
    EditProfileBG,
    ButtonHolder
} from "./styles";

import { auth, storage } from '../../../firebase.config';
import { deleteObject, ref } from "firebase/storage";

import useAuthStore from 'hooks/useAuthStore';
import useUploadImage from "hooks/useUploadImage";

const EditProfileScreen = () => {
    const updateProfileName = useAuthStore(state => state.updateProfileName);
    const updateProfileEmail = useAuthStore(state => state.updateProfileEmail);
    const updateProfilePassword = useAuthStore(state => state.updateProfilePassword);
    
    const photoId = uuid.v4();
    const [image, chooseImage, uploadImage, filename] = useUploadImage(photoId, "users/");

    const logoutUser = useAuthStore(state => state.logoutUser);
    const deleteUser = useAuthStore(state => state.deleteUser);
    
    const user = auth.currentUser;
    const currentDisplayName = user.displayName;
    const currentEmail = user.email;
    const currentPhotoURL = user.photoURL;

    const initialValues = {
        displayName: currentDisplayName,
        email: currentEmail ,
        password: '',
    };

    const handleFormikSubmit = async (values) => {
        let imgFile,
            oldImgRef = currentPhotoURL;
        // IF THERE IS AN EXISTING IMAGE AND NEW IMAGE IS SELECTED 
        if (image && oldImgRef) {
            // THEN DELETE THE OLD IMAGE
            const oldFileRef = ref(storage, oldImgRef);
            await deleteObject(oldFileRef);
            imgFile = await uploadImage();
            // IF THERE IS AN IMAGE BUT NO OLD IMAGE
        } else if (image && !oldImgRef) {
            imgFile = await uploadImage();
        }

        updateProfileName({
            new_displayName : values.displayName,
        });
        updateProfileEmail({new_email: values.email});
        updateProfilePassword({new_password: values.password});
        Alert.alert("SUCCESS", "Profile Updated");

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
                        placeholder: "Edit Profile Name",
                        onChangeText: formik.handleChange("displayName"),
                        value: formik.values.displayName,
                    }}
                    customLabel="Profile Name:"
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
                <ButtonIcon
                    name={ICON_NAMES.SYSTEM_ICONS.USERPROFILE}
                    iconColor={colors.primary.colorFive}
                    type={"filled"}
                    imageUri={{ uri: image ? image.uri : currentPhotoURL }}
                    onPress={chooseImage}
                    filename={filename}
                    iconSize={100}
                />
                <ButtonHolder>
                    <EditButtonGroup />
                </ButtonHolder>
            </FunctionContainer>
        </EditProfileContainer>
    )
}

export default EditProfileScreen