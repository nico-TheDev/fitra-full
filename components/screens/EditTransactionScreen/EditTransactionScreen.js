// LIBRARY IMPORTS
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import uuid from 'react-native-uuid';
import { deleteObject, ref } from "firebase/storage";
import { Alert } from "react-native";

// firebase
import { storage } from "fitra/firebase.config";

// LOCAL IMPORTS
import SwitchCategory from "components/SwitchCategory";
import CustomDropdown from "components/CustomDropdown";
import CommentInput from "components/CommentInput";
import IconSelector from "components/IconSelector";
import Button from "components/Button";

import ScreenHeader from "components/ScreenHeader";
import CustomDatePicker from "components/CustomDatePicker";
import {
    EditTransactionScreenContainer,
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
import convertTimestamp from "util/convertTimestamp";
import useUploadImage from "hooks/useUploadImage";
import useType from "hooks/useType";

const EditTransactionScreen = ({ route, navigation }) => {
    // Transaction State 
    const { transactionID } = route.params;
    const transactionList = useTransactionData(state => state.transactions);
    const deleteTransaction = useTransactionData(state => state.deleteTransaction);
    const updateTransaction = useTransactionData(state => state.updateTransaction);
    const [currentTransaction, setCurrentTransaction] = useState(() => {
        return transactionList.find(transaction => transaction.id === transactionID);
    });

    const photoId = uuid.v4(); // unique id for new image
    const [date, setDate] = useState(convertTimestamp(currentTransaction.created_at));
    const [image, chooseImage, uploadImage, filename] = useUploadImage(photoId, "transaction/");
    const [isExpense, setIsExpense, categoryList] = useType(categories, currentTransaction.type === "expense");
    const [selectedIcon, setSelectedIcon] = useState({
        label: "",
        icon: "",
        currentIcon: "",
    });
    const [accountItems, setAccountItems] = useState([
        { label: "Wallet", value: "wallet" },
        { label: "GCASH", value: "gcash" },
        { label: "UnionBank", value: "unionbank" },
    ]);
    // MANAGE THE STATE AFTER FIRST MOUNT
    useEffect(() => {
        const targetTransaction = transactionList.find(transaction => transaction.id === transactionID);
        // console.log(targetTransaction);
        setCurrentTransaction(targetTransaction);
        setSelectedIcon({
            label: currentTransaction.category_name,
            icon: currentTransaction.transaction_icon,
            color: currentTransaction.transaction_color,
            currentIcon: currentTransaction.transaction_icon
        });
    }, [transactionID]);


    const handleIconPress = (icon) => {
        setSelectedIcon(icon);
        formik.setFieldValue("categoryName", icon.label);
        formik.setFieldValue("transactionIcon", icon);
    };

    const handleFormikSubmit = async (values) => {
        let imgFile,
            oldImgRef = currentTransaction.comment_img_ref;

        values.transactionType = isExpense ? "expense" : "income";

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
        let updatedImgRef = imgFile ? imgFile.imgRef : currentTransaction.comment_img_ref;
        let updatedImg = imgFile ? imgFile.imgUri : currentTransaction.comment_img;
        const transactionIcon = values.icon === currentTransaction.transaction_icon ? currentTransaction.transaction_icon : selectedIcon.currentIcon;
        const categoryName = values.categoryName === currentTransaction.category_name ? currentTransaction.category_name : selectedIcon.label;
        const newTransaction = {
            amount: Number(values.amount),
            category_name: categoryName,
            comment_img_ref: updatedImgRef,
            comment_img: updatedImg,
            comments: values.comments,
            target_account: values.targetAccount,
            transaction_icon: transactionIcon,
            transaction_color: values.transactionColor,
            user_id: uuid.v4(), // TODO: Replace with actual user_id once auth is implemented
            type: values.type,
            created_at: date
        };
        updateTransaction(transactionID, newTransaction);
        Alert.alert("SUCCESS", "Document Updated");
        navigation.navigate("Dashboard", { screen: "DashboardMain" });
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
        deleteTransaction(transactionID, currentTransaction.comment_img_ref);
        Alert.alert("Success", "Item Deleted.");
        navigation.navigate("Dashboard", { screen: "DashboardMain" });
    };

    const handleSelectDate = (event, selectedDate) => {
        // console.log(selectedDate);
        setDate(selectedDate);
    };

    const initialValues = {
        amount: String(currentTransaction.amount),
        type: currentTransaction.type,
        targetAccount: currentTransaction.target_account,
        transactionIcon: currentTransaction.transaction_icon,
        transactionColor: currentTransaction.transaction_color,
        categoryName: currentTransaction.category_name,
        comments: currentTransaction.comments,
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleFormikSubmit,
    });

    return (
        <EditTransactionScreenContainer>
            <ScreenHeader title="Edit Transaction" />
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
                <ScrollContainer>
                    <CustomDropdown
                        dropdownItems={accountItems}
                        setDropdownItems={setAccountItems}
                        dropdownProps={{
                            placeholder: "Choose Account",
                            zIndex: 3000,
                            zIndexInverse: 1000,
                            value: formik.values.targetAccount,
                            onChangeValue:
                                formik.handleChange("targetAccount"),
                        }}
                        width="100%"
                    />
                    <TransactionCategoryHolder>
                        <IconSelector
                            iconData={categoryList}
                            handlePress={handleIconPress}
                            selectedIcon={selectedIcon}
                            setSelectedIcon={setSelectedIcon}
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
                            value: formik.values.comments,
                            onChangeText: formik.handleChange("comments"),
                        }}
                        imageUri={{ uri: image ? image.uri : currentTransaction.comment_img }}
                        onPress={chooseImage}
                        filename={filename}
                    />
                    <ButtonHolder>
                        <Button
                            width="45%"
                            title={"DELETE"}
                            type={"outlined"}
                            noBorder={false}
                            rounded={"10px"}
                            onPress={showDeletePrompt}
                        />
                        <Button
                            width="45%"
                            title={"SAVE"}
                            type={"filled"}
                            rounded={"10px"}
                            onPress={formik.handleSubmit}
                        />
                    </ButtonHolder>
                </ScrollContainer>
            </TransactionFormHolder>
        </EditTransactionScreenContainer>
    );
};

export default EditTransactionScreen;
