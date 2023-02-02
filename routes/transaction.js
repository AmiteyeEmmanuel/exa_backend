import express from "express";
import { deposit } from "../controller/transaction.js";

const router = express.Router();

router.post("/deposit", deposit)

export default router