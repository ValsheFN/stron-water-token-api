import {neon} from "@neondatabase/serverless";
import "dotenv/config";

// Creates a SQL connection using DB URL
export const sql = neon(process.env.DATABASE_URL)

export async function initDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            category VARCHAR(255) NOT NULL,
            amount DECIMAL(32,2) NOT NULL,
            status VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`

        console.log("Database initialized successfully");
    } catch (error) {
        console.log("Error initializing DB", error);
        process.exit(1); //status code 1 means failur, 0 success
    }
}