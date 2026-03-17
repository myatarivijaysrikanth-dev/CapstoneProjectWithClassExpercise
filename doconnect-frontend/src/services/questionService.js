import API from "../utils/axiosConfig";

const getAllQuestions = async () => {
  const response = await API.get("/questions");
  return response.data;
};

const getQuestionById = async (id) => {
  const response = await API.get(`/questions/${id}`);
  return response.data;
};

const createQuestion = async (title, description, topic) => {
  const response = await API.post("/questions", { title, description, topic });
  return response.data;
};

const updateQuestion = async (id, data) => {
  const response = await API.put(`/questions/${id}`, data);
  return response.data;
};

const deleteQuestion = async (id) => {
  const response = await API.delete(`/questions/${id}`);
  return response.data;
};

const searchQuestions = async (keyword) => {
  const response = await API.get(`/questions/search?keyword=${keyword}`);
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

const closeQuestion = async (id) => {
  const response = await API.put(`/questions/${id}/close`);
  return response.data;
};

const questionService = {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  searchQuestions,
  approveQuestion,
  rejectQuestion,
  closeQuestion,
};

export default questionService;
