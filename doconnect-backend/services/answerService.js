const Answer = require("../models/Answer");
const Question = require("../models/Question");
const sendEmail = require("../utils/sendEmail");

const createAnswer = async (questionId, userId, answerText) => {
  const question = await Question.findById(questionId);
  if (!question) throw new Error("Question not found");
  if (!question.isOpen) throw new Error("This discussion thread is closed");
  if (question.status !== 1)
    throw new Error("Can only answer approved questions");

  const answer = await Answer.create({
    content: answerText,
    questionId,
    answeredBy: userId,
  });

  await sendEmail(
    "New Answer Posted on DoConnect",
    `A new answer has been posted.\n\nQuestion ID: ${questionId}\nAnswer: ${answerText}`,
  );

  return answer;
};

const getAnswersByQuestion = async (questionId) => {
  return await Answer.find({ questionId, status: 1 })
    .populate("answeredBy", "username email")
    .sort({ createdAt: -1 });
};

const deleteAnswer = async (id) => {
  const answer = await Answer.findById(id);
  if (!answer) throw new Error("Answer not found");
  await answer.deleteOne();
  return { message: "Answer deleted" };
};

const approveAnswer = async (id) => {
  const answer = await Answer.findById(id);
  if (!answer) throw new Error("Answer not found");
  answer.status = 1;
  await answer.save();
  return answer;
};

const rejectAnswer = async (id) => {
  const answer = await Answer.findById(id);
  if (!answer) throw new Error("Answer not found");
  answer.status = 3;
  await answer.save();
  return answer;
};

module.exports = {
  createAnswer,
  getAnswersByQuestion,
  deleteAnswer,
  approveAnswer,
  rejectAnswer,
};
