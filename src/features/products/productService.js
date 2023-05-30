import axios from "axios";
import { base_url, instance } from "../../utils/axiosconfig";

const getProducts = async (data) => {
  const queryParams = new URLSearchParams();

  if (data?.brand) {
    queryParams.append("brand", data.brand);
  }

  if (data?.tag) {
    queryParams.append("tags", data.tag);
  }

  if (data?.category) {
    queryParams.append("category", data.category);
  }

  if (data?.minPrice) {
    queryParams.append("price[gte]", data.minPrice);
  }

  if (data?.maxPrice) {
    queryParams.append("price[lte]", data.maxPrice);
  }

  if (data?.sort) {
    queryParams.append("sort", data.sort);
  }

  const url = `${base_url}product?${queryParams.toString()}`;
  const response = await axios.get(url);

  if (response.data) {
    return response.data;
  }
};

const addProdToWishlist = async (prodId) => {
  const response = await instance.put(`${base_url}product/wishlist`, {
    prodId,
  });
  if (response.data) {
    return response.data;
  }
};

const addProdToCompare = async (prodId) => {
  const response = await instance.put(`${base_url}product/compare`, { prodId });
  if (response.data) {
    return response.data;
  }
};

const getProduct = async (id) => {
  const response = await instance.get(`${base_url}product/${id}`);
  if (response.data) {
    return response.data;
  }
};

const getAllProductCategories = async () => {
  const response = await axios.get(`${base_url}category/`);
  return response.data;
};

const ratingProduct = async (data) => {
  const response = await instance.put(`${base_url}product/rating`, data);
  if (response.data) {
    return response.data;
  }
};

export const productService = {
  getProducts,
  getProduct,
  getAllProductCategories,
  addProdToWishlist,
  addProdToCompare,
  ratingProduct,
};
