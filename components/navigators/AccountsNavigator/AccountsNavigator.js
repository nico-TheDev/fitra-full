import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// SCREENS
import AccountsScreen from "components/screens/AccountsScreen";
import AccountsCreateTransferScreen from "components/screens/AccountsCreateTransferScreen";
import AccountsEditTransferScreen from "components/screens/AccountsEditTransferScreen";
import AccountsTransferHistoryScreen from "components/screens/AccountsTransferHistoryScreen/AccountsTransferHistoryScreen";
import AccountsDetailsScreen from "components/screens/AccountsDetailsScreen";
import AccountsCreateAccountScreen from "components/screens/AccountsCreateAccountScreen";

const AccountStack = createNativeStackNavigator();

const AccountsNavigator = () => {
    return (
        <AccountStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="AccountsMain"
        >
            <AccountStack.Screen
                name="AccountsMain"
                component={AccountsScreen}
            />
            <AccountStack.Screen
                name="AccountsCTScreen"
                component={AccountsCreateTransferScreen}
            />
            <AccountStack.Screen
                name="AccountsEditTransferScreen"
                component={AccountsEditTransferScreen}
            />
            <AccountStack.Screen
                name="AccountsTransferHistoryScreen"
                component={AccountsTransferHistoryScreen}
            />
            <AccountStack.Screen
                name="AccountsCAScreen"
                component={AccountsCreateAccountScreen}
            />
            <AccountStack.Screen
                name="AccountsDetailsScreen"
                component={AccountsDetailsScreen}
            />
        </AccountStack.Navigator>
    );
};

export default AccountsNavigator;
