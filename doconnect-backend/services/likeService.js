const Like = require("../models/Like");

const likeAnswer = async (answerId, userId) => {
  const existing = await Like.findOne({ answerId, userId });
  if (existing) throw new Error("You have already liked this answer");
  const like = await Like.create({ answerId, userId });
  return like;
};

const unlikeAnswer = async (answerId, userId) => {
  const like = await Like.findOneAndDelete({ answerId, userId });
  if (!like) throw new Error("You have not liked this answer");
  return { message: "Like removed" };
};

const getLikeCount = async (answerId) => {
  const count = await Like.countDocuments({ answerId });
  return { answerId, count };
};

module.exports = { likeAnswer, unlikeAnswer, getLikeCount };
