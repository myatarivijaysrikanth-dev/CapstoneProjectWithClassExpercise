const { getProfile, getAllUsers, updateProfile } = require('../services/userService');

const profile = async (req, res) => {
  try {
    const user = await getProfile(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const user = await updateProfile(req.user._id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { profile, getAll, updateProfile: updateProfileController };