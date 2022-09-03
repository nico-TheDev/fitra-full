import React, { useState } from "react";

import {
    MainContainer,
    TransactionHistoryContainer,
    PricePanel,
    PriceText,
    DropdownContainer,
    TransactionSection,
    SectionHeader,
} from "./styles";
import ScreenHeader from "components/ScreenHeader";
import CustomDropdown from "components/CustomDropdown";
import FilterInput from "components/FilterInput";
import { transactionHistoryData } from "fitra/SampleData";
import CategoryPanelItem from "components/CategoryPanelItem";
import colors from "assets/themes/colors";

const TransactionHistoryScreen = ({ navigation }) => {
    const [items, setItems] = useState([
        { label: "Per Day", value: "day" },
        { label: "Per Week", value: "week" },
        { label: "Per Month", value: "month" },
        { label: "Per Year", value: "year" },
    ]);
    const [senderItems, setSenderItems] = useState([
        { label: "Wallet", value: "wallet" },
        { label: "GCASH", value: "gcash" },
        { label: "UnionBank", value: "unionbank" },
    ]);

    return (
        <TransactionHistoryContainer>
            <ScreenHeader title="Wellness" />
            <MainContainer>
                <PricePanel>
                    <PriceText>₱ 18, 841.38</PriceText>
                </PricePanel>

                <DropdownContainer>
                    <CustomDropdown
                        width="45%"
                        dropdownItems={senderItems}
                        setDropdownItems={setSenderItems}
                        dropdownProps={{
                            placeholder: "Account",
                            zIndex: 3000,
                            zIndexInverse: 1000,
                        }}
                        style={{ marginBottom: 0 }}
                    />
                    <FilterInput
                        items={items}
                        setItems={setItems}
                        style={{ width: "45%", marginBottom: 0 }}
                    />
                </DropdownContainer>

                <TransactionSection
                    sections={transactionHistoryData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => (
                        <CategoryPanelItem
                            iconName={item.transactionIcon}
                            iconColor={colors.primary.colorFive}
                            price={`₱${item.amount}`}
                            comment={item.chooseAccount.toUpperCase()}
                            title={item.categoryName}
                            priceSub="Wallet"
                            onPress={() =>
                                navigation.navigate("Dashboard", {
                                    screen: "TransactionDetails",
                                })
                            }
                        />
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <SectionHeader>{title}</SectionHeader>
                    )}
                />
            </MainContainer>
        </TransactionHistoryContainer>
    );
};

export default TransactionHistoryScreen;
