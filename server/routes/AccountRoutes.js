import express from "express";
import Account from "../models/Account.js";
import { get_account_get } from "../controller/AccountController.js";

// TRANSACTION ROUTES
const router = express.Router();

router.get("/:id", get_account_get);

export default router;
