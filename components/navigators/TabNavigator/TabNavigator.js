import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// LOCAL IMPORTS
// ICONS
import DashboardIcon from "assets/icons/DashboardIcon";
import AccountIcon from "assets/icons/AccountIcon";
import ChartsIcon from "assets/icons/ChartsIcon";
import CategoriesIcon from "assets/icons/CategoriesIcon";
import MoreIcon from "assets/icons/MoreIcon";

import colors from "assets/themes/colors";
import { FONTS } from "fitra/constants/constant";

// NAVIGATORS / STACKS
import AccountsNavigator from "components/navigators/AccountsNavigator";
import DashboardNavigator from "components/navigators/DashboardNavigator";
import CategoriesNavigator from "components/navigators/CategoriesNavigator";
import ChartsScreen from "components/screens/ChartsScreen";
import MoreScreen from "components/screens/MoreScreen";

const Tab = createBottomTabNavigator();

const TabBarProps = (route) => ({
    tabBarIcon: ({ focused, color, size }) => {
        const iconColor = color,
            iconSize = 40;

        if (route.name === "Dashboard") {
            return <DashboardIcon color={iconColor} size={iconSize} />;
        } else if (route.name === "Accounts") {
            return <AccountIcon color={iconColor} size={iconSize} />;
        } else if (route.name === "Charts") {
            return <ChartsIcon color={iconColor} size={iconSize} />;
        } else if (route.name === "Categories") {
            return <CategoriesIcon color={iconColor} size={iconSize} />;
        } else if (route.name === "More") {
            return <MoreIcon color={iconColor} size={iconSize} />;
        }
    },
    tabBarInactiveTintColor: colors.primary.colorSeven,
    tabBarActiveTintColor: colors.white,
    tabBarStyle: {
        backgroundColor: colors.primary.colorFive,
        position: "relative",
        height: 120,
        alignContent: "center",
        justifyContent: "center",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 10,
    },
    tabBarItemStyle: {
        paddingVertical: 25,
    },
    tabBarLabelStyle: {
        fontFamily: FONTS.LIGHT,
        fontSize: 12,
        paddingTop: 10,
    },
    headerShown: false,
});

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                ...TabBarProps(route),
            })}
        >
            <Tab.Screen name="Dashboard" component={DashboardNavigator} />
            <Tab.Screen name="Accounts" component={AccountsNavigator} />
            <Tab.Screen name="Charts" component={ChartsScreen} />
            <Tab.Screen name="Categories" component={CategoriesNavigator} />
            <Tab.Screen name="More" component={MoreScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
