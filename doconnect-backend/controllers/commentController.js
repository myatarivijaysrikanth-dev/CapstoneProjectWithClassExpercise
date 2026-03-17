const {
  addComment,
  getCommentsByAnswer,
  deleteComment,
} = require("../services/commentService");

const add = async (req, res) => {
  try {
    const { commentText } = req.body;
    const comment = await addComment(
      req.params.answerId,
      req.user._id,
      commentText,
    );
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getByAnswer = async (req, res) => {
  try {
    const comments = await getCommentsByAnswer(req.params.answerId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const result = await deleteComment(req.params.commentId, req.user._id);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

module.exports = { add, getByAnswer, remove };
