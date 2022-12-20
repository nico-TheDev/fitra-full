import { Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { BarChart } from "react-native-chart-kit";
// LOCAL IMPORTS
import {
    ChartsScreenContainer,
    TypeNavi,
    ChartPanel,
    CategoryContainer,
} from "./styles";
import Button from "components/Button";
import ScreenHeader from "components/ScreenHeader";

import FilterInput from "components/FilterInput";
import { FONTS, ICON_NAMES } from "constants/constant";
import colors from "assets/themes/colors";
import CategoryPanelItem from "components/CategoryPanelItem/CategoryPanelItem";
import CircleBG from "components/common/CircleBG";
import useUserTransaction from "hooks/useUserTransaction";
import useAuthStore from "hooks/useAuthStore";
import filterByTime from "util/filterByTime";
import useTransactionStore from "hooks/useTransactionStore";
import getTransactionSum from "util/getTransactionSum";

const typeData = ["general", "expense", "income"];

const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 5, // optional, default 3
    barPercentage: 0.5,
    decimalPlaces: 0,
    style: {
        fontFamily: FONTS.REGULAR,
    },
    propsForLabels: {
        fontFamily: FONTS.REGULAR,
    },
    showBarTops: false
};


const ChartsScreen = () => {
    const SLIDER_WIDTH = Dimensions.get("window").width;
    const [currentTab, setCurrentTab] = useState("general");
    const user = useAuthStore(state => state.user);
    const [userChartData] = useUserTransaction(user.user_id);
    const [activeChartData, setActiveChartData] = useState([]);
    const [activeData, setActiveData] = useState([]);
    const allTransactions = useTransactionStore(state => state.transactions);

    const [filterItems, setFilterItems] = useState([
        { label: "Show Per Day", value: "day" },
        { label: "Show Per Month", value: "month" },
        { label: "Show Per Year", value: "year" },
    ]);
    const [selectedFilter, setSelectedFilter] = useState("year");

    // HANDLE FILTER SIDE EFFECT

    useEffect(() => {
        if (userChartData.length !== 0) {
            if (currentTab === "general") {
                // GET THE DATA LIST
                const generalData = userChartData[0];
                const generalDataList = generalData?.data;

                if (selectedFilter === "year") {
                    setActiveData(generalDataList);
                    setActiveChartData({
                        labels: ["EXPENSE", "INCOME"],
                        datasets: [
                            {
                                data: generalDataList?.map(item => item.amount),
                                colors: [(opacity = 1) => generalDataList[0].color, (opacity = 1) => generalDataList[1].color]
                            },
                        ],

                    });
                }
                else if (selectedFilter === "month") {
                    const filteredGeneralData = filterByTime(generalDataList, selectedFilter);

                    console.log(filteredGeneralData);
                }


            } else if (currentTab === "expense") {
                const expenseData = userChartData[1];
                const expenseDataList = expenseData.data;
                console.log(expenseDataList);

                setActiveData(expenseDataList);
                setActiveChartData({
                    labels: expenseDataList.map(item => item.category_name),
                    datasets: [
                        {
                            data: expenseDataList.map(item => item.amount),
                            colors: expenseDataList.map(item => {
                                const color = (opacity = 1) => item.transaction_color;

                                return color;
                            }),

                        },
                    ],

                });

            } else if (currentTab === "income") {
                const incomeData = userChartData[2];
                const incomeDataList = incomeData.data;
                console.log(incomeDataList);

                setActiveData(incomeDataList);
                setActiveChartData({
                    labels: incomeDataList.map(item => item.category_name),
                    datasets: [
                        {
                            data: incomeDataList.map(item => item.amount),
                            colors: incomeDataList.map(item => {
                                const color = (opacity = 1) => item.transaction_color;

                                return color;
                            }),

                        },
                    ],

                });
            }
        } else {
            console.log("loading");
        }

    }, [selectedFilter, currentTab]);





    const ButtonRenderItem = ({ item }) => {
        return (
            <Button
                title={item}
                noBorder={false}
                textSize={14}
                width="30%"
                type={currentTab === item ? "filled" : "outlined"}
                onPress={() => { console.log(item); setCurrentTab(item); }}
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
            priceSub=""
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

            <FilterInput items={filterItems} setItems={setFilterItems} value={selectedFilter} setValue={setSelectedFilter} />

            <ChartPanel>
                {activeChartData.length !== 0 ? (
                    <BarChart
                        data={activeChartData}
                        width={SLIDER_WIDTH * 0.9}
                        height={260}
                        yAxisLabel="₱"
                        fromZero={true}
                        chartConfig={chartConfig}
                        withVerticalLabels={true}
                        withHorizontalLabels={true}
                        withCustomBarColorFromData={true}
                        withInnerLines={false}
                        showValuesOnTopOfBars={false}
                        flatColor={true}
                    />) : null}
            </ChartPanel>

            <CategoryContainer
                data={activeData}
                renderItem={CategoryPanelRenderItem}
            />
        </ChartsScreenContainer>
    );
};

export default ChartsScreen;
