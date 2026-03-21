const express = require("express");
const router = express.Router();

const Enrollment = require("../models/Enrollment");

router.get("/enrollments", async (req, res) => {
  try {
    const data = await Enrollment.find();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
