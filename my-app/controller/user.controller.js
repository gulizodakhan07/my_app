import pool from "../config/database.js"


export const addUser = async (req,res)=>{
    try{
        const {Username,Email,Password} = req.body
        const result = await pool.query('INSERT INTO Users(Username,Email,Password) VALUES($1,$2,$3) RETURNING *;',
        [Username,Email,Password]
        )
        res.send(result.rows)
    }catch(err){
        res.status(500).send({error: err.message})
    }
}

export const getAllUsers = async (req,res)=>{
    try{
        const result = await pool.query("SELECT *  FROM Users;")
        res.send(result.rows)

    }catch(err){
        res.send(result.rows)
    }
}
export const getUserById = async (req,res)=>{
    try{
        const {id} = req.params
        const result = await pool.query("SELECT * FROM Users WHERE USER_ID = $1;",[id])
        if(result.rows[0] === 0){
            return res.status(404).send({message: "User not found"})
        }
        res.send(result.rows[0])

    }catch(err){
        res.status(500).send({message: err.message})
    }
}
export const updateUser = async (req,res)=>{
    try{
        const {Username,Email,Password} = req.body
        const {id} = req.params
        const result = await pool.query(
            'UPDATE Users SET Username = $1, Email = $2, Password = $3 WHERE User_ID = $4 RETURNING *',
            [Username, Email, Password, id] 
        );
        if (result.rows.length > 0){
            res.send(result.rows)
        }
        else{
            res.status(404).send({error: 'User not found'})
        }

    }catch(err){
        res.status(500).send({error: err.message})
    }
} 

export const deleteUserById = async (req,res)=>{
    try{
        const {id} = req.params
        await pool.query("DELETE FROM Orders WHERE user_id = $1", [id]);
        const userResult = await pool.query("DELETE FROM Users WHERE user_id = $1",[id])
        if(userResult.rows[0] === 0){
            return res.status(404).send({message: "User not found"})
        }
        res.send({message: "User deleted successfully",data: userResult.rows[0]})

    }catch(err){
        res.status(500).send({message: err.message})
    }
}