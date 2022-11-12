//LIBRARY IMPORTS
import React, { useState } from "react";
import { Formik } from "formik";
// LOCAL IMPORTS
import CustomTextInput from "components/CustomTextInput";
import CustomDropdown from "components/CustomDropdown";
import CommentInput from "components/CommentInput";
import CustomDatePicker from "components/CustomDatePicker";
import formatDate from "fitra/util/formatDate";
import Button from "components/Button";

import ScreenHeader from "components/ScreenHeader";
import {
    AccountsContainer,
    ScrollContainer,
    SaveAndDeleteContainer,
} from "./styles";

import { ICON_NAMES } from "constants/constant";

const AccountsEditTransferScreen = () => {
    // DATE VALUE is current Date
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("details");

    const [senderItems, setSenderItems] = useState([
        { label: "Wallet", value: "wallet" },
        { label: "GCASH", value: "gcash" },
        { label: "UnionBank", value: "unionbank" },
    ]);
    const [receiverItems, setReceiverItems] = useState([
        { label: "Wallet", value: "wallet" },
        { label: "GCASH", value: "gcash" },
        { label: "UnionBank", value: "unionbank" },
    ]);

    const SaveAndDeleteButton = (formikProps) => (
        <SaveAndDeleteContainer>
            <Button
                type="filled"
                width="45%"
                title="Save"
                rounded="8px"
                textSize={14}
                noBorder={false}
                onPress={formikProps.handleSubmit}
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
                onPress={formikProps.handleSubmit}
                styles={{
                    marginLeft: "auto",
                }}
            />
        </SaveAndDeleteContainer>
    );

    // GET INITIAL VALUES HERE

    return (
        <AccountsContainer>
            <ScreenHeader
                title={mode === "edit" ? "Edit Transfer" : "Transfer Details"}
            />
            <Formik
                initialValues={{
                    fromAccount: "gcash",
                    toAccount: "wallet",
                    transferAmount: "200",
                    date,
                    comment: "sample comment here",
                    commentImg: "",
                }}
                onSubmit={(values) => {
                    console.log(values);
                    // INSERT API CALL HERE
                }}
            >
                {(formikProps) => (
                    <>
                        <CustomDropdown
                            width="90%"
                            dropdownItems={senderItems}
                            setDropdownItems={setSenderItems}
                            dropdownProps={{
                                placeholder: "Choose Source Account",
                                zIndex: 3000,
                                zIndexInverse: 1000,
                                onChangeValue:
                                formikProps.handleChange("fromAccount"),
                                disabled: mode === "edit" ? false : true,
                                value: formikProps.values.fromAccount,
                            }}
                            customLabel="Transfer From Account"
                        />
                        <CustomDropdown
                            width="90%"
                            dropdownItems={receiverItems}
                            setDropdownItems={setReceiverItems}
                            dropdownProps={{
                                placeholder: "Choose Receiving Account",
                                zIndex: 1000,
                                zIndexInverse: 3000,
                                onChangeValue: formikProps.handleChange("toAccount"),
                                disabled: mode === "edit" ? false : true,
                                value: formikProps.values.toAccount,
                            }}
                            customLabel="Transfer to Account"
                        />
                        <ScrollContainer centerContent={true}>
                            <CustomTextInput
                                inputProps={{
                                    placeholder: "Enter Amount",
                                    onChangeText:
                                    formikProps.handleChange("transferAmount"),
                                    value: formikProps.values.transferAmount,
                                    keyboardType: "numeric",
                                    editable: mode !== "edit" ? false : true,
                                }}
                                iconName={ICON_NAMES.SENDMONEY}
                                customLabel="Transfer Amount"
                            />
                            <CustomDatePicker
                                date={date}
                                setDate={setDate}
                                buttonProps={{
                                    disabled: mode === "edit" ? false : true,
                                }}
                                onChange={(event, selectedDate) => {
                                    formikProps.setFieldValue(
                                        "date",
                                        formatDate(selectedDate)
                                    );
                                    setDate(selectedDate);
                                }}
                            />
                            <CommentInput
                                inputProps={{
                                    placeholder: "Add Comment... ",
                                    onChangeText: formikProps.handleChange("comment"),
                                    value: formikProps.values.comment,
                                    editable: mode !== "edit" ? false : true,
                                }}
                                customLabel="Comment"
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
                                <SaveAndDeleteButton formikProps={formikProps} />
                            )}
                        </ScrollContainer>
                    </>
                )}
            </Formik>
        </AccountsContainer>
    );
};

export default AccountsEditTransferScreen;
