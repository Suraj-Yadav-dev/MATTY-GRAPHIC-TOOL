// client/src/api.js
import axios from "axios";

// --------------------
// Create Axios instance
// --------------------
// Use environment variable for backend URL
// Local: http://localhost:5000
// Production: https://matty-graphic-tool.onrender.com
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true, // optional: include cookies if needed
});

// --------------------
// Request interceptor
// --------------------
// Automatically attach JWT token if user is logged in
API.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --------------------
// Response interceptor (optional)
// --------------------
// You can handle global errors here if you want
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: log out user if 401 unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default API;
