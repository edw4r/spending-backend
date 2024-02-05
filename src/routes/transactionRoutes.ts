import express from "express";
import { addTransaction, deleteTransaction, getAllTransaction } from "../controllers/transactionController";
import {
    signup,
    login,
    protect,
    restrictTo,
} from '../controllers/authController'

const router = express.Router();

// http://localhost:8000/api/v1/transaction
router.route("/")
.get(protect, getAllTransaction) // GET 
.post(addTransaction) // POST  

router.delete("/:id", deleteTransaction)

export default router;
