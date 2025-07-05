const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // Adjust path
const Course = require("./models/Course"); // Adjust path

const MONGO_URI = "mongodb://localhost:27017/educatorDB";

async function seed() {
  await mongoose.connect(MONGO_URI);

  // Example existing course ID (replace with actual course ID from your DB)
  const courseId = "6866da63ccc9d0a73e68da17"; 

  // Hash password
  const passwordHash = bcrypt.hashSync("yourpassword", 10);

  // Create user with enrolled course and progress
  const user = new User({
    name: "Student Example",
    email: "student@example.com",
    password: passwordHash,
    role: "student",
    enrolledCourses: [
      {
        course: courseId,
        progress: 30, // 30% completed for example
      },
    ],
  });

  await user.save();
  console.log("User with enrolled course seeded!");
  mongoose.disconnect();
}

seed().catch(console.error);
