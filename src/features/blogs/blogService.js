import axios from "axios";
import { base_url } from "../../utils/axiosconfig";

const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}blogcategory/`);
  return response.data;
};

const getBlogs = async () => {
  const response = await axios.get(`${base_url}blog/`);

  return response.data;
};

const getBlog = async (id) => {
  const response = await axios.get(`${base_url}blog/${id}`);

  return response.data;
};

export const blogService = {
  getBlogCategories,
  getBlogs,
  getBlog,
};
