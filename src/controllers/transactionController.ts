import { ExpressFunction } from "../types/expressFunction";
import Transaction from "../models/transactionModel";

export const getAllTransaction: ExpressFunction = async (req, res) => {
  try {
    const transaction = await Transaction.find();

    res.status(200).json({
      status: "success",
      results: transaction.length,
      data: {
        transaction,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

export const addTransaction: ExpressFunction = async (req, res) => {
  try {
    const newTransaction = await Transaction.create(req.body);

    res.status(200).json({
      status: "success",
      data: {
        transaction: newTransaction,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

export const deleteTransaction: ExpressFunction = async (req, res) => {
  try {
    const transactionId = req.params.id    
    await Transaction.findByIdAndDelete(transactionId);

    res.status(200).json({
      status: "success",
      data: {
        msg: "deleted:" + transactionId,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};


