const Question = require("../models/Question");
const sendEmail = require("../utils/sendEmail");

const createQuestion = async (title, description, topic, userId) => {
  const question = await Question.create({
    title,
    description,
    topic,
    askedBy: userId,
  });

  await sendEmail(
    "New Question Posted on DoConnect",
    `A new question has been posted.\n\nTitle: ${title}\nDescription: ${description}`,
  );

  return question;
};

const getAllQuestions = async () => {
  return await Question.find({ status: 1 })
    .populate("askedBy", "username email")
    .sort({ createdAt: -1 });
};

const getQuestionById = async (id) => {
  const question = await Question.findById(id).populate(
    "askedBy",
    "username email",
  );

  if (!question) throw new Error("Question not found");
  return question;
};

const updateQuestion = async (id, userId, data) => {
  const question = await Question.findById(id);

  if (!question) throw new Error("Question not found");

  if (question.askedBy.toString() !== userId.toString()) {
    throw new Error("Not authorized to update this question");
  }

  question.title = data.title || question.title;
  question.description = data.description || question.description;
  question.topic = data.topic || question.topic;

  await question.save();
  return question;
};

const deleteQuestion = async (id) => {
  const question = await Question.findById(id);

  if (!question) throw new Error("Question not found");

  await question.deleteOne();
  return { message: "Question deleted" };
};

const searchQuestions = async (keyword) => {
  return await Question.find({
    status: 1,
    $text: { $search: keyword },
  })
    .populate("askedBy", "username email")
    .sort({ createdAt: -1 });
};

const approveQuestion = async (id) => {
  const question = await Question.findById(id);

  if (!question) throw new Error("Question not found");

  question.status = 1;
  await question.save();
  return question;
};

const rejectQuestion = async (id) => {
  const question = await Question.findById(id);

  if (!question) throw new Error("Question not found");

  question.status = 3;
  await question.save();
  return question;
};

const closeQuestion = async (id) => {
  const question = await Question.findById(id);

  if (!question) throw new Error("Question not found");

  question.isOpen = false;
  await question.save();
  return question;
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  searchQuestions,
  approveQuestion,
  rejectQuestion,
  closeQuestion,
};
