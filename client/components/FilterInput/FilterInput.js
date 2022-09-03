import DropDownPicker from "react-native-dropdown-picker";
import React, { useState } from "react";

import Icon from "components/common/Icon";
import { FONTS, ICON_NAMES } from "constants/constant";
import colors from "assets/themes/colors";

const FilterInput = ({ items, setItems, style }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("day");
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
                    name={ICON_NAMES.FILTER}
                    color={colors.primary.colorFive}
                    size={25}
                />
            )}
            ArrowUpIconComponent={() => (
                <Icon
                    name={ICON_NAMES.FILTER}
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

export default FilterInput;
