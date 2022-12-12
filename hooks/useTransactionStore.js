import create from 'zustand';
import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc, getDoc, } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

import { db, storage } from 'fitra/firebase.config.js';


const transactionStore = set => ({
    transactions: [],
    setTransactions: (data) => set({ transactions: data }),
    addTransaction: async (newTransaction) => {
        try {
            // console.log(newTransaction);
            await addDoc(collection(db, "transactions"), { ...newTransaction, timestamp: serverTimestamp() });
            const accountRef = doc(db, "accounts", newTransaction.target_account);

            const currentAccount = await getDoc(accountRef);
            // console.log(currentAccount.data());
            // SUBTRACT
            if (newTransaction.type === "expense") {
                await updateDoc(accountRef, {
                    account_amount: currentAccount.data().account_amount - newTransaction.amount
                });
            } else {
                // INCOME
                await updateDoc(accountRef, {
                    account_amount: currentAccount.data().account_amount + newTransaction.amount
                });
            }

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
            const currentTransaction = await (await getDoc(docRef)).data();
            const accountRef = doc(db, "accounts", currentTransaction.target_account);

            const currentAccount = await getDoc(accountRef);
            console.log(currentAccount.data());
            // RETURN THE SUBTRACTED AMOUNT
            if (currentTransaction.type === "expense") {
                await updateDoc(accountRef, {
                    account_amount: currentAccount.data().account_amount + currentTransaction.amount
                });
            } else {
                // INCOME
                await updateDoc(accountRef, {
                    account_amount: currentAccount.data().account_amount - currentTransaction.amount
                });
            }
            // DELETE THE DOCUMENT AND OBJECT 
            await deleteDoc(docRef);
            if (fileReference) {
                await deleteObject(fileRef);
            }
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
});


const useTransactionStore = create(transactionStore);


export default useTransactionStore;