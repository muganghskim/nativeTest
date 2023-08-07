import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
  baseURL: "http://localhost:8093",
  // 기본적으로 모든 요청에 토큰을 포함시킨다.
  headers: {
    "Content-Type": "application/json"
  }
});

// request interceptor
instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      const newAccessToken = await updateAccessToken(refreshToken);
      AsyncStorage.setItem("token", newAccessToken); // 새로 발급된 access token을 저장
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newAccessToken}`;
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default instance;
