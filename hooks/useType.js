import { useEffect, useState } from 'react';

export default function useType(initialIsExpense = false) {
    const [isExpense, setIsExpense] = useState(initialIsExpense);
    const [categoryData, setCategoryData] = useState([]);

    return [isExpense, setIsExpense, categoryData];
}