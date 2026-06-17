import Auth from "../models/auth.model.js";
import { forgotPasswordSchema, loginUserSchema, registerUserSchema, resetPasswordSchema } from "../validators/auth.validator.js"
import bcrypt from "bcrypt";
import sendEmailMessage from "../utils/sendEmail.js";
import { uploadImage } from "../utils/uploadImage.js";
import jwt from "jsonwebtoken";


// 1. User Registration - Done
export const registerUser = async (req, res) => {
    try {

        const validationData = registerUserSchema.safeParse(req.body);

        if (validationData.success) {

            const { name, email, password, role } = validationData.data;

            if(!name || !email || !password || !role){
                return res.status(400).json({
                    message : "Validation Error",
                    error : "All fields are required"
                })
            };

            // Check duplication user 
            const existingUser = await Auth.findOne({ email });

            if (existingUser) {
                return res.status(400).json({
                    message : "Validation Error",
                    error : "Email already exists"
                })
            }

            // hashed password 
            const hashedpassword = await bcrypt.hash(password, 10);

            const newUser = await Auth.create({
                name,
                email,
                password : hashedpassword,
                role
            });

            return res.status(201).json({
                message : "User Registered",
                data : {
                    id : newUser._id,
                    name : newUser.name,
                    email : newUser.email,
                    role : newUser.role
                }
            })
        } else{
            return res.status(400).json({
                message : "Validation Error",
                error : validationUser.error
            })
        }

    }
    catch (error) {
        return res.status(500).json({
            message : "Internal Server Error",
            error : error.message
        })
    }
}

// 2. Login with JWT - Done
export const loginUser = async (req, res) => {
    try {
        const validationData = loginUserSchema.safeParse(req.body);

        if (validationData.success) {

            const { email, password } = validationData.data;

            const user = await Auth.findOne({ email });

            if (!user) {
                return res.status(400).json({
                    message : "Validation Error",
                    error : "Email or Password is incorrect"
                })
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if(!isPasswordCorrect){
                return res.status(400).json({
                    message : "Validation Error",
                    error : "Email or Password is incorrect"
                })
            }

            console.log(user);

            // Payload for JWT
            const payload = {
                id : user._id,
                name : user.name,
                email : user.email,
                role : user.role
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn : process.env.JWT_EXPIRES_IN
            });

            console.log(token);

            res.cookie('token', token, {
                httpOnly : true,
                secure : true
            });

            return res.status(200).json({
                message : "Login Successful"
            })

        } else{
            return res.status(400).json({
                message : "Validation Error",
                error : validationUser.error
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            message : "Internal Server Error",
            error : error.message
        })
    }
}

// 3. Logout - Done
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');

        return res.status(200).json({
            message : "Logout Successful"
        })
    }
    catch (error) {
        return res.status(500).json({
            message : "Internal Server Error",
            error : error.message
        })
    }
}

// 4. Forgot Password - Done
export const forgotPassword = async (req, res) => {
    try {

        const validationData = forgotPasswordSchema.safeParse(req.body);

        if (validationData.success) {

            const { email } = validationData.data;

            const user = await Auth.findOne({ email });

            // console.log(user);

            if (!user) {
                return res.status(400).json({
                    message : "User not found"
                })
            };

            // create TOken 
            const payload = {
                id : user._id,
                name : user.name,
                email : user.email,
                role : user.role
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn : process.env.JWT_EXPIRES_IN
            });

            // console.log(token);

            const link = `${process.env.CLIENT_URL}/api/auth/reset-password/${token}`;
            // console.log(link);

            const message = `Click on the link to reset your password`;

            // send email 
            await sendEmailMessage(email, 'Reset Password', message, link);

            // console.log(result);

            return res.status(200).json({
                message : "Password Reset Link Send Successful"
            });

        } else{
            return res.status(400).json({
                message : "Validation Error",
                error : validationUser.error
            })
        }

    }
    catch (error) {
        return res.status(500).json({
            message : "Internal Server Error",
            error : error.message
        })
    }
}

// 5. Reset Password - Done
export const resetPassword = async (req, res) => {
    try {

        const { token } = req.params;

        // verify token

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(400).json({
                message : "Token is invalid"
            })
        }

        console.log(decoded);

        const { email } = decoded;

        const validationData = resetPasswordSchema.safeParse(req.body);

        if(validationData.success){

            const { password, confirmPassword } = validationData.data;

            if(!password || !confirmPassword){
                return res.status(400).json({
                    message : "Validation Error",
                    error : "All fields are required"
                })
            }

            if(password !== confirmPassword){
                return res.status(400).json({
                    message : "Validation Error",
                    error : "Password and Confirm Password do not match"
                })
            }

            // hashed password
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await Auth.findOne({ email });

            if(!user){
                return res.status(400).json({
                    message : "User not found"
                })
            }

            user.password = hashedPassword;

            await user.save();

            return res.status(200).json({
                message : "Password Reset Successful"
            })

        } else{
            return res.status(400).json({
                message : "Validation Error",
                error : validationUser.error
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            message : "Internal Server Error",
            error : error.message
        })
    }
}

// 6. Change Password - H/W
export const changePassword = async (req, res) => {
    try {

        const validationData = changePasswordSchema.safeParse(req.body);

        const { id } = req.user; 

        if(validationData.success){

            const { oldPassword, password, confirmPassword } = validationData.data;

            if(!oldPassword || !password || !confirmPassword){
                return res.status(400).json({
                    message : "Validation Error",
                    error : "All fields are required"
                })
            }

            if(password !== confirmPassword){
                return res.status(400).json({
                    message : "Validation Error",
                    error : "Password and Confirm Password do not match"
                })
            }

            const user = await Auth.findOne({ _id: id });

            if(!user){
                return res.status(400).json({
                    message : "User not found"
                })
            }

            const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

            if(!isPasswordCorrect){
                return res.status(400).json({
                    message : "Validation Error",
                    error : "Old Password is incorrect"
                })
            }

            // hashed password
            const hashedPassword = await bcrypt.hash(password, 10);

            user.password = hashedPassword;

            await user.save();

            return res.status(200).json({
                message : "Password Changed Successfully"
            })

        } else{
            return res.status(400).json({
                message : "Validation Error",
                error : validationData.error
            })
        }

    }
    catch (error) {
        return res.status(500).json({
            message : "Internal Server Error",
            error : error.message
        })
    }
}

// 7. User Profile or Get ME - Done
export const getMe = async (req, res) => {
    try {
        const { id } = req.user;

        const user = await Auth.findOne({ _id: id }).select("-password");

        if(!user){
            return res.status(400).json({
                message : "User not found"
            })
        }

        return res.status(200).json({
            message : "User Profile",
            data : user
        })

    }
    catch (error) {
        return res.status(500).json({
            message : "Internal Server Error",
            error : error.message
        })
    }
}

// 8. Profile Update - H/W
export const updateProfile = async (req, res) => {
    try {
        const { id } = req.user;

        const user = await Auth.findById(id);

        if(!user){
            return res.status(404).json({
                message : "User not found"
            })
        }

        const { bio, phone, location } = req.body;

        const { image } = req.files;

        if(bio !== undefined){
            user.bio = bio;
        }

        if(phone !== undefined){
            user.phone = phone;
        }

        if(location !== undefined){
            user.location = location;
        }

        if(image !== undefined){
            const imageUrl = await uploadImage(image);
            user.image = imageUrl.url;
        }

        await user.save();

        return res.status(200).json({
            message : "Profile Updated Successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            message : "Internal Server Error",
            error : error.message
        })
    }
}

// 9: TODO: Email Verification