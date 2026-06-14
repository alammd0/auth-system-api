import express from "express";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(express.json());

// Database Connection

app.use("/auth", authRoutes);

export default app;