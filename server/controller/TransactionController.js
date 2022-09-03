const Transaction = require("../models/Transaction");

module.exports.get_transaction_get = async (req, res) => {
    const { id } = req.params;
    const transactions = await Transaction.findById(id);

    // DO SOME DATA MANIPULATION

    res.json({
        message: "GET ALL TRANSACTIONS",
        data: transactions,
    });
};
