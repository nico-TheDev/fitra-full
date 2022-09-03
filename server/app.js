import express from "express";

// ROUTE IMPORTS
import accountRoutes from "./routes/AccountRoutes.js";
import transactionRoutes from "./routes/TransactionRoutes.js";
import transferLogRoutes from "./routes/TransferLogRoutes.js";
import userRoutes from "./routes/UserRoutes.js";

const app = express();

// DEV PURPOSES SO WE CAN SEE THE REQUESTS
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// MIDDLEWARES
app.use(express.json());

// ROUTES
app.use("/accounts", accountRoutes);
app.use("/transaction", transactionRoutes);
app.use("/transferlog", transferLogRoutes);
app.use("/user", userRoutes);

export default app;
