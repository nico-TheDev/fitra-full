//LIBRARY IMPORTS
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Alert, Text } from "react-native";
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
    CloseBtn
} from "./styles";

import { colorCollection } from "fitra/SampleData";
import useCategoriesData from "hooks/useCategoriesData";
import useType from "hooks/useType";
import { ICON_NAMES } from "constants/constant";
import useAuthStore from "hooks/useAuthStore";
import ColorPicker from "components/common/ColorPicker";

const CategoriesEditScreen = ({ route, navigation }) => {
    const { categoryID } = route.params;
    // GLOBAL STATES
    const user = useAuthStore(state => state.user);
    const allCategories = useCategoriesData(state => state.categories);
    const deleteCategory = useCategoriesData(state => state.deleteCategory);
    const addCategory = useCategoriesData(state => state.addCategory);
    const updateCategory = useCategoriesData(state => state.updateCategory);

    // COMPONENT STATE
    const [currentCategory, setCurrentCategory] = useState(() => allCategories.find(category => category.id === categoryID));
    const [isExpense, setIsExpense] = useType(currentCategory.type !== "expense");
    const [selectedIcon, setSelectedIcon] = useState(currentCategory.category_icon);
    const [selectedColor, setSelectedColor] = useState(currentCategory.category_color);
    const [showColorWheel, setShowColorWheel] = useState(false);

    const initialValues = {
        type: currentCategory.type,
        category_icon: currentCategory.category_icon,
        category_name: currentCategory.category_name,
        category_color: currentCategory.category_color
    };

    // MANAGE THE STATE AFTER FIRST MOUNT
    useEffect(() => {
        const targetCategory = allCategories.find(category => category.id === categoryID);
        // console.log(targetTransaction);
        setCurrentCategory(targetCategory);
        setSelectedIcon(targetCategory.category_icon);
    }, [categoryID]);

    const handleIconPress = (icon) => {
        setSelectedIcon(icon);
        formik.setFieldValue("category_icon", icon);
    };

    const handleColorPress = (color) => {
        setSelectedColor(color);
        formik.setFieldValue("category_color", color);
        setShowColorWheel(false);
    };

    const handleFormikSubmit = async (values) => {
        values.type = isExpense ? "income" : "expense";
        const newCategory = {
            user_id: user.user_id,
            category_type: values.type,
            category_name: values.category_name,
            category_icon: values.category_icon,
            category_color: values.category_color,
            id: categoryID
        };
        if (allCategories.filter(category => category.user_id === user.user_id).map(category => category.id).includes(categoryID)) {
            updateCategory(categoryID, newCategory);
            Alert.alert("SUCCESS", "Document Updated");
        }
        else {
            addCategory({
                user_id: user.user_id,
                category_type: values.type,
                category_name: values.category_name,
                category_icon: values.category_icon,
                category_color: values.category_color,
            });
        }
        formik.resetForm();
        navigation.navigate("Categories", { screen: "CategoriesMain" });
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
        deleteCategory(categoryID);
        navigation.navigate("Categories", { screen: "CategoriesMain" });
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleFormikSubmit,
    });

    return (
        <CategoriesContainer>
            <CircleBG circleSize={250} />
            <ScreenHeader title="Edit Category" />

            {showColorWheel && <ColorPicker handleColorPress={handleColorPress} setShowColorWheel={setShowColorWheel} />}

            <FunctionContainer>
                <CustomTextInput
                    inputProps={{
                        placeholder: "Category Name",
                        onChangeText: formik.handleChange("category_name"),
                        value: formik.values.category_name
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
                    title="Delete"
                    rounded="8px"
                    textSize={14}
                    noBorder={false}
                    onPress={showDeletePrompt}
                />
            </ButtonContainer>
        </CategoriesContainer>
    );
};

export default CategoriesEditScreen;
