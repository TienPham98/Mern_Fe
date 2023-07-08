import axios from "axios";
import {base_url, instance} from "../../utils/axiosconfig";
import Cookies from "js-cookie";

const register = async (userData) => {
  const response = await axios.post(`${base_url}user/register`, userData);
  if (response.data) {
    if (response.data) {
      sessionStorage.setItem("customer", JSON.stringify(response.data));
    }
    return response.data;
  }
};

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/login`, userData);
  if (response.data) {
    if (response.data) {
      const refreshToken = response.data.refreshToken;
      sessionStorage.setItem("customer", JSON.stringify(response.data));
    }
    return response.data;
  }
};

const forgotPasswordToken = async (data) => {
  const response = await axios.post(
    `${base_url}user/forgot-password-token`,
    data
  );
  if (response.data) {
    return response.data;
  }
};

const resetPasswordToken = async (data) => {
  const response = await axios.put(
    `${base_url}user/reset-password/${data.token}`,
    {password: data?.password}
  );
  if (response.data) {
    return response.data;
  }
};

const logout = async () => {
  const response = await axios.get(`${base_url}user/logout`, {
    withCredentials: true,
  });
  if (response.data) {
    return response.data;
  }
};

const addToCart = async (cartData) => {
  const response = await instance.post(`${base_url}user/cart`, cartData);
  if (response.data) {
    return response.data;
  }
};

const deleteCartItem = async (cartItemId) => {
  const response = await instance.delete(
    `${base_url}user/delete-product-cart/${cartItemId}`
  );
  if (response.data) {
    return response.data;
  }
};

const updateQuantityFromCart = async (cartDetail) => {
  const response = await instance.delete(
    `${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`
  );
  if (response.data) {
    return response.data;
  }
};

const getCart = async () => {
  try {
    const response = await instance.get(`${base_url}user/cart`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const getUserWishlist = async (userData) => {
  const response = await instance.get(`${base_url}user/wishlist`);
  if (response.data) {
    return response.data;
  }
};

const getUserCompare = async (userData) => {
  const response = await instance.get(`${base_url}user/compare`);
  if (response.data) {
    return response.data;
  }
};

const createOrder = async (orderDetail) => {
  const response = await instance.post(
    `${base_url}user/cart/create-order`,
    orderDetail
  );
  return response.data;
};

const getUserOrders = async () => {
  const response = await instance.get(`${base_url}user/getmyorders`);
  return response.data;
};

const updateUser = async (data) => {
  const response = await instance.put(`${base_url}user/edit-user`, data);
  return response.data;
};

export const authService = {
  register,
  login,
  logout,
  addToCart,
  deleteCartItem,
  updateQuantityFromCart,
  getCart,
  getUserWishlist,
  getUserCompare,
  createOrder,
  getUserOrders,
  updateUser,
  forgotPasswordToken,
  resetPasswordToken,
};
