const { Router } = require("express");
const User = require("../models/User");
const userController = require("../controller/UserController");

// TRANSACTION ROUTES
const router = Router();
router.get("/:id", userController.get_user_get);

module.exports = router;
