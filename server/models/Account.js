const{ model, Schema } = require("mongoose");

const AccountSchema = new Schema(
    {
        accountID: {
            type: String,
            required: true,
        },
        userID: {
            type: String,
            required: true,
        },
        accountName: {
            type: String,
            required: true,
        },
        accountIcon: {
            type: String,
            required: true,
        },
        accountColor: {
            type: String,
            required: true,
        },
        accountBalance: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    { timestamps: true }
);

const Account = model("accounts", AccountSchema);

module.exports = Account;