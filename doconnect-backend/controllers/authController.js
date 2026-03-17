const { registerUser, loginUser } = require("../services/authService");

const register = async (req, res) => {
  try {
    const { username, email, password, roleId } = req.body;
    const user = await registerUser(username, email, password, roleId);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { register, login, logout };
