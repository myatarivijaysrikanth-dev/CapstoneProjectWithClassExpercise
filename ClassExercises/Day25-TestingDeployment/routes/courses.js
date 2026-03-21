const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "Node.js" },
    { id: 2, name: "React" },
  ]);
});

module.exports = router;
