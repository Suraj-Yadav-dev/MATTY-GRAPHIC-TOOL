import API from "../utils/api"; // ✅ use your api.js instance

const DESIGN_URL = "/designs"; // base route

// =================== User Designs ===================

export const getDesigns = async () => {
  const response = await API.get(DESIGN_URL);
  return response.data;
};

export const getDesignById = async (id) => {
  const response = await API.get(`${DESIGN_URL}/${id}`);
  return response.data;
};

export const createDesign = async (designData) => {
  const response = await API.post(DESIGN_URL, designData);
  return response.data;
};

export const updateDesign = async (id, designData) => {
  const response = await API.put(`${DESIGN_URL}/${id}`, designData);
  return response.data;
};

export const deleteDesign = async (id) => {
  const response = await API.delete(`${DESIGN_URL}/${id}`);
  return response.data;
};

// =================== Built-in Templates ===================

export const getBuiltInDesigns = async (category = "", search = "") => {
  let url = `${DESIGN_URL}/builtin?`;
  if (category) url += `category=${category}&`;
  if (search) url += `search=${search}`;
  const response = await API.get(url);
  return response.data;
};

export default {
  getDesigns,
  getDesignById,
  createDesign,
  updateDesign,
  deleteDesign,
  getBuiltInDesigns,
};
