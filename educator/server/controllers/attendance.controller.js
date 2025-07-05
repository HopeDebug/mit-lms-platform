const Course = require("../models/Course");
const Attendance = require("../models/Attendance");

exports.getEnrolledStudents = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate(
      "students"
    );
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course.students);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({ course: req.params.courseId });
    res.json(attendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.markAttendance = async (req, res) => {
  try {
    const { sessionDate, records } = req.body;
    let attendance = await Attendance.findOne({
      course: req.params.courseId,
      sessionDate,
    });
    if (attendance) {
      attendance.records = records;
      await attendance.save();
    } else {
      attendance = await Attendance.create({
        course: req.params.courseId,
        sessionDate,
        records,
      });
    }
    res.json(attendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
