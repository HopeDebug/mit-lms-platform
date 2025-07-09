const Course = require("../models/Course");
const Attendance = require("../models/Attendance");

exports.getEducatorDashboard = async (req, res) => {
  try {
    const courses = await Course.find({ educator: req.user._id }).populate(
      "students"
    );
    const totalCourses = courses.length;
    const totalEnrollments = courses.reduce(
      (acc, c) => acc + (c.students?.length || 0),
      0
    );
    // Mock payment data
    const paymentStatus = "Paid";
    const paymentHistory = [
      { date: "2024-05-01", amount: 100 },
      { date: "2024-06-01", amount: 120 },
    ];
    // Attendance stats (mocked)
    const attendanceStats = { totalSessions: 10, averageAttendance: 85 };
    res.json({
      totalCourses,
      totalEnrollments,
      paymentStatus,
      paymentHistory,
      attendanceStats,
      courses,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
