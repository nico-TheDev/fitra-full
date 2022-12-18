import React, { useState, useEffect } from "react";
import { NumericFormat } from 'react-number-format';
import { Text } from 'react-native';

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
import useAccountStore from "hooks/useAccountStore";
import capitalize from "util/capitalize";
import useTransactionStore from "hooks/useTransactionStore";

const TransactionHistoryScreen = ({ navigation, route }) => {
    const currentCategory = route.params.category;
    // GLOBAL STATE
    const userAccounts = useAccountStore(state => state.accounts);
    const allTransactions = useTransactionStore(state => state.transactions);
    // COMPONENT STATE
    const [historyData, setHistoryData] = useState([]);
    const [filterValue, setFilterValue] = useState("year");
    const [selectedAccount, setSelectedAccount] = useState("all");
    const [total, setTotal] = useState(0);
    const [filterItems, setFilterItems] = useState([
        { label: "Per Day", value: "day" },
        { label: "Per Week", value: "week" },
        { label: "Per Month", value: "month" },
        { label: "Per Year", value: "year" },
    ]);
    const [accountList, setAccountList] = useState(() => {
        const accounts = userAccounts.map(account => ({ label: capitalize(account.account_name), value: account.id }));
        return [...accounts, { label: "All", value: "all" }];
    });


    // RUNS EVERY TIME THE DROPDOWN VALUE CHANGES
    useEffect(() => {
        // GET THE TRANSACTIONS SORTED BY TYPE
        const sortedTransactions = allTransactions.filter(transaction => {
            if (transaction.category_name === currentCategory && selectedAccount === "all") {
                return transaction;
            } else if (transaction.category_name === currentCategory && selectedAccount === transaction.target_account) {
                return transaction;
            }
        });

        if (filterValue === "month") {

        } else if (filterValue === "year") {
            const sum = sortedTransactions.reduce((acc, current) => {
                if (current.category_name === currentCategory) {
                    acc += current.amount;
                }

                return acc;
            }, 0);
            setTotal(sum);
            setHistoryData([{
                title: "2022",
                data: sortedTransactions
            }]);
        }

        // console.log("selectedAccount: ", selectedAccount);
        // console.log("selectedFilter: ", filterValue);
    }, [filterValue, selectedAccount]);

    return (
        <TransactionHistoryContainer>
            <ScreenHeader title={currentCategory} />
            <MainContainer>
                <PricePanel>
                    <NumericFormat value={total} displayType={'text'}
                        thousandSeparator={true} prefix={'₱ '}
                        decimalScale={2}
                        renderText={(value) => <PriceText>{value}</PriceText>}
                    />
                </PricePanel>

                <DropdownContainer>
                    <CustomDropdown
                        width="45%"
                        dropdownItems={accountList}
                        setDropdownItems={setAccountList}
                        dropdownProps={{
                            placeholder: "Account",
                            zIndex: 3000,
                            zIndexInverse: 1000,
                        }}
                        style={{ marginBottom: 0 }}
                        setValue={setSelectedAccount}
                        value={selectedAccount}
                    />
                    <FilterInput
                        items={filterItems}
                        setItems={setFilterItems}
                        style={{ width: "45%", marginBottom: 0 }}
                        setValue={setFilterValue}
                        value={filterValue}
                    />
                </DropdownContainer>

                <TransactionSection
                    sections={historyData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => (
                        <CategoryPanelItem
                            iconName={item.transaction_icon}
                            iconColor={item.transaction_color}
                            price={`₱${item.amount}`}
                            comment={item.account_name.toUpperCase()}
                            title={item.category_name}
                            priceSub=""
                            onPress={() =>
                                navigation.navigate("Dashboard", {
                                    screen: "TransactionDetails",
                                    params: {
                                        transactionID: item.id
                                    }
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
