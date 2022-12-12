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

    const user = useAuthStore(state => state.user);
    const transfers = useTransferStore(state => state.transfers);

    const handleNavigate = (id) =>
        navigation.navigate("Accounts", {
            screen: "AccountsEditTransferScreen",
            params: {
                accountID: id
            }
        });

    const AccountPanelRenderItem = ({ item }) => (
        <AccountPanelItem
            iconName={ICON_NAMES.TRANSFER}
            iconColor={colors.primary.colorFive}
            price={item.transfer_amount}
            sender={item.from_amount}
            receiver={item.to_amount}
            onPress={handleNavigate}
        />
    );

    const sectionHeaderRender = ({ section: { title } }) => (
        <SectionHeader>{title}</SectionHeader>
    );

    return (
        <TransferHistoryContainer>
            <ScreenHeader title="Transfer History" />
            <FilterInput items={items} setItems={setItems} />
            <TransferSectionList
                sections={transferHistoryLogData}
                keyExtractor={(item, index) => item + index}
                renderItem={AccountPanelRenderItem}
                renderSectionHeader={sectionHeaderRender}
            />
        </TransferHistoryContainer>
    );
};

export default AccountsTransferHistoryScreen;
