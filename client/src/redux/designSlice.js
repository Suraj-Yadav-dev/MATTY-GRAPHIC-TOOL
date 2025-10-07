// src/redux/designSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import designService from "../services/designService";

// =================== Async Thunks ===================

// Fetch user designs
export const fetchUserDesigns = createAsyncThunk(
  "design/fetchUserDesigns",
  async (_, thunkAPI) => {
    try {
      return await designService.getDesigns();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch built-in templates (with optional category & search)
export const fetchBuiltInDesigns = createAsyncThunk(
  "design/fetchBuiltInDesigns",
  async ({ category = "", search = "" }, thunkAPI) => {
    try {
      return await designService.getBuiltInDesigns(category, search);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// =================== Slice ===================
const initialState = {
  designs: [],           // all designs (user + built-in if needed)
  selectedDesign: null,  // currently opened design
  loading: false,
  error: null,
};

const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    addDesign: (state, action) => {
      state.designs.push(action.payload);
    },
    updateDesign: (state, action) => {
      const index = state.designs.findIndex((d) => d._id === action.payload._id);
      if (index !== -1) state.designs[index] = action.payload;
    },
    deleteDesign: (state, action) => {
      state.designs = state.designs.filter((d) => d._id !== action.payload);
    },
    selectDesign: (state, action) => {
      state.selectedDesign = action.payload;
    },
    clearSelectedDesign: (state) => {
      state.selectedDesign = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // User Designs
      .addCase(fetchUserDesigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDesigns.fulfilled, (state, action) => {
        state.loading = false;
        state.designs = action.payload;
      })
      .addCase(fetchUserDesigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Built-in Designs
      .addCase(fetchBuiltInDesigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuiltInDesigns.fulfilled, (state, action) => {
        state.loading = false;
        state.designs = action.payload;
      })
      .addCase(fetchBuiltInDesigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addDesign, updateDesign, deleteDesign, selectDesign, clearSelectedDesign } = designSlice.actions;

export default designSlice.reducer;
