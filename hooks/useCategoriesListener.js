import { useEffect, useState } from "react";
import { onSnapshot, collection, query } from 'firebase/firestore';

import { db } from "fitra/firebase.config";
import useCategoriesData from "./useCategoriesData";


const useCategoriesListener = (userID, isExpense) => {
    let [categoryData, setCategoryData] = useState([]);
    const categoryColRef = collection(db, "categories");
    const categories = useCategoriesData((state) => (state.categories));
    const setCategories = useCategoriesData((state) => (state.setCategories));
    const categoryQuery = query(categoryColRef);

    useEffect(() => {
        //render all categories including those in the database
        const data = categories;
        // console.log(data)
        const unsubscribe = onSnapshot(categoryQuery, (snapshotData) => {
            snapshotData.forEach(doc => {
                //check if doc is already in the array
                if (data.some(item => item.id === doc.id)) {
                    const objIndex = data.findIndex((item) => item.id === doc.id);
                    data.splice(objIndex, 1);
                }
                data.push({
                    category_color: doc.data().category_color,
                    category_icon: doc.data().category_icon,
                    category_name: doc.data().category_name,
                    user_id: userID || "1",
                    type: doc.data().category_type,
                    id: doc.id
                });
                setCategories(data);
            });
            // console.log(isExpense)
            // console.log(data)
            if (isExpense) {
                setCategoryData(categories.filter((item) => item.type === "income"));
            }
            else {
                setCategoryData(categories.filter((item) => item.type === "expense"));
            }

        });
        return unsubscribe;
    }, [isExpense]);


    return [categoryData];
};

export default useCategoriesListener;