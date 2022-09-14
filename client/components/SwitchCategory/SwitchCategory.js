import { Switch } from "react-native";
import React from "react";
import PropTypes from "prop-types";

import {
    ExpenseText,
    IncomeText,
    Line,
    SwitchContainer,
    ExpenseTextDark,
    IncomeTextDark,
    LineDark,
} from "./styles";
import colors from "assets/themes/colors";

const SwitchCategory = ({ isEnabled, setIsEnabled, type }) => {
    const toggleSwitch = () => setIsEnabled(!isEnabled);

    if (type === "dark") {
        return (
            <SwitchContainer>
                <Switch
                    trackColor={{
                        false: colors.white,
                        true: colors.white,
                    }}
                    thumbColor={colors.primary.colorOne}
                    ios_backgroundColor={colors.darkGray}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                <ExpenseTextDark enabled={isEnabled}>Expense</ExpenseTextDark>
                <LineDark />
                <IncomeTextDark enabled={isEnabled}>Income</IncomeTextDark>
            </SwitchContainer>
        );
    }

    return (
        <SwitchContainer>
            <Switch
                trackColor={{ false: colors.darkGray, true: colors.darkGray }}
                thumbColor={colors.primary.colorFive}
                ios_backgroundColor={colors.darkGray}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
            <ExpenseText enabled={isEnabled}>Expense</ExpenseText>
            <Line />
            <IncomeText enabled={isEnabled}>Income</IncomeText>
        </SwitchContainer>
    );
};

SwitchCategory.propTypes = {
    isEnabled: PropTypes.bool.isRequired,
    setIsEnabled: PropTypes.func.isRequired,
    type: PropTypes.string,
};

export default SwitchCategory;
