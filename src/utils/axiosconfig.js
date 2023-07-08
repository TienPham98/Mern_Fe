import axios from "axios";
import Cookies from "js-cookie";

export const base_url = "https://hoaleauth.onrender.com/api/";

const getTokenFromsessionStorage = sessionStorage.getItem("customer")
  ? JSON.parse(sessionStorage.getItem("customer"))
  : null;

const instance = axios.create({
  baseURL: "https://hoaleauth.onrender.com/api/",
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  } else {
    const sessionStorageToken = getTokenFromsessionStorage?.token;
    if (sessionStorageToken) {
      config.headers["Authorization"] = `Bearer ${sessionStorageToken}`;
    }
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
      const refreshToken = getTokenFromsessionStorage?.refreshToken;
      const response = await axios.post("/user/refresh_token", {
        refreshToken: refreshToken,
      });
      if (response.status === 200) {
        sessionStorage.setItem("token", response.data.accessToken);
        instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
        return instance(originalRequest);
      }
    }
    if (error.response.status === 500) {
    }
    return Promise.reject(error);
  }
);

export {instance};
