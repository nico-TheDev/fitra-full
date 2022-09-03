const { model, Schema } = require("mongoose");

const TransactionSchema = new Schema(
    {
        userID: {
            type: String,
            required: [
                true,
                "User ID is missing. A transaction requires a user attached to it.",
            ],
        },
        amount: {
            type: Number,
            required: [true, "Transaction amount missing. "],
        },
        type: {
            type: String,
            enum: {
                values: ["expense", "income"],
                message:
                    "The type of a transaction is an expense or an income only",
            },
            required: [true, "Type of a transaction is missing"],
        },
        targetAccount: {
            type: String,
            required: true,
        },
        categoryName: {
            type: String,
            required: true,
        },
        transactionIcon: {
            type: String,
            required: true,
        },
        comments: {
            type: String,
        },
        commentImg: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Transaction = model("transaction", TransactionSchema);

module.exports = Transaction;
