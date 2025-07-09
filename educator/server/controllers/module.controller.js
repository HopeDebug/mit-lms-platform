// controllers/module.controller.js
const Module = require("../models/Module");
const Course = require("../models/Course");

exports.addModule = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title } = req.body;

    // Optional: Verify educator owns the course here

    const newModule = new Module({ course: courseId, title, lessons: [] });
    await newModule.save();

    res.status(201).json(newModule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addLesson = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { title, content } = req.body;
    const materials = req.files?.map(f => f.path) || [];

    const module = await Module.findById(moduleId);
    if (!module) return res.status(404).json({ message: "Module not found" });

    module.lessons.push({ title, content, materials });
    await module.save();

    res.status(201).json(module);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
