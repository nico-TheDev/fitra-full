import Transaction from "../models/Transaction.js";

export const get_transaction_get = async (req, res) => {
    const { id } = req.params;
    const transactions = await Transaction.findById(id);

    // DO SOME DATA MANIPULATION

    res.json({
        message: "GET ALL TRANSACTIONS",
        data: transactions,
    });
};

export const add_transaction_post = async (req, res) => {
    const data = req.body.data;
    try {
        console.log(data);

        // CREATE THE TRANSACTION

        const transaction = await Transaction.create({
            userID: data.userID,
            amount: Number(data.amount),
            type: data.transactionType,
            targetAccount: data.transactionAccount,
            categoryName: data.transactionCategory,
            transactionIcon: data.transactionIcon,
            comments: data.comment,
            commentImg: data.commentImg,
        });

        res.status(200).json({
            message: "Transaction Created",
            data: transaction,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message,
            error: err,
        });
    }
};

export const all_transaction_get = async (req, res) => {
    const transactions = await Transaction.find().sort({ createdAt: "desc" });

    // DO SOME DATA MANIPULATION

    res.json({
        message: "GET ALL TRANSACTIONS",
        data: transactions,
    });
};
