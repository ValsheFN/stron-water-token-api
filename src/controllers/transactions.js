export async function getTransactionsByUserId(req, res) {
    try {
        const { user_id } = req.params;
        
        if (!user_id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        
        const result = await sql`
            SELECT * FROM transactions WHERE user_id = ${user_id} ORDER BY created_at DESC
        `;

        // Always return an array, even if empty
        res.status(200).json(result || []);
    } catch (error) {
        console.log("Error getting the transaction", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function createTransaction(req, res) {
    try {
        const { amount, user_id, meter_id } = req.body;

        if (!user_id || !meter_id || amount === undefined) {
            return res.status(400).json({ message: "All fields are required" }); // Fixed typo: josn -> json
        }

        const result = await sql`
            INSERT INTO transactions(user_id, amount, meter_id, status)
            VALUES (${user_id}, ${amount}, ${meter_id}, 'PENDING')
            RETURNING *
        `;

        res.status(201).json(result[0] || result); // Return the created transaction
    } catch (error) {
        console.log("Error creating the transaction", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getTransactionsSummary(req, res) {
    try {
        const { user_id } = req.params;
        
        if (!user_id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const result = await sql`
            SELECT COALESCE(SUM(amount), 0) as balance
            FROM transactions
            WHERE user_id = ${user_id}
        `;

        // Return a consistent object structure
        const summary = {
            totalSpending: result[0]?.balance || 0,
            balance: result[0]?.balance || 0
        };

        res.status(200).json(summary);
    } catch (error) {
        console.log("Error getting the transaction summary", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}