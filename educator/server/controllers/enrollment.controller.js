const User = require("../models/User");
const Course = require("../models/Course");

exports.enroll = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.params;

    // Check course exists
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const user = await User.findById(userId);

    // Check if already enrolled
    if (user.enrolledCourses.some(ec => ec.course.equals(courseId)))
      return res.status(400).json({ message: "Already enrolled" });

    user.enrolledCourses.push({ course: courseId, progress: 0 });
    await user.save();

    res.json({ message: "Enrolled successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEnrolledStudents = async (req, res) => {
  try {
    // Find courses with enrolled students
    const courses = await Course.find()
      .populate({ 
        path: 'students',  // or the correct field in your schema that links students
        select: 'name email' 
      })
      .select('title students');

    // Filter courses that have students enrolled
    const enrolled = courses
      .filter(course => course.students && course.students.length > 0)
      .map(course => ({
        courseTitle: course.title,
        students: course.students,
      }));

    res.json(enrolled);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
