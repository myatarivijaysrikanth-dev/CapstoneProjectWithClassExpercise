import API from "../utils/axiosConfig";

const register = async (username, email, password, roleId = 1) => {
  const response = await API.post("/auth/register", {
    username,
    email,
    password,
    roleId,
  });
  return response.data;
};

const login = async (email, password) => {
  const response = await API.post("/auth/login", { email, password });
  return response.data;
};

const logout = async () => {
  await API.post("/auth/logout");
};
const authService = { register, login, logout };

export default authService;
