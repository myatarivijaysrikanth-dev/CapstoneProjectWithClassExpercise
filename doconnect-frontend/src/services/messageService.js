import API from '../utils/axiosConfig';

const getChatHistory = async (otherUserId) => {
  const response = await API.get(`/messages/${otherUserId}`);
  return response.data;
};

const saveMessage = async (receiverId, messageText) => {
  const response = await API.post('/messages', { receiverId, messageText });
  return response.data;
};

const getAllUsers = async () => {
  const response = await API.get('/users');
  return response.data;
};

const messageService = {
  getChatHistory,
  saveMessage,
  getAllUsers
};

export default messageService;