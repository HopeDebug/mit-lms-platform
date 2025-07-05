const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    educator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],
    materials: [{ type: String }], // file paths or URLs
    youtubeLinks: [{ type: String }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // Add other fields as needed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
