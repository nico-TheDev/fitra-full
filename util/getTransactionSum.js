const getTransactionSum = (transactionList) => {
    const sum = transactionList.reduce((acc, current) => {
        acc += current.amount;
        return acc;
    }, 0);

    return sum;
};

export default getTransactionSum;