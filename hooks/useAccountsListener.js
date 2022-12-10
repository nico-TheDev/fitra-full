import { useEffect, useState } from "react";
import { onSnapshot, collection, query, where } from 'firebase/firestore';

import { db } from "fitra/firebase.config";
import useAccountStore from "./useAccountStore";


const useAccountsListener = (userID) => {
    let [accountData, setAccountData] = useState([]);
    let [totalBalance, setTotalBalance] = useState('');
    const accountColRef = collection(db, "accounts");
    const accounts = useAccountStore((state) => (state.accounts));
    const resetAccounts = useAccountStore((state) => (state.reset));
    const setAccounts = useAccountStore((state) => (state.setAccounts));
    const getAccountList = useAccountStore(state => state.accountList);
    const accountQuery = query(accountColRef, where("user_id", "==", userID));

    useEffect(() => {
        //render all accounts including those in the database
        const data = accounts;
        // console.log(data)
        const unsubscribe = onSnapshot(accountQuery, (snapshotData) => {
            const dataList = [];
            snapshotData.forEach(doc => {
                //check if doc is already in the array
                if (data.some(item => item.id === doc.id)) {
                    const objIndex = data.findIndex((item) => item.id === doc.id);
                    data.splice(objIndex, 1);
                }
                data.push({
                    ...doc.data(),
                    id: doc.id
                });
                setAccounts(data);
            });
            setAccountData(getAccountList());
            
            snapshotData.forEach(doc => dataList.push({ ...doc.data(), id: doc.id }));
            const accountsTotal = dataList.reduce((acc, currentAccount) => {
                acc += parseFloat(currentAccount.account_amount);
                return acc;
            }, 0);

            setTotalBalance(accountsTotal);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        resetAccounts();
    }, [userID]);

    return [accountData, totalBalance];
};

export default useAccountsListener;