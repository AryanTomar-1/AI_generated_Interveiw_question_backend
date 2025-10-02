import express from "express";
import cors from "cors";
import questionsRoutes from "./routes/questions.js";
import candidatesRoute from "./routes/candidateRoute.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/questions", questionsRoutes);
app.use("/api/candidates", candidatesRoute);
app.listen(process.env.PORT, () => console.log(`Backend running on http://localhost:${process.env.PORT}`));
