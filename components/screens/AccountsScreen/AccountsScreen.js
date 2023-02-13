import { FlatList, Text } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NumericFormat } from "react-number-format";

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

import useAccountsListener from "hooks/useAccountsListener";
import useAuthStore from "hooks/useAuthStore";
import useAccountStore from "hooks/useAccountStore";
import { useEffect } from "react";

const AccountsScreen = () => {
    const navigation = useNavigation();
    const user = useAuthStore((state) => state.user);
    const accounts = useAccountStore((state) => state.accounts);
    // const [totalBalance] = useAccountsListener(user.user_id);
    let [totalBalance, setTotalBalance] = useState("");

    useEffect(() => {
        const accountsTotal = accounts.reduce((acc, currentAccount) => {
            acc += parseFloat(currentAccount.account_amount);
            return acc;
        }, 0);

        setTotalBalance(accountsTotal);
    }, [accounts]);

    const handleNavigation = (id) =>
        navigation.navigate("Accounts", {
            screen: "AccountsDetailsScreen",
            params: {
                accountID: id,
            },
        });

    const renderCategoryPanelItem = ({ item }) => {
        return (
            <CategoryPanelItem
                onPress={() => {
                    handleNavigation(item.id);
                }}
                iconName={item.account_icon}
                iconColor={item.account_color}
                title={item.account_name}
                price={String(item.account_amount)}
            />
        );
    };

    return (
        <AccountsContainer>
            <ScreenHeader
                title="Accounts"
                iconName={ICON_NAMES.SYSTEM_ICONS.REFRESH}
                onPressIcon={() =>
                    navigation.navigate("Accounts", {
                        screen: "AccountsTransferHistoryScreen",
                    })
                }
            />
            <TotalBalanceContainer>
                <TotalBalanceLabel>Total Balance:</TotalBalanceLabel>
                <TotalAmountBalanceLabel>
                    <NumericFormat
                        value={totalBalance}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                        decimalScale={2}
                        renderText={(value) => <Text>{value}</Text>}
                    />
                </TotalAmountBalanceLabel>
            </TotalBalanceContainer>
            <AccountsFunctionHolder />
            <HolderContainer>
                <FlatList
                    data={accounts}
                    renderItem={renderCategoryPanelItem}
                    keyExtractor={(item) => item.id}
                />
            </HolderContainer>
        </AccountsContainer>
    );
};

export default AccountsScreen;
