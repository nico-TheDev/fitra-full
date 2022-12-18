import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import PropTypes from 'prop-types';

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
    setValue,
    value
}) => {
    const [open, setOpen] = useState(false);

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
                        name={ICON_NAMES.SYSTEM_ICONS.DROPDOWN}
                        color={colors.primary.colorFive}
                        size={25}
                    />
                )}
                ArrowUpIconComponent={() => (
                    <Icon
                        name={ICON_NAMES.SYSTEM_ICONS.DROPDOWN}
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

CustomDropdown.propTypes = {
    dropdownItems: PropTypes.array.isRequired,
    setDropdownItems: PropTypes.func.isRequired,
    dropdownProps: PropTypes.object,
    customLabel: PropTypes.string,
    width: PropTypes.string,
    style: PropTypes.object,
    setValue: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};

export default CustomDropdown;
