import React from "react";
import PropTypes from "prop-types";
import { ICON_NAMES } from "constants/constant";

import AccountIcon from "assets/icons/AccountIcon";
import AddIcon from "assets/icons/AddIcon";
import AddPhotoV1Icon from "assets/icons/AddPhotoV1Icon";
import AddPhotoV2Icon from "assets/icons/AddPhotoV2Icon";
import BankIcon from "assets/icons/BankIcon";
import BackIcon from "assets/icons/BackIcon";
import BusIcon from "assets/icons/BusIcon";
import CalculatorIcon from "assets/icons/CalculatorIcon";
import CalendarIcon from "assets/icons/CalendarIcon";
import CarIcon from "assets/icons/CarIcon";
import CategoriesIcon from "assets/icons/CategoriesIcon";
import ChartsIcon from "assets/icons/ChartsIcon";
import DashboardIcon from "assets/icons/DashboardIcon";
import DropdownIcon from "assets/icons/DropdownIcon";
import EditIcon from "assets/icons/EditIcon";
import EducationIcon from "assets/icons/EducationIcon";
import EnergyIcon from "assets/icons/EnergyIcon";
import FilterIcon from "assets/icons/FilterIcon";
import FitnessIcon from "assets/icons/FitnessIcon";
import FoodIcon from "assets/icons/FoodIcon";
import GroceryIcon from "assets/icons/GroceryIcon";
import HealtIcon from "assets/icons/HealtIcon";
import HomeIcon from "assets/icons/HomeIcon";
import LogoutIcon from "assets/icons/LogoutIcon";
import MoreIcon from "assets/icons/MoreIcon";
import PlaneIcon from "assets/icons/PlaneIcon";
import ReceiveMoneyIcon from "assets/icons/RecieveMoneyIcon";
import RefreshIcon from "assets/icons/RefreshIcon";
import SendMoneyIcon from "assets/icons/SendMoneyIcon";
import SettingsIcon from "assets/icons/SettingsIcon";
import TransferIcon from "assets/icons/TransferIcon";
import UserProfileIcon from "assets/icons/UserProfileIcon";
import WaterIcon from "assets/icons/WaterIcon";

const Icon = ({ name, size = 40, color }) => {
    if (name === ICON_NAMES.ACCOUNT) return <AccountIcon color={color} size={size} />;
    if (name === ICON_NAMES.ADD) return <AddIcon color={color} size={size} />;
    if (name === ICON_NAMES.ADD_PHOTO_V1) return <AddPhotoV1Icon color={color} size={size} />;
    if (name === ICON_NAMES.ADD_PHOTO_V2) return <AddPhotoV2Icon color={color} size={size} />;
    if (name === ICON_NAMES.BANK) return <BankIcon color={color} size={size} />;
    if (name === ICON_NAMES.BACK) return <BackIcon color={color} size={size} />;
    if (name === ICON_NAMES.BUS) return <BusIcon color={color} size={size} />;
    if (name === ICON_NAMES.CALCULATOR) return <CalculatorIcon color={color} size={size} />;
    if (name === ICON_NAMES.CALENDAR) return <CalendarIcon color={color} size={size} />;
    if (name === ICON_NAMES.CAR) return <CarIcon color={color} size={size} />;
    if (name === ICON_NAMES.CATEGORIES) return <CategoriesIcon color={color} size={size} />;
    if (name === ICON_NAMES.CHARTS) return <ChartsIcon color={color} size={size} />;
    if (name === ICON_NAMES.DASHBOARD) return <DashboardIcon color={color} size={size} />;
    if (name === ICON_NAMES.DROPDOWN) return <DropdownIcon color={color} size={size} />;
    if (name === ICON_NAMES.EDIT) return <EditIcon color={color} size={size} />;
    if (name === ICON_NAMES.EDUCATION) return <EducationIcon color={color} size={size} />;
    if (name === ICON_NAMES.ENERGY) return <EnergyIcon color={color} size={size} />;
    if (name === ICON_NAMES.FILTER) return <FilterIcon color={color} size={size} />;
    if (name === ICON_NAMES.FITNESS) return <FitnessIcon color={color} size={size} />;
    if (name === ICON_NAMES.FOOD) return <FoodIcon color={color} size={size} />;
    if (name === ICON_NAMES.GROCERY) return <GroceryIcon color={color} size={size} />;
    if (name === ICON_NAMES.HEALT) return <HealtIcon color={color} size={size} />;
    if (name === ICON_NAMES.HOME) return <HomeIcon color={color} size={size} />;
    if (name === ICON_NAMES.LOGOUT) return <LogoutIcon color={color} size={size} />;
    if (name === ICON_NAMES.MORE) return <MoreIcon color={color} size={size} />;
    if (name === ICON_NAMES.PLANE) return <PlaneIcon color={color} size={size} />;
    if (name === ICON_NAMES.RECEIVEMONEY) return <ReceiveMoneyIcon color={color} size={size} />;
    if (name === ICON_NAMES.REFRESH) return <RefreshIcon color={color} size={size} />;
    if (name === ICON_NAMES.SENDMONEY) return <SendMoneyIcon color={color} size={size} />;
    if (name === ICON_NAMES.SETTINGS) return <SettingsIcon color={color} size={size} />;
    if (name === ICON_NAMES.TRANSFER) return <TransferIcon color={color} size={size} />;
    if (name === ICON_NAMES.USERPROFILE) return <UserProfileIcon color={color} size={size} />;
    if (name === ICON_NAMES.WATER) return <WaterIcon color={color} size={size} />;
    return null;
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    size: PropTypes.number,
};

export default Icon;
