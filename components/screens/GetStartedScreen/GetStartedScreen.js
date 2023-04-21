import { Dimensions } from "react-native";
import React, { useRef, useState, memo } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";


// LOCAL IMPORTS
import CircleSideBg from "assets/illustrations/Circle-Side-Bg.svg";
// COMPONENTS
import Button from "components/Button";
import {
    GetStartedContainer,
    GetStartedButton,
    CircleBg1,
    CircleBg2,
    FigurePanel,
    FigureTitle,
    FigureSub,
} from "./styles";
import colors from "assets/themes/colors";
import IllustrationOne from "assets/illustrations/Chart-Illustration-2.svg";
import IllustrationTwo from "assets/illustrations/Money-Rain-Illustration.svg";
import IllustrationThree from "assets/illustrations/Piggy-Bank-Illustration.svg";

const carouselData = [
    {
        title: "Monitor Your Cashflow",
        description:
            "   Welcome to our finance tracker! Keep track of all your expenses and income with ease.",
        illustration: IllustrationOne,
    },
    {
        title: "Increase your financial awareness",
        description:
            "Start using Fitra to improve your financial awareness by monitoring your cashflow",
        illustration: IllustrationTwo,
    },
    {
        title: "Analyze your spending habits",
        description: "Track your expenses and income with a simple, user-friendly interface.",
        illustration: IllustrationThree,
    },
];

const GetStartedScreen = ({ navigation }) => {
    const SLIDER_WIDTH = Dimensions.get("window").width;
    const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

    const [pageIndex, setPageIndex] = useState(0);
    const isCarousel = useRef(null);

    return (
        <GetStartedContainer>
            {/* BACKGROUND */}
            <CircleBg1>
                <CircleSideBg />
            </CircleBg1>
            <CircleBg2>
                <CircleSideBg />
            </CircleBg2>
            {/* BACKGROUND */}
            <Carousel
                ref={isCarousel}
                data={carouselData}
                renderItem={({ item, index }) => {
                    return (
                        <FigurePanel key={index}>
                            <item.illustration width={"90%"} height={"40%"} />
                            <FigureTitle>{item.title}</FigureTitle>
                            <FigureSub>{item.description}</FigureSub>
                        </FigurePanel>
                    );
                }}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                onSnapToItem={(i) => setPageIndex(i)}
                slideStyle={{
                    alignItems: "center",
                    justifyContent: "flex-end",
                }}
            />
            <Pagination
                dotsLength={3}
                activeDotIndex={pageIndex}
                carouselRef={isCarousel}
                dotStyle={{
                    width: 15,
                    height: 15,
                    borderRadius: 50,
                    marginHorizontal: 10,
                    backgroundColor: colors.primary.colorFive,
                }}
                tappableDots={true}
                inactiveDotStyle={{
                    backgroundColor: colors.darkgray,
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.8}
            />
            <GetStartedButton>
                <Button
                    title={"GET STARTED"}
                    onPress={() => navigation.push("Login")}
                    type={"filled"}
                    rounded={"10px"}
                />
            </GetStartedButton>
        </GetStartedContainer>
    );
};

export default GetStartedScreen;
