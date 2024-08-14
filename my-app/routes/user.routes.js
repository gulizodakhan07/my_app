import { Router } from "express";
import { addUser, deleteUserById, getAllUsers, getUserById, updateUser } from "../controller/user.controller.js";
export const userRoutes = Router()
    .post('/add/user',addUser)
    .put('/update/id/:id',updateUser)
    .get('/all',getAllUsers)
    .get('/by/id/:id',getUserById)
    .delete('/delete/id/:id',deleteUserById)