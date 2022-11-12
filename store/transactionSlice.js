import { createSlice } from "@reduxjs/toolkit";
import * as api from "api";

const initialState = {
    data: [],
    isLoading: true,
};

// *********************** ASYNC CODE / THUNKS *******************************

export const fetchTransaction = () => {
    return async (dispatch) => {
        try {
            const { data: res } = await api.getTransactions();
            const transactions = res.data;
            dispatch(FETCH_TRANSACTION(transactions));
        } catch (err) {
            console.log(err);
        }
    };
};

export const postTransaction = (formData) => {
    return async (dispatch) => {
        try {
            const { data: res } = await api.addTransaction(formData);
            const newTransaction = res.data;
            dispatch(ADD_TRANSACTION(newTransaction));
        } catch (err) {
            console.log(err);
        }
    };
};

// ***********************     SLICE BODY      *******************************

export const transactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        FETCH_TRANSACTION: (state, action) => {
            return { ...state, data: action.payload };
        },
        ADD_TRANSACTION: (state, action) => {
            return { ...state, data: [action.payload, ...state.data] };
        },
    },
});

// *********************** EXPORTS *******************************

export const { FETCH_TRANSACTION, ADD_TRANSACTION } = transactionSlice.actions;

export default transactionSlice.reducer;
