// LIBRARY IMPORTS
import React, { useState, useRef, useEffect } from "react";
import { Dimensions, Text } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { onSnapshot, collection, orderBy, query } from 'firebase/firestore';


// LOCAL IMPORTS

import DashboardHead from "components/DashboardHead";
import DashboardChart from "components/DashboardChart";
import { chartDataMulti, transactionData } from "fitra/SampleData";
import DashboardRecentPanel from "components/DashboardRecentPanel";
import CircleBG from "components/common/CircleBG";

import colors from "assets/themes/colors";
import { DashboardContainer, DashboardDate, DefaultText, DefaultTransactionPanel } from "./styles";
import { db } from "fitra/firebase.config";
import useTransactionData from "hooks/useTransactionData";
import getCurrentDate from "util/getCurrentDate";


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
    const [chartData, setCharData] = useState([]);
    const transactions = useTransactionData(state => state.transactions);
    const setTransactions = useTransactionData(state => state.setTransactions);
    const isCarousel = useRef(null);


    const transactionColRef = collection(db, "transactions");

    const transactionQuery = query(transactionColRef, orderBy("timestamp", "desc"));

    useEffect(() => {

        const unsubscribe = onSnapshot(transactionQuery, (snapshotData) => {
            const dataList = [];
            snapshotData.forEach(doc => dataList.push({ ...doc.data(), id: doc.id }));

            const expenseTotal = dataList.reduce((acc, currentTransaction) => {
                if (currentTransaction.type === "expense") {
                    acc += currentTransaction.amount;
                }
                return acc;
            }, 0);
            const incomeTotal = dataList.reduce((acc, currentTransaction) => {
                if (currentTransaction.type === "income") {
                    acc += currentTransaction.amount;
                }
                return acc;
            }, 0);

            const generalData = [{
                user_id: "1",
                amount: expenseTotal,
                type: "expense",
                target_account: "gcash",
                category_name: "Expense",
                transaction_icon: "food-icon",
                color: "#2ecc71",
                transaction_color: "#2ecc71"
            }, {
                user_id: "2",
                amount: incomeTotal,
                type: "income",
                target_account: "gcash",
                category_name: "Income",
                transaction_icon: "food-icon",
                color: "#3498db",
                transaction_color: "#3498db"
            }];


            const expenseData = dataList.filter(transaction => transaction.type === "expense");
            const incomeData = dataList.filter(transaction => transaction.type === "income");

            const graphChartData = [{
                name: "General",
                data: generalData
            },];
            setCharData(graphChartData);
            setTransactions(dataList);
            // console.log("data", data);
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
            <DashboardDate>{getCurrentDate()}</DashboardDate>

            <Carousel
                ref={isCarousel}
                data={chartData}
                renderItem={dashboardChartRenderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                loop={true}
                onSnapToItem={(i) => setPageIndex(i)}
            />

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
            /> : (
                <DefaultTransactionPanel>
                    <DefaultText>💸 Add a Transaction 💸</DefaultText>
                </DefaultTransactionPanel>)}
        </DashboardContainer>
    );
};

export default DashboardScreen;
