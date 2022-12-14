import React, { memo } from "react";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";

import DashboardCategoryItem from "components/DashboardCategoryItem";
import imgPlaceholder from "assets/img/img-placeholder.png";
import { RecentPanel, Comment, CommentImg, DetailsHolder } from "./styles";
import useDownloadImage from "hooks/useDownloadImage";
import { Text } from "react-native";

const DashboardRecentPanel = ({ data, onPress }) => {
    const navigation = useNavigation();

    const handleNavigate = (category) =>
        navigation.navigate("Dashboard", {
            screen: "TransactionHistory",
            params: {
                category
            }
        });

    return (
        <RecentPanel onPress={onPress}>
            <DashboardCategoryItem
                categoryName={data.category_name}
                iconColor={data.transaction_color || "green"}
                iconName={data.transaction_icon}
                total={data.amount}
                onPress={() => handleNavigate(data.category_name)}
            />
            <DetailsHolder>
                <Comment>{data.comments || "ADD COMMENT"}</Comment>
                <CommentImg source={data.comment_img ? { uri: data.comment_img } : imgPlaceholder} />
            </DetailsHolder>
        </RecentPanel>
    );
};

DashboardRecentPanel.propTypes = {
    onPress: PropTypes.func.isRequired,
};

export default memo(DashboardRecentPanel);
