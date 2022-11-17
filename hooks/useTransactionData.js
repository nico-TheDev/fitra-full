import create from 'zustand';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import { db } from 'fitra/firebase.config.js';

const useTransactionData = create(set => ({
    transactions: [],
    setTransactions: (data) => set({ transactions: data }),
    addTransaction: async (newTransaction) => {
        try {
            console.log(newTransaction);
            await addDoc(collection(db, "transactions"), { ...newTransaction, created_at: serverTimestamp() });
            console.log("NEW DOCUMENT CREATED");
        }
        catch (err) {
            console.log(err);
        }
    },
    deleteTransaction: async (id) => {

    }
}));


export default useTransactionData;