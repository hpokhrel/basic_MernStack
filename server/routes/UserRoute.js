import { createUser, loginUser } from "../controllers/UserController.js";
import express from "express";

const userRoute = express.Router();

userRoute.post("/register", createUser);
userRoute.post("/login", loginUser);

export default userRoute;
