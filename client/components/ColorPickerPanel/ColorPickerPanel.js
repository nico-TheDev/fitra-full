import React from "react";

import {
    ColorPickerPanelContainer,
    ColorButton,
    ColorContainer,
    TextLabel,
    AddColorBtn,
    ListContainer,
    Selected,
} from "./styles";
import Icon from "components/common/Icon";
import colors from "assets/themes/colors";
import { ICON_NAMES } from "constants/constant";

const ColorPickerPanel = ({
    colorList = [],
    selectedColor,
    onColorPress,
    onAddPress,
}) => {
    return (
        <ColorPickerPanelContainer>
            <TextLabel>Colors:</TextLabel>

            <ListContainer>
                <AddColorBtn onPress={onAddPress}>
                    <Icon
                        name={ICON_NAMES.ADD}
                        color={selectedColor || colors.primary.colorFive}
                        size={50}
                    />
                </AddColorBtn>
                <ColorContainer
                    data={colorList}
                    renderItem={({ item }) => (
                        <ColorButton
                            color={item.color}
                            onPress={() => onColorPress(item.color)}
                        >
                            {selectedColor === item.color && (
                                <Selected>X</Selected>
                            )}
                        </ColorButton>
                    )}
                    keyExtractor={(item) => item.colorID}
                    horizontal={true}
                    extraData={{ selectedColor }}
                />
            </ListContainer>
        </ColorPickerPanelContainer>
    );
};

export default ColorPickerPanel;
