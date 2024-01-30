import { type InferSchemaType, Schema, model } from "mongoose";

const transactionSchema = new Schema({
    title: {
        type: String,
        require: [true, "A transaction must have a title"],
        trim: true,
        maxlength: [99, "A todo can only have a max of 99 chars"],
        minlength: [1, "A todo can only have a min of 1 chars"],
    },
    category: {
        type: String,
        require: [true, "A transaction must have a category"],
        trim: true,
        maxlength: [99, "A todo can only have a max of 99 chars"],
        minlength: [1, "A todo can only have a min of 1 chars"],
    },
    amount: {
        type: String,
    },
    payment: {
        type: String,
        enum: ['cash', 'credit'],
        default: 'expense'
    },
    payDate: { 
        type: Date, default: Date.now 
    }
    
});

type Transaction = InferSchemaType<typeof transactionSchema>;

export default model<Transaction>("Transaction", transactionSchema);