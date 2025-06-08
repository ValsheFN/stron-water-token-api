import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rate_limiter.js";

import transactions from "./routes/transactions.js"
import meter from "./routes/meter.js"
import job from "./config/cron.js"

dotenv.config();

const app = express();

if(process.env.NODE_ENV === "production") job.start();

//middleware
app.use(rateLimiter);
app.use(express.json());

const PORT = process.env.PORT || 5001;


// Basic health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({status: "ok"})
})

// API routes
app.use("/api/transactions", transactions);
app.use("/api/meter", meter);

console.log("Environment PORT:", process.env.PORT);
console.log("Using PORT:", PORT);

// Initialize database and start server
const startServer = async () => {
    try {
        console.log("Initializing database...");
        await initDB();
        console.log("Database initialized successfully");
        
        const server = app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is up and running on PORT: ${PORT}`);
            console.log(`Health check available at: http://localhost:${PORT}/health`);
        });
        
        // Handle server shutdown gracefully
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

