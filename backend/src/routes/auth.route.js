import express from "express";
import {
    register,
    login,
    resetPassword,
    forgotPassword,
    verifyEmail,
    getMe,
    updatePassword,
    logout,
    deleteAccount
} from "../controllers/auth.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/reset-password", resetPassword);
authRoutes.put("/forgot-password", forgotPassword);
authRoutes.post("/verify-email", verifyEmail);
authRoutes.get("/get-me", authMiddleware, getMe);
authRoutes.put("/update-password", authMiddleware, updatePassword);
authRoutes.post("/logout", authMiddleware, logout);
authRoutes.post("/delete-account", authMiddleware, deleteAccount);

export default authRoutes;