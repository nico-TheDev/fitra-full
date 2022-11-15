import React, { memo } from "react";
import PropTypes from "prop-types";
import DashboardCategoryItem from "components/DashboardCategoryItem";
import imgPlaceholder from "assets/img/img-placeholder.png";
import { RecentPanel, Comment, CommentImg, DetailsHolder } from "./styles";
import useDownloadImage from "hooks/useDownloadImage";
import { Text } from "react-native";

const DashboardRecentPanel = ({ data, onPress }) => {
    // const downloadedImage = useDownloadImage("transaction/", data.commentImg);

    return (
        <RecentPanel onPress={onPress}>
            <DashboardCategoryItem
                categoryName={data.categoryName}
                iconColor={data.color || "green"}
                iconName={data.transactionIcon}
                total={data.amount}
                onPress={() => console.log("CLICKED")}
            />
            <DetailsHolder>
                <Comment>{data.comments || "ADD COMMENT"}</Comment>
                <CommentImg source={data.commentImg ? { uri: data.commentImg } : imgPlaceholder} />
            </DetailsHolder>
        </RecentPanel>
    );
};

DashboardRecentPanel.propTypes = {
    onPress: PropTypes.func.isRequired,
};

export default memo(DashboardRecentPanel);
