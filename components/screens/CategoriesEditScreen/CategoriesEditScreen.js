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
    const categoriesData = useCategoriesData(state => state.categories);
    const deleteCategory = useCategoriesData(state => state.deleteCategory);
    const addCategory = useCategoriesData(state => state.addCategory);
    const updateCategory = useCategoriesData(state => state.updateCategory);
    const [currentCategory, setCurrentCategory] = useState(() => {
        return categoriesData.find(category => category.id === categoryID);
    });
    const [data, setData] = useState([]);

    const [date, setDate] = useState(new Date());
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
    console.log(currentCategory)

    const categoryColRef = collection(db, "categories");
    const categoryQuery = query(categoryColRef, where("__name__", "==", currentCategory.id));


    // MANAGE THE STATE AFTER FIRST MOUNT
    //possible for update error
    useEffect(() => {
        const targetCategory = categoriesData.find(category => category.id === categoryID);
        // console.log(targetTransaction);
        setCurrentCategory(targetCategory);
        onSnapshot(categoryQuery, (snapshotData) => {
            let data = [];
            snapshotData.docs.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id })
                console.log("this is the data")
            });
            setData(data)
            console.log(data);
            console.log(data.length)
        })
        console.log("this is edit")
        setSelectedIcon({
            label: currentCategory.category_name,
            icon: currentCategory.category_icon,
            color: currentCategory.category_color,
            currentIcon: currentCategory.category_icon
        });
    }, [categoryID]);

    const handleIconPress = (icon) => {
        setSelectedIcon(icon);
        formik.setFieldValue("categoryIcon", icon);
    };

    const handleColorPress = (color) => {
        setSelectedColor(color);
        formik.setFieldValue("categoryColor", color);
    };

    //Todo redo update data
    const handleFormikSubmit = async (values) => {
        values.type = isExpense ? "expense" : "income";
        const categoryIcon = values.icon === currentCategory.categoryIcon ? currentCategory.categoryIcon : selectedIcon.currentIcon;
        const categoryName = values.categoryName === currentCategory.categoryName ? currentCategory.categoryName : selectedIcon.label;
        const categoryColor = values.categoryColor === currentCategory.categoryColor ? currentCategory.categoryColor : selectedColor.color;
        console.log(values.type)
        const newCategory = {
            user_id: "1", //to be replaced by actual user_id,
            type: values.type,
            category_name: categoryName,
            category_icon: categoryIcon,
            category_color: categoryColor,
            created_at: convertTimestamp(values.createdAt),
            updated_at: date,
        }
        console.log(data.length)
        console.log(newCategory)
        if (data.length != 0) {
            updateCategory(categoryID, newCategory);
        }
        if (data.length === 0) {
            addCategory({
                user_id: "1", //to be replaced by actual user_id,
                type: values.type,
                category_name: categoryName,
                category_icon: categoryIcon,
                category_color: categoryColor,
                created_at: date,
                updated_at: "",
            });
        }
        formik.resetForm();
        Alert.alert("SUCCESS", "Document Updated");
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
        Alert.alert("Successfully Deleted");
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
