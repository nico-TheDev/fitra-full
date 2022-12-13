import React, { useState } from "react";
import { useEffect } from "react";

import { FormContainer, TransactionDetailsContainer } from "./styles";
import ScreenHeader from "components/ScreenHeader";
import CustomTextInput from "components/CustomTextInput";
import CommentInput from "components/CommentInput";
import Button from "components/Button";
import useTransactionStore from "hooks/useTransactionStore";
import formatDate from "fitra/util/formatDate";
import convertTimestamp from "util/convertTimestamp";

const TransactionDetailsScreen = ({ route, navigation }) => {
    const { transactionID } = route.params;
    const [currentTransaction, setCurrentTransaction] = useState({});
    const transactionList = useTransactionStore(state => state.transactions);

    useEffect(() => {
        const targetTransaction = transactionList.find(transaction => transaction.id === transactionID);
        // console.log(targetTransaction);
        setCurrentTransaction(targetTransaction);
    }, [transactionID]);

    const handleEditNavigation = () =>
        navigation.navigate("Dashboard", {
            screen: "EditTransaction",
            params: { transactionID }
        });

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
                <CustomTextInput
                    customLabel="Account: "
                    inputProps={{
                        value: currentTransaction.target_account,
                        editable: false,
                    }}
                    iconName="account-icon"

                />
                <CustomTextInput
                    customLabel="Category: "
                    inputProps={{
                        value: currentTransaction.category_name,
                        editable: false,
                    }}
                    iconName={currentTransaction.transaction_icon}
                />

                <CustomTextInput
                    customLabel="Date: "
                    inputProps={{
                        value: formatDate(convertTimestamp(currentTransaction.created_at)),
                        editable: false,
                    }}
                    iconName="calendar-icon"
                />

                <CommentInput
                    customLabel="Comments:"
                    inputProps={{
                        value: currentTransaction.comments,
                        placeholder: "Add a comment",
                        editable: false,
                    }}
                    imageUri={{ uri: currentTransaction.comment_img }}
                />

                <Button
                    title="Edit"
                    noBorder={false}
                    width="45%"
                    styles={{ marginLeft: "auto" }}
                    textSize={16}
                    onPress={handleEditNavigation}
                />
            </FormContainer>

        </TransactionDetailsContainer>
    );
};

export default TransactionDetailsScreen;
