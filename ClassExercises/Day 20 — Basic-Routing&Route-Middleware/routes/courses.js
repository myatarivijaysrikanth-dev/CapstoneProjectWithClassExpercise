const express = require("express");
const router = express.Router();

const validateCourseId = require("../middleware/validateCourseId");

//Challenge 2 — Dynamic Routing (Average)
router.get("/:id", validateCourseId, (req, res) => {
  const id = req.params.id;

  res.json({
    id: id,
    name: "React Mastery",
    duration: "6 weeks",
  });
});

module.exports = router;
