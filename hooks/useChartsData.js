import { useEffect, useState } from "react";
import { onSnapshot, collection, orderBy, query, where } from "firebase/firestore";

import { db } from "fitra/firebase.config";
import useTransactionStore from "hooks/useTransactionStore";
import useAuthStore from "./useAuthStore";
import colors from "assets/themes/colors";
import formatDate from "util/formatDate";
import convertTimestamp from "util/convertTimestamp";

export default function useChartsData(userID, selectedFilter, currentTab) {
    const { user_id } = useAuthStore((state) => state.user);
    const [chartData, setChartData] = useState({});
    const [activeData, setActiveData] = useState([]);
    // GLOBAL STATE
    const allTransactions = useTransactionStore((state) => state.transactions);
    const setTransactions = useTransactionStore((state) => state.setTransactions);

    useEffect(() => {
        console.log("ALL: ", allTransactions.length);
        // CHECK THE CURRENT TAB TYPE
        if (currentTab === "general") {
            // GENERAL DATA
            const expenseTotal = allTransactions.reduce((acc, currentTransaction) => {
                if (currentTransaction.type === "expense") {
                    acc += currentTransaction.amount;
                }
                return acc;
            }, 0);
            const incomeTotal = allTransactions.reduce((acc, currentTransaction) => {
                if (currentTransaction.type === "income") {
                    acc += currentTransaction.amount;
                }
                return acc;
            }, 0);
            // GET THE DATA LIST
            const generalData = [
                {
                    user_id,
                    amount: expenseTotal,
                    type: "expense",
                    target_account: "gcash",
                    category_name: "Expense",
                    transaction_icon: "food-icon",
                    color: "#2ecc71",
                    transaction_color: "#2ecc71",
                    created_at: { seconds: 1000 },
                },
                {
                    user_id,
                    amount: incomeTotal,
                    type: "income",
                    target_account: "gcash",
                    category_name: "Income",
                    transaction_icon: "charts-icon",
                    color: "#3498db",
                    transaction_color: "#3498db",
                    created_at: { seconds: 1000 },
                },
            ];
            console.log("GENERAL: ", generalData.length);

            if (selectedFilter === "year") {
                setActiveData(generalData);
                setChartData({
                    labels: ["", "2022", ""],
                    legend: [],
                    data: [[], generalData.map((item) => item.amount), []],
                    barColors: generalData.map((item) => item.color),
                    show: true,
                });
            } else if (selectedFilter === "month") {
                const sortedByDate = allTransactions.sort(
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

                // ADD THE MONTHS TO THE FINAL DATA
                monthNames.forEach((month) => {
                    finalMonthData.push({ title: month, data: [] });
                });

                sortedByDate.forEach((transaction) => {
                    const currentDate = formatDate(convertTimestamp(transaction.created_at));
                    const currentMonth = monthNames[currentDate.split("/")[0] - 1];
                    const targetIndex = finalMonthData.findIndex(
                        (item) => item.title === currentMonth
                    );

                    finalMonthData[targetIndex].data.push(transaction);
                });
                console.log("MONTH GEN: ", finalMonthData.length);

                // RUN PER MONTH

                const monthDataList = [];

                setActiveData(allTransactions);

                const theData = {
                    show: true,
                    labels: monthNames,
                    datasets: [
                        // EXPENSES
                        {
                            data: [12, 9, 8, 7, 5, 12, 3, 4, 2, 1, 1, 9], // 12 items,
                            color: (opacity = 1) => colors.primary.colorFive,
                            strokeWidth: 2,
                        },
                        // INCOME
                        {
                            data: [12, 9, 8, 7, 5, 12, 3, 4, 2, 1, 1, 9], // 12 items,
                            color: (opacity = 1) => colors.primary.colorFive,
                            strokeWidth: 2,
                        },
                    ],
                };
                console.log(theData);
                setChartData(theData);
            }
        } else if (currentTab === "expense") {
        } else if (currentTab === "income") {
            // const expenseList = dataList.filter((item) => item.type === "expense");
            // const incomeList = dataList.filter((item) => item.type === "income");
            // // EXPENSE DATA
            // // Create a unique category array for expenses
            // const expenseCategoryList = expenseList.reduce((acc, currentExpense) => {
            //     if (!acc.includes(currentExpense.category_name)) {
            //         acc.push(currentExpense.category_name);
            //     }
            //     return acc;
            // }, []);
            // // create an initial data holder
            // const expenseDataList = expenseCategoryList.map((category) => {
            //     const targetCategory = expenseList.find((item) => item.category_name === category);
            //     return {
            //         user_id,
            //         amount: 0,
            //         type: "expense",
            //         category_name: category,
            //         transaction_icon: targetCategory.transaction_icon,
            //         color: targetCategory.transaction_color,
            //         transaction_color: targetCategory.transaction_color,
            //     };
            // });
            // // add the amount to the initial data
            // expenseList.forEach((item) => {
            //     // find the data
            //     const targetCategory = expenseDataList.find(
            //         (currentData) => item.category_name === currentData.category_name
            //     );
            //     if (item.category_name === targetCategory.category_name) {
            //         targetCategory.amount += item.amount;
            //     }
            // });
            // // INCOME DATA
            // const incomeData = dataList.filter((transaction) => transaction.type === "income");
            // // Create a unique category array for expenses
            // const incomeCategoryList = incomeList.reduce((acc, currentIncome) => {
            //     if (!acc.includes(currentIncome.category_name)) {
            //         acc.push(currentIncome.category_name);
            //     }
            //     return acc;
            // }, []);
            // // create an initial data holder
            // const incomeDataList = incomeCategoryList.map((category) => {
            //     const targetCategory = incomeList.find((item) => item.category_name === category);
            //     return {
            //         user_id,
            //         amount: 0,
            //         type: "income",
            //         category_name: category,
            //         transaction_icon: targetCategory.transaction_icon,
            //         color: targetCategory.transaction_color,
            //         transaction_color: targetCategory.transaction_color,
            //     };
            // });
            // // add the amount to the initial data
            // incomeList.forEach((item) => {
            //     // find the data
            //     const targetCategory = incomeDataList.find(
            //         (currentData) => item.category_name === currentData.category_name
            //     );
            //     if (item.category_name === targetCategory.category_name) {
            //         targetCategory.amount += item.amount;
            //     }
            // });
            // const graphChartData = [
            //     {
            //         name: "General",
            //         data: generalData,
            //     },
            //     {
            //         name: "Expense",
            //         data: expenseDataList,
            //     },
            //     {
            //         name: "Income",
            //         data: incomeDataList,
            //     },
            // ];
            // console.log("data", data);
        }

        // GET ALL THE RECENT TRANSACTIONS
    }, [selectedFilter, currentTab]);

    console.log({ chartData });
    return [chartData, activeData];
}
