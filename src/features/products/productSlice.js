import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { productService } from "./productService";
import { toast } from "react-toastify";

export const getAllProducts = createAsyncThunk(
  "product/get-all-product",
  async (data, thunkAPI) => {
    try {
      return await productService.getProducts(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProductById = createAsyncThunk(
  "product/get-product-by-id",
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProductCategories = createAsyncThunk(
  "product/get-product-categories",
  async (thunkAPI) => {
    try {
      return await productService.getAllProductCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "product/wishlist",
  async (prodId, thunkAPI) => {
    try {
      return await productService.addProdToWishlist(prodId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToCompare = createAsyncThunk(
  "product/compare",
  async (prodId, thunkAPI) => {
    try {
      return await productService.addProdToCompare(prodId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const rateProduct = createAsyncThunk(
  "product/rating",
  async (data, thunkAPI) => {
    try {
      return await productService.ratingProduct(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const filterProductsByCategory = createAction(
  "product/filter-by-category"
);

export const filterProductsByTags = createAction("product/filter-by-tags");

export const filterProductsByNameAsc = createAction(
  "product/filter-by-name-az"
);

export const resetState = createAction("Reset_all");

const initialState = {
  products: [],
  categories: [],
  filteredProductsByCategories: [],
  filteredProductsByTags: [],
  filterProductsByNameAsc: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addToCompare.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCompare.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      })
      .addCase(addToCompare.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(rateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.rating = action.payload;
        if (state.isSuccess) {
          toast.success("Đánh giá thành công");
        }
      })
      .addCase(rateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        if (state.isError) {
          toast.error("Đánh giá thất bại");
        }
      })

      .addCase(getProductCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categories = action.payload.map((category) => ({
          id: category._id,
          title: category.title,
        }));
      })
      .addCase(getProductCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(filterProductsByCategory, (state, action) => {
        const categoryId = action.payload;
        const selectedCategory = state.categories.find(
          (category) => category.id === categoryId
        );
        if (selectedCategory) {
          state.filteredProductsByCategories = state.products.filter(
            (product) => product.category === selectedCategory.title
          );
        } else {
          console.log("Invalid category id");
        }
      })
      .addCase(filterProductsByTags, (state, action) => {
        const selectedTag = action.payload;
        if (selectedTag) {
          state.filteredProductsByTags = state.products.filter(
            (product) => product.tags === selectedTag
          );
        } else {
          console.log("Invalid tags");
        }
      })
      .addCase(filterProductsByNameAsc, (state, action) => {
        state.filteredProductsByNameAsc = [...state.products].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      })
      .addCase(resetState, () => initialState);
  },
});
export default productSlice.reducer;
