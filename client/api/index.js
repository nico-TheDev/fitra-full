import axios from "axios";

const apiInstance = axios.create({
    baseURL: "http://192.168.0.26:3000",
    timeout: 10000,
});

export const addTransaction = (transactionData) =>
    apiInstance.post("transaction/add", { data: transactionData });

export const getTransactions = () => apiInstance.get("/transaction");

export default apiInstance;
