import { useEffect, useState } from 'react';
import { onSnapshot, collection, orderBy, query, where } from 'firebase/firestore';

import { db } from 'fitra/firebase.config';
import useTransactionStore from 'hooks/useTransactionStore';
import useAuthStore from './useAuthStore';

export default function useUserTransaction(userID) {
    const [chartData, setCharData] = useState([]);
    const { user_id } = useAuthStore(state => state.user);
    const setTransactions = useTransactionStore(state => state.setTransactions);
    const transactionColRef = collection(db, "transactions");
    const transactionQuery = query(transactionColRef, where("user_id", "==", userID), orderBy("timestamp", "desc"));

    useEffect(() => {

        const unsubscribe = onSnapshot(transactionQuery, (snapshotData) => {
            const dataList = [];
            snapshotData.forEach(doc => dataList.push({ ...doc.data(), id: doc.id }));

            // GENERAL DATA 
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
                user_id,
                amount: expenseTotal,
                type: "expense",
                target_account: "gcash",
                category_name: "Expense",
                transaction_icon: "expense-icon",
                color: "#2ecc71",
                transaction_color: "#2ecc71",
                created_at: { seconds: 1000 }
            }, {
                user_id,
                amount: incomeTotal,
                type: "income",
                target_account: "gcash",
                category_name: "Income",
                transaction_icon: "income-icon",
                color: "#3498db",
                transaction_color: "#3498db",
                created_at: { seconds: 1000 }
            }];

            const expenseList = dataList.filter(item => item.type === "expense");
            const incomeList = dataList.filter(item => item.type === "income");


            // EXPENSE DATA
            // Create a unique category array for expenses
            const expenseCategoryList = expenseList.reduce((acc, currentExpense) => {
                if (!acc.includes(currentExpense.category_name)) {
                    acc.push(currentExpense.category_name);
                }
                return acc;
            }, []);

            // create an initial data holder
            const expenseDataList = expenseCategoryList.map(category => {
                const targetCategory = expenseList.find(item => item.category_name === category);
                return {
                    user_id,
                    amount: 0,
                    type: "expense",
                    category_name: category,
                    transaction_icon: targetCategory.transaction_icon,
                    color: targetCategory.transaction_color,
                    transaction_color: targetCategory.transaction_color
                };
            });
            // add the amount to the initial data
            expenseList.forEach(item => {
                // find the data 
                const targetCategory = expenseDataList.find(currentData => item.category_name === currentData.category_name);

                if (item.category_name === targetCategory.category_name) {
                    targetCategory.amount += item.amount;
                }
            });

            // INCOME DATA
            const incomeData = dataList.filter(transaction => transaction.type === "income");
            // Create a unique category array for expenses
            const incomeCategoryList = incomeList.reduce((acc, currentIncome) => {
                if (!acc.includes(currentIncome.category_name)) {
                    acc.push(currentIncome.category_name);
                }
                return acc;
            }, []);

            // create an initial data holder
            const incomeDataList = incomeCategoryList.map(category => {
                const targetCategory = incomeList.find(item => item.category_name === category);
                return {
                    user_id,
                    amount: 0,
                    type: "income",
                    category_name: category,
                    transaction_icon: targetCategory.transaction_icon,
                    color: targetCategory.transaction_color,
                    transaction_color: targetCategory.transaction_color
                };
            });
            // add the amount to the initial data
            incomeList.forEach(item => {
                // find the data 
                const targetCategory = incomeDataList.find(currentData => item.category_name === currentData.category_name);

                if (item.category_name === targetCategory.category_name) {
                    targetCategory.amount += item.amount;
                }
            });





            const graphChartData = [{
                name: "General",
                data: generalData
            },
            {
                name: "Expense",
                data: expenseDataList
            },
            {
                name: "Income",
                data: incomeDataList
            }];
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