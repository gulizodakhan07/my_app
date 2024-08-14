import { Router } from "express";
import { addPayment,getPaymentByOrderId,getAllPayment,getPaymentById} from "../controller/payment.controller.js";
export const paymentRoutes = Router()
    .post("/add/payment",addPayment)
    .get("/by-order/:order_id",getPaymentByOrderId)
    .get('/id/:id',getPaymentById)
    .get('/all/payment',getAllPayment)
    .get("/by-order-id/:order_id",getPaymentByOrderId)
    
    



