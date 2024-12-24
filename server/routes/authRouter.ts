import express from "express";

const authRouter = express.Router();
import {registerUser, loginUser, getUsers} from "../controllers/AuthController";

// Route to register a new user
authRouter.post("/register", registerUser);

// Route to login a user
authRouter.post("/login", loginUser);

// Route to get all users (optional, for testing)
authRouter.get("/users", getUsers);

export default authRouter;
