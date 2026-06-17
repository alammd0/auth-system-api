import express from 'express';
import authRoutes from "./routes/auth.route.js"
import fileUpload from "express-fileupload";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
    })
);

app.use("/api/auth", authRoutes);

export default app;