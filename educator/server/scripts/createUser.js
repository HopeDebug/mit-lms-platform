const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // adjust path if needed

mongoose.connect("mongodb://localhost:27017/educatorDB");

(async () => {
  const hashedPassword = await bcrypt.hash("123456", 10); // plain password: 123456

  const user = new User({
    name: "Test Educator",
    email: "educator@example.com",
    password: hashedPassword,
    role: "educator"
  });

  try {
    await user.save();
    console.log("✅ Test educator created successfully!");
  } catch (err) {
    console.error("❌ Failed to create user:", err.message);
  } finally {
    mongoose.disconnect();
  }
})();
