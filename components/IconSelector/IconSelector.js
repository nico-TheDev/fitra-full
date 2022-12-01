import { View, Text } from "react-native";
import React from "react";
import PropTypes from "prop-types";

import ButtonIcon from "components/ButtonIcon";
import { IconSelectorContainer, IconList, Title } from "./styles";

const IconSelector = ({ iconData, selectedIcon, handlePress }) => {

    const renderItem = ({ item, index }) => {
        const type = selectedIcon.id === item.id ? "filled" : "";

        return (
            <ButtonIcon
                name={item.category_icon}
                iconColor={item.category_color}
                iconSize={25}
                label={item.category_name}
                key={index}
                type={type}
                onPress={() =>
                    handlePress({
                        label: item.category_name,
                        icon: item.transaction_icon,
                        color: item.category_color,
                        currentIcon: item.category_icon,
                        id: item.id
                    })
                }
                styles={{ marginHorizontal: 10 }}
            />
        );
    };

    return (
        <IconSelectorContainer>
            <Title>Icons:</Title>
            <IconList
                data={iconData}
                renderItem={renderItem}
                horizontal={true}
                extraData={{
                    icon: selectedIcon,
                }}
            />
        </IconSelectorContainer>
    );
};

IconSelector.propTypes = {
    iconData: PropTypes.array.isRequired,
    selectedIcon: PropTypes.object.isRequired,
    handlePress: PropTypes.func.isRequired
};

export default IconSelector;
