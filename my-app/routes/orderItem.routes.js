import { Router } from "express";
import { addOrderItem, getOrderItems } from "../controller/orderItems.controller.js";

export const orderItemRoutes = Router()
    .post('/update/order-item', addOrderItem)
    .get('/by-id/:order_id', getOrderItems)