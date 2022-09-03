import express from "express";
import User from "../models/User.js";
import { get_user_get } from "../controller/UserController.js";

// TRANSACTION ROUTES
const router = express.Router();
router.get("/:id", get_user_get);

export default router;
