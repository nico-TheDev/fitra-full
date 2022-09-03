// LIBRARY IMPORTS
import React, { useState, useRef, useEffect } from "react";
import { Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

// LOCAL IMPORTS

import DashboardHead from "components/DashboardHead";
import DashboardChart from "components/DashboardChart";
import { chartDataMulti, transactionData } from "fitra/SampleData";
import DashboardRecentPanel from "components/DashboardRecentPanel";
import CircleBG from "components/common/CircleBG";

import colors from "assets/themes/colors";
import { DashboardContainer, DashboardDate } from "./styles";
import useTransactions from "store/useTransactions";
import * as api from "api";

const dotStyle = {
    width: 15,
    height: 15,
    borderRadius: 50,
    marginHorizontal: 10,
    backgroundColor: colors.primary.colorFive,
};

const DashboardScreen = ({ navigation }) => {
    const SLIDER_WIDTH = Dimensions.get("window").width;
    const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
    const [pageIndex, setPageIndex] = useState(0);
    const isCarousel = useRef(null);
    const setTransactions = useTransactions((state) => state.setTransactions);
    const transactions = useTransactions((state) => state.transactions);

    useEffect(() => {
        setTransactions();
    }, []);

    const handleNavigation = () =>
        navigation.navigate("Dashboard", {
            screen: "TransactionDetails",
        });

    const dashboardChartRenderItem = ({ item, index }) => {
        return (
            <DashboardChart
                title={item.name}
                chartData={item?.data}
                key={index}
            />
        );
    };

    const recentPanelRenderItem = ({ item }) => {
        return (
            <DashboardRecentPanel
                data={item}
                key={item._id}
                onPress={handleNavigation}
            />
        );
    };

    return (
        <DashboardContainer>
            {/* BACKGROUND */}
            <CircleBG circleSize={250} />
            {/* START OF THE SCREEN */}
            <DashboardHead />
            <DashboardDate>June 12, 2022</DashboardDate>

            <Carousel
                ref={isCarousel}
                data={chartDataMulti}
                renderItem={dashboardChartRenderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                loop={true}
                onSnapToItem={(i) => setPageIndex(i)}
            />

            <Pagination
                dotsLength={chartDataMulti.length}
                activeDotIndex={pageIndex}
                carouselRef={isCarousel}
                dotStyle={dotStyle}
                tappableDots={true}
                inactiveDotStyle={{
                    backgroundColor: colors.darkgray,
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.8}
            />

            <Carousel
                data={transactions.slice(0, 3)}
                renderItem={recentPanelRenderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                loop={true}
            />
        </DashboardContainer>
    );
};

export default DashboardScreen;
