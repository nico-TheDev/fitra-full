//LIBRARY IMPORTS
import React, { useState } from "react";
import { Text } from "react-native";
import { useFormik } from "formik";
import { TriangleColorPicker } from "react-native-color-picker";

//LOCAL IMPORTS
import CircleBG from "components/common/CircleBG";
import CustomTextInput from "components/CustomTextInput";
import ColorPickerPanel from "components/ColorPickerPanel";
import IconOnlySelector from "components/IconOnlySelector";
import SwitchCategory from "components/SwitchCategory";
import Button from "components/Button";

import ScreenHeader from "components/ScreenHeader";
import {
    CategoriesContainer,
    FunctionContainer,
    ButtonContainer,
    SwitchContainer,
    ColorPickerContainer,
    CloseBtn,
} from "./styles";

import { colorCollection } from "fitra/SampleData";
import { categories } from "fitra/SampleData";
import Icon from "components/common/Icon";
import { ICON_NAMES } from "constants/constant";

const CategoriesCreateScreen = () => {
    const [isExpense, setIsExpense] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [showColorWheel, setShowColorWheel] = useState(false);

    const initialValues = {
        categoryName: "",
        categoryIcon: "",
        categoryColor: "",
    };

    const handleIconPress = (icon) => {
        setSelectedIcon(icon);
        formik.setFieldValue("categoryIcon", icon);
    };

    const handleColorPress = (color) => {
        setSelectedColor(color);
        formik.setFieldValue("categoryColor", color);
        setShowColorWheel(false);
    };

    const handleFormikSubmit = (values) => {
        console.log(values);
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
        <CategoriesContainer>
            <CircleBG circleSize={250} />
            <ScreenHeader title="Create Category" />
            {showColorWheel && (
                <ColorPickerContainer>
                    <CloseBtn onPress={() => setShowColorWheel(false)}>
                        {/* <Icon color="white" name={ICON_NAMES.ADD} size={50} /> */}
                        <Text
                            style={{
                                color: "white",
                                fontSize: 25,
                                fontWeight: "bold",
                            }}
                        >
                            X
                        </Text>
                    </CloseBtn>
                    <TriangleColorPicker
                        onColorSelected={handleColorPress}
                        style={{
                            flex: 1,
                            backgroundColor: "white",
                            height: "100%",
                            width: "100%",
                            padding: 20,
                        }}
                    />
                </ColorPickerContainer>
            )}

            <FunctionContainer>
                <CustomTextInput
                    inputProps={{
                        placeholder: "Enter Category Name",
                        onChangeText: formik.handleChange("categoryName"),
                        value: formik.values.categoryName,
                    }}
                    customLabel="Category Name:"
                />
            </FunctionContainer>
            <SwitchContainer>
                <SwitchCategory
                    isEnabled={isExpense}
                    setIsEnabled={setIsExpense}
                />
            </SwitchContainer>
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
        </CategoriesContainer>
    );
};

export default CategoriesCreateScreen;
