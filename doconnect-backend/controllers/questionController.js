const {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  searchQuestions,
  approveQuestion,
  rejectQuestion,
  closeQuestion,
} = require("../services/questionService");

const create = async (req, res) => {
  try {
    const { title, description, topic } = req.body;
    const question = await createQuestion(
      title,
      description,
      topic,
      req.user._id,
    );
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const questions = await getAllQuestions();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const search = async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword)
      return res.status(400).json({ message: "Keyword is required" });
    const questions = await searchQuestions(keyword);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const question = await getQuestionById(req.params.id);
    res.status(200).json(question);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const question = await updateQuestion(
      req.params.id,
      req.user._id,
      req.body,
    );
    res.status(200).json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const result = await deleteQuestion(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const approve = async (req, res) => {
  try {
    const question = await approveQuestion(req.params.id);
    res.status(200).json(question);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const reject = async (req, res) => {
  try {
    const question = await rejectQuestion(req.params.id);
    res.status(200).json(question);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const close = async (req, res) => {
  try {
    const question = await closeQuestion(req.params.id);
    res.status(200).json(question);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  create,
  getAll,
  search,
  getOne,
  update,
  remove,
  approve,
  reject,
  close,
};
