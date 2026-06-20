import { backendUrl } from "./backendUrl";
import axios from "axios";

const instance = axios.create({
    baseURL: backendUrl,
    headers : {
        'Content-Type' : 'application/json'
    },
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

        console.log(response);

        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export const loginUser = async ({ email, password }) => {
    try {
        const response = await instance.post("/auth/login", {
            email,
            password
        });

        console.log(response);

        return response.data;
    }
    catch (error) {
        console.log(error);
    }    
}

export const logoutUser = async () => {
    try {
        const response = await instance.post("/auth/logout");

        console.log(response);

        return response.data;
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

        console.log(response);

        return response.data;
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

        console.log(response);

        return response.data;
        
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

        console.log(response);  

        return response.data;
    }
    catch (error) {
        console.log(error);

        if (error.response.status === 401) {
            window.location.href = "/login";
        }
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

