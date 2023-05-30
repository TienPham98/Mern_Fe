import axios from "axios";
import Cookies from "js-cookie";

export const base_url = "http://localhost:5000/api/";

const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const instance = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage?.token}`,
    Accept: "application/json",
  },
});

axios.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.response.data.message === "jwt expired"
    ) {
      originalRequest._retry = true;
      const refreshToken = getTokenFromLocalStorage?.refreshToken;
      const response = await axios.post("/refresh_token", {
        refreshToken: refreshToken,
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.accessToken);
        instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
        return instance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export { instance };
