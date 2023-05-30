import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { blogService } from "./blogService";

export const getCategories = createAsyncThunk(
  "blogCategory/get-categories",
  async (thunkAPI) => {
    try {
      return await blogService.getBlogCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllBlogs = createAsyncThunk(
  "blog/get-blogs",
  async (thunkAPI) => {
    try {
      return await blogService.getBlogs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBlogById = createAsyncThunk(
  "blog/get-blog",
  async (id, thunkAPI) => {
    try {
      return await blogService.getBlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");
const initialState = {
  blogs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const blogSlice = createSlice({
  name: "Blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bCategories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogs = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getBlogById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getblogbyid = action.payload;
      })
      .addCase(getBlogById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default blogSlice.reducer;
