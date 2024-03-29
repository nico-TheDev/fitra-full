import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// SCREENS
import DashboardScreen from "components/screens/DashboardScreen";
import TransactionDetailsScreen from "components/screens/TransactionDetailsScreen";
import TransactionHistoryScreen from "components/screens/TransactionHistoryScreen";
import AddTransactionScreen from "components/screens/AddTransactionScreen";
import EditTransactionScreen from "components/screens/EditTransactionScreen";
import MoreScreen from "components/screens/MoreScreen";
import EditProfileScreen from "components/screens/EditProfileScreen";

const DashboardStack = createNativeStackNavigator();

const DashboardNavigator = () => {
    return (
        <DashboardStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="DashboardMain"
        >
            <DashboardStack.Screen
                name="DashboardMain"
                component={DashboardScreen}
            />
            <DashboardStack.Screen
                name="TransactionDetails"
                component={TransactionDetailsScreen}
            />
            <DashboardStack.Screen
                name="TransactionHistory"
                component={TransactionHistoryScreen}
            />
            <DashboardStack.Screen
                name="AddTransaction"
                component={AddTransactionScreen}
            />
            <DashboardStack.Screen
                name="EditTransaction"
                component={EditTransactionScreen}
            />
            <DashboardStack.Screen
                name="More"
                component={MoreScreen}
            />
            <DashboardStack.Screen
                name="EditProfile"
                component={EditProfileScreen}
            />
        </DashboardStack.Navigator>
    );
};

export default DashboardNavigator;
