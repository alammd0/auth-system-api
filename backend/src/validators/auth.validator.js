import { z } from "zod";

export const registerUserSchema = z.object({
    name : z.string().min(3).max(50),
    email : z.string().email().unique(),
    password : z.string().min(8).max(50),
    role : z.string().enum(['User', 'Admin'])
});

export const loginUserSchema = z.object({
    email : z.string().email(),
    password : z.string().min(8).max(50)
});

export const forgotPasswordSchema = z.object({
    email : z.string().email()
});

export const resetPasswordSchema = z.object({
    password : z.string().min(8).max(50),
    confirmPassword : z.string().min(8).max(50)
});

export const changePasswordSchema = z.object({
    oldPassword : z.string().min(8).max(50),
    password : z.string().min(8).max(50),
    confirmPassword : z.string().min(8).max(50)
});