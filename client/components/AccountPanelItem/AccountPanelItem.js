import React from "react";

import Icon from "components/common/Icon";
import { ICON_NAMES } from "constants/constant";
import colors from "assets/themes/colors";
import {
    ItemContainer,
    Title,
    PriceLabel,
    LeftContainer,
    PriceContainer,
    TitleContainer,
} from "./styles";

const CategoryPanelItem = ({ onPress, sender, receiver, price }) => {
    const mainColor = colors.primary.colorFive;
    return (
        <ItemContainer color={mainColor} onPress={onPress}>
            <Icon name={ICON_NAMES.TRANSFER} color={mainColor} size={24} />
            <LeftContainer>
                <TitleContainer>
                    <Icon
                        name={ICON_NAMES.SENDMONEY}
                        color={mainColor}
                        size={16}
                    />
                    <Title color={mainColor}>{sender}</Title>
                </TitleContainer>
                <TitleContainer>
                    <Icon
                        name={ICON_NAMES.RECEIVEMONEY}
                        color={mainColor}
                        size={16}
                    />
                    <Title color={mainColor}>{receiver}</Title>
                </TitleContainer>
            </LeftContainer>
            <PriceContainer>
                <PriceLabel color={mainColor}>{price}</PriceLabel>
            </PriceContainer>
        </ItemContainer>
    );
};

export default CategoryPanelItem;
