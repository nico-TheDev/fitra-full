import { View } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

// LOCAL IMPORTS
import {
    CategoriesScreenContainer,
    CategoryList,
    CategoryPanel,
} from "./styles";
import ScreenHeader from "components/ScreenHeader";
import { ICON_NAMES } from "constants/constant";
import SwitchCategory from "components/SwitchCategory";
import { categories } from "fitra/SampleData";
import ButtonIcon from "components/ButtonIcon";

const CategoriesScreen = () => {
    const [selectedIcon, setSelectedIcon] = useState({
        iconName: "",
        iconLabel: "",
    });
    const [isExpense, setIsExpense] = useState(false);
    let [categoryData, setCategoryData] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        // INCOME TYPE
        if (!isExpense) {
            setCategoryData(
                categories.filter(
                    (item) => item.type === "income" && item.userID === "1"
                )
            );
        }
        // EXPENSE TYPE
        else {
            setCategoryData(
                categories.filter(
                    (item) => item.type === "expense" && item.userID === "1"
                )
            );
        }
    }, [isExpense]);

    return (
        <CategoriesScreenContainer>
            <ScreenHeader title="Categories"
                iconName={ICON_NAMES.ADD}
                onPressIcon={() =>
                    navigation.push("CategoriesCreate")
                } />
            <CategoryPanel>
                <SwitchCategory
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
                        label={item.categoryName}
                        key={index}
                        type={
                            selectedIcon.iconLabel === item.categoryName
                                ? "filled"
                                : ""
                        }
                        onPress={() =>
                            // setSelectedIcon({
                            //     iconName: item.categoryIcon,
                            //     iconLabel: item.categoryName,
                            // })
                            navigation.push("CategoriesEdit")
                        }
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
