import axios from "axios";

const apiInstance = axios.create({
    baseURL: "http://192.168.42.115:3000",
    timeout: 10000,
});

export const addTransaction = (transactionData) =>
    apiInstance.post("transaction/add", { data: transactionData });

export default apiInstance;
