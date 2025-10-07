// src/services/authService.js
import axios from "axios";

const API_URL = "/api/auth"; // Adjust if your backend is on a different base URL

// Register new user
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login user
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem("user");
};
