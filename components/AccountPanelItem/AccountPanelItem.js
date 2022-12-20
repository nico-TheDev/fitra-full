import React, { memo } from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { NumericFormat } from 'react-number-format';

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
            <Icon name={ICON_NAMES.SYSTEM_ICONS.TRANSFER} color={mainColor} size={24} />
            <LeftContainer>
                <TitleContainer>
                    <Icon name={ICON_NAMES.SYSTEM_ICONS.CHARTS} color={mainColor} size={16} />
                    <Title color={mainColor}>{sender}</Title>
                </TitleContainer>
                <TitleContainer>
                    <Icon name={ICON_NAMES.SYSTEM_ICONS.CHARTS} color={mainColor} size={16} />
                    <Title color={mainColor}>{receiver}</Title>
                </TitleContainer>
            </LeftContainer>
            <PriceContainer>
                <PriceLabel color={mainColor}>
                    <NumericFormat
                        value={price}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'₱'}
                        decimalScale={2}
                        renderText={value => <Text>{value}</Text>}
                    />
                </PriceLabel>
            </PriceContainer>
        </ItemContainer>
    );
};

CategoryPanelItem.propTypes = {
    onPress: PropTypes.func.isRequired,
    sender: PropTypes.string,
    receiver: PropTypes.string,
    price: PropTypes.string,
};

export default memo(CategoryPanelItem);
