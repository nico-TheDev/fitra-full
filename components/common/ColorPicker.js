import { Text } from 'react-native';
import React from 'react';
import { TriangleColorPicker } from 'react-native-color-picker';
import PropTypes from "prop-types";

import { ColorPickerContainer, CloseBtn } from './styles/commonStyles';
import Icon from './Icon';
import { ICON_NAMES } from 'constants/constant';
import colors from 'assets/themes/colors';

const ColorPicker = ({ handleColorPress, setShowColorWheel }) => {
    return (
        <ColorPickerContainer>
            <CloseBtn onPress={() => setShowColorWheel(false)}>
                <Icon
                    name={ICON_NAMES.SYSTEM_ICONS.CROSS}
                    color={colors.white}
                    size={50}
                />
            </CloseBtn>
            <TriangleColorPicker
                onColorSelected={handleColorPress}
                style={{
                    flex: 1,
                    backgroundColor: "white",
                    height: "100%",
                    width: "100%",
                    padding: 20,
                }}
            />
        </ColorPickerContainer>
    );
};

ColorPicker.propTypes = {
    handleColorPress: PropTypes.func.isRequired,
    setShowColorWheel: PropTypes.func.isRequired
};

export default ColorPicker;