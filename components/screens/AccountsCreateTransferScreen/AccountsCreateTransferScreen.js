//LIBRARY IMPORTS
import React, { useState } from "react";
import { Alert } from "react-native";
import { useFormik } from "formik";
import uuid from 'react-native-uuid';
import Toast from "react-native-toast-message";

// LOCAL IMPORTS
import Button from "components/Button";
import CustomTextInput from "components/CustomTextInput";
import CustomDropdown from "components/CustomDropdown";
import CommentInput from "components/CommentInput";
import CustomDatePicker from "components/CustomDatePicker";

import ScreenHeader from "components/ScreenHeader";
import { AccountsContainer, ScrollContainer } from "./styles";

import formatDate from "fitra/util/formatDate";
import { ICON_NAMES } from "constants/constant";

import useAuthStore from "hooks/useAuthStore";
import useUploadImage from "hooks/useUploadImage";
import useTransferStore from "hooks/useTransferStore";
import useAccountStore from "hooks/useAccountStore";
import capitalize from "util/capitalize";

const AccountsCreateTransferScreen = ({ navigation }) => {
    let photoId = uuid.v4();
    const user = useAuthStore((state) => state.user);
    const transfers = useTransferStore((state) => state.transfers);
    const addTransfer = useTransferStore((state) => state.addTransfer);
    const userAccounts = useAccountStore((state) => state.accounts);

    const [image, chooseImage, uploadImage, filename] = useUploadImage(photoId, "transfer/");
    // DATE VALUE is current Date
    const [date, setDate] = useState(new Date());

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

    const handleFormikSubmit = async (values, { resetForm }) => {
        // console.log(values);
        let imgFile;

        if (image) {
            imgFile = await uploadImage();
        }
        addTransfer({
            sender_account_id: values.senderAccountId,
            sender_account_name: values.senderAccountName,
            receiver_account_id: values.receiverAccountId,
            receiver_account_name: values.receiverAccountName,
            transfer_amount: Number(values.transferAmount),
            comment_img_ref: imgFile ? imgFile.imgRef : "",
            comment_img: imgFile ? imgFile.imgUri : "",
            comments: values.comments,
            user_id: user.user_id,
            created_at: date,
        });
        console.log(values);
        resetForm();
        Toast.show({
            type: "success",
            text1: "Success",
            text2: "Transfer Created.",
        });
        // Alert.alert("Success", "Transfer Created.");
        navigation.navigate("Accounts", { screen: "AccountsMain" });
    };

    const initialValues = {
        senderAccountId: "",
        senderAccountName: "",
        receiverAccountId: "",
        receiverAccountName: "",
        transferAmount: "",
        date,
        comments: "",
        commentImg: "",
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleFormikSubmit,
    });

    const handleSelectDate = (event, selectedDate) => {
        // console.log(selectedDate);
        setDate(selectedDate);
    };

    return (
        <AccountsContainer>
            <ScreenHeader title="Create Transfer" />
            <CustomDropdown
                width="90%"
                dropdownItems={senderItems}
                setDropdownItems={setSenderItems}
                dropdownProps={{
                    placeholder: "Choose Source Account",
                    zIndex: 3000,
                    zIndexInverse: 1000,
                    onChangeValue: (value) => {
                        formik.setFieldValue("senderAccountId", value);
                        const targetAccount = senderItems.find((item) => item.value === value);
                        formik.setFieldValue("senderAccountName", targetAccount.label);
                    },
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
                        formik.setFieldValue("receiverAccountId", value);
                        const targetAccount = receiverItems.find((item) => item.value === value);
                        formik.setFieldValue("receiverAccountName", targetAccount.label);
                    },
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
                        keyboardType: "numeric",
                    }}
                    iconName={ICON_NAMES.SENDMONEY}
                    customLabel="Transfer Amount"
                />
                <CustomDatePicker
                    date={date}
                    buttonProps={{ disabled: false }}
                    onChange={handleSelectDate}
                />
                <CommentInput
                    customLabel={"Comments"}
                    inputProps={{
                        placeholder: "Add a comment",
                        value: formik.values.comment,
                        onChangeText: formik.handleChange("comments"),
                    }}
                    imageUri={image}
                    onPress={chooseImage}
                    filename={filename}
                />
                {/* SUBMIT BUTTON */}
                <Button
                    width="100%"
                    title={"Submit"}
                    type={"filled"}
                    rounded={"10px"}
                    textSize={14}
                    noBorder={false}
                    onPress={formik.handleSubmit}
                />
            </ScrollContainer>
        </AccountsContainer>
    );
};

export default AccountsCreateTransferScreen;
