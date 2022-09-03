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
    try {
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message,
            error: err,
        });
    }
};
