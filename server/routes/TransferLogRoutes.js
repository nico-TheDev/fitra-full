import express from "express";
import TransferLog from "../models/TransferLog.js";
import { get_transferLog_get } from "../controller/TransferLogController.js";

// TRANSACTION ROUTES
const router = express.Router();

router.get("/:id", get_transferLog_get);

export default router;
