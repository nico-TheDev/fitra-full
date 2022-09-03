//LIBRARY IMPORTS
import React, { useState } from "react";
import { useFormik } from "formik";

//LOCAL IMPORTS
import CircleBG from "components/common/CircleBG";
import CustomTextInput from "components/CustomTextInput";
import ColorPickerPanel from "components/ColorPickerPanel";
import IconSelector from "components/IconSelector";
import SwitchCategory from "components/SwitchCategory";
import Button from "components/Button";

import ScreenHeader from "components/ScreenHeader";
import {
    CategoriesContainer,
    FunctionContainer,
    ButtonContainer,
    SwitchContainer,
} from "./styles";

import { colorCollection } from "fitra/SampleData";
import { categories } from "fitra/SampleData";

const CategoriesCreateScreen = () => {
    const [isExpense, setIsExpense] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    const initialValues = {
        categoryName: "",
        categoryIcon: "",
        categoryColor: "",
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleFormikSubmit,
    });

    const handleIconPress = (icon) => {
        setSelectedIcon(icon);
        formik.setFieldValue("categoryIcon", icon);
    };

    const handleColorPress = (color) => {
        setSelectedColor(color);
        formik.setFieldValue("categoryColor", color);
    };

    const handleFormikSubmit = (values) => {
        console.log(values);
    };

    return (
        <CategoriesContainer>
            <CircleBG circleSize={250} />
            <ScreenHeader title="Create Category" />

            <FunctionContainer>
                <CustomTextInput
                    inputProps={{
                        placeholder: "Enter Category Name",
                        onChangeText: formik.handleChange("categoryName"),
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
                />
            </ButtonContainer>
        </CategoriesContainer>
    );
};

export default CategoriesCreateScreen;
