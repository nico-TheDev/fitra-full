const { Router } = require("express");
const TransferLog = require("../models/TransferLog");
const transferLogController = require("../controller/TransferLogController");

// TRANSACTION ROUTES
const router = Router();

router.get("/:id", transferLogController.get_transferLog_get);

module.exports = router;
