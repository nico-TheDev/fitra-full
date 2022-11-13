import React from "react";
import PropTypes from "prop-types";
import Icon from "components/common/Icon";
import { Category, CategoryName, CategoryTotal, TextHolder } from "./styles";

const DashboardCategoryItem = ({
    iconName,
    categoryName,
    total,
    iconColor,
    onPress,
}) => {
    return (
        <Category onPress={onPress}>
            <Icon name={iconName} color={iconColor} />
            <TextHolder>
                <CategoryName>{categoryName}</CategoryName>
                <CategoryTotal>₱{total}</CategoryTotal>
            </TextHolder>
        </Category>
    );
};

DashboardCategoryItem.propTypes = {
    onPress: PropTypes.func.isRequired,
    categoryName: PropTypes.string,
    total: PropTypes.number,
    inputProps: PropTypes.object,
    iconColor: PropTypes.string,
    iconName: PropTypes.string,
};

export default DashboardCategoryItem;
