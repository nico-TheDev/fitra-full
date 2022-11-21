import create from 'zustand';
import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

import { db, storage } from 'fitra/firebase.config.js';


const useTransactionData = create(set => ({
    transactions: [],
    setTransactions: (data) => set({ transactions: data }),
    addTransaction: async (newTransaction) => {
        try {
            // console.log(newTransaction);
            await addDoc(collection(db, "transactions"), { ...newTransaction, timestamp: serverTimestamp() });
            console.log("NEW DOCUMENT CREATED");
        }
        catch (err) {
            console.log("addTransactionError:", err);
        }
    },
    deleteTransaction: async (documentId, fileReference) => {
        // CREATE A REFERENCE FOR THE DOCUMENT AND THE FILE
        const docRef = doc(db, "transactions", documentId);
        const fileRef = ref(storage, fileReference);
        try {

            // DELETE THE DOCUMENT AND OBJECT 
            await deleteDoc(docRef);
            await deleteObject(fileRef);
            // ALERT A MESSAGE
        } catch (err) {
            console.log("deleteTransactionError:", err);
        }

    },
    updateTransaction: async (documentId, updatedTransaction) => {
        try {
            let docRef;
            // CREATE A REFERENCE TO THE DOCUMENT AND THE FILE
            docRef = doc(db, "transactions", documentId);
            await updateDoc(docRef, updatedTransaction);
        } catch (err) {
            console.log("updateTransactionError:", err);
        }

    }
}));


export default useTransactionData;