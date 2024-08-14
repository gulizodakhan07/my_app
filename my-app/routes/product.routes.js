import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getSingleProducts, putProduct } from "../controller/product.controller.js";
export const productRoutes = Router()
    .post('/add/product',createProduct)
    .get('/all/',getAllProducts)
    .put('/update/:id',putProduct)
    .delete('/delete/id/:id',deleteProduct)
    .get('/single/product/:id',getSingleProducts)
    





