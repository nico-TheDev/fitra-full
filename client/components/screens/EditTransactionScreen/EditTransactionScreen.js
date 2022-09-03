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
    TrasactionFormHolder,
    TransactionCategoryHolder,
    ButtonHolder,
    ScrollContainer,
} from "./styles";
import { categories } from "fitra/SampleData";
import colors from "assets/themes/colors";

const EditTransactionScreen = ({ navigation }) => {
    const initialValues = {
        amount: "69.420",
        transactionType: "income",
        transactionAccount: "",
        transactionIcon: "",
        transacitonCategory: "",
        comment: "Sample Comment",
        commentImg: "",
    };

    const [selectedIcon, setSelectedIcon] = useState("");
    const [isExpense, setIsExpense] = useState(false);
    let [categoryData, setCategoryData] = useState([]);
    const [accountItems, setAccountItems] = useState([
        { label: "Wallet", value: "wallet" },
        { label: "GCASH", value: "gcash" },
        { label: "UnionBank", value: "unionbank" },
    ]);

    useEffect(() => {
        // INCOME TYPE
        if (!isExpense) {
            setCategoryData(
                categories.filter(
                    (item) => item.type === "income" && item.userID === "1"
                )
            );
        }
        // EXPENSE TYPE
        else {
            setCategoryData(
                categories.filter(
                    (item) => item.type === "expense" && item.userID === "1"
                )
            );
        }
    }, [isExpense]);

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

            <TrasactionFormHolder>
                <CustomDropdown
                    dropdownItems={accountItems}
                    setDropdownItems={setAccountItems}
                    dropdownProps={{
                        placeholder: "Choose Account",
                        zIndex: 3000,
                        zIndexInverse: 1000,
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
                <ScrollContainer>
                    <CommentInput
                        customLabel={"Comments"}
                        inputProps={{
                            placeholder: "Add a comment",
                            value: formik.values.comment,
                            onChangeText: formik.handleChange("comment"),
                        }}
                    />
                    <ButtonHolder>
                        <Button
                            width="100%"
                            title={"SAVE"}
                            type={"filled"}
                            rounded={"10px"}
                            onPress={formik.handleSubmit}
                        />
                    </ButtonHolder>
                </ScrollContainer>
            </TrasactionFormHolder>
        </EditTransactionScreenContainer>
    );
};

export default EditTransactionScreen;
