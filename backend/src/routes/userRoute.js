import express from "express";
import { forgotPassword, getAllUsers, getUserById, logIn, logout, SignUp } from "../controllers/userController.js";




const userRouter = express.Router();

userRouter.post("/register", SignUp);

userRouter.post("/login", logIn);

userRouter.get("/logout", logout);

userRouter.get("/", getAllUsers);

userRouter.get("/:id", getUserById);

userRouter.put("/forgot/:id", forgotPassword);

export default userRouter;