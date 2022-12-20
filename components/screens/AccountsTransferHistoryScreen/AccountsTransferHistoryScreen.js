import React, { useState, useEffect } from "react";
// LOCAL IMPORTS

import ScreenHeader from "components/ScreenHeader";
import FilterInput from "components/FilterInput";
import AccountPanelItem from "components/AccountPanelItem";
import colors from "assets/themes/colors";
import { ICON_NAMES } from "constants/constant";
import { transferHistoryLogData } from "fitra/SampleData";
import convertTimestamp from "util/convertTimestamp";
import formatDate from "util/formatDate";

import {
    SectionHeader,
    TransferHistoryContainer,
    TransferSectionList,
} from "./styles";

import useAuthStore from "hooks/useAuthStore";
import useTransferStore from "hooks/useTransferStore";
import useTransferListener from "hooks/useTransferListener";

const AccountsTransferHistoryScreen = ({ navigation }) => {
    const [items, setItems] = useState([
        { label: "Show Per Day", value: "day" },
        { label: "Show Per Week", value: "week" },
        { label: "Show Per Month", value: "month" },
        { label: "Show Per Year", value: "year" },
    ]);

    const transferLog = useTransferStore(state => state.transfers);
    const user = useAuthStore(state => state.user);
    const [userTransfers] = useTransferListener(user.user_id);

    const [historyData, setHistoryData] = useState([]);
    const [filterValue, setFilterValue] = useState("year");

    const DATA = [
        {
            title: "Transfers",
            data: userTransfers
        },
    ];

    useEffect(() => {
        if (filterValue === "day") {
            const sortedByDate = transferLog.sort((a, b) => a.created_at.seconds > b.created_at.seconds);
            // CREATE UNIQUE DAYS ARRAY
            const uniqueDays = [];
            const finalDayData = [];

            // GET THE AVAILABLE DATES
            sortedByDate.forEach(item => {
                const currentDate = formatDate(convertTimestamp(item.created_at));
                if (!uniqueDays.includes(currentDate)) {
                    uniqueDays.push(currentDate);
                }
            });

            // ADD THE DATES TO THE FINAL DATA
            uniqueDays.forEach(date => {
                const textDate = formatDate(new Date(date), true);
                finalDayData.push({ title: textDate, data: [], date });
            });

            transferLog.forEach(transfers => {
                const currentDate = formatDate(convertTimestamp(transfers.created_at));
                const targetIndex = finalDayData.findIndex(item => item.date === currentDate);

                finalDayData[targetIndex].data.push(transfers);
            });
            setHistoryData(finalDayData);
            console.log(finalDayData);
        }

        else if (filterValue === "month") {
            const sortedByDate = transferLog.sort((a, b) => a.created_at.seconds > b.created_at.seconds);
            const finalMonthData = [];
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const uniqueMonths = [];

            // GET THE AVAILABLE MONTHS
            sortedByDate.forEach(item => {
                const currentDate = formatDate(convertTimestamp(item.created_at));

                const currentMonth = Number(currentDate.split("/")[0]) - 1;
                if (!uniqueMonths.includes(monthNames[currentMonth])) {
                    uniqueMonths.push(monthNames[currentMonth]);
                }
            });

            // ADD THE MONTHS TO THE FINAL DATA
            uniqueMonths.forEach(month => {
                finalMonthData.push({ title: month, data: [], });
            });

            transferLog.forEach(transfers => {
                const currentDate = formatDate(convertTimestamp(transfers.created_at));
                const currentMonth = monthNames[currentDate.split("/")[0] - 1];
                const targetIndex = finalMonthData.findIndex(item => item.title === currentMonth);

                finalMonthData[targetIndex].data.push(transfers);
            });
            setHistoryData(finalMonthData);

        } else if (filterValue === "year") {
            setHistoryData([{
                title: "2022",
                data: userTransfers
            }]);
        }
    }, [filterValue])

    const handleNavigate = (id) =>
        navigation.navigate("Accounts", {
            screen: "AccountsEditTransferScreen",
            params: {
                transferID: id
            }
        });

    const renderAccountPanelItem = ({ item }) => {
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

    return (
        <TransferHistoryContainer>
            <ScreenHeader title="Transfer History" />
            <FilterInput items={items} setItems={setItems} setValue={setFilterValue} value={filterValue}/>
            <TransferSectionList
                sections={historyData}
                keyExtractor={(item, index) => item + index}
                renderItem={renderAccountPanelItem}
                renderSectionHeader={({ section: { title } }) => (
                    <SectionHeader>{title}</SectionHeader>
                )}
            />
        </TransferHistoryContainer>
    );
};

export default AccountsTransferHistoryScreen;
