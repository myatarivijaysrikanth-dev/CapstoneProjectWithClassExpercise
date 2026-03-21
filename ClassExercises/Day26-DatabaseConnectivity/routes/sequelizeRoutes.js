const express = require("express");
const router = express.Router();

router.get("/courses", (req, res) => {
  res.json({ message: "Sequelize route working" });
});

module.exports = router;