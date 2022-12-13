//LIBRARY IMPORTS
import React, { useState } from "react";
import { Formik } from "formik";

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

const AccountsCreateTransferScreen = () => {
    // DATE VALUE is current Date
    const [date, setDate] = useState(new Date());

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

    const initialValues = {
        fromAccount: "",
        toAccount: "",
        transferAmount: "",
        date,
        comment: "",
        commentImg: "",
    };

    const handleFormikSubmit = (values) => {
        console.log(values);
        // INSERT API CALL HERE
    };

    return (
        <AccountsContainer>
            <ScreenHeader title="Create Transfer" />
            <Formik initialValues={initialValues} onSubmit={handleFormikSubmit}>
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
                                onChangeValue:
                                    formikProps.handleChange("toAccount"),
                            }}
                            customLabel="Transfer to Account"
                        />
                        <ScrollContainer centerContent={true}>
                            <CustomTextInput
                                inputProps={{
                                    placeholder: "Enter Amount",
                                    onChangeText:
                                        formikProps.handleChange(
                                            "transferAmount"
                                        ),
                                    value: formikProps.values.transferAmount,
                                    keyboardType: "numeric",
                                }}
                                iconName={ICON_NAMES.CATEGORIES_ICONS.SENDMONEY}
                                customLabel="Transfer Amount"
                            />
                            <CustomDatePicker
                                date={date}
                                setDate={setDate}
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
                                    onChangeText:
                                        formikProps.handleChange("comment"),
                                    value: formikProps.values.comment,
                                }}
                                customLabel="Comment"
                            />
                            {/* SUBMIT BUTTON */}
                            <Button
                                type="filled"
                                width="100%"
                                title="Submit"
                                rounded="8px"
                                textSize={14}
                                noBorder={false}
                                onPress={formikProps.handleSubmit}
                            />
                        </ScrollContainer>
                    </>
                )}
            </Formik>
        </AccountsContainer>
    );
};

export default AccountsCreateTransferScreen;
