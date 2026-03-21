const { validateCourse } = require("../middleware/validator");

router.post("/", validateCourse, (req, res) => {

  const course = {
    id: courses.length + 1,
    name: req.body.name,
    duration: req.body.duration
  };

  courses.push(course);

  res.status(201).json(course);

});