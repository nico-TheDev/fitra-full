const { Router } = require("express");
const Transaction = require("../models/Transaction");
const transactionController = require("../controller/TransactionController");

// TRANSACTION ROUTES
const router = Router();

// GET SPECIFIC TRANSACTION
router.get("/:id", transactionController.get_transaction_get);

module.exports = router;
