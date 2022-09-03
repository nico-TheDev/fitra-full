import express from "express";
import Category from "../models/Category.js";
import { get_category_get } from "../controller/CategoryController.js";

// TRANSACTION ROUTES
const router = express.Router();

router.get("/:id", get_category_get);

export default router;
