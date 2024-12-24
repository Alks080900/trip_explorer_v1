import {Request, Response} from "express";
import Auth from "../models/Auth";

// Register a new user
export const registerUser = (req: Request, res: Response) => {
    const {username, password, name} = req.body;

    try {
        const response = Auth.register(username, password, name);
        res.status(201).json({
            status: "success",
            message: response.message
        });
    } catch (error: any) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

// Login a user and return a token
export const loginUser = (req: Request, res: Response) => {
    const {username, password} = req.body;

    try {
        const response = Auth.login(username, password);
        res.status(200).json({
            status: "success",
            message: response.message,
            token: response.token
        });
    } catch (error: any) {
        res.status(401).json({
            status: "fail",
            message: error.message
        });
    }
};

// Get all registered users (for testing purposes)
export const getUsers = (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        data: Auth.getUsers()
    });
};
