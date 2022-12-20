import React from "react";
import { useNavigation } from "@react-navigation/native";

// LOCAL IMPORTS
import { FunctionHolderContainer } from "./styles";
import Button from "components/Button";
import { ICON_NAMES } from "constants/constant";
import colors from "assets/themes/colors";

const AccountsFunctionHolder = () => {
    const navigation = useNavigation();

    const handleNavigate = (screen) => {
        navigation.navigate("Accounts", {
            screen,
            initial: false,
        });
    };
    return (
        <FunctionHolderContainer>
            <Button
                type="filled"
                iconName={ICON_NAMES.SYSTEM_ICONS.TRANSFER}
                width="160px"
                iconSize={20}
                title="Transfer"
                rounded="15px"
                textSize={14}
                onPress={() => handleNavigate("AccountsCTScreen")}
            />
            <Button
                type="outlined"
                iconName={ICON_NAMES.SYSTEM_ICONS.ADD}
                iconColor={colors.primary.colorFive}
                width="160px"
                iconSize={20}
                title="Account"
                rounded="15px"
                textSize={14}
                noBorder={false}
                onPress={() => handleNavigate("AccountsCAScreen")}
            />
        </FunctionHolderContainer>
    );
};

export default AccountsFunctionHolder;
