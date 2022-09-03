const { Router } = require("express");
const Category = require("../models/Category");
const categoryController = require("../controller/CategoryController");

// TRANSACTION ROUTES
const router = Router();

router.get("/:id", categoryController.get_category_get);

module.exports = router;