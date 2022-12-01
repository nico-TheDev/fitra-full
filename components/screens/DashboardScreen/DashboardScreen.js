// LIBRARY IMPORTS
import React, { useState, useRef, useEffect } from "react";
import { Dimensions, Text } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { onSnapshot, collection, orderBy, query, where } from 'firebase/firestore';


// LOCAL IMPORTS

import DashboardHead from "components/DashboardHead";
import DashboardChart from "components/DashboardChart";
import DashboardRecentPanel from "components/DashboardRecentPanel";
import CircleBG from "components/common/CircleBG";

import colors from "assets/themes/colors";
import { DashboardContainer, DashboardDate, DefaultText, DefaultTransactionPanel } from "./styles";
import { db } from "fitra/firebase.config";
import useTransactionStore from "hooks/useTransactionStore";
import getCurrentDate from "util/getCurrentDate";
import useAuthStore from "hooks/useAuthStore";
import useUserTransaction from "hooks/useUserTransaction";
import Button from "components/Button";


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
    const transactions = useTransactionStore(state => state.transactions);
    const user = useAuthStore(state => state.user);
    const isCarousel = useRef(null);
    const [chartData] = useUserTransaction(user.user_id);

    const handleNavigation = (id) =>
        navigation.navigate("Dashboard", {
            screen: "TransactionDetails",
            params: {
                transactionID: id
            }

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
                key={item.id}
                onPress={() => handleNavigation(item.id)}
            />
        );
    };

    const handleAddTransaction = () => navigation.navigate("AddTransaction");


    return (
        <DashboardContainer>
            {/* BACKGROUND */}
            <CircleBG circleSize={250} />
            {/* START OF THE SCREEN */}
            <DashboardHead />
            <DashboardDate>{getCurrentDate()}</DashboardDate>

            {transactions.length ? <Carousel
                ref={isCarousel}
                data={chartData}
                renderItem={dashboardChartRenderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                loop={true}
                onSnapToItem={(i) => setPageIndex(i)}
            /> : <DefaultTransactionPanel>
                <DefaultText>💵</DefaultText>
                <DefaultText>Start tracking to see graphs</DefaultText>
                <Button title="Add Transaction" type="filled" onPress={handleAddTransaction} styles={{ marginTop: 30 }} />
            </DefaultTransactionPanel>}

            <Pagination
                dotsLength={chartData.length}
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

            {transactions.length ? <Carousel
                data={transactions.slice(0, 5)}
                renderItem={recentPanelRenderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                loop={true}
                firstItem={0}
            /> : null}
        </DashboardContainer>
    );
};

export default DashboardScreen;
