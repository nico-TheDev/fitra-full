import React, { memo } from "react";
import PropTypes from "prop-types";
import DashboardCategoryItem from "components/DashboardCategoryItem";
import imgPlaceholder from "assets/img/img-placeholder.png";
import { RecentPanel, Comment, CommentImg, DetailsHolder } from "./styles";

const DashboardRecentPanel = ({ data, onPress }) => {
    return (
        <RecentPanel onPress={onPress}>
            <DashboardCategoryItem
                categoryName={data.categoryName}
                iconColor={data.color || "green"}
                iconName={data.transactionIcon}
                total={data.amount}
            />
            <DetailsHolder>
                <Comment>{data.comments || "ADD COMMENT"}</Comment>
                <CommentImg source={data.commentImg || imgPlaceholder} />
            </DetailsHolder>
        </RecentPanel>
    );
};

DashboardRecentPanel.propTypes = {
    onPress: PropTypes.func.isRequired,
};

export default memo(DashboardRecentPanel);
