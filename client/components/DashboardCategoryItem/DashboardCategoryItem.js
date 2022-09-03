import React from "react";

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

export default DashboardCategoryItem;
