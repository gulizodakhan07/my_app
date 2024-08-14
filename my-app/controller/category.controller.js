import pool from "../config/database.js"

export const getAllCategoriesWithProducts = async (_,res)=>{
    try{
        const result = await pool.query("SELECT * FROM categories_with_products;")
        res.status(201).send({message: "success",data: result.rows})    
    }catch(err){
        res.status(500).send({error: err.message})
    }
}
export const createCategory = async (req,res)=>{
    try{
        const {Category_name} = req.body
        const result = await pool.query('INSERT INTO Categories(Category_name) VALUES($1)',[Category_name])
        res.send(result.rows)
    }catch(err){
        res.status(500).send({message: err.message})
    }
}

export const updateCategory = async (req,res)=>{
    try{
        const {Category_name} = req.body
        const {id} = req.params
        const result = await pool.query(
            'UPDATE Categories SET Category_name = $1 WHERE Category_id = $2 RETURNING *',
            [Category_name, id] 
        );
        if (result.rows.length > 0){
            res.send(result.rows)
        }
        else{
            res.status(404).send({error: 'Category not found'})
        }

    }catch(err){
        res.status(500).send({errors: err.message})
    }
} 


export const deleteCategory = async(req,res)=>{
    const {id} = req.params
    try{
        const result = await pool.query("DELETE FROM Categories WHERE Category_id = $1 RETURNING *",[id])
        if(result.rows.length === 0){
            return res.status(404).send({message:"category not found"})
        }
        res.status(200).send({message: "deleted Category"})
    }catch(err){
        res.status(500).send({error: err.message})
    }
}