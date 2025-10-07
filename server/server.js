// Load environment variables as early as possible
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import corsOptions from "./config/corsOptions.js";

import authRoutes from "./routes/authRoutes.js";
import designRoutes from "./routes/designRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

// --------------------
// Connect to MongoDB
// --------------------
connectDB();

// --------------------
// Initialize Express
// --------------------
const app = express();

// --------------------
// Middleware
// --------------------
// CORS: allows frontend requests
app.use(cors(corsOptions));

// Parse JSON bodies (for requests with JSON payloads)
app.use(express.json({ limit: "10mb" }));

// Parse URL-encoded bodies (for forms, image uploads, etc.)
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);
app.use("/api/designs", designRoutes);
app.use("/api/upload", uploadRoutes);


app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🔗 Frontend allowed origins: ${process.env.FRONTEND_URL || process.env.FRONTEND_URLS}`);
});
