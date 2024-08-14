import pool from '../config/database.js'; 



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

        res.status(201).send({ message: "Muddati otib ketkanlar:", data: contracts });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

 export const createContractsCredit = async (req, res) => {
     const { order_id, credit_amount, interest_rate, installments, due_date } = req.body;
 
     try {
         const result = await pool.query('INSERT INTO credit_contracts (order_id, credit_amount, interest_rate, installments, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
         [order_id, credit_amount, interest_rate, installments, due_date]);
 
         res.status(201).send({ message: "Successfully created contract", data: result.rows });
     } catch (err) {
         res.status(500).send({ error: err.message });
     }
 };













export const updateContractCredit = async (req, res) => {
    const { credit_id } = req.params
    const { payment_amount } = req.body

    try {
        const contractResult = await pool.query(
            'SELECT * FROM credit_contracts WHERE credit_id = $1',
            [credit_id]
        );

        if (contractResult.rowCount === 0) {
            return res.status(404).send({ message: "Contract not found" })
        }

        const contract = contractResult.rows[0];
        const creditAmount = contract.credit_amount;
        const interestRate = contract.interest_rate;

        const amount = creditAmount * (interestRate / 100)
        const totalAmount = creditAmount + amount

        const remainingAmount = totalAmount - payment_amount

        if (remainingAmount <= 0) {
            await pool.query(
                'UPDATE credit_contracts SET status = $1 WHERE credit_id = $2',
                ['paid', credit_id]
            );
        } else {
            await pool.query(
                'UPDATE credit_contracts SET credit_amount = $1 WHERE credit_id = $2',
                [remainingAmount, credit_id]
            );
        }

        res.status(200).send({ message: "Contract updated successfully" })
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
};

 