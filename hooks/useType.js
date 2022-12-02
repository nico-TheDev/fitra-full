import { useEffect, useState } from 'react';
import useAuthStore from './useAuthStore';
import useCategoriesData from './useCategoriesData';

export default function useType(initialIsExpense = false) {
    const categories = useCategoriesData((state) => (state.categories));
    const [isExpense, setIsExpense] = useState(initialIsExpense);
    const { user_id } = useAuthStore(state => state.user);
    const [categoryData, setCategoryData] = useState([]);

    // console.log(categories);

    const filterIncomeCategory = (category) => {
        if (category.type === "income" && category.userID === user_id) {
            return category;
        }
    };

    const filterExpenseCategory = (category) => {
        if (category.type === "expense" && category.userID === user_id) {
            return category;
        }
    };

    useEffect(() => {
        // EXPENSE TYPE
        if (isExpense) {
            setCategoryData(categories.filter(filterExpenseCategory));
        }
        // INCOME TYPE
        else {
            setCategoryData(categories.filter(filterIncomeCategory));
        }
    }, [isExpense]);

    return [isExpense, setIsExpense, categoryData];
}