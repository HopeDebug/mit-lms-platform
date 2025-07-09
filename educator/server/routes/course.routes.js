const express = require("express");
const { auth, isEducator } = require("../middleware/auth.middleware");
const courseCtrl = require("../controllers/course.controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

console.log("getAllCourses handler:", courseCtrl.getAllCourses);

// GET all courses - should be protected if you want only educators to see their courses
router.get("/", auth, isEducator, courseCtrl.getAllCourses);

// POST create course - protected route
router.post(
  "/",
  auth,
  isEducator,
  upload.array("materials"),
  courseCtrl.createCourse
);

// PUT update course - protected route
router.put(
  "/:id",
  auth,
  isEducator,
  upload.array("materials"),
  courseCtrl.updateCourse
);

// DELETE course - protected route
router.delete("/:id", auth, isEducator, courseCtrl.deleteCourse);

module.exports = router;
