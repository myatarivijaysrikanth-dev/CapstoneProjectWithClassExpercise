const express = require("express");
const router = express.Router();
const { like, unlike, getCount } = require("../controllers/likeController");
const { protect } = require("../middleware/authMiddleware");

router.get("/:answerId", getCount);
router.post("/:answerId", protect, like);
router.delete("/:answerId", protect, unlike);

module.exports = router;
