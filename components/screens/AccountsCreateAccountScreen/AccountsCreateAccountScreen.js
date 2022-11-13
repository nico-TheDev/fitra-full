//LIBRARY IMPORTS
import React, { useState } from "react";
import { useFormik } from "formik";

//LOCAL IMPORTS
import CircleBG from "components/common/CircleBG";
import CustomTextInput from "components/CustomTextInput";
import ColorPickerPanel from "components/ColorPickerPanel";
import Button from "components/Button";
import IconSelector from "components/IconSelector";
import ScreenHeader from "components/ScreenHeader";

import {
    AccountsContainer,
    FunctionContainer,
    ButtonContainer,
} from "./styles";

import { colorCollection } from "fitra/SampleData";
import { categories } from "fitra/SampleData";

const AccountsCreateAccountScreen = () => {
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("");

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
    };

    const handleFormikSubmit = (values) => {
        console.log(values);
    };

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleFormikSubmit,
    });

    return (
        <AccountsContainer>
            <CircleBG circleSize={250} />
            <ScreenHeader title="Create Account" />

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
            <IconSelector
                iconData={categories}
                onPress={handleIconPress}
                selectedIcon={selectedIcon}
                setSelectedIcon={setSelectedIcon}
            />
            <ColorPickerPanel
                colorList={colorCollection}
                onColorPress={handleColorPress}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
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
                    onPress={() => { console.log("delete") }}
                />
            </ButtonContainer>
        </AccountsContainer>
    );
};

export default AccountsCreateAccountScreen;
