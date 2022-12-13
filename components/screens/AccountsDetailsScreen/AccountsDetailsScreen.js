//LIBRARY IMPORTS
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
// LOCAL IMPORTS
import CircleBG from "components/common/CircleBG";
import CustomTextInput from "components/CustomTextInput";
import Button from "components/Button";
import { ICON_NAMES } from "constants/constant";

import ScreenHeader from "components/ScreenHeader";
import {
    AccountsContainer,
    FunctionContainer,
    ButtonContainer,
} from "./styles";

const AccountsDetailsScreen = ({ route }) => {
    const { title, price } = route.params;
    const [mode, setMode] = useState("details");
    const navigation = useNavigation();

    const screenTitle = `${mode === "edit" ? "Edit" : "Account"} Details`;

    const EditButtonGroup = () => (
        <>
            <Button
                type="filled"
                width="45%"
                title="Save"
                rounded="8px"
                textSize={16}
                noBorder={false}
            />
            <Button
                type="outlined"
                width="45%"
                title="Delete"
                rounded="8px"
                textSize={16}
                noBorder={false}
            />
        </>
    );

    return (
        <AccountsContainer>
            <CircleBG circleSize={250} />
            <ScreenHeader title={screenTitle} />
            <FunctionContainer>
                <CustomTextInput
                    inputProps={{
                        placeholder: "GCASH",
                    }}
                    customLabel="Account Name:"
                />
                <CustomTextInput
                    inputProps={{
                        placeholder: "Php 20,000",
                    }}
                    customLabel="Amount:"
                />
                <CustomTextInput
                    inputProps={{
                        placeholder: "June 29, 2022",
                    }}
                    iconName={ICON_NAMES.SYSTEM_ICONS.CALENDAR}
                    customLabel="Date:"
                />
            </FunctionContainer>
            <ButtonContainer mode={mode}>
                {mode === "edit" ? (
                    <EditButtonGroup />
                ) : (
                    <Button
                        type="outlined"
                        width="45%"
                        title="Edit"
                        rounded="8px"
                        textSize={16}
                        noBorder={false}
                        onPress={() => setMode("edit")}
                    />
                )}
            </ButtonContainer>
        </AccountsContainer>
    );
};

export default AccountsDetailsScreen;
