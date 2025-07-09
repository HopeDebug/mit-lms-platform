const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["video", "document", "text", "link"],
      required: true,
    },
    value: { type: String, required: true },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Content", ContentSchema);
