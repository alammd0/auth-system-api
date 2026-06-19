import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';

import {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    changePassword,
    getMe,
    updateProfile
} from '../controllers/auth.controller.js';

const authRoutes = express.Router();

authRoutes.post('/register', registerUser);
authRoutes.post('/login', loginUser);
authRoutes.post('/logout', logoutUser);
authRoutes.post('/forgot-password', forgotPassword);
authRoutes.put('/reset-password/:token', resetPassword);
authRoutes.put('/change-password', authMiddleware ,changePassword);    
authRoutes.get('/me', authMiddleware, getMe);
authRoutes.put('/profile', authMiddleware, updateProfile);

export default authRoutes;