const express = require("express");

// ROUTE IMPORTS
const accountRoutes = require("./routes/AccountRoutes");
const transactionRoutes = require("./routes/TransactionRoutes");
const transferLogRoutes = require("./routes/TransferLogRoutes");
const userRoutes = require("./routes/UserRoutes");

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

module.exports = app;
