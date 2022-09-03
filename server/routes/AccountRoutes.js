const { Router } = require("express");
const Account = require("../models/Account");
const accountController = require("../controller/AccountController");

// TRANSACTION ROUTES
const router = Router();

router.get("/:id", accountController.get_account_get);

module.exports = router;