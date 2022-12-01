import { View } from "react-native";
import React from "react";
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
import ButtonIcon from "components/ButtonIcon";

import useType from "hooks/useType";
import useCategoriesListener from "hooks/useCategoriesListener";
import useAuthStore from "hooks/useAuthStore";

const CategoriesScreen = () => {
    const user = useAuthStore(state => state.user);
    const [isExpense, setIsExpense] = useType();
    const [categoryData] = useCategoriesListener(user.user_id, isExpense);

    const navigation = useNavigation();

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
                    isEnabled={isExpense}
                    setIsEnabled={setIsExpense}
                />
            </CategoryPanel>
            <CategoryList
                data={categoryData}
                renderItem={({ item }) => (
                    <ButtonIcon
                        name={item.category_icon}
                        iconColor={item.category_color}
                        iconSize={25}
                        label={item.category_name}
                        key={item.id}
                        type=""
                        onPress={() => { handleNavigation(item.id); }}
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
                    isExpense,
                }}
            />
        </CategoriesScreenContainer>
    );
};

export default CategoriesScreen;
