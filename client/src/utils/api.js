import axios from "axios";

// ✅ Use environment variable for backend URL
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, // works for local and production
});

// ✅ Attach token automatically if user is logged in
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default API;
