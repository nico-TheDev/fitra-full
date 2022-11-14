import create from 'zustand';
import { addDoc, collection } from 'firebase/firestore';

import { db } from 'fitra/firebase.config.js';

const useTransactionData = create(set => ({
    transactions: [],
    setTransactions: (data) => set({ transactions: data }),
    addTransaction: async (newTransaction) => {
        try {
            console.log(newTransaction);
            await addDoc(collection(db, "transactions"), newTransaction);
            console.log("NEW DOCUMENT CREATED");
        }
        catch (err) {
            console.log(err);
        }
    }
}));


export default useTransactionData;