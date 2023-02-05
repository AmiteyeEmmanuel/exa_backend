import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    method: {
        type:String,
        required:true
    },
    transType: {
        type:String,
        required:true
    },
    amount: {
        type:Number,
        required:true
    },
    date: {
        type:String,
        required:true,
    },
    receipt: {
        type: [String],
        required:true
    },
    gitCard: {
        type: String,
    },
    time: {
        type:String,
        required:true,
    }
    
},{timestamps:true}
);

export default mongoose.model("transactions", transactionSchema)

