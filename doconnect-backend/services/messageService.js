const Message = require('../models/Message');

const saveMessage = async (senderId, receiverId, messageText) => {
  const message = await Message.create({ senderId, receiverId, messageText });
  return message;
};

const getChatHistory = async (userId, otherUserId) => {
  return await Message.find({
    $or: [
      { senderId: userId,      receiverId: otherUserId },
      { senderId: otherUserId, receiverId: userId },
    ],
  })
    .populate('senderId',   'username')
    .populate('receiverId', 'username')
    .sort({ createdAt: 1 });
};

module.exports = { saveMessage, getChatHistory };