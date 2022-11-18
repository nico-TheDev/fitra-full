import { useEffect, useState } from 'react';

export default function useType(categories) {
    const [isExpense, setIsExpense] = useState(false);
    const [categoryData, setCategoryData] = useState([]);

    console.log(categories);

    const filterIncomeCategory = (category) => {
        if (category.type === "income" && category.userID === "1") {
            return category;
        }
    };

    const filterExpenseCategory = (category) => {
        if (category.type === "expense" && category.userID === "1") {
            return category;
        }
    };

    useEffect(() => {
        // INCOME TYPE
        if (isExpense) {
            setCategoryData(categories.filter(filterIncomeCategory));
        }
        // EXPENSE TYPE
        else {
            setCategoryData(categories.filter(filterExpenseCategory));
        }
    }, [isExpense]);

    return [isExpense, setIsExpense, categoryData];
}