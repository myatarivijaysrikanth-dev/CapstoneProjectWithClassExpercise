const {
  createAnswer,
  getAnswersByQuestion,
  deleteAnswer,
  approveAnswer,
  rejectAnswer,
} = require('../services/answerService');

const create = async (req, res) => {
  try {
    const { content } = req.body;
    const answer = await createAnswer(req.params.questionId, req.user._id, content);
    res.status(201).json(answer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getByQuestion = async (req, res) => {
  try {
    const answers = await getAnswersByQuestion(req.params.questionId);
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const result = await deleteAnswer(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const approve = async (req, res) => {
  try {
    const answer = await approveAnswer(req.params.id);
    res.status(200).json(answer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const reject = async (req, res) => {
  try {
    const answer = await rejectAnswer(req.params.id);
    res.status(200).json(answer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { create, getByQuestion, remove, approve, reject };