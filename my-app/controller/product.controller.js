
import formidable from "formidable"
import pool from "../config/database.js"
import fs from "fs"
import path from "path"
const form = formidable({
    keepExtensions: true,
    uploadDir: "uploads"
})
export const createProduct = async(req,res)=>{
    const [fields,files] = await form.parse(req)
    const result = await pool.query("INSERT INTO Products(Image_url,Name,Description,Price,Stock,category_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
    [
        files.Image_url[0].newFilename,
        fields.Name[0],
        fields.Description[0],
        fields.Price[0],
        fields.Stock[0],
        fields.category_id[0]
    ]
    )
    res.send(result.rows)
}


export const getAllProducts = async(_,res)=>{
    try{
        const result = await pool.query("SELECT * FROM Products;")
        res.send(result.rows)
    }catch(err){
        res.status(500).send({message: err.message})
    }
} 


export const getSingleProducts = async (req, res) => {
    const { id } = req.params;
    try {
        const { name, category } = req.query;
        let query = "SELECT * FROM Products WHERE Product_id = $1"
        const values = [id] 

        if (name) {
            query += " AND name ILIKE $2"
            values.push(`%${name}%`)
        }

        if (category) {
            query += " AND category_id = $3"
            values.push(category)
        }

        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).send({ message: "Product not found" })
        }

        res.status(200).send({ data: result.rows[0] })
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message })
    }
}


export const putProduct = async (req,res) =>{
    const [fields,files] = await form.parse(req)
    const id = req.params.id
    try{
        const product = pool.query(`SELECT * FROM Products WHERE Product_id = ${id}`)
        if(product.length == 0){
            res.status(404).send({message: "Product not found"})
            return;
        }
        if(!files.image_url || !fields.name || !fields.description || !fields.price || !fields.stock || !fields.category_id){
            return res.status(400).send({message: "Missing required data"})
        }
        if(product[0]?.Image_url){
            fs.unlink(
                path.join(process.cwd(),"uploads",product[0]?.Image_url),
                (err) => {
                    console.log(err)
                }
            )
        }
        console.log(fields.category_id[0])

        const result = await pool.query("UPDATE Products SET Image_url = $1,Name = $2,Description = $3,Price = $4,Stock = $5, category_id = $6 RETURNING *;",
        [
            files.image_url[0].newFilename,
            fields.name[0],
            fields.description[0],
            fields.price[0],
            fields.stock[0],
            fields.category_id?.length? fields.category_id[0] : null
        ])
        res.status(200).send({message: "Successfully",data: result.rows[0]})
    }catch(err){
        res.status(500).send({error:err.message})
    }
}



export const deleteProduct = async (req,res)=>{
    const {id} = req.params
    const productResult = pool.query("SELECT * FROM Products WHERE Product_id = $1",[id])
    if(productResult.length === 0){
        return res.status(404).send({message: err.message})
    }
    if(productResult[0]?.Image_url){
        fs.unlink(
            path.join(process.cwd(),"uploads",productResult[0]?.Image_url)

        )
    }
    await pool.query("DELETE FROM Products WHERE Product_id = $1",[id])
    res.send({message: "Product deleting successfully",})
}

