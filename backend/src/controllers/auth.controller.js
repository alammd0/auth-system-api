
import Auth from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEMail from "../utils/sendEmail.js";

/**
 * @path /auth/register
 * @method POST
 * @description Register a new user
 */

export const register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if(!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                message : "All fields are required"
            })
        }

        if(password !== confirmPassword) {
            return res.status(400).json({
                message : "Passwords do not match"
            })
        }

        const existingUser = await Auth.findOne({ email });

        if(existingUser) {
            return res.status(400).json({
                message : "Email already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Auth.create({
            name, 
            email,
            password : hashedPassword
        });

        return res.status(201).json({
            message : "User created successfully",
            data : newUser
        })

    }
    catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}

/**
 * @path /auth/login
 * @method POST
 * @description Login a user
 */

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                message : "All fields are required"
            })
        }

        const user = await Auth.findOne({ email });

        if(!user) {
            return res.status(400).json({
                message : "User not found"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) {
            return res.status(400).json({
                message : "Incorrect password"
            })
        }

        // JWT Token 
        const payload = {
            id : user._id,
            name : user.name,
            email : user.email,
            // role : user.role
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn : "1h"
        });

        // set token in cookie 
        res.cookie("token", token, {
            httpOnly : true,
        });

        return res.status(200).json({
            message : "Login successful",
            data : user
        })

    }
    catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}

/**
 * @path /auth/logout
 * @method POST
 * @description Logout a user
 */

export const logout = async (req, res) => {
    try {

        // BLocklist token concept : TODO 

        res.clearCookie("token");

        return res.status(200).json({
            message : "Logout successful"
        })

    }
    catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}

/**
 * @path /auth/forgot-password
 * @method POST
 * @description Forgot password
 */

export const forgotPassword = async (req, res) => {
    try {

        const { email } = req.body;

        if(!email) {
            return res.status(400).json({
                message : "Email is required"
            })
        }

        const user = await Auth.findOne({ email });

        if(!user) {
            return res.status(400).json({
                message : "User not found"
            })
        }

        // Create A token 
        const token = jwt.sign({
            id : user._id,
            name : user.name,
            email : user.email
        }, process.env.JWT_SECRET, {
            expiresIn : "1h"
        });

        // Send Email 
        const link = `${process.env.BASE_URL}/auth/reset-password/${token}`;

        await sendEMail(email, "Reset Password", `Click on the link to reset your password ${link}`);

        return res.status(200).json({
            message : "Password reset link sent to your email"
        })

    }
    catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}

/**
 * @path /auth/reset-password
 * @method POST
 * @description Reset password
 */

export const resetPassword = async (req, res) => {
    try {

        const { password, confirmPassword } = req.body;

        if(!password || !confirmPassword) {
            return res.status(400).json({
                message : "All fields are required"
            })
        }

        const { token } = req.params;

        if(!token) {
            return res.status(400).json({
                message : "Token is required"
            })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if(!decodedToken) {
            return res.status(400).json({
                message : "Token is invalid"
            })
        }

        // Update Password

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatePassword = await Auth.findOneAndUpdate({
            _id : decodedToken.id
        }, {
            password : hashedPassword
        });

        return res.status(200).json({
            message : "Password updated successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}

/**
 * @path /auth/update-password
 * @method POST
 * @description update password with help us previous password
 */

export const updatePassword = async (req, res) => {
    try {
        const { }
    }
    catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}

/**
 * @path /auth/verify-email
 * @method POST
 * @description Verify email with help of OTP 
 * @todo - Verify Email With the help of token 
 */

export const verifyEmail = async (req, res) => {
    try {

    }
    catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}

/** 
 * @path /auth/get-me
 * @method GET
 * @description Get user information
 */

export const getMe = async (req, res) => {
    try { 

    }
    catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}

/**
 * @path /auth/delete-account
 * @method POST
 * @description Delete account
 */

export const deleteAccount = async (req, res) => {
    try {

    }
    catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}