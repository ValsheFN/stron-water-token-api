import express from "express"

import {
    getMeterByUserId,
    createMeterId, 
    updateMeterId,
    deleteMeterId
} from "../controllers/meter.js"

const router = express.Router()

router.get("/:user_id", getMeterByUserId)

router.post("/", createMeterId);

router.patch("/:id", updateMeterId);

router.delete("/:id", deleteMeterId);

export default router;