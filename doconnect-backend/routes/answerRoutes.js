const express = require("express");
const router = express.Router();
const {
  create,
  getByQuestion,
  remove,
  approve,
  reject,
} = require("../controllers/answerController");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

router.get("/:questionId", getByQuestion);
router.post("/:questionId", protect, create);
router.delete("/:id", protect, isAdmin, remove);
router.put("/:id/approve", protect, isAdmin, approve);
router.put("/:id/reject", protect, isAdmin, reject);

module.exports = router;
