import React, { memo } from "react";
import {
    ItemContainer,
    Title,
    PriceLabel,
    LeftContainer,
    PriceContainer,
    Subhead,
} from "./styles";
import Icon from "components/common/Icon";

const CategoryPanelItem = ({
    onPress,
    title,
    price,
    iconColor,
    iconName,
    comment,
    priceSub,
}) => {
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

export default memo(CategoryPanelItem);
