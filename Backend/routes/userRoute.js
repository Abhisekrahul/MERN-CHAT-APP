import express, { Router } from "express";
import {
  getOtherUser,
  logOut,
  login,
  register,
} from "../controller/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

//Register
router.post("/register", register);

//Login
router.post("/login", login);

//logout
router.get("/logout", logOut);

//get Other User
router.get("/", isAuthenticated, getOtherUser);
export default router;
