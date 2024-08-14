import {Router} from "express"
import { createOrder, getOverDueContractCredit } from "../controller/orders.controller.js"
export const orderRoutes = Router()
    .get('/all/order/',getOverDueContractCredit)
    .post('/create',createOrder)