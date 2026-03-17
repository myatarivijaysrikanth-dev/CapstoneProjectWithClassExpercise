const User = require("../models/User");

const getProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) throw new Error("User not found");
  return user;
};

const getAllUsers = async () => {
  return await User.find({ isActive: true }).select("username email");
};

const updateProfile = async (userId, data) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  if (data.username) user.username = data.username;
  if (data.email) user.email = data.email;
  await user.save();
  return User.findById(userId).select("-password");
};

module.exports = { getProfile, getAllUsers, updateProfile };
