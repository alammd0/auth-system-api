import { isRouteErrorResponse } from "react-router";
import { backendUrl } from "./backendUrl";
import axios from "axios";

const instance = axios.create({
    baseURL: backendUrl,
    withCredentials: true
});

export const registerUser = async ({ name, email, password, role}) => {
    try {
        const response = await instance.post("/auth/register", {
            name,
            email,
            password,
            role
        });

        return response;
    }
    catch (error) {
        console.log(error.response);
        console.log(error.response?.data);
        console.log(error.message);

        return error.response?.data;
    }
}

export const loginUser = async ({ email, password }) => {
    try {
        const response = await instance.post("/auth/login", {
            email,
            password
        });

        return response;
    }
    catch (error) {
        console.log(error);
    }    
}

export const logoutUser = async () => {
    try {
        const response = await instance.post("/auth/logout");

        console.log(response);

        return response;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

export const forgotPassword = async ({ email }) => {
    try {
        const response = await instance.post("/auth/forgot-password", {
            email
        });

        return response;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

export const resetPassword = async ({ token, password, confirmPassword }) => {
    try {

        const response = await instance.put(`/auth/reset-password/${token}`, {
            password,
            confirmPassword
        })

        if(!response){
            return;
        }

        return response;
        
    }catch (error) {
        console.log(error);
    }    
}

export const changePassword = async ({ oldPassword, password, confirmPassword }) => {
    try {
        const response = await instance.put("/auth/change-password", {
            oldPassword,
            password,
            confirmPassword
        });

        console.log(response);

        return response.data;
    }
    catch (error) {
        console.log(error);
    }    
}

export const getMe = async () => {
    try {
        const response = await instance.get("/auth/me"); 

        return response;
    }
    catch (error) {
        console.error(error);
    }
}

export const updateProfile = async ({ bio, phone, location, image }) => {
    try {
        const response = await instance.put("/auth/profile", {
            bio,
            phone,
            location,
            image
        });

        console.log(response);

        return response.data;
    }
    catch (error) {
        console.log(error);

        if (error.response.status === 401) {
            window.location.href = "/login";
        };
    };    
}

