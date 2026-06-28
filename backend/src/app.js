import express from 'express';
import authRoutes from "./routes/auth.route.js"
import fileUpload from "express-fileupload";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors(
    {
        origin: "https://auth-system-api-livid.vercel.app",
        credentials: true
    }
));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
    })
);

connectDB();

app.use("/api/auth", authRoutes);

export default app;
