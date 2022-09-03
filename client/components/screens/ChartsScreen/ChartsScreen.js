import { Dimensions } from "react-native";
import React, { useState } from "react";
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

const typeData = ["General", "Expenses", "Income"];

const chartConfig = {
    backgroundGradientFrom: colors.primary.colorFive,
    backgroundGradientTo: colors.secondary.chartColorEight,
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 5, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional
    decimalPlaces: 0,
    height: 5000,
    fillShadowGradient: colors.primary.colorFive,
    fillShadowGradientOpacity: 1,
    style: {
        fontFamily: FONTS.REGULAR,
    },
    propsForBackgroundLines: {
        strokeWidth: 1,
        stroke: "transparent",
        strokeDasharray: "0",
    },
    propsForLabels: {
        fontFamily: FONTS.REGULAR,
    },
};

const generalData = {
    labels: ["INCOME", "EXPENSES"],
    datasets: [
        {
            data: [30, 100],
        },
    ],
};

const sampleData = [
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "Income",
        price: "Php 20,000",
        iconColor: colors.primary.colorFive,
        iconName: ICON_NAMES.HOME,
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Expense",
        price: "Php 20,000",
        iconColor: colors.secondary.chartColorEleven,
        iconName: ICON_NAMES.MORE,
    },
];

const ChartsScreen = () => {
    const SLIDER_WIDTH = Dimensions.get("window").width;
    const [currentTab, setCurrentTab] = useState("General");

    const [items, setItems] = useState([
        { label: "Show Per Day", value: "day" },
        { label: "Show Per Week", value: "week" },
        { label: "Show Per Month", value: "month" },
        { label: "Show Per Year", value: "year" },
    ]);

    const ButtonRenderItem = ({ item }) => {
        return (
            <Button
                title={item}
                noBorder={false}
                textSize={14}
                width="30%"
                type={currentTab === item && "filled"}
                onPress={() => setCurrentTab(item)}
            />
        );
    };

    const CategoryPanelRenderItem = ({ item }) => (
        <CategoryPanelItem
            iconName={item.iconName}
            iconColor={item.iconColor}
            title={item.title}
            price={item.price}
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

            <FilterInput items={items} setItems={setItems} />

            <ChartPanel>
                <BarChart
                    data={generalData}
                    width={SLIDER_WIDTH * 0.9}
                    height={260}
                    yAxisLabel="₱"
                    chartConfig={chartConfig}
                    withVerticalLabels={true}
                    withHorizontalLabels={true}
                    verticalLabelRotation={0}
                    showValuesOnTopOfBars={true}
                />
            </ChartPanel>

            <CategoryContainer
                data={sampleData}
                renderItem={CategoryPanelRenderItem}
            />
        </ChartsScreenContainer>
    );
};

export default ChartsScreen;
