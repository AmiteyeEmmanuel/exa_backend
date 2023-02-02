import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    prior: {
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
    time: {
        type:String,
        required:true,
    },
    accountNo: {
        type:Number,
        required:true,
    }, 
    
},{timestamps:true}
);

export default mongoose.model("transactions", transactionSchema)

