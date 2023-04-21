//LIBRARY IMPORTS
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Alert } from "react-native";
import uuid from 'react-native-uuid';
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
// firebase
import { storage } from "fitra/firebase.config";
import { deleteObject, ref } from "firebase/storage";

// LOCAL IMPORTS
import CustomTextInput from "components/CustomTextInput";
import CustomDropdown from "components/CustomDropdown";
import CommentInput from "components/CommentInput";
import CustomDatePicker from "components/CustomDatePicker";
import formatDate from "fitra/util/formatDate";
import Button from "components/Button";

import { ICON_NAMES } from "constants/constant";

import ScreenHeader from "components/ScreenHeader";
import { AccountsContainer, ScrollContainer, SaveAndDeleteContainer } from "./styles";

import convertTimestamp from "util/convertTimestamp";

import useAuthStore from "hooks/useAuthStore";
import useTransferStore from "hooks/useTransferStore";
import useUploadImage from "hooks/useUploadImage";
import useAccountStore from "hooks/useAccountStore";
import capitalize from "util/capitalize";

const AccountsEditTransferScreen = ({ route }) => {
    const { transferID } = route.params;
    const [mode, setMode] = useState("details");
    const navigation = useNavigation();

    // GLOBAL STATES
    const user = useAuthStore((state) => state.user);
    const transferList = useTransferStore((state) => state.transfers);
    const deleteTransfer = useTransferStore((state) => state.deleteTransfer);
    const updateTransfer = useTransferStore((state) => state.updateTransfer);
    const [currentTransfer, setCurrentTransfer] = useState(() =>
        transferList.find((transfer) => transfer.id === transferID)
    );
    const userAccounts = useAccountStore((state) => state.accounts);

    const photoId = uuid.v4(); // unique id for new image
    const [date, setDate] = useState(convertTimestamp(currentTransfer?.created_at));
    const [image, chooseImage, uploadImage, filename] = useUploadImage(photoId, "transfer/");

    const [senderItems, setSenderItems] = useState(() => {
        const accounts = userAccounts.map((account) => ({
            label: capitalize(account.account_name),
            value: account.id,
        }));
        return accounts;
    });
    const [selectedSender, setSelectedSender] = useState("");
    const [selectedReceiver, setSelectedReceiver] = useState("");
    const [receiverItems, setReceiverItems] = useState(() => {
        const accounts = userAccounts.map((account) => ({
            label: capitalize(account.account_name),
            value: account.id,
        }));
        return accounts;
    });

    // MANAGE THE STATE AFTER FIRST MOUNT
    useEffect(() => {
        const targetTransfer = transferList.find((transfer) => transfer.id === transferID);
        console.log(targetTransfer);
        setCurrentTransfer(targetTransfer);
        setSelectedSender(targetTransfer.sender_account_id);
        setSelectedReceiver(targetTransfer.receiver_account_id);
    }, [transferID]);

    const handleFormikSubmit = async (values) => {
        let imgFile,
            oldImgRef = currentTransfer.comment_img_ref;

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

        // Updates the img refs if there's a selected image or the current ref
        let updatedImgRef = imgFile ? imgFile.imgRef : currentTransfer.comment_img_ref;
        let updatedImg = imgFile ? imgFile.imgUri : currentTransfer.comment_img;

        const newTransfer = {
            transfer_amount: String(values.transferAmount),
            sender_account_id: values.senderAccountId,
            sender_account_name: values.senderAccountName,
            receiver_account_id: values.receiverAccountId,
            receiver_account_name: values.receiverAccountName,
            comment_img_ref: updatedImgRef,
            comment_img: updatedImg,
            comments: values.comments,
            user_id: user.user_id,
            created_at: date,
        };
        updateTransfer(transferID, newTransfer);
        // Alert.alert("SUCCESS", "Document Updated");
        Toast.show({
            type: "success",
            text1: "Status",
            text2: "Transfer Details Updated",
        });
        navigation.navigate("Accounts", { screen: "AccountsMain" });
    };

    const showDeletePrompt = () => {
        Alert.alert("Deleting file", "Are you sure ?", [
            {
                text: "Yes",
                onPress: handleDelete,
                style: "destructive",
            },
            {
                text: "No",
                onPress: () => {},
                style: "cancel",
            },
        ]);
    };

    const handleDelete = () => {
        deleteTransfer(transferID, currentTransfer.comment_img_ref);
        // Alert.alert("Success", "Item Deleted.");
        Toast.show({
            type: "success",
            text1: "Status",
            text2: "Transfer Details Deleted",
        });
        navigation.navigate("Accounts", { screen: "AccountsTransferHistoryScreen" });
    };

    const handleSelectDate = (event, selectedDate) => {
        setDate(selectedDate);
    };

    const initialValues = {
        senderAccountId: currentTransfer.sender_account_id,
        senderAccountName: currentTransfer.sender_account_name,
        receiverAccountId: currentTransfer.receiver_account_id,
        receiverAccountName: currentTransfer.receiver_account_name,
        transferAmount: String(currentTransfer.transfer_amount),
        fromAccount: currentTransfer.from_account,
        toAccount: currentTransfer.to_account,
        comments: currentTransfer.comments,
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleFormikSubmit,
    });

    const SaveAndDeleteButton = () => (
        <SaveAndDeleteContainer>
            <Button
                type="filled"
                width="45%"
                title="Save"
                rounded="8px"
                textSize={14}
                noBorder={false}
                onPress={formik.handleSubmit}
                styles={{
                    marginRight: "auto",
                }}
            />
            <Button
                width="45%"
                title="Delete"
                rounded="8px"
                textSize={14}
                noBorder={false}
                onPress={showDeletePrompt}
                styles={{
                    marginLeft: "auto",
                }}
            />
        </SaveAndDeleteContainer>
    );

    // GET INITIAL VALUES HERE

    return (
        <AccountsContainer>
            <ScreenHeader title={mode === "edit" ? "Edit Transfer" : "Transfer Details"} />
            <CustomDropdown
                width="90%"
                dropdownItems={senderItems}
                setDropdownItems={setSenderItems}
                dropdownProps={{
                    placeholder: "Choose Source Account",
                    zIndex: 3000,
                    zIndexInverse: 1000,
                    onChangeValue: (value) => {
                        console.log(value);
                    },
                    onSelectItem: (item) => {
                        formik.setFieldValue("fromAccount", item.value);
                    },
                    disabled: mode === "edit" ? false : true,
                    value: formik.values.senderAccountId,
                }}
                customLabel="Transfer From Account"
                setValue={setSelectedSender}
                value={selectedSender}
            />
            <CustomDropdown
                width="90%"
                dropdownItems={receiverItems}
                setDropdownItems={setReceiverItems}
                dropdownProps={{
                    placeholder: "Choose Receiving Account",
                    zIndex: 1000,
                    zIndexInverse: 3000,
                    onChangeValue: (value) => {
                        console.log(value);
                    },
                    onSelectItem: (item) => {
                        formik.setFieldValue("toAccount", item.value);
                    },
                    disabled: mode === "edit" ? false : true,
                    value: formik.values.receiverAccountId,
                }}
                customLabel="Transfer to Account"
                setValue={setSelectedReceiver}
                value={selectedReceiver}
            />
            <ScrollContainer centerContent={true}>
                <CustomTextInput
                    inputProps={{
                        placeholder: "Enter Amount",
                        onChangeText: formik.handleChange("transferAmount"),
                        value: String(formik.values.transferAmount),
                        keyboardType: "numeric",
                        editable: mode !== "edit" ? false : true,
                    }}
                    customLabel="Transfer Amount"
                />
                <CustomDatePicker
                    date={date}
                    buttonProps={{ disabled: mode === "edit" ? false : true }}
                    onChange={handleSelectDate}
                />
                <CommentInput
                    inputProps={{
                        placeholder: "Add Comment... ",
                        onChangeText: formik.handleChange("comments"),
                        value: formik.values.comments,
                        editable: mode !== "edit" ? false : true,
                    }}
                    customLabel="Comment"
                    imageUri={{ uri: image ? image.uri : currentTransfer.comment_img }}
                    onPress={chooseImage}
                    filename={filename}
                />
                {mode !== "edit" ? (
                    <Button
                        width="50%"
                        title="Edit"
                        rounded="8px"
                        textSize={14}
                        noBorder={false}
                        onPress={() => setMode("edit")}
                        styles={{
                            marginLeft: "auto",
                        }}
                    />
                ) : (
                    <SaveAndDeleteButton />
                )}
            </ScrollContainer>
        </AccountsContainer>
    );
};

export default AccountsEditTransferScreen;
