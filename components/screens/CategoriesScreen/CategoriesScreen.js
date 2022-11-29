import { View } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { onSnapshot, collection, query } from 'firebase/firestore'

// LOCAL IMPORTS
import {
    CategoriesScreenContainer,
    CategoryList,
    CategoryPanel,
} from "./styles";
import ScreenHeader from "components/ScreenHeader";
import { ICON_NAMES } from "constants/constant";
import SwitchCategory from "components/SwitchCategory";
import ButtonIcon from "components/ButtonIcon";
import { db } from "fitra/firebase.config";
import useCategoriesData from "hooks/useCategoriesData";
import convertTimestamp from "util/convertTimestamp";
import { Category } from "components/DashboardCategoryItem/styles";
import useType from "hooks/useType";

const CategoriesScreen = () => {
    const [selectedIcon, setSelectedIcon] = useState({
        iconName: "",
        iconLabel: "",
    });
    let [categoryData, setCategoryData] = useState([]);
    const setCategories = useCategoriesData((state) => (state.setCategories));
    const resetCategories = useCategoriesData((state) => (state.reset));
    const categories = useCategoriesData((state) => (state.categories));
    const [isExpense, setIsExpense, categoriesData] = useType(categories);

    const categoryColRef = collection(db, "categories");
    const categoryQuery = query(categoryColRef);
    const navigation = useNavigation();

    useEffect(() => {
        //TODO render all categories including those in the database
        const data = categories;
        console.log(data)
        const unsubscribe = onSnapshot(categoryQuery, (snapshotData) => {
            snapshotData.forEach(doc => {
                //check if doc is already in the array
                if (data.some(item => item.id === doc.id)) {
                    const objIndex = data.findIndex((item) => item.id === doc.id)
                    data.splice(objIndex, 1)
                }
                data.push({
                    categoryColor: doc.data().category_color,
                    categoryIcon: doc.data().category_icon,
                    categoryName: doc.data().category_name,
                    userID: 1,
                    type: doc.data().category_type,
                    id: doc.id
                })
                setCategories(data);
            });
            console.log(isExpense)
            console.log(data)
            if (isExpense) {
                setCategoryData(categories.filter((item) => item.type === "income"));
                console.log("this is expense")
            }
            if (!isExpense) {
                setCategoryData(categories.filter((item) => item.type === "expense"));
                console.log("this is income")
            }
        });
        return unsubscribe;
    }, [isExpense]);

    const handleNavigation = (id) =>
        navigation.navigate("Categories", {
            screen: "CategoriesEdit",
            params: {
                categoryID: id
            }

        });
    return (
        <CategoriesScreenContainer>
            <ScreenHeader
                title="Categories"
                iconName={ICON_NAMES.ADD}
                onPressIcon={() => navigation.push("CategoriesCreate")}
            />
            <CategoryPanel>
                <SwitchCategory
                    onChange={() => { resetCategories(); console.log("this is reset categories") }}
                    isEnabled={isExpense}
                    setIsEnabled={setIsExpense}
                />
            </CategoryPanel>
            <CategoryList
                data={categoryData}
                renderItem={({ item, index }) => (
                    <ButtonIcon
                        name={item.categoryIcon}
                        iconColor={item.categoryColor}
                        iconSize={25}
                        label={item.categoryName}
                        key={item.id}
                        type={
                            selectedIcon.iconLabel === item.categoryName
                                ? "filled"
                                : ""
                        }
                        onPress={() => {
                            handleNavigation(
                                item.id)
                            console.log(item.id)
                        }}
                        styles={{ marginHorizontal: 10 }}
                    />
                )}
                horizontal={false}
                numColumns={4}
                ItemSeparatorComponent={() => (
                    <View style={{ width: "100%", marginVertical: 10 }} />
                )}
                columnWrapperStyle={{
                    justifyContent: "flex-start",
                }}
                extraData={{
                    icon: selectedIcon.iconLabel,
                    isExpense,
                }}
            />
        </CategoriesScreenContainer>
    );
};

export default CategoriesScreen;
