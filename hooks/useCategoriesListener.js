import { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy, where } from 'firebase/firestore';

import { db } from "fitra/firebase.config";
import useCategoriesData from "./useCategoriesData";
import premadeCategories from 'fitra/data/categories.js';

const useCategoriesListener = (userID, isExpense) => {
    const [categoryData, setCategoryData] = useState([]);
    const categoryColRef = collection(db, "categories");
    const allCategories = useCategoriesData((state) => (state.categories));
    const resetCategories = useCategoriesData((state) => (state.reset));
    const setCategories = useCategoriesData((state) => (state.setCategories));
    const getIncomeList = useCategoriesData(state => state.incomeList);
    const getExpenseList = useCategoriesData(state => state.expenseList);
    const categoryQuery = query(categoryColRef, where("user_id", "==", userID), orderBy("created_at", "desc"));

    useEffect(() => {
        //render all categories including those in the database
        const unsubscribe = onSnapshot(categoryQuery, (snapshotData) => {
            // console.log("FETCH CATEGORIES");
            const prepCategories = premadeCategories.map(category => ({
                ...category,
                user_id: userID
            }));
            const userList = [];
            snapshotData.forEach(doc => {
                // check if doc is already in the array;
                if (prepCategories.some(item => item.id === doc.id)) {
                    const objIndex = prepCategories.findIndex((item) => item.id === doc.id);
                    prepCategories.splice(objIndex, 1);
                }
                userList.push({
                    ...doc.data(),
                    type: doc.data().category_type,
                    id: doc.id
                });
                // console.log("CATEGORY PUSHED", doc.id);
            });
            setCategories([...prepCategories, ...userList]);
            // setCategoryData([...prepCategories, ...userList]);
            // EXPENSE TYPE
            if (!isExpense) {
                setCategoryData(getExpenseList());
            }
            // INCOME TYPE
            else {
                setCategoryData(getIncomeList());
            }
        });

        return unsubscribe;
    }, [isExpense]);


    useEffect(() => {
        resetCategories();
    }, [userID]);

    return [categoryData];
};

export default useCategoriesListener;