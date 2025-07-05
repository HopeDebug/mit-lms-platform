const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /api/users/:userId/enroll/:courseId
router.post("/:userId/enroll/:courseId", async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    const alreadyEnrolled = user.enrolledCourses.some(
      (ec) => ec.course.toString() === courseId
    );
    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    user.enrolledCourses.push({ course: courseId, progress: 0 });
    await user.save();

    res.json({ message: "Enrolled successfully", enrolledCourses: user.enrolledCourses });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
