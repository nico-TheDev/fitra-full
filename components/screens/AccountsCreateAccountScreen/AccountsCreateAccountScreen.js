//LIBRARY IMPORTS
import React, { useState } from "react";
import { Alert } from "react-native";
import { useFormik } from "formik";

//LOCAL IMPORTS
import CircleBG from "components/common/CircleBG";
import CustomTextInput from "components/CustomTextInput";
import ColorPickerPanel from "components/ColorPickerPanel";
import Button from "components/Button";
import IconOnlySelector from "components/IconOnlySelector";
import ScreenHeader from "components/ScreenHeader";
import ColorPicker from "components/common/ColorPicker";

import {
    AccountsContainer,
    FunctionContainer,
    ButtonContainer,
} from "./styles";

import { colorCollection } from "fitra/SampleData";
import { ICON_NAMES } from "constants/constant";
import useAccountStore from "hooks/useAccountStore";
import useAuthStore from "hooks/useAuthStore";

const AccountsCreateAccountScreen = ({navigation}) => {
    const addAccount = useAccountStore((state) => state.addAccount);
    const user = useAuthStore(state => state.user);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("");
    const [showColorWheel, setShowColorWheel] = useState(false);

    const initialValues = {
        accountName: "",
        accountAmount: "",
        accountIcon: "",
        accountColor: "",
    };

    const handleIconPress = (icon) => {
        setSelectedIcon(icon);
        formik.setFieldValue("accountIcon", icon);
    };

    const handleColorPress = (color) => {
        setSelectedColor(color);
        formik.setFieldValue("accountColor", color);
        setShowColorWheel(false);
    };

    const handleFormikSubmit = async (values, { resetForm }) => {
        console.log(values);
        addAccount({
            account_name: values.accountName,
            account_amount: values.accountAmount,
            account_color: values.accountColor,
            account_icon: values.accountIcon,
            created_at: new Date(),
            update_at: "",
            user_id: user.user_id
        });
        resetForm();
        Alert.alert("Success", "Created a New Account");
        navigation.navigate("Accounts", { screen: "AccountsMain" });
    };

    const handleClear = () => {
        setSelectedColor("");
        setSelectedIcon("");
        formik.resetForm();
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleFormikSubmit,
    });

    return (
        <AccountsContainer>
            <CircleBG circleSize={250} />
            <ScreenHeader title="Create Account" />
            {showColorWheel && <ColorPicker handleColorPress={handleColorPress} setShowColorWheel={setShowColorWheel} />}
            <FunctionContainer>
                <CustomTextInput
                    inputProps={{
                        placeholder: "Enter Account Name",
                        onChangeText: formik.handleChange("accountName"),
                    }}
                    customLabel="Account Name:"
                />
                <CustomTextInput
                    inputProps={{
                        placeholder: "Enter Amount",
                        onChangeText: formik.handleChange("accountAmount"),
                    }}
                    customLabel="Amount:"
                />
            </FunctionContainer>
            <IconOnlySelector
                iconData={Object.values(ICON_NAMES)}
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
            <ButtonContainer>
                <Button
                    type="filled"
                    width="45%"
                    title="Save"
                    rounded="8px"
                    textSize={14}
                    noBorder={false}
                    onPress={formik.handleSubmit}
                />
                <Button
                    type="outlined"
                    width="45%"
                    title="Clear"
                    rounded="8px"
                    textSize={14}
                    noBorder={false}
                    onPress={handleClear}
                />
            </ButtonContainer>
        </AccountsContainer>
    );
};

export default AccountsCreateAccountScreen;
