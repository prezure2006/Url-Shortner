import express from "express";
import { handleUserAuth, handleUserLogin } from "../controllers/userAuth.js";
const router = express.Router();
router.post("/", handleUserAuth);
router.post("/login", handleUserLogin);
export default router;
