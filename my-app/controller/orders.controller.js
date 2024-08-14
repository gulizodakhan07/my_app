import pool from "../config/database.js";
export const getOverDueContractCredit = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                credit_id,
                order_id,
                credit_amount,
                interest_rate,
                installments,
                due_date,
                (CURRENT_DATE - due_date) AS overDue_days
            FROM 
                credit_contracts
            WHERE 
                due_date < CURRENT_DATE
        `);

        const contracts = result.rows;

        contracts.forEach(contract => {
            if (contract.installments === 5) {
                contract.interest_rate = 26;
            } else if (contract.installments === 10) {
                contract.interest_rate = 41;
            } else if (contract.installments === 15) {
                contract.interest_rate = 52;
            }
        });

        res.status(200).send({ message: "successfully", data: contracts });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}





export const createOrder = async (req,res)=>{
    const {password,product_name} = req.body
    try{
        const userResult = await pool.query("SELECT * FROM Users WHERE Password = $1",[password])
        if(userResult.rows.length === 0){
        return res.status(400).send({message: "Invalid password"})
        }
        const user = userResult.rows[0]
    
        const productResult = await pool.query("SELECT * FROM Products  WHERE name = $1",[product_name])
        if(productResult.rows.length === 0){
            return res.status(404).send({message: "Product not found"})
        }
        const product = productResult.rows[0]


        const orderResult = await pool.query("INSERT INTO Orders(user_id,order_date,total_amount) VALUES($1,NOW(),$2) RETURNING *;",
        [user.user_id,product.price])
         if (orderResult.rows.length === 0) {
            return res.status(500).send({ message: "Failed to create order" });
        }
         const order = orderResult.rows[0]
         res.send({message: "Created successfully",order_id: order.order_id})

    }catch(err){
        res.status(500).send({error: err.message})
    }

}
