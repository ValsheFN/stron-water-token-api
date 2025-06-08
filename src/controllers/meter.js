export async function getMeterByUserId(req, res){
    try {
        const {user_id} = req.params;
        const result = await sql`
            SELECT * FROM meter WHERE user_id = ${user_id} ORDER BY created_at DESC
        `

        res.status(200).json(result);
    } catch (error) {
        console.log("Error getting the meter id", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function createMeterId(req, res){
    try {
        const{meter_id, user_id} = req.body;

        if(!user_id || !meter_id){
            return res.status(400).json({message: "All fields are required"})
        }

        const result = await sql`
            INSERT INTO transactions(user_id, meter_id)
            VALUES (${user_id}, ${meter_id})
            RETURNING *
        `

        console.log(result);
    } catch (error) { 
        console.log("Error creating the meter id", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function updateMeterId(req, res){
    try {
        const {user_id} = req.params;
        const result = await sql`
            UPDATE meter
            SET (meter_id = ${meter_id} 
            WHERE user_id = ${user_id} and id = ${id}
            RETURNING *
        `

        if(result.length === 0){
            return res.status(404).json({message:"Meter id not found"})
        }

        res.status(200)/json({message: "Meter id updated successfully"})
    } catch (error) {
        console.log("Error deleting the meter id", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function deleteMeterId(req, res){
    try {
        const {user_id} = req.params;
        const result = await sql`
            DELETE FROM meter
            WHERE user_id = ${user_id} and id = ${id}
            RETURNING *
        `

        if(result.length === 0){
            return res.status(404).json({message:"Meter id not found"})
        }

        res.status(200)/json({message: "Meter id deleted successfully"})
    } catch (error) {
        console.log("Error deleting the meter id", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}