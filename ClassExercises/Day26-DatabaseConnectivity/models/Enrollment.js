const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  userId: String,
  course: String
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);