import { useEffect, useState } from "react";
import { onSnapshot, collection, query, where } from 'firebase/firestore';

import { db } from "fitra/firebase.config";
import useTransferStore from "./useTransferStore";


const useTransferListener = (userID) => {
    // let [accountData, setAccountData] = useState([]);
    // let [totalBalance, setTotalBalance] = useState('');
    const transferColRef = collection(db, "transfer");
    const transfers = useTransferStore((state) => (state.transfers));
    const resetTransfers = useTransferStore((state) => (state.reset));
    const setAccounts = useTransferStore((state) => (state.setTransfers));
    const transferQuery = query(transferColRef, where("user_id", "==", userID));

    const data = [...transfers];

    useEffect(() => {
        //render all accounts including those in the database
        // const existingAccounts = accounts.length ? accounts.map(item => item.account_name) : [];
        // console.log(data)
        const unsubscribe = onSnapshot(transferQuery, (snapshotData) => {
            const userAccounts = [];
            snapshotData.forEach(doc => {
                // check if doc is already in the array
                // if (data.some(item => item.id === doc.id)) {
                //     const objIndex = data.findIndex((item) => item.id === doc.id);
                //     data.splice(objIndex, 1);
                // }
                userAccounts.push({
                    transfer_amount: doc.data().transfer_amount,
                    from_account: doc.data().from_account,
                    to_account: doc.data().to_account,
                    user_id: userID || "1",
                    id: doc.id
                });
            });

            // const accountsTotal = userAccounts.reduce((acc, currentAccount) => {
            //     acc += parseFloat(currentAccount.account_amount);
            //     return acc;
            // }, 0);

            // setTotalBalance(accountsTotal);
            setAccounts(userAccounts);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        resetTransfers();
    }, [userID]);

    // return [totalBalance];
};

export default useTransferListener;