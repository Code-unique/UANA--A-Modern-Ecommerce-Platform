import express from "express";
import { getChatbotResponse } from "../controllers/chatController.js";

const router = express.Router();

router.post("/get-response", getChatbotResponse);

export default router;
