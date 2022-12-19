import DropDownPicker from "react-native-dropdown-picker";
import React, { useState } from "react";
import PropTypes from 'prop-types';

import Icon from "components/common/Icon";
import { FONTS, ICON_NAMES } from "constants/constant";
import colors from "assets/themes/colors";

const FilterInput = ({ items, setItems, style, value, setValue }) => {
    const [open, setOpen] = useState(false);
    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{ borderColor: colors.white, elevation: 5 }}
            containerStyle={{
                width: "90%",
                marginBottom: 20,
                ...style,
            }}
            ArrowDownIconComponent={() => (
                <Icon
                    name={ICON_NAMES.SYSTEM_ICONS.FILTER}
                    color={colors.primary.colorFive}
                    size={25}
                />
            )}
            ArrowUpIconComponent={() => (
                <Icon
                    name={ICON_NAMES.SYSTEM_ICONS.FILTER}
                    color={colors.primary.colorFive}
                    size={25}
                />
            )}
            textStyle={{
                fontFamily: FONTS.REGULAR,
                fontSize: 18,
                color: colors.black,
            }}
            selectedItemContainerStyle={{
                backgroundColor: colors.primary.colorFive,
            }}
            selectedItemLabelStyle={{
                fontFamily: FONTS.BLACK,
                color: colors.white,
            }}
            showTickIcon={false}
        />
    );
};

FilterInput.propTypes = {
    items: PropTypes.array.isRequired,
    setItems: PropTypes.func.isRequired,
    style: PropTypes.object,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired
};

export default FilterInput;
