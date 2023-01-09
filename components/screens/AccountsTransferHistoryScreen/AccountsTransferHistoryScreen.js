import React, { useState, useEffect } from "react";
import { View } from "react-native";
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
    Placeholder,
    ViewHolder,
} from "./styles";

import useAuthStore from "hooks/useAuthStore";
import useTransferStore from "hooks/useTransferStore";
import useTransferListener from "hooks/useTransferListener";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "fitra/firebase.config";
import Button from "components/Button";

const AccountsTransferHistoryScreen = ({ navigation }) => {
    const [items, setItems] = useState([
        { label: "Show Per Day", value: "day" },
        { label: "Show Per Month", value: "month" },
        { label: "Show Per Year", value: "year" },
    ]);

    const user = useAuthStore((state) => state.user);
    const setTransfers = useTransferStore((state) => state.setTransfers);
    const transferColRef = collection(db, "transfers");
    let [transferLog, setTransferLog] = useState([]);
    const transferQuery = query(transferColRef, where("user_id", "==", user.user_id));

    // const [userTransfers] = useTransferListener(user.user_id);

    const [historyData, setHistoryData] = useState([]);
    const [filterValue, setFilterValue] = useState("");

    useEffect(() => {
        const unsubscribe = onSnapshot(transferQuery, (snapshotData) => {
            // console.log(userID);
            const userTransfers = [];
            snapshotData.forEach((doc) => {
                userTransfers.push({
                    sender_account_name: doc.data().sender_account_name,
                    sender_account_id: doc.data().sender_account_id,
                    receiver_account_id: doc.data().receiver_account_id,
                    receiver_account_name: doc.data().receiver_account_name,
                    transfer_amount: doc.data().transfer_amount,
                    comments: doc.data().transfer_amount,
                    comment_img: doc.data().comment_img,
                    comment_img_ref: doc.data().comment_img_ref,
                    created_at: doc.data().created_at,
                    user_id: doc.data().user_id || "1",
                    id: doc.id,
                });
                // console.log("TRANSFER", doc.id);
            });
            // console.log("USER TRANSFERS", userTransfers);
            setTransfers(userTransfers);
            setTransferLog(userTransfers);
            setFilterValue("year");
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        if (filterValue === "day") {
            const sortedByDate = transferLog.sort(
                (a, b) => a.created_at.seconds > b.created_at.seconds
            );
            // CREATE UNIQUE DAYS ARRAY
            const uniqueDays = [];
            const finalDayData = [];

            // GET THE AVAILABLE DATES
            sortedByDate.forEach((item) => {
                const currentDate = formatDate(convertTimestamp(item.created_at));
                if (!uniqueDays.includes(currentDate)) {
                    uniqueDays.push(currentDate);
                }
            });

            // ADD THE DATES TO THE FINAL DATA
            uniqueDays.forEach((date) => {
                const textDate = formatDate(new Date(date), true);
                finalDayData.push({ title: textDate, data: [], date });
            });

            transferLog.forEach((transfers) => {
                const currentDate = formatDate(convertTimestamp(transfers.created_at));
                const targetIndex = finalDayData.findIndex((item) => item.date === currentDate);

                finalDayData[targetIndex].data.push(transfers);
            });
            setHistoryData(finalDayData);
        } else if (filterValue === "month") {
            const sortedByDate = transferLog.sort(
                (a, b) => a.created_at.seconds > b.created_at.seconds
            );
            const finalMonthData = [];
            const monthNames = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];
            const uniqueMonths = [];

            // GET THE AVAILABLE MONTHS
            sortedByDate.forEach((item) => {
                const currentDate = formatDate(convertTimestamp(item.created_at));

                const currentMonth = Number(currentDate.split("/")[0]) - 1;
                if (!uniqueMonths.includes(monthNames[currentMonth])) {
                    uniqueMonths.push(monthNames[currentMonth]);
                }
            });

            // ADD THE MONTHS TO THE FINAL DATA
            uniqueMonths.forEach((month) => {
                finalMonthData.push({ title: month, data: [] });
            });

            transferLog.forEach((transfers) => {
                const currentDate = formatDate(convertTimestamp(transfers.created_at));
                const currentMonth = monthNames[currentDate.split("/")[0] - 1];
                const targetIndex = finalMonthData.findIndex((item) => item.title === currentMonth);

                finalMonthData[targetIndex].data.push(transfers);
            });
            setHistoryData(finalMonthData);
        } else if (filterValue === "year") {
            setHistoryData([
                {
                    title: "2023",
                    data: transferLog,
                },
            ]);
        }
    }, [filterValue]);

    const handleNavigate = (id) =>
        navigation.navigate("Accounts", {
            screen: "AccountsEditTransferScreen",
            params: {
                transferID: id,
            },
        });

    const handleTransferNavigate = (screen) => {
        navigation.navigate("Accounts", {
            screen,
            initial: false,
        });
    };

    const renderAccountPanelItem = ({ item }) => {
        console.log("ITEM:", item);
        return (
            <AccountPanelItem
                iconColor={colors.primary.colorFive}
                price={String(item.transfer_amount)}
                sender={item.sender_account_name}
                receiver={item.receiver_account_name}
                onPress={() => handleNavigate(item.id)}
            />
        );
    };

    return (
        <TransferHistoryContainer>
            <ScreenHeader title="Transfer History" />
            <FilterInput
                items={items}
                setItems={setItems}
                setValue={setFilterValue}
                value={filterValue}
            />
            {transferLog.length !== 0 ? (
                <TransferSectionList
                    sections={historyData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={renderAccountPanelItem}
                    renderSectionHeader={({ section: { title } }) => (
                        <SectionHeader>{title}</SectionHeader>
                    )}
                />
            ) : (
                <ViewHolder>
                    <Placeholder>📩 Start Adding Transfers</Placeholder>
                    <Button
                        type="filled"
                        width="160px"
                        iconSize={20}
                        title="Add Transfer"
                        rounded="15px"
                        textSize={14}
                        onPress={() => handleTransferNavigate("AccountsCTScreen")}
                    />
                </ViewHolder>
            )}
        </TransferHistoryContainer>
    );
};

export default AccountsTransferHistoryScreen;
