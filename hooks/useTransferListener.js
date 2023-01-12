import { useEffect, useState } from "react";
import { onSnapshot, collection, query, where } from 'firebase/firestore';

import { db } from "fitra/firebase.config";
import useTransferStore from "./useTransferStore";

const useTransferListener = (userID) => {
    let [transferLog, setTransferLog] = useState([]);
    const transferColRef = collection(db, "transfers");
    const transfers = useTransferStore((state) => (state.transfers));
    const resetTransfers = useTransferStore((state) => (state.reset));
    const setTransfers = useTransferStore((state) => (state.setTransfers));
    const transferQuery = query(transferColRef, where("user_id", "==", userID));

    useEffect(() => {
        const unsubscribe = onSnapshot(transferQuery, (snapshotData) => {
            console.log(userID);
            const userTransfers = [];
            snapshotData.forEach(doc => {
                userTransfers.push({
                    sender_account_name: doc.data().sender_account_name,
                    sender_account_id: doc.data().sender_account_id,
                    receiver_account_id: doc.data().receiver_account_id,
                    receiver_account_name: doc.data().receiver_account_name,
                    transfer_amount: doc.data().transfer_amount,
                    comments: doc.data().transfer_amount,
                    comment_img: doc.data().comment_img,
                    comment_img_ref: doc.data().comment_img_ref,
                    created_at: doc.data().created_at,
                    user_id: userID || "1",
                    id: doc.id
                });
                console.log("TRANSFER", doc.id);
            });
            setTransfers(userTransfers);
            setTransferLog(userTransfers);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        resetTransfers();
    }, [userID]);

    return [transferLog];
};

export default useTransferListener;