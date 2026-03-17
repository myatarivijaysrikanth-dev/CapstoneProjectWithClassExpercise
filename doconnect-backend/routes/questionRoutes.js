const express = require("express");
const router = express.Router();
const {
  create,
  getAll,
  search,
  getOne,
  update,
  remove,
  approve,
  reject,
  close,
} = require("../controllers/questionController");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

router.get("/", getAll);
router.get("/search", search);
router.get("/:id", getOne);

router.post("/", protect, create);
router.put("/:id", protect, update);

router.delete("/:id", protect, isAdmin, remove);
router.put("/:id/approve", protect, isAdmin, approve);
router.put("/:id/reject", protect, isAdmin, reject);
router.put("/:id/close", protect, isAdmin, close);

module.exports = router;
