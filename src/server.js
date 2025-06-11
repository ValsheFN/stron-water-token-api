import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rate_limiter.js";

import transactions from "./routes/transactions.js";
import meter from "./routes/meter.js";
import stron from "./routes/stron.js"; // 🔍 Fixed path
import job from "./config/cron.js";
import logger from "./middleware/logger.js"; // 👈 also fix this to ESM
import cors from 'cors'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

if (process.env.NODE_ENV === "production") job.start();

// Middlewares
app.use(rateLimiter);
app.use(express.json());
app.use(logger);
app.use(cors());

// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: "ok" });
});

// Routes
app.use("/api/transactions", transactions);
app.use("/api/meter", meter);
app.use('/api/stron', stron);

const startServer = async () => {
    try {
        console.log("Initializing database...");
        await initDB();
        console.log("Database initialized successfully");

        const server = app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on PORT: ${PORT}`);
        });

        process.on('SIGTERM', () => {
            console.log('SIGTERM received, shutting down gracefully');
            server.close(() => {
                console.log('Process terminated');
            });
        });

    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();