import express, { Router } from "express";
import { getMessage, sendMessage } from "../controller/messaegController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();
// send messaage
router.post("/send/:id", isAuthenticated, sendMessage);

//get message
router.get("/:id", isAuthenticated, getMessage);

export default router;
