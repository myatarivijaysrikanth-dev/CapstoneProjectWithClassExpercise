const express = require("express");
const router = express.Router();

router.get("/courses", (req, res) => {
  res.json({ message: "MySQL route working" });
});

module.exports = router;