import { Text } from 'react-native';
import React from 'react';
import { TriangleColorPicker } from 'react-native-color-picker';
import PropTypes from "prop-types";

import { ColorPickerContainer, CloseBtn } from './styles/commonStyles';

const ColorPicker = ({ handleColorPress, setShowColorWheel }) => {
    return (
        <ColorPickerContainer>
            <CloseBtn onPress={() => setShowColorWheel(false)}>
                <Text
                    style={{
                        color: "white",
                        fontSize: 25,
                        fontWeight: "bold",
                    }}
                >
                    X
                </Text>
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