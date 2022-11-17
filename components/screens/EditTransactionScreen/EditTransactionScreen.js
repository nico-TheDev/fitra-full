// LIBRARY IMPORTS
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import uuid from 'react-native-uuid';
import { deleteObject, ref } from "firebase/storage";

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
import { Alert } from "react-native";
import convertTimestamp from "util/convertTimestamp";
import useUploadImage from "hooks/useUploadImage";

const EditTransactionScreen = ({ route, navigation }) => {
    const { transactionID } = route.params;
    const transactionList = useTransactionData(state => state.transactions);
    const deleteTransaction = useTransactionData(state => state.deleteTransaction);
    const updateTransaction = useTransactionData(state => state.updateTransaction);
    const [currentTransaction, setCurrentTransaction] = useState(() => {
        return transactionList.find(transaction => transaction.id === transactionID);
    });
    const [date, setDate] = useState(convertTimestamp(currentTransaction.created_at));
    const photoId = uuid.v4();
    const [image, chooseImage, uploadImage, filename, imgSrc] = useUploadImage(photoId, "transaction/");

    const initialValues = {
        amount: String(currentTransaction.amount),
        type: currentTransaction.type,
        targetAccount: currentTransaction.target_account,
        transactionIcon: currentTransaction.transaction_icon,
        transactionColor: currentTransaction.transaction_color,
        categoryName: currentTransaction.category_name,
        comments: currentTransaction.comments,

    };

    const [selectedIcon, setSelectedIcon] = useState("");
    const [isExpense, setIsExpense] = useState(currentTransaction.type === "expense");
    let [categoryData, setCategoryData] = useState([]);
    const [accountItems, setAccountItems] = useState([
        { label: "Wallet", value: "wallet" },
        { label: "GCASH", value: "gcash" },
        { label: "UnionBank", value: "unionbank" },
    ]);

    useEffect(() => {
        const targetTransaction = transactionList.find(transaction => transaction.id === transactionID);
        console.log(targetTransaction);
        setCurrentTransaction(targetTransaction);
        setSelectedIcon({
            label: currentTransaction.category_name,
            icon: currentTransaction.transaction_icon,
            color: currentTransaction.transaction_color,
            currentIcon: currentTransaction.transaction_icon
        });
    }, [transactionID]);

    // TODO: FIX THE MIXUP BETWEEN EXPENSE AND INCOME
    // TODO: CREATE A CUSTOM HOOK FOR THIS
    useEffect(() => {
        // INCOME TYPE
        if (isExpense) {
            setCategoryData(
                categories.filter(
                    (item) => item.type === "expense" && item.userID === "1"
                )
            );
        }
        // EXPENSE TYPE
        else {
            setCategoryData(
                categories.filter(
                    (item) => item.type === "income" && item.userID === "1"
                )
            );
        }
    }, [isExpense]);

    useEffect(() => {

    }, []);

    const handleIconPress = (icon) => {
        setSelectedIcon(icon);
        formik.setFieldValue("transactionIcon", icon);
    };

    const handleFormikSubmit = async (values) => {
        values.transactionType = isExpense ? "expense" : "income";
        let imgFile;
        let oldImgRef = currentTransaction.comment_img_ref;

        // IF THERE IS AN EXISTING IMAGE AND NEW IMAGE IS SELECTED 
        if (image && oldImgRef) {
            // THEN DELETE THE OLD IMAGE
            const oldFileRef = ref(storage, oldImgRef);
            await deleteObject(oldFileRef);
            imgFile = await uploadImage();
        } else if (image && !oldImgRef) {
            imgFile = await uploadImage();
        }


        let updatedImgRef = imgFile ? imgFile.imgRef : currentTransaction.comment_img_ref;
        let updatedImg = imgFile ? imgFile.imgUri : currentTransaction.comment_img;
        const newTransaction = {
            amount: Number(values.amount),
            category_name: values.categoryName,
            comment_img_ref: updatedImgRef,
            comment_img: updatedImg,
            comments: values.comments,
            target_account: values.targetAccount,
            transaction_icon: values.transactionIcon,
            transaction_color: values.transactionColor,
            user_id: uuid.v4(),
            type: values.type,
            created_at: date
        };
        updateTransaction(transactionID, newTransaction);

        Alert.alert("SUCCESS", "Document Updated");

        // console.log({ newTransaction });
        // console.log(currentTransaction.comment_img_ref);
        // console.log(values);
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
        console.log(selectedDate);
        setDate(selectedDate);
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
                            iconData={categoryData}
                            onPress={handleIconPress}
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
