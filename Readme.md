# Auth System API

This is a full-stack authentication system with a React frontend and a Node.js/Express backend.

## Home

Welcome to the Auth System API project. This project is designed to provide a robust and secure authentication system for your applications. It includes user registration, login, profile management, and password recovery.

## Homework

This section can be used to outline tasks or exercises related to this project.

- [ ] Create Change Password Page
- [ ] Create Update Profile Page

## Features

-   User registration and login
-   JWT-based authentication
-   Password hashing
-   Profile management
-   Image uploads to Cloudinary
-   Email-based password recovery
-   Rate limiting to prevent abuse
-   Input validation

## Technologies Used

**Frontend:**

-   React
-   Vite
-   React Router
-   Tailwind CSS
-   Axios
-   React Toastify
-   Lucide React

**Backend:**

-   Node.js
-   Express.js
-   MongoDB (Mongoose)
-   JSON Web Tokens (JWT)
-   Bcrypt
-   Cloudinary
-   Nodemailer
-   Express Rate Limit
-   Express Validator

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/auth-system-api.git
    cd auth-system-api
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

## Usage

1.  **Configure environment variables:**

    Create a `.env` file in the `backend` directory and add the following variables:

    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRES_IN=1d
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    EMAIL_HOST=your_email_host
    EMAIL_PORT=your_email_port
    EMAIL_USER=your_email_user
    EMAIL_PASS=your_email_password
    ```

2.  **Start the backend server:**

    ```bash
    cd backend
    npm run dev
    ```

3.  **Start the frontend development server:**

    ```bash
    cd ../frontend
    npm run dev
    ```

## API Endpoints

-   `POST /api/auth/register` - Register a new user
-   `POST /api/auth/login` - Login a user
-   `GET /api/auth/logout` - Logout a user
-   `GET /api/auth/profile` - Get user profile
-   `PUT /api/auth/profile` - Update user profile
-   `POST /api/auth/forgot-password` - Send password reset email
-   `PUT /api/auth/reset-password/:token` - Reset password
