import React from "react";

import ButtonIcon from "components/ButtonIcon";
import colors from "assets/themes/colors";
import { IconSelectorContainer, IconList, Title } from "./styles";
import { render } from "react-dom";

const IconOnlySelector = ({ iconData, selectedIcon, onPress }) => {
    const renderItem = ({ item: iconName, index }) => (
        <ButtonIcon
            name={iconName}
            iconColor={colors.primary.colorFive}
            key={index + iconName}
            type={iconName === selectedIcon ? "filled" : "outlined"}
            onPress={() => onPress(iconName)}
            styles={{ marginHorizontal: 10 }}
        />
    );

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

export default IconOnlySelector;
