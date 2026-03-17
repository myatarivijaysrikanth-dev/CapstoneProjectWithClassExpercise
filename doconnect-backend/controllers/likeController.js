const {
  likeAnswer,
  unlikeAnswer,
  getLikeCount,
} = require("../services/likeService");

const like = async (req, res) => {
  try {
    const result = await likeAnswer(req.params.answerId, req.user._id);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const unlike = async (req, res) => {
  try {
    const result = await unlikeAnswer(req.params.answerId, req.user._id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCount = async (req, res) => {
  try {
    const result = await getLikeCount(req.params.answerId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { like, unlike, getCount };
