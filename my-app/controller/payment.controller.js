import pool from "../config/database.js"

export const addPayment = async(req, res) => {
    try {
        const { order_id, amount } = req.body;

        if (isNaN(amount) || amount <= 0) {
            return res.status(400).send({ message: "Invalid amount" });
        }

        const orderResult = await pool.query("SELECT * FROM Orders WHERE order_id = $1;", [order_id]);
        if (orderResult.rowCount === 0) {
            return res.status(404).send({ message: "Order not found" });
        }

        const paymentResult = await pool.query("INSERT INTO payments(order_id, payment_date, amount) VALUES($1, Now(), $2) RETURNING *;", [order_id, parseFloat(amount)]);
        res.status(201).send({ message: "Successfully", data: paymentResult.rows[0] });
    } catch (err) {
        console.error("Error adding payment:", err.message); // Xatolikni konsolga chiqarish
        return res.status(500).send({ error: err.message });
    }
};

export const getAllPayment = async(_,res)=>{
    try{
        const result = await pool.query("SELECT * FROM payments;")
        res.status(201).send({message: "success",data: result.rows[0]})
     
    }catch(err){
        return res.status(500).send({error: err.message})
    }
}
export const getPaymentById = async(req,res)=>{
    const {id} = req.params
    try{
        const paymentResult =  await pool.query("SELECT * FROM payments WHERE payment_id = $1",[id])
        if(paymentResult.rows.length == 0){
            res.status(404).send({message: "order not found"})
        }
        res.status(200).send(paymentResult)
    }catch(err){
        res.status(500).send({message: err.message})
    }
}


export const getPaymentByOrderId = async (req,res)=>{
    const {order_id} = req.params
    try{
        const paymentResult = await pool.query("SELECT * FROM payments WHERE  order_id = $1;",[order_id])
        if(paymentResult.rows.length == 0){
            return res.status(404).send({message: "order not found"})
        }
        res.status(200).send(paymentResult.rows)
    } catch(err){
        res.status(500).send({message: err})
    }

}