import express from "express";
import { deposit, withdraw } from "../controller/transaction.js";

const router = express.Router();

router.post("/deposit", deposit)

router.post("/withdraw", withdraw);

export default router