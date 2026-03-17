const { saveMessage, getChatHistory } = require("../services/messageService");

const save = async (req, res) => {
  try {
    const { receiverId, messageText } = req.body;
    const message = await saveMessage(req.user._id, receiverId, messageText);
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const messages = await getChatHistory(req.user._id, req.params.otherUserId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { save, getHistory };
