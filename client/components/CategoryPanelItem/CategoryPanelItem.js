import React, { memo } from "react";
import PropTypes from "prop-types";

import { ItemContainer, Title, PriceLabel, LeftContainer, PriceContainer, Subhead } from "./styles";
import Icon from "components/common/Icon";

const CategoryPanelItem = ({ onPress, title, price, iconColor, iconName, comment, priceSub }) => {
    return (
        <ItemContainer color={iconColor} onPress={onPress}>
            <Icon name={iconName} color={iconColor} size={24} />
            <LeftContainer>
                <Title color={iconColor}>{title}</Title>
                {comment && <Subhead color={iconColor}>{comment}</Subhead>}
            </LeftContainer>
            <PriceContainer>
                <PriceLabel color={iconColor}>{price}</PriceLabel>
                {priceSub && <Subhead color={iconColor}>{priceSub}</Subhead>}
            </PriceContainer>
        </ItemContainer>
    );
};

CategoryPanelItem.propTypes = {
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    comment: PropTypes.string,
    priceSub: PropTypes.string,
    price: PropTypes.string,
    iconColor: PropTypes.string,
    iconName: PropTypes.string,
};

export default memo(CategoryPanelItem);
