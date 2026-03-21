const { body, validationResult } = require("express-validator");

exports.validateCourse = [
  body("name").notEmpty().withMessage("Course name is required"),
  body("duration").notEmpty().withMessage("Duration is required"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array()[0].msg
      });
    }

    next();
  }
];