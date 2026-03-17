const express = require('express');
const router = express.Router();
const { add, getByAnswer, remove } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:answerId',  getByAnswer);
router.post('/:answerId', protect, add);
router.delete('/:commentId', protect, remove);

module.exports = router;