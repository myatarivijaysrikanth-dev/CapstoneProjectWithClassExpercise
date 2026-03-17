const express = require("express");
const router = express.Router();
const {
  profile,
  updateProfile,
  getAll,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/profile", protect, profile);
router.put("/profile", protect, updateProfile);
router.get("/", protect, getAll);

module.exports = router;
