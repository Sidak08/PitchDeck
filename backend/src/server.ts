import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";
import competitionRoutes from "./routes/competition";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://pitchdeck-ddnd.onrender.com",
      "https://pitchdeck-7p0c.onrender.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
    ],
  }),
);

app.use(cookieParser());
app.use(express.json());

// Redirect routes
app.get("/dashboard/competitor/competitions", (req, res) => {
  res.redirect("http://localhost:3000/dashboard/competitions");
});

app.get("/dashboard/competitor/applications", (req, res) => {
  res.redirect("https://tally.so/r/mOxbXY");
});

app.use("/api/auth", authRoutes);
app.use("/api/competitions", competitionRoutes);

const PORT = process.env.PORT || 8000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/pitchdeck";

// Start the server regardless of MongoDB connection
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    console.log("Server is running but database functionality will be limited");
  });
