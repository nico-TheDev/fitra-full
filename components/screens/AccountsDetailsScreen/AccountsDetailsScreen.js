//LIBRARY IMPORTS
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
// LOCAL IMPORTS
import CircleBG from "components/common/CircleBG";
import CustomTextInput from "components/CustomTextInput";
import Button from "components/Button";
import ColorPickerPanel from "components/ColorPickerPanel";
import IconOnlySelector from "components/IconOnlySelector";
import ColorPicker from "components/common/ColorPicker";
import ScreenHeader from "components/ScreenHeader";

import { ICON_NAMES } from "constants/constant";
import { colorCollection } from "fitra/SampleData";

import {
    AccountsContainer,
    FunctionContainer,
    ButtonContainer,
} from "./styles";

import useAccountStore from "hooks/useAccountStore";
import useAuthStore from "hooks/useAuthStore";

const AccountsDetailsScreen = ({ route }) => {
    const { accountID } = route.params;
    const [mode, setMode] = useState("details");
    const navigation = useNavigation();

    // GLOBAL STATES
    const user = useAuthStore(state => state.user);
    const allAccounts = useAccountStore(state => state.accounts);
    const deleteAccount = useAccountStore(state => state.deleteAccount);
    const addAccount = useAccountStore(state => state.addAccount);
    const updateAccount = useAccountStore(state => state.updateAccount);

    // COMPONENT STATE
    const [currentAccount, setCurrentAccount] = useState(() => allAccounts.find(account => account.id === accountID));
    const [selectedIcon, setSelectedIcon] = useState(currentAccount.account_icon);
    const [selectedColor, setSelectedColor] = useState(currentAccount.account_color);
    const [showColorWheel, setShowColorWheel] = useState(false);

    const initialValues = {
        account_name: currentAccount.account_name,
        account_amount: currentAccount.account_amount,
        account_icon: currentAccount.account_icon,
        account_color: currentAccount.account_color,
    };

    // MANAGE THE STATE AFTER FIRST MOUNT
    useEffect(() => {
        const targetAccount = allAccounts.find(account => account.id === accountID);
        // console.log(targetTransaction);
        setCurrentAccount(targetAccount);
        setSelectedIcon(targetAccount.account_icon);
    }, [accountID]);

    const handleIconPress = (icon) => {
        setSelectedIcon(icon);
        formik.setFieldValue("account_icon", icon);
    };

    const handleColorPress = (color) => {
        setSelectedColor(color);
        formik.setFieldValue("account_color", color);
        setShowColorWheel(false);
    };

    const handleFormikSubmit = async (values) => {
        const newAccount = {
            user_id: user.user_id,
            account_name: values.account_name,
            account_amount: values.account_amount,
            account_icon: values.account_icon,
            account_color: values.account_color,
            id: accountID
        };
        if (allAccounts.filter(account => account.user_id === user.user_id).map(account => account.id).includes(accountID)) {
            updateAccount(accountID, newAccount);
            Alert.alert("SUCCESS", "Document Updated");
        }
        else {
            addAccount({
                user_id: user.user_id,
                account_name: values.account_name,
                account_amount: values.account_amount,
                account_icon: values.account_icon,
                account_color: values.account_color,
            });
        }
        formik.resetForm();
        navigation.navigate("Accounts", { screen: "AccountsMain" });
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
        deleteAccount(accountID);
        navigation.navigate("Accounts", { screen: "AccountsMain" });
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleFormikSubmit,
    });

    const screenTitle = `${mode === "edit" ? "Edit" : "Account"} Details`;

    const EditButtonGroup = () => (
        <>
            <Button
                type="filled"
                width="45%"
                title="Save"
                rounded="8px"
                textSize={16}
                noBorder={false}
                onPress={formik.handleSubmit}
            />
            <Button
                type="outlined"
                width="45%"
                title="Delete"
                rounded="8px"
                textSize={16}
                noBorder={false}
                onPress={showDeletePrompt}
            />
        </>
    );

    return (
        <AccountsContainer>
            <CircleBG circleSize={250} />
            <ScreenHeader title={screenTitle} />
            {showColorWheel && <ColorPicker handleColorPress={handleColorPress} setShowColorWheel={setShowColorWheel} />}
            <FunctionContainer>
                <CustomTextInput
                    inputProps={{
                        placeholder: "Account Name",
                        onChangeText: formik.handleChange("account_name"),
                        value: formik.values.account_name,
                        editable: mode === "edit"
                    }}
                    customLabel="Account Name:"
                />
                <CustomTextInput
                    inputProps={{
                        placeholder: "Account Amount",
                        onChangeText: formik.handleChange("account_amount"),
                        value: formik.values.account_amount,
                        editable: mode === "edit"
                    }}
                    customLabel="Amount:"
                />
                <IconOnlySelector
                    iconData={Object.values(ICON_NAMES.CATEGORIES_ICONS)}
                    onPress={handleIconPress}
                    selectedIcon={selectedIcon}
                    setSelectedIcon={setSelectedIcon}
                />
                <ColorPickerPanel
                    colorList={colorCollection}
                    onColorPress={handleColorPress}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    onAddPress={() => setShowColorWheel(true)}
                />
            </FunctionContainer>
            <ButtonContainer mode={mode}>
                {mode === "edit" ? (
                    <EditButtonGroup />
                ) : (
                    <Button
                        type="outlined"
                        width="45%"
                        title="Edit"
                        rounded="8px"
                        textSize={16}
                        noBorder={false}
                        onPress={() => setMode("edit")}
                    />
                )}
            </ButtonContainer>
        </AccountsContainer>
    );
};

export default AccountsDetailsScreen;
