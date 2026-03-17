const {
  getAllUsers,
  deactivateUser,
  activateUser,
  promoteUser,
  demoteUser,
  getAllQuestions,
  getAllAnswers,
} = require("../services/adminService");

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deactivate = async (req, res) => {
  try {
    const result = await deactivateUser(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const activate = async (req, res) => {
  try {
    const result = await activateUser(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getQuestions = async (req, res) => {
  try {
    const questions = await getAllQuestions();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAnswers = async (req, res) => {
  try {
    const answers = await getAllAnswers();
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const promote = async (req, res) => {
  try {
    const result = await promoteUser(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const demote = async (req, res) => {
  try {
    const result = await demoteUser(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  deactivate,
  activate,
  promote,
  demote,
  getQuestions,
  getAnswers,
};
