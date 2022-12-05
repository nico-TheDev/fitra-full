import create from 'zustand';

import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, storage } from 'fitra/firebase.config.js';

const accountStore = set => ({
    accounts: [],
    setAccounts: (data) => set({ accounts: data }),
    addAccount: async (newAccount) => {
        //ADDS A NEW ACCOUNT
        try {
            console.log(newAccount);
            await addDoc(collection(db, "accounts"), { ...newAccount, timestamp: serverTimestamp() });
            console.log("NEW DOCUMENT CREATED");
        }
        catch (err) {
            console.log("addAccountError:", err);
        }
    },
    updateAccount: async (documentId, updatedTransaction) => {
        //UPDATES AN ACCOUNT
        try {
            let docRef;
            // CREATE A REFERENCE TO THE DOCUMENT AND THE FILE
            docRef = doc(db, "accounts", documentId);
            await updateDoc(docRef, updatedTransaction);
        } catch (err) {
            console.log("updateAccountError:", err);
        }
    },
    deleteAccount: async (documentId, fileReference) => {
        //DELETES AN ACCOUNT
        // CREATE A REFERENCE FOR THE DOCUMENT AND THE FILE
        const docRef = doc(db, "accounts", documentId);
        const fileRef = ref(storage, fileReference);
        try {

            // DELETE THE DOCUMENT AND OBJECT 
            await deleteDoc(docRef);
            await deleteObject(fileRef);
            // ALERT A MESSAGE
        } catch (err) {
            console.log("deleteAccountError:", err);
        }
    },
});

const useAccountStore = create(accountStore);


export default useAccountStore;