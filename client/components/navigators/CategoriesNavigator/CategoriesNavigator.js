import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// SCREENS
import CategoriesScreen from "components/screens/CategoriesScreen";
import CategoriesCreateScreen from "components/screens/CategoriesCreateScreen";
import CategoriesEditScreen from "components/screens/CategoriesEditScreen/CategoriesEditScreen";

const CategoriesStack = createNativeStackNavigator();

const CategoriesNavigator = () => {
    return (
        <CategoriesStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <CategoriesStack.Screen
                name="CategoriesMain"
                component={CategoriesScreen}
            />
            <CategoriesStack.Screen
                name="CategoriesCreate"
                component={CategoriesCreateScreen}
            />
            <CategoriesStack.Screen
                name="CategoriesEdit"
                component={CategoriesEditScreen}
            />
        </CategoriesStack.Navigator>
    );
};

export default CategoriesNavigator;
