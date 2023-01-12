import { Dimensions, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { BarChart, StackedBarChart, LineChart } from "react-native-chart-kit";
// LOCAL IMPORTS
import { ChartsScreenContainer, TypeNavi, ChartPanel, CategoryContainer } from "./styles";
import Button from "components/Button";
import ScreenHeader from "components/ScreenHeader";

import FilterInput from "components/FilterInput";
import { FONTS, ICON_NAMES } from "constants/constant";
import CategoryPanelItem from "components/CategoryPanelItem/CategoryPanelItem";
import CircleBG from "components/common/CircleBG";
import useAuthStore from "hooks/useAuthStore";
import useChartsData from "hooks/useChartsData";
import { Line } from "react-native-svg";
import useTransactionStore from "hooks/useTransactionStore";
import colors from "assets/themes/colors";
import formatDate from "util/formatDate";
import convertTimestamp from "util/convertTimestamp";
import GeneralCharts from "./GeneralCharts";

const typeData = ["general", "expense", "income"];

const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 5, // optional, default 3
    decimalPlaces: 0,
    style: {
        fontFamily: FONTS.REGULAR,
    },
    propsForLabels: {
        fontFamily: FONTS.REGULAR,
    },
    showBarTops: false,
};

const SLIDER_WIDTH = Dimensions.get("window").width;

const ChartsScreen = () => {
    const [currentTab, setCurrentTab] = useState("general");
    const user = useAuthStore((state) => state.user);
    const allTransactions = useTransactionStore((state) => state.transactions);

    const [chartData, setChartData] = useState({
        generalYear: null,
        generalMonth: null,
        expenseYear: null,
        expenseMonth: null,
        incomeYear: null,
        incomeMonth: null,
    });
    const [activeData, setActiveData] = useState({});
    const [expenseData, setExpenseData] = useState(null);
    const [incomeData, setIncomeData] = useState(null);

    const [filterItems, setFilterItems] = useState([
        { label: "Show Per Day", value: "day" },
        { label: "Show Per Month", value: "month" },
        { label: "Show Per Year", value: "year" },
    ]);
    const [selectedFilter, setSelectedFilter] = useState("year");

    useEffect(() => {
        const user_id = user.user_id;
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
            // console.log("GENERAL: ", generalData.length);

            // setActiveData(generalData);
            const generalChartYearData = {
                labels: ["2021", "2022", "2023"],
                legend: ["Expense", "Income"],
                data: [[], generalData.map((item) => item.amount), []],
                barColors: generalData.map((item) => item.color),
                show: true,
            };
            const sortedByDate = allTransactions.sort(
                (a, b) => a.created_at.seconds > b.created_at.seconds
            );
            const finalMonthData = [];
            const monthNames = [
                "Jan",
                "Feb",
                "Mar",
                "Ap",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ];

            // ADD THE MONTHS TO THE FINAL DATA
            monthNames.forEach((month) => {
                finalMonthData.push({ title: month, data: [] });
            });

            sortedByDate.forEach((transaction) => {
                const currentDate = formatDate(convertTimestamp(transaction.created_at));
                const currentMonth = monthNames[currentDate.split("/")[0] - 1];
                const targetIndex = finalMonthData.findIndex((item) => item.title === currentMonth);

                finalMonthData[targetIndex].data.push(transaction);
            });

            // console.log("MONTH GEN: ", finalMonthData);

            // RUN PER MONTH

            // console.log(finalMonthData.map((item) => `${item.title}: ${item.data.length}`));

            const monthDataList = finalMonthData.map((currentMonth) => {
                if (currentMonth.data.length !== 0) {
                    const sum = currentMonth.data.reduce((acc, currentTransaction) => {
                        const currentDate = formatDate(
                            convertTimestamp(currentTransaction.created_at)
                        );
                        const currentTransactionMonth = monthNames[currentDate.split("/")[0] - 1];
                        // console.log("Current Month:", currentMonth);
                        // console.log("Current Title:", currentMonth.title);
                        if (currentTransactionMonth === currentMonth.title) {
                            acc += currentTransaction.amount;
                        }

                        return acc;
                    }, 0);

                    return sum;
                } else {
                    return 0;
                }
            });

            // console.log(monthDataList);

            const generalChartMonthData = {
                labels: monthNames,
                datasets: [
                    {
                        data: monthDataList,
                        colors: [
                            (opacity = 1) => colors.secondary.chartColorOne,
                            (opacity = 1) => colors.secondary.chartColorTwo,
                            (opacity = 1) => colors.secondary.chartColorThree,
                            (opacity = 1) => colors.secondary.chartColorFour,
                            (opacity = 1) => colors.secondary.chartColorFive,
                            (opacity = 1) => colors.secondary.chartColorSix,
                            (opacity = 1) => colors.secondary.chartColorSeven,
                            (opacity = 1) => colors.secondary.chartColorEight,
                            (opacity = 1) => colors.secondary.chartColorNine,
                            (opacity = 1) => colors.secondary.chartColorTen,
                            (opacity = 1) => colors.secondary.chartColorEleven,
                            (opacity = 1) => colors.secondary.chartColorTwelve,
                        ],
                    },
                ],
            };

            setChartData({
                ...chartData,
                generalYear: generalChartYearData,
                generalMonth: generalChartMonthData,
            });
        } else if (currentTab === "expense") {
            const allExpenses = allTransactions.filter((item) => item.type === "expense");

            const sortedByDate = allExpenses.sort(
                (a, b) => a.created_at.seconds > b.created_at.seconds
            );
            const finalMonthData = [];
            const monthNames = [
                "Jan",
                "Feb",
                "Mar",
                "Ap",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ];

            // ADD THE MONTHS TO THE FINAL DATA
            monthNames.forEach((month) => {
                finalMonthData.push({ title: month, data: [] });
            });

            sortedByDate.forEach((transaction) => {
                const currentDate = formatDate(convertTimestamp(transaction.created_at));
                const currentMonth = monthNames[currentDate.split("/")[0] - 1];
                const targetIndex = finalMonthData.findIndex((item) => item.title === currentMonth);

                finalMonthData[targetIndex].data.push(transaction);
            });

            // console.log("MONTH GEN: ", finalMonthData);

            // RUN PER MONTH

            // console.log(finalMonthData.map((item) => `${item.title}: ${item.data.length}`));

            const monthDataList = finalMonthData.map((currentMonth) => {
                if (currentMonth.data.length !== 0) {
                    const sum = currentMonth.data.reduce((acc, currentTransaction) => {
                        const currentDate = formatDate(
                            convertTimestamp(currentTransaction.created_at)
                        );
                        const currentTransactionMonth = monthNames[currentDate.split("/")[0] - 1];
                        // console.log("Current Month:", currentMonth);
                        // console.log("Current Title:", currentMonth.title);
                        if (currentTransactionMonth === currentMonth.title) {
                            acc += currentTransaction.amount;
                        }

                        return acc;
                    }, 0);

                    return sum;
                } else {
                    return 0;
                }
            });

            // console.log(monthDataList);

            const expenseChartMonthData = {
                labels: monthNames,
                datasets: [
                    {
                        data: monthDataList,
                        colors: [
                            (opacity = 1) => colors.secondary.chartColorOne,
                            (opacity = 1) => colors.secondary.chartColorTwo,
                            (opacity = 1) => colors.secondary.chartColorThree,
                            (opacity = 1) => colors.secondary.chartColorFour,
                            (opacity = 1) => colors.secondary.chartColorFive,
                            (opacity = 1) => colors.secondary.chartColorSix,
                            (opacity = 1) => colors.secondary.chartColorSeven,
                            (opacity = 1) => colors.secondary.chartColorEight,
                            (opacity = 1) => colors.secondary.chartColorNine,
                            (opacity = 1) => colors.secondary.chartColorTen,
                            (opacity = 1) => colors.secondary.chartColorEleven,
                            (opacity = 1) => colors.secondary.chartColorTwelve,
                        ],
                    },
                ],
            };
            setActiveData(allExpenses);
            setExpenseData(expenseChartMonthData);
        } else if (currentTab === "income") {
            const allIncome = allTransactions.filter((item) => item.type === "income");

            const sortedByDate = allIncome.sort(
                (a, b) => a.created_at.seconds > b.created_at.seconds
            );
            const finalMonthData = [];
            const monthNames = [
                "Jan",
                "Feb",
                "Mar",
                "Ap",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ];

            // ADD THE MONTHS TO THE FINAL DATA
            monthNames.forEach((month) => {
                finalMonthData.push({ title: month, data: [] });
            });

            sortedByDate.forEach((transaction) => {
                const currentDate = formatDate(convertTimestamp(transaction.created_at));
                const currentMonth = monthNames[currentDate.split("/")[0] - 1];
                const targetIndex = finalMonthData.findIndex((item) => item.title === currentMonth);

                finalMonthData[targetIndex].data.push(transaction);
            });

            // console.log("MONTH GEN: ", finalMonthData);

            // RUN PER MONTH

            // console.log(finalMonthData.map((item) => `${item.title}: ${item.data.length}`));

            const monthDataList = finalMonthData.map((currentMonth) => {
                if (currentMonth.data.length !== 0) {
                    const sum = currentMonth.data.reduce((acc, currentTransaction) => {
                        const currentDate = formatDate(
                            convertTimestamp(currentTransaction.created_at)
                        );
                        const currentTransactionMonth = monthNames[currentDate.split("/")[0] - 1];
                        // console.log("Current Month:", currentMonth);
                        // console.log("Current Title:", currentMonth.title);
                        if (currentTransactionMonth === currentMonth.title) {
                            acc += currentTransaction.amount;
                        }

                        return acc;
                    }, 0);

                    return sum;
                } else {
                    return 0;
                }
            });

            // console.log(monthDataList);

            const incomeChartMonthData = {
                labels: monthNames,
                datasets: [
                    {
                        data: monthDataList,
                        colors: [
                            (opacity = 1) => colors.secondary.chartColorOne,
                            (opacity = 1) => colors.secondary.chartColorTwo,
                            (opacity = 1) => colors.secondary.chartColorThree,
                            (opacity = 1) => colors.secondary.chartColorFour,
                            (opacity = 1) => colors.secondary.chartColorFive,
                            (opacity = 1) => colors.secondary.chartColorSix,
                            (opacity = 1) => colors.secondary.chartColorSeven,
                            (opacity = 1) => colors.secondary.chartColorEight,
                            (opacity = 1) => colors.secondary.chartColorNine,
                            (opacity = 1) => colors.secondary.chartColorTen,
                            (opacity = 1) => colors.secondary.chartColorEleven,
                            (opacity = 1) => colors.secondary.chartColorTwelve,
                        ],
                    },
                ],
            };
            setActiveData(allIncome);
            setIncomeData(incomeChartMonthData);
        }
    }, [currentTab]);

    const ButtonRenderItem = ({ item }) => {
        return (
            <Button
                title={item}
                noBorder={false}
                textSize={14}
                width="30%"
                type={currentTab === item ? "filled" : "outlined"}
                onPress={() => {
                    setCurrentTab(item);
                }}
            />
        );
    };

    const CategoryPanelRenderItem = ({ item }) => (
        <CategoryPanelItem
            iconName={item.transaction_icon}
            iconColor={item.transaction_color}
            title={item.category_name}
            price={String(item.amount)}
            onPress={() => { }}
        />
    );

    return (
        <ChartsScreenContainer>
            <CircleBG circleSize={250} />
            <ScreenHeader title="Charts" />
            <TypeNavi
                data={typeData}
                renderItem={ButtonRenderItem}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: "space-between",
                }}
                extraData={{ currentTab }}
            />

            <ChartPanel horizontal={false}>
                {(chartData.generalYear && chartData.generalMonth && currentTab === "general") ? (
                    <GeneralCharts
                        yearData={chartData.generalYear}
                        monthData={chartData.generalMonth}
                    />
                ) : null}
                {(expenseData && currentTab === "expense") ? (
                    <BarChart
                        data={expenseData}
                        width={SLIDER_WIDTH * 0.9}
                        height={260}
                        fromZero={true}
                        style={{
                            paddingRight: 0,
                        }}
                        chartConfig={{ ...chartConfig, barPercentage: 0.5 }}
                        withVerticalLabels={true}
                        withHorizontalLabels={false}
                        withCustomBarColorFromData={true}
                        withInnerLines={false}
                        showValuesOnTopOfBars={true}
                        flatColor={true}
                        verticalLabelRotation={90}
                    />
                ) : null}
                {(incomeData && currentTab === "income") ? (
                    <BarChart
                        data={incomeData}
                        width={SLIDER_WIDTH * 0.9}
                        height={260}
                        fromZero={true}
                        style={{
                            paddingRight: 0,
                        }}
                        chartConfig={{ ...chartConfig, barPercentage: 0.5 }}
                        withVerticalLabels={true}
                        withHorizontalLabels={false}
                        withCustomBarColorFromData={true}
                        withInnerLines={false}
                        showValuesOnTopOfBars={true}
                        flatColor={true}
                        verticalLabelRotation={90}
                    />
                ) : null}
            </ChartPanel>

            {currentTab !== "general" ? (
                <CategoryContainer data={activeData} renderItem={CategoryPanelRenderItem} />
            ) : null}
        </ChartsScreenContainer>
    );
};

export default ChartsScreen;
