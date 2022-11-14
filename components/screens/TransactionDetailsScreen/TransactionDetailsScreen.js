import React, { useState } from "react";
import { Formik } from "formik";
import { useEffect } from "react";

import { FormContainer, TransactionDetailsContainer } from "./styles";
import ScreenHeader from "components/ScreenHeader";
import CustomTextInput from "components/CustomTextInput";
import CustomDatePicker from "components/CustomDatePicker";
import formatDate from "fitra/util/formatDate";
import CustomDropdown from "components/CustomDropdown";
import { categories } from "fitra/SampleData";
import CommentInput from "components/CommentInput";
import Button from "components/Button";
import useTransactionData from "hooks/useTransactionData";

const TransactionDetailsScreen = ({ route, navigation }) => {
    const { transactionID } = route.params;
    const [currentTransaction, setCurrentTransaction] = useState({});
    const transactionList = useTransactionData(state => state.transactions);
    const [date, setDate] = useState(new Date());
    const [categoryList, setCategoryList] = useState(() => {
        return categories.map((item, index) => {
            return {
                ...item,
                label: item.categoryName,
                value: item.categoryIcon,
                userId: index,
            };
        });
    });
    const [accountList, setAccountList] = useState([
        { label: "Wallet", value: "wallet" },
        { label: "GCASH", value: "gcash" },
        { label: "UnionBank", value: "unionbank" },
    ]);
    const initialValues = {
        amount: currentTransaction.amount,
        accountName: currentTransaction.targetAccount,
        categoryName: currentTransaction.categoryName,
        date: "",
        comment: currentTransaction.comments,
        commentImg: "",
    };


    useEffect(() => {
        const targetTransaction = transactionList.find(transaction => transaction.id === transactionID);
        console.log(targetTransaction);
        setCurrentTransaction(targetTransaction);
    }, [transactionID])

    return (
        <TransactionDetailsContainer>
            <ScreenHeader title="Transaction Details" />

            <FormContainer>
                <CustomTextInput
                    customLabel="Amount: "
                    inputProps={{
                        value: String(currentTransaction.amount),
                        editable: false,
                    }}
                />
                <CustomDropdown
                    dropdownItems={accountList}
                    setDropdownItems={setAccountList}
                    dropdownProps={{
                        placeholder: "Choose Account",
                        zIndex: 3000,
                        zIndexInverse: 1000,
                        disabled: true,
                        value: currentTransaction.targetAccount
                    }}
                    customLabel="Account"
                />
                <CustomDropdown
                    dropdownItems={categoryList}
                    setDropdownItems={setCategoryList}
                    dropdownProps={{
                        placeholder: "Select Category",
                        zIndex: 1000,
                        zIndexInverse: 3000,
                        itemKey: "userId",
                        disabled: true,
                        value: currentTransaction.transactionIcon
                    }}
                    customLabel="Category"
                />
                <CustomDatePicker
                    date={date}
                    buttonProps={{ disabled: true }}
                />

                <CommentInput
                    customLabel="Comments:"
                    inputProps={{
                        value: currentTransaction.comments,
                        placeholder: "Add a comment",
                        editable: false,
                    }}
                />

                <Button
                    title="Edit"
                    noBorder={false}
                    width="50%"
                    styles={{ marginLeft: "auto" }}
                    textSize={16}
                    onPress={() =>
                        navigation.navigate("Dashboard", {
                            screen: "EditTransaction",
                            params: { transactionID }
                        })
                    }
                />
            </FormContainer>

        </TransactionDetailsContainer>
    );
};

export default TransactionDetailsScreen;
