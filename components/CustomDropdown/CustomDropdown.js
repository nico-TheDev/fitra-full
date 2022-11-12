import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import { CustomText, DropdownContainer } from "./styles";
import { ICON_NAMES, FONTS } from "constants/constant";
import colors from "assets/themes/colors";
import Icon from "components/common/Icon";

const CustomDropdown = ({
    dropdownItems,
    setDropdownItems,
    dropdownProps,
    customLabel,
    width = "100%",
    style,
}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    return (
        <DropdownContainer width={width}>
            {customLabel && <CustomText>{customLabel}</CustomText>}
            <DropDownPicker
                open={open}
                value={value}
                setOpen={setOpen}
                setValue={setValue}
                items={dropdownItems}
                setItems={setDropdownItems}
                style={{
                    borderColor: colors.white,
                    elevation: 5,
                    marginBottom: 10,
                    ...style,
                }}
                disableBorderRadius={true}
                ArrowDownIconComponent={() => (
                    <Icon
                        name={ICON_NAMES.DROPDOWN}
                        color={colors.primary.colorFive}
                        size={25}
                    />
                )}
                ArrowUpIconComponent={() => (
                    <Icon
                        name={ICON_NAMES.DROPDOWN}
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
                {...dropdownProps}
            />
        </DropdownContainer>
    );
};

export default CustomDropdown;
