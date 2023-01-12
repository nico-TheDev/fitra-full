import React from "react";
import PropTypes from "prop-types";
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

const ColorPickerPanel = ({ colorList = [], selectedColor, onColorPress, onAddPress }) => {
    return (
        <ColorPickerPanelContainer>
            <TextLabel>Colors:</TextLabel>

            <ListContainer>
                <AddColorBtn onPress={onAddPress}>
                    <Icon
                        name={ICON_NAMES.SYSTEM_ICONS.ADD}
                        color={selectedColor || colors.primary.colorFive}
                        size={50}
                    />
                </AddColorBtn>
                <ColorContainer
                    data={colorList}
                    renderItem={({ item }) => (
                        <ColorButton color={item.color} onPress={() => onColorPress(item.color)}>
                            {selectedColor === item.color && <Selected><Icon
                                name={ICON_NAMES.SYSTEM_ICONS.CROSS}
                                color={colors.white}
                            /></Selected>}
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

ColorPickerPanel.propTypes = {
    colorList: PropTypes.arrayOf(PropTypes.object),
    selectedColor: PropTypes.string,
    onColorPress: PropTypes.func,
    onAddPress: PropTypes.func,
};

export default ColorPickerPanel;
