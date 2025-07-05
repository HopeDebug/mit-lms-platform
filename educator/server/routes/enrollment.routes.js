const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const enrollmentCtrl = require("../controllers/enrollment.controller");

const router = express.Router();

router.get("/", auth, enrollmentCtrl.getEnrolledStudents);
router.post("/:courseId/enroll", auth, enrollmentCtrl.enroll);

module.exports = router;
