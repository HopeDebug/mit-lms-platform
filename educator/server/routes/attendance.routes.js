const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const User = require("../models/User");

// 1. Attendance Summary (present/absent count) for a course
router.get("/course/:courseId/summary", async (req, res) => {
  try {
    const { courseId } = req.params;
    const attendance = await Attendance.find({ course: courseId });

    const summary = attendance.reduce((acc, record) => {
      acc[record.status] = (acc[record.status] || 0) + 1;
      return acc;
    }, {});

    res.json({ courseId, summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating summary" });
  }
});

// 2. Update attendance by attendance ID
router.put("/:attendanceId", async (req, res) => {
  try {
    const { attendanceId } = req.params;
    const { date, status } = req.body;

    if (!date || !status) {
      return res.status(400).json({ message: "Date and status are required" });
    }

    const updated = await Attendance.findByIdAndUpdate(
      attendanceId,
      { date, status },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Attendance not found" });
    res.json({ message: "Attendance updated", attendance: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating attendance" });
  }
});

// 3. Delete attendance by attendance ID
router.delete("/:attendanceId", async (req, res) => {
  try {
    const { attendanceId } = req.params;
    const deleted = await Attendance.findByIdAndDelete(attendanceId);
    if (!deleted) return res.status(404).json({ message: "Attendance not found" });

    res.json({ message: "Attendance deleted", attendance: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting attendance" });
  }
});

// 4. Filter attendance by courseId and optional date query (YYYY-MM-DD)
router.get("/course/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const { date } = req.query;

    const query = { course: courseId };

    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      query.date = { $gte: start, $lt: end };
    }

    const records = await Attendance.find(query).populate("student", "name email");
    res.json({ courseId, attendance: records });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching attendance" });
  }
});

// 5. Export attendance CSV preview (JSON for now)
router.get("/course/:courseId/export-preview", async (req, res) => {
  try {
    const { courseId } = req.params;
    const attendance = await Attendance.find({ course: courseId }).populate("student", "name email");

    const csvPreview = attendance.map((a) => ({
      Student: a.student.name,
      Email: a.student.email,
      Date: a.date.toISOString().split("T")[0],
      Status: a.status,
    }));

    res.json(csvPreview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating CSV preview" });
  }
});

module.exports = router;
