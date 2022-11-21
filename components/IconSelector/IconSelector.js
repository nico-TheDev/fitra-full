import { View, Text } from "react-native";
import React from "react";
import PropTypes from "prop-types";

import ButtonIcon from "components/ButtonIcon";
import { IconSelectorContainer, IconList, Title } from "./styles";

const IconSelector = ({ iconData, selectedIcon, handlePress }) => {

    const renderItem = ({ item, index }) => {
        // TODO: Change the type checker into ID when firestore gets implemented
        const type = selectedIcon.currentIcon === item.categoryIcon ? "filled" : "";

        return (
            <ButtonIcon
                name={item.categoryIcon}
                iconColor={item.categoryColor}
                iconSize={25}
                label={item.categoryName}
                key={index}
                type={type}
                onPress={() =>
                    // TODO: Change the variable name convention to snake case once connected to firestore
                    handlePress({
                        label: item.categoryName,
                        icon: item.transactionIcon,
                        color: item.categoryColor,
                        currentIcon: item.categoryIcon,
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
