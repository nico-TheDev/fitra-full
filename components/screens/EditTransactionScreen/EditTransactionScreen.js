// LIBRARY IMPORTS
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
// LOCAL IMPORTS
import SwitchCategory from "components/SwitchCategory";
import CustomDropdown from "components/CustomDropdown";
import CommentInput from "components/CommentInput";
import IconSelector from "components/IconSelector";
import Button from "components/Button";

import ScreenHeader from "components/ScreenHeader";
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

const EditTransactionScreen = ({ route, navigation }) => {
    const { transactionID } = route.params;
    const transactionList = useTransactionData(state => state.transactions);
    const deleteTransaction = useTransactionData(state => state.deleteTransaction);
    const [currentTransaction, setCurrentTransaction] = useState(() => {
        return transactionList.find(transaction => transaction.id === transactionID);
    });

    const initialValues = {
        amount: String(currentTransaction.amount),
        transactionType: currentTransaction.type,
        transactionAccount: currentTransaction.target_account,
        transactionIcon: currentTransaction.transaction_icon,
        categoryName: currentTransaction.category_name,
        comment: currentTransaction.comments,
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

    const handleFormikSubmit = (values) => {
        if (isExpense) {
            values.transactionType = "expense";
        } else {
            values.transactionType = "income";
        }

        console.log(values);
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

    const formik = useFormik({
        initialValues: initialValues,
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
                            value: formik.values.transactionAccount,
                            onChangeValue:
                                formik.handleChange("transactionAccount"),
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

                    <CommentInput
                        customLabel={"Comments"}
                        inputProps={{
                            placeholder: "Add a comment",
                            value: formik.values.comment,
                            onChangeText: formik.handleChange("comment"),
                        }}
                        imageUri={{ uri: currentTransaction.comment_img }}
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
