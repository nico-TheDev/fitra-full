// LIBRARY IMPORTS
import React, { useState, useRef, useEffect } from "react";
import { Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { onSnapshot, collection } from 'firebase/firestore'


// LOCAL IMPORTS

import DashboardHead from "components/DashboardHead";
import DashboardChart from "components/DashboardChart";
import { chartDataMulti, transactionData } from "fitra/SampleData";
import DashboardRecentPanel from "components/DashboardRecentPanel";
import CircleBG from "components/common/CircleBG";

import colors from "assets/themes/colors";
import { DashboardContainer, DashboardDate } from "./styles";
import { db } from "fitra/firebase.config";
import useTransactionData from "hooks/useTransactionData";


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
    const transactions = useTransactionData(state => state.transactions);
    const setTransactions = useTransactionData(state => state.setTransactions);
    const isCarousel = useRef(null);


    const transactionColRef = collection(db, "transactions");

    useEffect(() => {

        const unsubscribe = onSnapshot(transactionColRef, (snapshotData) => {
            const transactionData = snapshotData.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            setTransactions(transactionData);
            console.log("FIREBASE WORKING");
        });

        return unsubscribe;

        // GET ALL THE RECENT TRANSACTIONS
    }, []);

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
                data={transactions}
                renderItem={recentPanelRenderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                loop={true}
            />
        </DashboardContainer>
    );
};

export default DashboardScreen;
