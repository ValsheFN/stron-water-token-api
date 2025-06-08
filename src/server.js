import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rate_limiter.js";

import transactions from "./routes/transactions.js"
import meter from "./routes/meter.js"

dotenv.config();

const app = express();

//middleware
app.use(rateLimiter);
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.use("/api/transactions", transactions);
app.use("/api/meter", meter);

console.log("my port: " ,process.env.PORT)

initDB().then(() => {
    app.listen(PORT,() => {
        console.log("Server is up and running on PORT:", PORT);
    });
})

