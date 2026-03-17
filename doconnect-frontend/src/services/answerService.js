import API from '../utils/axiosConfig';

const getAnswersByQuestion = async (questionId) => {
  const response = await API.get(`/answers/${questionId}`);
  return response.data;
};

const createAnswer = async (questionId, content) => {
  const response = await API.post(`/answers/${questionId}`, { content });
  return response.data;
};

const deleteAnswer = async (id) => {
  const response = await API.delete(`/answers/${id}`);
  return response.data;
};

const approveAnswer = async (id) => {
  const response = await API.put(`/answers/${id}/approve`);
  return response.data;
};

const rejectAnswer = async (id) => {
  const response = await API.put(`/answers/${id}/reject`);
  return response.data;
};

const likeAnswer = async (answerId) => {
  const response = await API.post(`/likes/${answerId}`);
  return response.data;
};

const unlikeAnswer = async (answerId) => {
  const response = await API.delete(`/likes/${answerId}`);
  return response.data;
};

const getLikeCount = async (answerId) => {
  const response = await API.get(`/likes/${answerId}`);
  return response.data;
};

const getCommentsByAnswer = async (answerId) => {
  const response = await API.get(`/comments/${answerId}`);
  return response.data;
};

const addComment = async (answerId, commentText) => {
  const response = await API.post(`/comments/${answerId}`, { commentText });
  return response.data;
};

const deleteComment = async (commentId) => {
  const response = await API.delete(`/comments/${commentId}`);
  return response.data;
};

const answerService= {
  
  getAnswersByQuestion,
  createAnswer,
  deleteAnswer,
  approveAnswer,
  rejectAnswer,
  likeAnswer,
  unlikeAnswer,
  getLikeCount,
  getCommentsByAnswer,
  addComment,
  deleteComment,
};

export default answerService;