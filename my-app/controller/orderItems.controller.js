import pool from "../config/database.js";

export const addOrderItem = async (req, res) => {
    const { order_id, product_name, quentity } = req.body;

    try {
        const productResult = await pool.query("SELECT * FROM Products WHERE Name = $1", [product_name]);

        if (productResult.rowCount === 0) {
            return res.status(404).send({ message: "Product not found" });
        }

        const product = productResult.rows[0];
        console.log("Product testing:", product);
        const result = await pool.query(`
            INSERT INTO oreder_items (order_id, product_id, quentity, price)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `, [
            order_id,
            product.product_id, 
            quentity,
            product.price 
        ]);

        res.status(201).send({ message: "Order item added successfully", data: result.rows[0] });
    } catch (err) {
        console.error(err); 
        res.status(500).send({ error: err.message });
    }
};


export const getOrderItems = async (req, res) => {
    const { order_id } = req.params;

    try {
        const result = await pool.query(
            "SELECT * FROM order_items WHERE order_id = $1",
            [order_id]
        );

        if (result.rowCount === 0) {
            return res.status(404).send({ message: "No items found for this order" });
        }
        res.status(200).send({ message: "Order items retrieved successfully", data: result.rows });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
