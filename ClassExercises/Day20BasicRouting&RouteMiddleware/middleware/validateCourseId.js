//Challenge 3 — Route Middleware Validation (Difficult)

const validateCourseId = (req, res, next) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return res.status(400).json({
      error: "Invalid course ID",
    });
  }
  next();
};

module.exports = validateCourseId;