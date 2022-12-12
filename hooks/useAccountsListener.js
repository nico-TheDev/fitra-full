import { useEffect, useState } from "react";
import { onSnapshot, collection, query, where, orderBy } from 'firebase/firestore';

import { db } from "fitra/firebase.config";
import useAccountStore from "./useAccountStore";


const useAccountsListener = (userID) => {
    let [accountData, setAccountData] = useState([]);
    let [totalBalance, setTotalBalance] = useState('');
    const accountColRef = collection(db, "accounts");
    const accounts = useAccountStore((state) => (state.accounts));
    const resetAccounts = useAccountStore((state) => (state.reset));
    const setAccounts = useAccountStore((state) => (state.setAccounts));
    const accountQuery = query(accountColRef, where("user_id", "==", userID), orderBy("created_at", "asc"));

    const data = [...accounts];

    useEffect(() => {
        //render all accounts including those in the database
        // const existingAccounts = accounts.length ? accounts.map(item => item.account_name) : [];
        // console.log(data)
        const unsubscribe = onSnapshot(accountQuery, (snapshotData) => {
            const userAccounts = [];
            snapshotData.forEach(doc => {
                // check if doc is already in the array
                // if (data.some(item => item.id === doc.id)) {
                //     const objIndex = data.findIndex((item) => item.id === doc.id);
                //     data.splice(objIndex, 1);
                // }
                userAccounts.push({
                    account_color: doc.data().account_color,
                    account_icon: doc.data().account_icon,
                    account_name: doc.data().account_name,
                    account_amount: doc.data().account_amount,
                    user_id: userID || "1",
                    id: doc.id
                });
            });

            const accountsTotal = userAccounts.reduce((acc, currentAccount) => {
                acc += parseFloat(currentAccount.account_amount);
                return acc;
            }, 0);

            setTotalBalance(accountsTotal);
            setAccounts(userAccounts);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        resetAccounts();
    }, [userID]);

    return [totalBalance];
};

export default useAccountsListener;