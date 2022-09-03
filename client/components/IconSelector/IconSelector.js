import { View, Text } from "react-native";
import React from "react";

import ButtonIcon from "components/ButtonIcon";
import { IconSelectorContainer, IconList, Title } from "./styles";

const IconSelector = ({ iconData, setSelectedIcon, selectedIcon, onPress }) => {
    return (
        <IconSelectorContainer>
            <Title>Icons:</Title>
            <IconList
                data={iconData}
                renderItem={({ item, index }) => (
                    <ButtonIcon
                        name={item.categoryIcon}
                        iconColor={item.categoryColor}
                        label={item.categoryName}
                        key={index}
                        type={
                            selectedIcon === item.categoryIcon ? "filled" : ""
                        }
                        onPress={() => onPress(item.categoryIcon)}
                        styles={{ marginHorizontal: 10 }}
                    />
                )}
                horizontal={true}
                extraData={{
                    icon: selectedIcon,
                }}
            />
        </IconSelectorContainer>
    );
};

export default IconSelector;
