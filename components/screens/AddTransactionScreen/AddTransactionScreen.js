// LIBRARY IMPORTS
import React, { useState } from "react";
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
import colors from "assets/themes/colors";
import useTransactionStore from "hooks/useTransactionStore";
import useUploadImage from "hooks/useUploadImage";
import useType from "hooks/useType";
import { Alert } from "react-native";
import useAuthStore from "hooks/useAuthStore";
import useCategoriesListener from "hooks/useCategoriesListener";
import useAccountStore from "hooks/useAccountStore";
import capitalize from "util/capitalize";

const AddTransactionScreen = ({ navigation }) => {
    let photoId = uuid.v4(); // unique id for the photo file name in storage
    const user = useAuthStore(state => state.user);
    const [isExpense, setIsExpense] = useType();
    const [categories] = useCategoriesListener(user.user_id, isExpense);
    const addTransaction = useTransactionStore(state => state.addTransaction);
    const userAccounts = useAccountStore(state => state.accounts);
    // Upload Hook 
    const [image, chooseImage, uploadImage, filename] = useUploadImage(photoId, "transaction/");
    const [selectedIcon, setSelectedIcon] = useState({
        label: "",
        icon: "",
        currentIcon: "",
        id: ""
    });
    const [date, setDate] = useState(new Date()); // Initial state will always be today 
    const [accountItems, setAccountItems] = useState(() => {
        const accounts = userAccounts.map(account => ({ label: capitalize(account.account_name), value: account.id }));
        return accounts;
    }
    );
    const [selectedAccount, setSelectedAccount] = useState("");


    const handleIconPress = (icon) => {
        setSelectedIcon(icon);
        formik.setFieldValue("categoryName", icon.label);
        formik.setFieldValue("transactionIcon", icon.currentIcon);
        formik.setFieldValue("transactionColor", icon.color);
    };

    const handleFormikSubmit = async (values, { resetForm }) => {
        // console.log(values);
        let imgFile;
        values.type = !isExpense ? "expense" : "income";

        if (image) {
            imgFile = await uploadImage();
        }
        addTransaction({
            amount: Number(values.amount),
            category_name: values.categoryName,
            comment_img_ref: imgFile ? imgFile.imgRef : "",
            comment_img: imgFile ? imgFile.imgUri : "",
            comments: values.comments,
            account_name: values.accountName,
            target_account: values.targetAccount,
            transaction_icon: values.transactionIcon,
            transaction_color: values.transactionColor,
            category_id: selectedIcon.id,
            user_id: user.user_id,
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
        targetAccountId: "",
        accountName: ""
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleFormikSubmit,
    });

    const handleSelectDate = (event, selectedDate) => {
        // console.log(selectedDate);
        setDate(selectedDate);
    };

    let isSubmitDisabled = Number(formik.values.amount) <= 0 || !formik.values.targetAccount || !formik.values.categoryName;

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
                        onChangeValue: (value) => {
                            // console.log("dropdown:", value);
                            formik.setFieldValue("targetAccount", value);
                            const targetAccount = accountItems.find(item => item.value === value);
                            // console.log(targetAccount);
                            formik.setFieldValue("accountName", targetAccount.label);

                        }
                    }}
                    width="100%"
                    setValue={setSelectedAccount}
                    value={selectedAccount}
                />

                <ScrollContainer>
                    <TransactionCategoryHolder>
                        <IconSelector
                            iconData={categories}
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
                                disabled: isSubmitDisabled,
                            }}
                        />
                    </ButtonHolder>
                </ScrollContainer>
            </TransactionFormHolder>
        </AddTransactionScreenContainer>
    );
};

export default AddTransactionScreen;
