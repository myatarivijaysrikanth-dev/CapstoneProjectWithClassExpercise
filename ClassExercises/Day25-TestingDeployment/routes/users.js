const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);
});

router.post("/", (req, res) => {
  const user = req.body;

  res.status(201).json({
    message: "User created",
    user,
  });
});

module.exports = router;
