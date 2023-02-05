//jshint esversion:6

import  express  from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import depositRoute from "./routes/transaction.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from  "cors";
const app = express();
dotenv.config();





  async function start() {
    try {
      //Database Connect
      await mongoose.connect(
        process.env.MONGO,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        () => {
          console.log("Database Connected");
        }
      );
    }catch (error) {
        console.error(error);
      }
} 


mongoose.connection.on("disconnected", () =>{
    console.log("mongoDb disconnected")
})

mongoose.connection.on("Connected", () =>{
    console.log("mongoDb Connected")
})

start()

app.use(cookieParser());
app.use(cors());
app.use(express.json())


// middleware 
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/transactions", depositRoute);


app.use((err, req, res, next)=> {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something Went Wrong"
    return res.status(500).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack: err.stack
    })
})







app.listen(5000, () => {
    console.log("Server started on port 5000");
});