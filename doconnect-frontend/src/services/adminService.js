import API from "../utils/axiosConfig";

const getAllUsers = async () => {
  const response = await API.get("/admin/users");
  return response.data;
};

const deactivateUser = async (id) => {
  const response = await API.put(`/admin/users/${id}/deactivate`);
  return response.data;
};

const activateUser = async (id) => {
  const response = await API.put(`/admin/users/${id}/activate`);
  return response.data;
};

const getAllQuestionsAdmin = async () => {
  const response = await API.get("/admin/questions");
  return response.data;
};

const approveQuestion = async (id) => {
  const response = await API.put(`/questions/${id}/approve`);
  return response.data;
};

const rejectQuestion = async (id) => {
  const response = await API.put(`/questions/${id}/reject`);
  return response.data;
};

const deleteQuestion = async (id) => {
  const response = await API.delete(`/questions/${id}`);
  return response.data;
};

const closeQuestion = async (id) => {
  const response = await API.put(`/questions/${id}/close`);
  return response.data;
};

const getAllAnswersAdmin = async () => {
  const response = await API.get("/admin/answers");
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

const deleteAnswer = async (id) => {
  const response = await API.delete(`/answers/${id}`);
  return response.data;
};

const promoteUser = async (id) => {
  const response = await API.put(`/admin/users/${id}/promote`);
  return response.data;
};

const demoteUser = async (id) => {
  const response = await API.put(`/admin/users/${id}/demote`);
  return response.data;
};

const adminService = {
  getAllUsers,
  deactivateUser,
  activateUser,
  promoteUser,
  demoteUser,
  getAllQuestionsAdmin,
  approveQuestion,
  rejectQuestion,
  deleteQuestion,
  closeQuestion,
  getAllAnswersAdmin,
  approveAnswer,
  rejectAnswer,
  deleteAnswer,
};

export default adminService;
