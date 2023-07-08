import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {authService} from "./userService";
import Cookies from "js-cookie";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const forgotPWToken = createAsyncThunk(
  "auth/password/token",
  async (data, thunkAPI) => {
    try {
      return await authService.forgotPasswordToken(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/password/reset",
  async (data, thunkAPI) => {
    try {
      return await authService.resetPasswordToken(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, {rejectWithValue}) => {
    try {
      const response = await authService.logout();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addProdToCart = createAsyncThunk(
  "user/cart/add",
  async (cartData, thunkAPI) => {
    try {
      return await authService.addToCart(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteProdFromCart = createAsyncThunk(
  "user/cart/delete",
  async (cartItemId, thunkAPI) => {
    try {
      return await authService.deleteCartItem(cartItemId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProdFromCart = createAsyncThunk(
  "user/cart/update",
  async (cartDetail, thunkAPI) => {
    try {
      return await authService.updateQuantityFromCart(cartDetail);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserCart = createAsyncThunk(
  "user/cart/get",
  async (thunkAPI) => {
    try {
      return await authService.getCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserProdWishlist = createAsyncThunk(
  "user/wishlist",
  async (thunkAPI) => {
    try {
      return await authService.getUserWishlist();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserCompareList = createAsyncThunk(
  "user/compare",
  async (thunkAPI) => {
    try {
      return await authService.getUserCompare();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAnOrder = createAsyncThunk(
  "user/cart/create-order",
  async (orderDetail, thunkAPI) => {
    try {
      return await authService.createOrder(orderDetail);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "user/cart/get-my-orders",
  async (thunkAPI) => {
    try {
      return await authService.getUserOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/update",
  async (data, thunkAPI) => {
    try {
      return await authService.updateUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getCustomerFromsessionStorage = sessionStorage.getItem("customer")
  ? JSON.parse(sessionStorage.getItem("customer"))
  : null;

const initialState = {
  user: getCustomerFromsessionStorage,
  cart:
    JSON.parse(sessionStorage.getItem("userCart")) ||
    JSON.parse(sessionStorage.getItem("guestCart")) ||
    [],
  cartProducts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  createdUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdUser = action.payload;
        if (state.isSuccess === true) {
          toast.info("Đăng kí thành công, Đang chuyển hướng sang đăng nhập");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        Cookies.set("refreshToken", action.payload.refreshToken);
        Cookies.set("token", action.payload.token);
        if (state.isSuccess === true) {
          toast.info("Đăng nhập thành công");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(forgotPWToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPWToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.token = action.payload;
        if (state.isSuccess) {
          toast.info("Đã gửi về email");
        }
      })
      .addCase(forgotPWToken.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        toast.error("Vui lòng thử lại");
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pass = action.payload;
        if (state.isSuccess) {
          toast.info("Thay đổi mật khẩu thành công");
        }
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        toast.error("Vui lòng thử lại");
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.cartProducts = [];
        sessionStorage.removeItem("customer");
        sessionStorage.removeItem("userCart");
        Cookies.remove("refreshToken");
        Cookies.remove("token");
        toast.info("Đăng xuất thành công");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error;
        toast.error("Đăng xuất thất bại");
      })
      .addCase(getUserProdWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProdWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      })
      .addCase(getUserProdWishlist.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(getUserCompareList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCompareList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.compare = action.payload;
      })
      .addCase(getUserCompareList.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(addProdToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProdToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addProductToCart = action.payload;
        if (state.isSuccess) {
          toast.success("Đã thêm vào giỏ hàng");
        }
      })
      .addCase(addProdToCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(deleteProdFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProdFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedProductCart = action.payload;
        if (state.isSuccess) {
          toast.success("Đã xóa khỏi giỏ hàng");
        }
      })
      .addCase(deleteProdFromCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(updateProdFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProdFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedProductCart = action.payload;
        // if (state.isSuccess) {
        //   toast.success("Đã cập nhật số lượng ");
        // }
      })
      .addCase(updateProdFromCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartProducts = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(createAnOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAnOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderedProducts = action.payload;
        if (state.isSuccess) {
          toast.success("Xác nhận order thành công ");
        }
      })
      .addCase(createAnOrder.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getUserOrders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedUser = action.payload;
        let currentUserData = JSON.parse(sessionStorage.getItem("customer"));
        let newUserData = {
          _id: currentUserData?._id,
          token: currentUserData?.token,
          firstname: action?.payload?.firstname,
          lastname: action?.payload?.lastname,
          email: action?.payload?.email,
          mobile: action?.payload?.mobile,
        };
        sessionStorage.setItem("customer", JSON.stringify(newUserData));
        state.user = newUserData;
        toast.success("cập nhật thành công ");
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.success("cập nhật thất bại ");
        }
      });
  },
});

// export const { addItemToCart, removeItemFromCart, updateItemQuantity } =
//   authSlice.actions;

export default authSlice.reducer;
