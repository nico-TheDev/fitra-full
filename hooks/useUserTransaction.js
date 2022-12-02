import { useEffect, useState } from 'react';
import { onSnapshot, collection, orderBy, query, where } from 'firebase/firestore';

import { db } from 'fitra/firebase.config';
import useTransactionStore from 'hooks/useTransactionStore';

export default function useUserTransaction(userID) {
    const [chartData, setCharData] = useState([]);
    const setTransactions = useTransactionStore(state => state.setTransactions);
    const transactionColRef = collection(db, "transactions");
    const transactionQuery = query(transactionColRef, where("user_id", "==", userID), orderBy("timestamp", "desc"));

    useEffect(() => {

        const unsubscribe = onSnapshot(transactionQuery, (snapshotData) => {
            const dataList = [];
            snapshotData.forEach(doc => dataList.push({ ...doc.data(), id: doc.id }));

            const expenseTotal = dataList.reduce((acc, currentTransaction) => {
                if (currentTransaction.type === "expense") {
                    acc += currentTransaction.amount;
                }
                return acc;
            }, 0);
            const incomeTotal = dataList.reduce((acc, currentTransaction) => {
                if (currentTransaction.type === "income") {
                    acc += currentTransaction.amount;
                }
                return acc;
            }, 0);

            const generalData = [{
                user_id: "1",
                amount: expenseTotal,
                type: "expense",
                target_account: "gcash",
                category_name: "Expense",
                transaction_icon: "food-icon",
                color: "#2ecc71",
                transaction_color: "#2ecc71"
            }, {
                user_id: "2",
                amount: incomeTotal,
                type: "income",
                target_account: "gcash",
                category_name: "Income",
                transaction_icon: "charts-icon",
                color: "#3498db",
                transaction_color: "#3498db"
            }];


            const expenseData = dataList.filter(transaction => transaction.type === "expense");
            const incomeData = dataList.filter(transaction => transaction.type === "income");

            const graphChartData = [{
                name: "General",
                data: generalData
            },];
            setCharData(graphChartData);
            setTransactions(dataList);
            // console.log("data", data);
            console.log("FIREBASE WORKING");
        });

        return unsubscribe;

        // GET ALL THE RECENT TRANSACTIONS
    }, []);


    return [chartData];
}