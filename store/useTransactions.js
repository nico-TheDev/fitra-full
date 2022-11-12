import create from "zustand";
import * as api from "api";

const useTransactionStore = create((set) => ({
    transactions: [],
    addTransaction: (newTransaction) => {
        set((state) => ({
            transactions: [...state.transactions, newTransaction],
        }));
    },
    setTransactions: async () => {
        try {
            const { data: res } = await api.getTransactions();

            set((state) => ({ ...state, transactions: res.data }));
        } catch (err) {
            console.log(err);
        }
    },
}));

export default useTransactionStore;
