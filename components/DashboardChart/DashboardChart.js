import React, { memo } from "react";
import { PieChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";

import { Panel } from "components/common/styles/commonStyles";
import DashboardCategoryItem from "components/DashboardCategoryItem";
import Button from "components/Button";
import {
    Title,
    FigureContainer,
    Chart,
    CategoryList,
    CategoryListContainer,
    TitleContainer,
} from "./styles";

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
};

const DashboardChart = ({ title, chartData }) => {
    const navigation = useNavigation();
    if (title === "General") console.log(chartData);
    const handleNavigate = () =>
        navigation.navigate("Dashboard", {
            screen: "TransactionHistory",
        });

    const CategoryRenderItem = ({ item }) => (
        <DashboardCategoryItem
            iconName={item.transaction_icon}
            categoryName={item.category_name}
            total={item.amount}
            key={item.user_id}
            iconColor={item.transaction_color}
            onPress={handleNavigate}
        />
    );

    return (
        <Panel>
            <TitleContainer>
                <Title>{title}</Title>
                <Button
                    title="Add"
                    type="filled"
                    rounded="100px"
                    textSize={14}
                    width="100px"
                    onPress={() => navigation.navigate("AddTransaction")}
                />
            </TitleContainer>
            <FigureContainer>
                {chartData.length && (<Chart>
                    <PieChart
                        data={chartData}
                        height={160}
                        chartConfig={chartConfig}
                        accessor="amount"
                        backgroundColor={"transparent"}
                        center={[80, 0]}
                        absolute
                        hasLegend={false}
                        style={{ width: "100%" }}
                    />
                </Chart>)}
                <CategoryListContainer>
                    <CategoryList
                        data={chartData}
                        renderItem={CategoryRenderItem}
                    />
                </CategoryListContainer>
            </FigureContainer>
        </Panel>
    );
};

export default DashboardChart;
