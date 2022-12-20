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

    const data = [...transfers];

    useEffect(() => {
        const unsubscribe = onSnapshot(transferQuery, (snapshotData) => {
            console.log(userID);
            const userTransfers = [];
            snapshotData.forEach(doc => {
                userTransfers.push({
                    ...doc.data(), id: doc.id 
                });
                console.log("TRANSFER", doc.id);
            });
            setTransfers(userTransfers);
            setTransferLog(userTransfers)
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        resetTransfers();
    }, [userID]);

    return [transferLog];
};

export default useTransferListener;