import express from "express";
import Transaction from "../models/Transaction.js";
import {
    add_transaction_post,
    get_transaction_get,
} from "../controller/TransactionController.js";

// TRANSACTION ROUTES
const router = express.Router();

// GET SPECIFIC TRANSACTION
router.get("/:id", get_transaction_get);

// CREATE TRANSACTION
router.post("/add", add_transaction_post);

export default router;
