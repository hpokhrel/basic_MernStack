import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/UserController.js";
import express from "express";
import verifyUser from "../middlewares/verifyUser.js";

const userRoute = express.Router();

userRoute.post("/register", createUser);
userRoute.post("/login", loginUser);
userRoute.post("/logout", verifyUser, logoutUser);

export default userRoute;
