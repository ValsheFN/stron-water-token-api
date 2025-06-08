export async function getTransactionsByUserId(req, res) {
    try {
        const {user_id} = req.params;
        const result = await sql`
            SELECT * FROM transactions WHERE user_id = ${user_id} ORDER BY created_at DESC
        `

        res.status(200).json(result);
    } catch (error) {
        console.log("Error getting the transaction", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function createTransaction(req, res) {
    //amount, user_id, meter_id
    try {
        const{amount, user_id, meter_id} = req.body;

        if(!user_id || !meter_id || amount === undefined) {
            return res.status(400).josn({message: "All fields are required"})
        }

        const result = await sql`
            INSERT INTO transactions(user_id, amount, meter_id, status)
            VALUES (${user_id}, ${amount}, ${meter_id}, "PENDING")
            RETURNING *
        `

        console.log(result);
    } catch (error) {
        console.log("Error creating the transaction", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function getTransactionsSummary(req, res) {
    try {
        const {user_id} = req.params;

        const result = await sql`
            SELECT COALESCE(SUM(amount), 0) as balance
            FROM transactions
            WHERE user_id = ${user_id}
        `

        res.status(200).json(result);
    } catch (error) {
        console.log("Error getting the transaction summary", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}