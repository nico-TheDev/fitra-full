import React, { useState } from "react";
import { Formik } from "formik";

import { FormContainer, TransactionDetailsContainer } from "./styles";
import ScreenHeader from "components/ScreenHeader";
import CustomTextInput from "components/CustomTextInput";
import CustomDatePicker from "components/CustomDatePicker";
import formatDate from "fitra/util/formatDate";
import CustomDropdown from "components/CustomDropdown";
import { categories } from "fitra/SampleData";
import CommentInput from "components/CommentInput";
import Button from "components/Button";

const TransactionDetailsScreen = ({ navigation }) => {
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
        amount: "20000000",
        accountName: "",
        categoryName: "",
        date: "",
        comment: "",
        commentImg: "",
    };

    return (
        <TransactionDetailsContainer>
            <ScreenHeader title="Transaction Details" />
            <Formik initialValues={initialValues}>
                {({ values, handleChange, setFieldValue }) => (
                    <FormContainer>
                        <CustomTextInput
                            customLabel="Amount: "
                            inputProps={{
                                value: values.amount,
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
                                onChangeValue:
                                    handleChange("accountName"),
                                disabled: true,
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
                                onChangeValue:
                                    handleChange("categoryName"),
                                itemKey: "userId",
                                disabled: true,
                            }}
                            customLabel="Category"
                        />
                        <CustomDatePicker
                            date={date}
                            buttonProps={{ disabled: true }}
                            onChange={(event, selectedDate) => {
                                setFieldValue(
                                    "date",
                                    formatDate(selectedDate)
                                );
                                setDate(selectedDate);
                            }}
                        />

                        <CommentInput
                            customLabel="Comments:"
                            inputProps={{
                                value: values.comment,
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
                                })
                            }
                        />
                    </FormContainer>
                )}
            </Formik>
        </TransactionDetailsContainer>
    );
};

export default TransactionDetailsScreen;
