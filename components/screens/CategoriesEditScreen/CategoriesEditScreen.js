//LIBRARY IMPORTS
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Alert } from "react-native";

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

import { colorCollection } from "fitra/SampleData";
import useCategoriesData from "hooks/useCategoriesData";
import useType from "hooks/useType";
import convertTimestamp from "util/convertTimestamp";
import { ICON_NAMES } from "constants/constant";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "fitra/firebase.config";

const CategoriesEditScreen = ({ route, navigation }) => {
    const { categoryID } = route.params;
    const resetCategories = useCategoriesData(state => state.reset)
    const setCategories = useCategoriesData(state => state.setCategories)
    const categoriesData = useCategoriesData(state => state.categories);
    const deleteCategory = useCategoriesData(state => state.deleteCategory);
    const addCategory = useCategoriesData(state => state.addCategory);
    const updateCategory = useCategoriesData(state => state.updateCategory);
    const [currentCategory, setCurrentCategory] = useState(() => {
        return categoriesData.find(category => category.id === categoryID);
    });
    let [categoryData, setCategoryData] = useState([]);
    const [data, setData] = useState([]);
    const [isExpense, setIsExpense] = useType(categoriesData, currentCategory.type === "expense");
    const [selectedIcon, setSelectedIcon] = useState({
        label: "",
        icon: "",
        currentIcon: "",
    });
    const [selectedColor, setSelectedColor] = useState("");
    const [showColorWheel, setShowColorWheel] = useState(false);

    const initialValues = {
        type: currentCategory.type,
        icon: currentCategory.categoryIcon,
        categoryName: currentCategory.categoryName
    }

    const categoryColRef = collection(db, "categories");
    const categoryQuery = query(categoryColRef, where("__name__", "==", currentCategory.id));


    // MANAGE THE STATE AFTER FIRST MOUNT
    //possible for update error
    useEffect(() => {
        console.log("reset categ before edit")
        console.log(categoriesData)
        const targetCategory = categoriesData.find(category => category.id === categoryID);
        // console.log(targetTransaction);
        setCurrentCategory(targetCategory);
        const unsubscribe = onSnapshot(categoryQuery, (snapshotData) => {
            let data = [];
            snapshotData.docs.forEach((doc) => {
                data.push({ id: doc.id })
            });
            setData(data)
        })
        //set this category data array to data categories
        console.log("this is edit")
        setSelectedIcon({
            label: currentCategory.category_name,
            icon: currentCategory.category_icon,
            color: currentCategory.category_color,
            currentIcon: currentCategory.category_icon
        }); return unsubscribe;
    }, [categoryID]);

    const handleIconPress = (icon) => {
        setSelectedIcon(icon);
        formik.setFieldValue("categoryIcon", icon);
    };

    const handleColorPress = (color) => {
        setSelectedColor(color);
        formik.setFieldValue("categoryColor", color);
    };

    const handleFormikSubmit = async (values) => {
        setCategories([{}])
        values.type = isExpense ? "income" : "expense";
        const newCategory = {
            user_id: "1", //to be replaced by actual user_id,
            category_type: values.type,
            category_name: values.categoryName,
            category_icon: values.categoryIcon,
            category_color: values.categoryColor,
            id: categoryID
        }
        console.log(data.length)
        console.log(newCategory)
        if (data.length != 0) {
            updateCategory(categoryID, newCategory);
            console.log("this is the categories data")
            console.log(categoriesData)
        }
        if (data.length === 0) {
            addCategory({
                user_id: "1", //to be replaced by actual user_id,
                category_type: values.type,
                category_name: values.categoryName,
                category_icon: values.categoryIcon,
                category_color: values.categoryColor,
            });
        }
        formik.resetForm();
        Alert.alert("SUCCESS", "Document Updated");
        navigation.navigate("Categories", { screen: "CategoriesMain" })
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
        const objIndex = categoriesData.findIndex((item) => item.id === categoryID)         //delete data from the array
        categoriesData.splice(objIndex, 1)
        deleteCategory(categoryID);
        navigation.navigate("Categories", { screen: "CategoriesMain" })
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleFormikSubmit,
    });

    return (
        <CategoriesContainer>
            <CircleBG circleSize={250} />
            <ScreenHeader title="Edit Category" />

            <FunctionContainer>
                <CustomTextInput
                    inputProps={{
                        placeholder: currentCategory.categoryName,
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
                onAddPress={() => console.log(categoriesData)}
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
