import { Router } from "express";
import { createContractsCredit, getOverDueContractCredit, updateContractCredit } from "../controller/contracts.controller.js";
export const contractsRoutes = Router()
    .post('/add/contracts',createContractsCredit)

    .get('/add/contractRoutes',getOverDueContractCredit)
    .put('/update/contracts',updateContractCredit)

