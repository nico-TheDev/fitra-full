import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./transactionSlice";

export const store = configureStore({
    reducer: {
        transactions: transactionReducer,
    },
});

export default store;
