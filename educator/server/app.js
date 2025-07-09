const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const courseRoutes = require("./routes/course.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const attendanceRoutes = require("./routes/attendance.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const enrollmentRoutes = require("./routes/enrollment.routes");  // <-- added

const app = express();

// Hardcoded secrets (replace with env variables in production)
const MONGO_URI = "mongodb://localhost:27017/educatorDB";
const JWT_SECRET = "supersecretkey123";

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploads folder statically (ensure uploads folder is at project root)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Upload endpoint
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({
    message: "File uploaded successfully",
    fileUrl: `/uploads/${req.file.filename}`,
  });
});

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Educator API Server!");
});

// Env test route (debug only)
app.get("/env-test", (req, res) => {
  res.json({ JWT_SECRET, MONGO_URI });
});

// API routes
app.use("/api/courses", courseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/enrollments", enrollmentRoutes);
// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Global error handler (last middleware)
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({ message: "Server error" });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

// Export app and JWT_SECRET (optional)
module.exports = { app, JWT_SECRET };
