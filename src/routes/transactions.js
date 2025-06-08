import express from "express"
import { sql } from "../config/db.js"
import {
    getTransactionsByUserId,
    createTransaction, 
    getTransactionsSummary
} from "../controllers/transactions.js"

const router = express.Router()

router.get("/:user_id", getTransactionsByUserId);
router.post("/", createTransaction)
router.get("/summary/:user_id", getTransactionsSummary);

export default router;