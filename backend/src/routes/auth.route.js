import express from 'express';

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
authRoutes.put('/reset-password', resetPassword);
authRoutes.put('/change-password', changePassword);    
authRoutes.get('/me', getMe);
authRoutes.put('/profile', updateProfile);

export default authRoutes;