const express = require("express");
const router = express.Router();
const { save, getHistory } = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, save);
router.get("/:otherUserId", protect, getHistory);

module.exports = router;
