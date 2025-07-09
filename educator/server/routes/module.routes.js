// routes/module.routes.js
const express = require("express");
const { auth, isEducator } = require("../middleware/auth.middleware");
const moduleCtrl = require("../controllers/module.controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router({ mergeParams: true }); // to get courseId from params

// Add a new module to a course
router.post("/", auth, isEducator, moduleCtrl.addModule);

// Add a lesson to a module
router.post("/:moduleId/lessons", auth, isEducator, upload.array("materials"), moduleCtrl.addLesson);

module.exports = router;
