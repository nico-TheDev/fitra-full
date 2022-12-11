import create from 'zustand';

import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, storage } from 'fitra/firebase.config.js';

const transferStore = (set, get) => ({
    transfers: [],
    reset: () => set({ transfers: [] }),
    setTransfers: (data) => set({ transfers: data }),
    addTransfer: async (newTransfer) => {
        //ADDS A NEW ACCOUNT
        try {
            console.log(newTransfer);
            await addDoc(collection(db, "transfers"), { ...newTransfer, timestamp: serverTimestamp() });
            console.log("NEW DOCUMENT CREATED");
        }
        catch (err) {
            console.log("addTransferError:", err);
        }
    },
    updateTransfer: async (documentId, updatedTransaction) => {
        //UPDATES AN ACCOUNT
        try {
            let docRef;
            // CREATE A REFERENCE TO THE DOCUMENT AND THE FILE
            docRef = doc(db, "transfers", documentId);
            await updateDoc(docRef, updatedTransaction);
        } catch (err) {
            console.log("updateTransferError:", err);
        }
    },
    deleteTransfer: async (documentId) => {
        //DELETES AN ACCOUNT
        // CREATE A REFERENCE FOR THE DOCUMENT AND THE FILE
        const docRef = doc(db, "transfers", documentId);
        try {

            // DELETE THE DOCUMENT AND OBJECT 
            await deleteDoc(docRef);
            // ALERT A MESSAGE
        } catch (err) {
            console.log("deleteTransferError:", err);
        }
    },
    transferList: (userID) => {
        return get().transfers;
    },
});

const useTransferStore = create(transferStore);


export default useTransferStore;