import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/authRoutes";
import landRoutes from "./routes/landRoutes";
import pool from "./config/db";
import mutationRoutes from "./routes/mutationRoutes";
import surveyRoutes from "./routes/surveyRoutes";
import ocrRoutes from "./routes/ocrRoutes";
import voiceRoutes from "./routes/voiceRoutes";

const app = express();

const PORT = process.env.PORT || 5000;

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
app.use(express.json());

// ==========================================
// TEST POSTGRESQL CONNECTION
// ==========================================

pool.connect()
  .then(() => {
    console.log("✅ Connected to PostgreSQL");
  })
  .catch((err) => {
    console.error(
      "❌ PostgreSQL Connection Error:",
      err
    );
  });

// ==========================================
// ROUTES
// ==========================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/land",
  landRoutes
);

app.use(
  "/api/mutation",
  mutationRoutes
);

app.use(
  "/api/survey",
  surveyRoutes
);

app.use(
  "/api/ocr",
  ocrRoutes
);

app.use(
  "/api/voice",
  voiceRoutes
);

// ==========================================
// HEALTH CHECK
// ==========================================

app.get(
  "/api/health",
  (req, res) => {
    res.json({
      success: true,
      message:
        "BhumiMitra Backend is running successfully!",
    });
  }
);

// ==========================================
// START SERVER
// ==========================================

app.listen(
  PORT,
  () => {
    console.log(`🚀 BhumiMitra Backend running on port ${PORT}`);
  }
);