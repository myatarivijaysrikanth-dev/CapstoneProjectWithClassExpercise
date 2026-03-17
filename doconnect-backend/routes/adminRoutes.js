const express = require("express");
const router = express.Router();
const {
  getUsers,
  deactivate,
  activate,
  promote,
  demote,
  getQuestions,
  getAnswers,
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

router.get("/users", protect, isAdmin, getUsers);
router.put("/users/:id/deactivate", protect, isAdmin, deactivate);
router.put("/users/:id/activate", protect, isAdmin, activate);
router.put("/users/:id/promote", protect, isAdmin, promote);
router.put("/users/:id/demote", protect, isAdmin, demote);
router.get("/questions", protect, isAdmin, getQuestions);
router.get("/answers", protect, isAdmin, getAnswers);

module.exports = router;
