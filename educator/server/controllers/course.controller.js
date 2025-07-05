const Course = require("../models/Course");

// No more hardcoded ID here

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ educator: req.user._id });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { title, description, youtubeLinks } = req.body;
    const materials = req.files?.map((f) => f.path) || [];

    const course = await Course.create({
      title,
      description,
      educator: req.user._id,  // use authenticated user's ID here
      materials,
      youtubeLinks: youtubeLinks
        ? Array.isArray(youtubeLinks)
          ? youtubeLinks
          : [youtubeLinks]
        : [],
    });

    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { title, description, youtubeLinks } = req.body;
    const update = { title, description };
    if (youtubeLinks)
      update.youtubeLinks = Array.isArray(youtubeLinks)
        ? youtubeLinks
        : [youtubeLinks];
    if (req.files && req.files.length > 0) {
      update.$push = { materials: { $each: req.files.map((f) => f.path) } };
    }

    const course = await Course.findOneAndUpdate(
      { _id: req.params.id, educator: req.user._id },  // use authenticated user here
      update,
      { new: true }
    );

    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({
      _id: req.params.id,
      educator: req.user._id,  // use authenticated user here
    });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
