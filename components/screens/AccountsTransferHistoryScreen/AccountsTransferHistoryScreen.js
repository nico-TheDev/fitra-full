import React, { useState } from "react";
// LOCAL IMPORTS

import ScreenHeader from "components/ScreenHeader";
import FilterInput from "components/FilterInput";
import AccountPanelItem from "components/AccountPanelItem";
import colors from "assets/themes/colors";
import { ICON_NAMES } from "constants/constant";
import { transferHistoryLogData } from "fitra/SampleData";
import {
    SectionHeader,
    TransferHistoryContainer,
    TransferSectionList,
} from "./styles";

import useTransferStore from "hooks/useTransferStore";
import useAuthStore from "hooks/useAuthStore";

const AccountsTransferHistoryScreen = ({ navigation }) => {
    const [items, setItems] = useState([
        { label: "Show Per Day", value: "day" },
        { label: "Show Per Week", value: "week" },
        { label: "Show Per Month", value: "month" },
        { label: "Show Per Year", value: "year" },
    ]);

    const DATA = [
        {
            title: "Transfers",
            data: transferLog
        },
    ];

    const user = useAuthStore(state => state.user);
    const transferLog = useTransferStore(state => state.transfers);

    const handleNavigate = (id) =>
        navigation.navigate("Accounts", {
            screen: "AccountsEditTransferScreen",
            params: {
                transferID: id
            }
        });

    const AccountPanelRenderItem = ({ item }) => {
        return(
            <AccountPanelItem
            iconName={ICON_NAMES.TRANSFER}
            iconColor={colors.primary.colorFive}
            price={item.transfer_amount}
            sender={item.from_account}
            receiver={item.to_account}
            onPress={() => {handleNavigate(item.id);}}
            />
        );
    };

    const sectionHeaderRender = ({ section }) => {
        <SectionHeader>{section.title}</SectionHeader>
    };

    return (
        <TransferHistoryContainer>
            <ScreenHeader title="Transfer History" />
            <FilterInput items={items} setItems={setItems} />
            <TransferSectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={AccountPanelRenderItem}
                renderSectionHeader={sectionHeaderRender}
            />
        </TransferHistoryContainer>
    );
};

export default AccountsTransferHistoryScreen;
