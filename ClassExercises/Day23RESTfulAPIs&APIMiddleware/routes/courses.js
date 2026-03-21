const express = require("express");

const router = express.Router();

let courses = [
  { id: 1, name: "React Mastery", duration: "6 weeks" },
  { id: 2, name: "Node Basics", duration: "4 weeks" }
];

// GET all courses
router.get("/", (req, res) => {
  res.json(courses);
});

// POST new course
router.post("/", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
    duration: req.body.duration
  };

  courses.push(course);

  res.status(201).json(course);
});

// PUT update course
router.put("/:id", (req, res) => {
  const course = courses.find(c => c.id == req.params.id);

  if (!course) return res.status(404).json({ error: "Course not found" });

  course.name = req.body.name;
  course.duration = req.body.duration;

  res.json(course);
});

// DELETE course
router.delete("/:id", (req, res) => {
  courses = courses.filter(c => c.id != req.params.id);

  res.json({ message: "Course deleted" });
});

module.exports = router;