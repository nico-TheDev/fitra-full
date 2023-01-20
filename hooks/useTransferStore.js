import { create } from 'zustand';

import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db, storage } from 'fitra/firebase.config.js';

const transferStore = (set, get) => ({
    transfers: [],
    reset: () => set({ transfers: [] }),
    setTransfers: (data) => set({ transfers: data }),
    addTransfer: async (newTransfer) => {
        //ADDS A NEW ACCOUNT
        try {
            console.log(newTransfer);
            const receiverAccountRef = doc(db, "accounts", newTransfer.receiver_account_id);
            const senderAccountRef = doc(db, "accounts", newTransfer.sender_account_id);
            const receiverAccountResponse = await getDoc(receiverAccountRef);
            const senderAccountResponse = await getDoc(senderAccountRef);

            const receiverAccount = receiverAccountResponse.data();
            const senderAccount = senderAccountResponse.data();


            await updateDoc(senderAccountRef, {
                account_amount: senderAccount.account_amount - newTransfer.transfer_amount
            });
            await updateDoc(receiverAccountRef, {
                account_amount: receiverAccount.account_amount + newTransfer.transfer_amount
            });

            await addDoc(collection(db, "transfers"), { ...newTransfer, timestamp: serverTimestamp() });
            console.log("NEW DOCUMENT CREATED");
        }
        catch (err) {
            console.log("addTransferError:", err);
        }
    },
    updateTransfer: async (documentId, updatedTransfer) => {
        //UPDATES AN ACCOUNT
        try {
            let docRef;
            // CREATE A REFERENCE TO THE DOCUMENT AND THE FILE
            docRef = doc(db, "transfers", documentId);
            // GET TRANSFER DATA
            const targetTransfer = await getDoc(docRef);
            const currentTransfer = targetTransfer.data();
            // GET ACCOUNT DATA
            const prevReceiverAccountRef = doc(db, "accounts", currentTransfer.receiver_account_id);
            const prevSenderAccountRef = doc(db, "accounts", currentTransfer.sender_account_id);
            const prevReceiverAccountResponse = await getDoc(prevReceiverAccountRef);
            const prevSenderAccountResponse = await getDoc(prevSenderAccountRef);

            const prevReceiverAccount = prevReceiverAccountResponse.data();
            const prevSenderAccount = prevSenderAccountResponse.data();

            // RETURN THE PREVIOUS TRANSFER
            await updateDoc(prevSenderAccountRef, {
                account_amount: prevSenderAccount.account_amount + currentTransfer.transfer_amount
            });
            await updateDoc(prevReceiverAccountRef, {
                account_amount: prevReceiverAccount.account_amount - currentTransfer.transfer_amount
            });

            // ADD CURRENT TRANSFER
            const receiverAccountRef = doc(db, "accounts", updatedTransfer.receiver_account_id);
            const senderAccountRef = doc(db, "accounts", updatedTransfer.sender_account_id);
            const receiverAccountResponse = await getDoc(receiverAccountRef);
            const senderAccountResponse = await getDoc(senderAccountRef);

            const receiverAccount = receiverAccountResponse.data();
            const senderAccount = senderAccountResponse.data();


            await updateDoc(senderAccountRef, {
                account_amount: senderAccount.account_amount - updatedTransfer.transfer_amount
            });
            await updateDoc(receiverAccountRef, {
                account_amount: receiverAccount.account_amount + updatedTransfer.transfer_amount
            });

            await updateDoc(docRef, updatedTransfer);
        } catch (err) {
            console.log("updateTransferError:", err);
        }
    },
    deleteTransfer: async (documentId) => {
        //DELETES AN ACCOUNT
        // CREATE A REFERENCE FOR THE DOCUMENT AND THE FILE
        const docRef = doc(db, "transfers", documentId);
        try {
            // GET TRANSFER DATA
            const targetTransfer = await getDoc(docRef);
            const currentTransfer = targetTransfer.data();
            // GET ACCOUNT DATA
            const receiverAccountRef = doc(db, "accounts", currentTransfer.receiver_account_id);
            const senderAccountRef = doc(db, "accounts", currentTransfer.sender_account_id);
            const receiverAccountResponse = await getDoc(receiverAccountRef);
            const senderAccountResponse = await getDoc(senderAccountRef);

            const receiverAccount = receiverAccountResponse.data();
            const senderAccount = senderAccountResponse.data();

            // UPDATE ACCOUNTS
            await updateDoc(senderAccountRef, {
                account_amount: senderAccount.account_amount + currentTransfer.transfer_amount
            });
            await updateDoc(receiverAccountRef, {
                account_amount: receiverAccount.account_amount - currentTransfer.transfer_amount
            });

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