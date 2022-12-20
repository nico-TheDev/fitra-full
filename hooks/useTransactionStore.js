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
            const currentTransactionResponse = await getDoc(docRef);
            const currentTransaction = currentTransactionResponse.data();
            const accountRef = doc(db, "accounts", currentTransaction.target_account);
            const currentAccountResponse = await getDoc(accountRef);
            const currentAccount = currentAccountResponse.data();
            if (currentAccount) {
                // RETURN THE SUBTRACTED AMOUNT
                if (currentTransaction.type === "expense") {
                    await updateDoc(accountRef, {
                        account_amount: currentAccount.account_amount + currentTransaction.amount
                    });
                } else {
                    // INCOME
                    await updateDoc(accountRef, {
                        account_amount: currentAccount.account_amount - currentTransaction.amount
                    });
                }
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
            const docRef = doc(db, "transactions", documentId);
            const currentTransactionResponse = await getDoc(docRef);
            const currentTransaction = currentTransactionResponse.data();
            let accountRef, originalAmount, updatedAmount, currentAccountResponse, currentAccount;
            // SAME ACCOUNTS 
            console.log(currentTransaction);
            if (currentTransaction.target_account === updatedTransaction.target_account) {
                console.log("SAME");
                accountRef = doc(db, "accounts", updatedTransaction.target_account);
                currentAccountResponse = await getDoc(accountRef);
                currentAccount = currentAccountResponse.data();
                // RETURN THE ORIGINAL AMOUNT
                if (currentTransaction.type === "expense") {
                    originalAmount = currentAccount.account_amount + currentTransaction.amount;
                } else {
                    originalAmount = currentAccount.account_amount - currentTransaction.amount;
                }
                // UPDATE THE ACCOUNT AMOUNT
                if (updatedTransaction.type === "expense") {
                    updatedAmount = originalAmount - updatedTransaction.amount;
                } else {
                    updatedAmount = originalAmount + updatedTransaction.amount;
                }

                // UPDATE THE ACCOUNT DOCUMENT IN THE FIRESTORE
                await updateDoc(accountRef, {
                    account_amount: updatedAmount
                });
            } else {
                const oldAccountRef = doc(db, "accounts", currentTransaction.target_account);
                const oldAccountResponse = await getDoc(oldAccountRef);
                const oldAccount = oldAccountResponse.data();
                // RESTORE MONEY TO THE OLD ACCOUNT
                if (currentTransaction.type === "expense") {
                    originalAmount = oldAccount.account_amount + currentTransaction.amount;
                } else {
                    originalAmount = oldAccount.account_amount - currentTransaction.amount;
                }
                const newAccountRef = doc(db, "accounts", updatedTransaction.target_account);
                const newAccountResponse = await getDoc(newAccountRef);
                const newAccount = newAccountResponse.data();
                // SUBTRACT MONEY TO THE NEW ACCOUNT
                if (updatedTransaction.type === "expense") {
                    updatedAmount = newAccount.account_amount - updatedTransaction.amount;
                } else {
                    updatedAmount = newAccount.account_amount + updatedTransaction.amount;
                }
                // UPDATE THE ACCOUNT DOCUMENT IN THE FIRESTORE
                await updateDoc(oldAccountRef, {
                    account_amount: originalAmount
                });
                await updateDoc(newAccountRef, {
                    account_amount: updatedAmount
                });
            }
            // CREATE A REFERENCE TO THE DOCUMENT AND THE FILE
            await updateDoc(docRef, updatedTransaction);
        } catch (err) {
            console.log("updateTransactionError:", err);
        }

    }
});


const useTransactionStore = create(transactionStore);


export default useTransactionStore;