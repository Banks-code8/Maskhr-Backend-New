// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// import connectDB from "./src/config/db.js";
// import authRoutes from "./src/routes/auth.routes.js";

// dotenv.config();

// const app = express();

// connectDB();

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   }),
// );

// app.use(express.json());

// app.use("/api/auth", authRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";

dotenv.config();

const app = express();

/* -------------------- MIDDLEWARE -------------------- */

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());

/* -------------------- HEALTH CHECK -------------------- */

app.get("/", (req, res) => {
  res.json({ status: "API is running 🚀" });
});

/* -------------------- ROUTES -------------------- */

app.use("/api/auth", authRoutes);

/* -------------------- START SERVER -------------------- */

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
