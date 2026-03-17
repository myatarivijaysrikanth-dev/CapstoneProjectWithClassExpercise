const Comment = require("../models/Comment");

const addComment = async (answerId, userId, commentText) => {
  const comment = await Comment.create({ answerId, userId, commentText });
  return comment;
};

const getCommentsByAnswer = async (answerId) => {
  return await Comment.find({ answerId })
    .populate("userId", "username email")
    .sort({ createdAt: 1 });
};

const deleteComment = async (commentId, userId) => {
  const comment = await Comment.findById(commentId);

  if (!comment) throw new Error("Comment not found");

  if (comment.userId.toString() !== userId.toString()) {
    throw new Error("Not authorized to delete this comment");
  }

  await comment.deleteOne();
  return { message: "Comment deleted successfully" };
};
module.exports = { addComment, getCommentsByAnswer, deleteComment };
