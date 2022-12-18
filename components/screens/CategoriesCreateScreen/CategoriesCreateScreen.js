//LIBRARY IMPORTS
import React, { useState } from "react";
import { Alert } from "react-native";
import { useFormik } from "formik";

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
} from "./styles";

import useCategoriesData from "hooks/useCategoriesData";
import { colorCollection } from "fitra/SampleData";
import { ICON_NAMES } from "constants/constant";
import useAuthStore from "hooks/useAuthStore";
import ColorPicker from "components/common/ColorPicker";

const CategoriesCreateScreen = ({ navigation }) => {
    const addCategory = useCategoriesData((state) => state.addCategory);
    const user = useAuthStore(state => state.user);
    const [isExpense, setIsExpense] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [showColorWheel, setShowColorWheel] = useState(false);

    const initialValues = {
        categoryName: "",
        categoryIcon: "",
        categoryColor: "",
        userID: "",
        type: "",
        createdAt: "",
        updatedAt: ""
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

    const handleFormikSubmit = async (values, { resetForm }) => {
        values.type = isExpense ? "income" : "expense";
        addCategory({
            category_name: values.categoryName,
            category_color: values.categoryColor,
            category_icon: values.categoryIcon,
            category_type: values.type,
            created_at: new Date(),
            update_at: "",
            user_id: user.user_id
        });
        resetForm();
        Alert.alert("Success", "Created a New Category");
        navigation.navigate("Categories", { screen: "CategoriesMain" });
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
            {showColorWheel && <ColorPicker handleColorPress={handleColorPress} setShowColorWheel={setShowColorWheel} />}
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
