import create from "zustand";

const useTransactionStore = create((set) => ({
    transactions: [],
    addTransaction: (newTransaction) => {
        set((state) => ({
            transactions: [...state.transactions, newTransaction],
        }));
    },
}));

export default useTransactionStore;
