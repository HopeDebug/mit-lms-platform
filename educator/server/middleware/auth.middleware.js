const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_SECRET = "supersecretkey123";

exports.auth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).json({ message: "User not found" });
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

exports.isEducator = (req, res, next) => {
  if (req.user?.role !== "educator")
    return res.status(403).json({ message: "Educator only" });
  next();
};
