const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const registerUser = async (username, email, password, roleId = 1) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const user = await User.create({ username, email, password, roleId });

  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    roleId: user.roleId,
    token: generateToken(user._id, user.roleId),
  };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (!user.isActive) {
    throw new Error("Your account has been deactivated");
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    roleId: user.roleId,
    token: generateToken(user._id, user.roleId),
  };
};

module.exports = { registerUser, loginUser };
