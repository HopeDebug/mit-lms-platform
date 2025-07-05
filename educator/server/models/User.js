const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "educator", "admin"],
      default: "student",
    },
    enrolledCourses: [
      {
        course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
        progress: Number, // percent or number of completed lessons
      },
    ],
    // Add other fields as needed
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
