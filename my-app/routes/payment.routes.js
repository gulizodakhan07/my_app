import { Router } from "express";
import { addPayment,getPaymentByOrderId,getAllPayment,getPaymentById} from "../controller/payment.controller.js";
// import { addPayment, getAllPayment, getPaymentById, getPaymentByOrderId } from "../controllers/payment.controller.js";
export const paymentRoutes = Router()
    .post("/add/payment",addPayment)
    .get("/by-order/:order_id",getPaymentByOrderId)

    // .post('/add/payment',addPayment)
    .get('/id/:id',getPaymentById)
    .get('/all/payment',getAllPayment)
    .get("/by-order-id/:order_id",getPaymentByOrderId)
    
    



