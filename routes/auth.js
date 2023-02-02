import express from "express";
import { login, register, verifyEmail } from "../controller/auth.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/verifyEmail", verifyEmail)


export default router