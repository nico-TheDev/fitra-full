import { FlatList } from "react-native";
import React, { useState } from "react";

// LOCAL IMPORTS
import {
    AccountsContainer,
    TotalBalanceContainer,
    TotalBalanceLabel,
    TotalAmountBalanceLabel,
    HolderContainer,
} from "./styles";
import ScreenHeader from "components/ScreenHeader";
import AccountsFunctionHolder from "components/AccountsFunctionHolder";
import { ICON_NAMES } from "constants/constant";
import CategoryPanelItem from "components/CategoryPanelItem";

const listData = [
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "GCASH",
        price: "Php 20,000",
        iconColor: "#5FA874",
        iconName: ICON_NAMES.BANK,
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "WALLET",
        price: "Php 20,000",
        iconColor: "#F6A6FF",
        iconName: ICON_NAMES.ACCOUNT,
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "UNIONBANK",
        price: "Php 20,000",
        iconColor: "#C5A3FF",
        iconName: ICON_NAMES.BUS,
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d73",
        title: "BDO",
        price: "Php 20,000",
        iconColor: "#A79AFF",
        iconName: ICON_NAMES.BANK,
    },
];

const AccountsScreen = ({ navigation }) => {
    const [selectedId, setSelectedId] = useState(null);

    const renderCategoryPanelItem = ({ item }) => {
        return(
            <CategoryPanelItem
                onPress={() =>
                    navigation.navigate("AccountsDetailsScreen", {
                    title: item.title,
                    price: item.price,
                })
                }
                iconName={item.iconName}
                iconColor={item.iconColor}
                title={item.title}
                price={item.price}
            />
        );
    };
    
    return (
        <AccountsContainer>
            <ScreenHeader
                title="Accounts"
                iconName={ICON_NAMES.REFRESH}
                onPressIcon={() =>
                    navigation.navigate("Accounts", {
                        screen: "AccountsTransferHistoryScreen",
                    })
                }
            />
            <TotalBalanceContainer>
                <TotalBalanceLabel>Total Balance:</TotalBalanceLabel>
                <TotalAmountBalanceLabel>PHP 100,000</TotalAmountBalanceLabel>
            </TotalBalanceContainer>
            <AccountsFunctionHolder />
            <HolderContainer>
                <FlatList
                    data={listData}
                    renderItem={renderCategoryPanelItem}
                    keyExtractor={(item) => item.id}
                />
            </HolderContainer>
        </AccountsContainer>
    );
};

export default AccountsScreen;
