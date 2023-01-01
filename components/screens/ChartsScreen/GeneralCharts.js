import { ScrollView, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import { BarChart, StackedBarChart, LineChart } from "react-native-chart-kit";

import colors from "assets/themes/colors";
import formatDate from "util/formatDate";
import convertTimestamp from "util/convertTimestamp";
import useTransactionStore from "hooks/useTransactionStore";
import { FONTS } from "constants/constant";
import useAuthStore from "hooks/useAuthStore";

const SLIDER_WIDTH = Dimensions.get("window").width;

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

export default function GeneralCharts({ yearData, monthData }) {
    return (
        <>
            <StackedBarChart
                data={yearData}
                width={SLIDER_WIDTH * 0.9}
                height={260}
                fromZero={true}
                chartConfig={chartConfig}
                withVerticalLabels={true}
                withHorizontalLabels={true}
            />

            <BarChart
                data={monthData}
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
                showValuesOnTopOfBars={false}
                flatColor={true}
                verticalLabelRotation={90}
            />
        </>
    );
}
