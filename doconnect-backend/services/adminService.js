const User = require("../models/User");
const Question = require("../models/Question");
const Answer = require("../models/Answer");

const getAllUsers = async () => {
  return await User.find().select("-password");
};

const deactivateUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  user.isActive = false;
  await user.save();
  return { message: "User deactivated" };
};

const activateUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  user.isActive = true;
  await user.save();
  return { message: "User activated" };
};

const getAllQuestions = async () => {
  return await Question.find()
    .populate("askedBy", "username email")
    .sort({ createdAt: -1 });
};

const promoteUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  user.roleId = 2;
  await user.save();
  return { message: "User promoted to admin" };
};

const demoteUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  user.roleId = 1;
  await user.save();
  return { message: "User demoted to user" };
};

const getAllAnswers = async () => {
  return await Answer.find()
    .populate("answeredBy", "username")
    .populate("questionId", "title")
    .sort({ createdAt: -1 });
};

module.exports = {
  getAllUsers,
  deactivateUser,
  activateUser,
  promoteUser,
  demoteUser,
  getAllQuestions,
  getAllAnswers,
};
