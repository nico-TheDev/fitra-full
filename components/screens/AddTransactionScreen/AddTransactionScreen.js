// LIBRARY IMPORTS
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import uuid from 'react-native-uuid';

// LOCAL IMPORTS
import SwitchCategory from "components/SwitchCategory";
import CustomDropdown from "components/CustomDropdown";
import CommentInput from "components/CommentInput";
import IconSelector from "components/IconSelector";
import Button from "components/Button";
import CustomDatePicker from "components/CustomDatePicker";

import ScreenHeader from "components/ScreenHeader";
import {
    AddTransactionScreenContainer,
    TransactionAmountInput,
    TransactionPanelHolder,
    SwitchCategoryHolder,
    TransactionFormHolder,
    TransactionCategoryHolder,
    ButtonHolder,
    ScrollContainer,
} from "./styles";
import { categories } from "fitra/SampleData";
import colors from "assets/themes/colors";
import useTransactionData from "hooks/useTransactionData";
import useUploadImage from "hooks/useUploadImage";
import useType from "hooks/useType";
import { Alert } from "react-native";

const AddTransactionScreen = ({ navigation }) => {
    let photoId = uuid.v4(); // unique id for the photo file name in storage
    const addTransaction = useTransactionData(state => state.addTransaction);
    // Upload Hook 
    const [image, chooseImage, uploadImage, filename] = useUploadImage(photoId, "transaction/");
    const [isExpense, setIsExpense, categoryList] = useType(categories);
    const [selectedIcon, setSelectedIcon] = useState({
        label: "",
        icon: "",
        currentIcon: "",
    });
    const [date, setDate] = useState(new Date()); // Initial state will always be today 
    // TODO: To be replaced with actual data
    const [accountItems, setAccountItems] = useState([
        { label: "Wallet", value: "wallet" },
        { label: "GCASH", value: "gcash" },
        { label: "UnionBank", value: "unionbank" },
    ]);


    const handleIconPress = (icon) => {
        setSelectedIcon(icon);
        formik.setFieldValue("transactionIcon", icon.currentIcon);
        formik.setFieldValue("categoryName", icon.label);
        formik.setFieldValue("transactionColor", icon.color);
    };

    const handleFormikSubmit = async (values, { resetForm }) => {
        console.log(values);
        let imgFile;
        values.type = isExpense ? "expense" : "income";
        if (image) {
            imgFile = await uploadImage();
        }
        addTransaction({
            amount: Number(values.amount),
            category_name: values.categoryName,
            comment_img_ref: imgFile ? imgFile.imgRef : "",
            comment_img: imgFile ? imgFile.imgUri : "",
            comments: values.comments,
            target_account: values.targetAccount,
            transaction_icon: values.transactionIcon,
            transaction_color: values.transactionColor,
            user_id: uuid.v4(),
            type: values.type,
            created_at: date
        });
        resetForm();
        Alert.alert("Success", "Transaction Created.");
        navigation.navigate("Dashboard", { screen: "DashboardMain" });
    };

    const initialValues = {
        amount: "",
        type: "",
        targetAccount: "",
        transactionIcon: "",
        transactionColor: "",
        categoryName: "",
        comments: "",
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
        <AddTransactionScreenContainer>
            <ScreenHeader title="Add Transaction" />
            <TransactionPanelHolder>
                <TransactionAmountInput
                    placeholder="00.00"
                    keyboardType="numeric"
                    placeholderTextColor={colors.white}
                    value={formik.values.amount}
                    onChangeText={formik.handleChange("amount")}
                />
                <SwitchCategoryHolder>
                    <SwitchCategory
                        isEnabled={isExpense}
                        setIsEnabled={setIsExpense}
                        type="dark"
                    />
                </SwitchCategoryHolder>
            </TransactionPanelHolder>

            <TransactionFormHolder>
                <CustomDropdown
                    dropdownItems={accountItems}
                    setDropdownItems={setAccountItems}
                    dropdownProps={{
                        placeholder: "Choose Account",
                        zIndex: 3000,
                        zIndexInverse: 1000,
                        onChangeValue:
                            formik.handleChange("targetAccount"),
                    }}
                    width="100%"
                />

                <ScrollContainer>
                    <TransactionCategoryHolder>
                        <IconSelector
                            iconData={categoryList}
                            handlePress={handleIconPress}
                            selectedIcon={selectedIcon}
                        />
                    </TransactionCategoryHolder>
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
                    <ButtonHolder>
                        <Button
                            width="100%"
                            title={"Add"}
                            type={"filled"}
                            rounded={"10px"}
                            onPress={formik.handleSubmit}
                            buttonProps={{
                                disabled: !formik.values.amount && !formik.values.targetAccount && !formik.values.categoryName,
                            }}
                        />
                    </ButtonHolder>
                </ScrollContainer>
            </TransactionFormHolder>
        </AddTransactionScreenContainer>
    );
};

export default AddTransactionScreen;
