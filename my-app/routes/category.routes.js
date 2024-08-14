import { Router } from "express";
import {  getAllCategoriesWithProducts,createCategory, updateCategory, deleteCategory } from "../controller/category.controller.js";
export const categoryRoutes = Router()
    .get('/all/category-with-products',getAllCategoriesWithProducts)
    .post('/add/category',createCategory)
    .put('/update/category/:id',updateCategory)
    .delete('/delete/category/:id',deleteCategory)
