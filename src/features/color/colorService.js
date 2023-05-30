import axios from "axios";
import { base_url } from "../../utils/axiosconfig";

const getColors = async () => {
  const response = await axios.get(`${base_url}color/`);

  return response.data;
};

export const colorService = {
  getColors,
};
