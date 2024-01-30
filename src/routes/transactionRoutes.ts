import express from "express";
import { addTransaction, deleteTransaction, getAllTransaction } from "../controllers/transactionController";
const router = express.Router();

// http://localhost:8000/transaction
router.route("/")
.get(getAllTransaction) // GET  http://localhost:8000/transaction
.post(addTransaction) // POST  http://localhost:8000/transaction

router.delete("/:id", deleteTransaction)

export default router;
