import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

// USE THE CONFIG.ENV FILE
dotenv.config({ path: "./config.env" });

// SETUP THE ENV VARIABLES
const DB = process.env.MONGO_STRING.replace("<password>", process.env.PASSWORD);

const port = process.env.PORT || 3000;

// CONNECT TO THE DATABASE BEFORE RUNNING THE SERVER
mongoose
    .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTED TO THE MONGO DATABSE");
        app.listen(port, () => {
            console.log("FITRA API IS NOW RUNNING");
        });
    })
    .catch((err) => {
        console.log(err);
    });
