import mongoose from "mongoose";

const TransferLogSchema = new mongoose.Schema(
    {
        transferID: {
            type: String,
            required: true,
        },
        senderName: {
            type: String,
            required: true,
        },
        senderID: {
            type: String,
            required: true,
        },
        receiverName: {
            type: String,
            required: true,
        },
        receiverID: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 1,
        },

        comment: "",
        commentImg: "",
    },
    { timestamps: true }
);

const TransferLog = mongoose.model("transferlog", TransferLogSchema);

export default TransferLog;
