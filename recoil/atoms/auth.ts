import { atom } from "recoil";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../../axios/AxiosInstance";

interface User {
  username: string;
  userId: string;
  token?: string;
}

export const userState = atom<User>({
  key: "user",
  default: { username: "", userId: "" }
});

export const isLoggedInState = atom<boolean>({
  key: "isLoggedIn",
  default: false
});

export const updateLoginStatus = async () => {
  const token = await AsyncStorage.getItem("token");
  return token ? true : false;
};

export const updateAccessToken = async (refreshToken: string) => {
  const response: any = await axios.post(
    "http://localhost:8093/api/update-token",
    { refreshToken }
  );
  const newAccessToken = response.data.accessToken;
  await AsyncStorage.setItem("token", newAccessToken);
  return newAccessToken;
};

export const login = async (formData: { userId: string; password: string }) => {
  const response = await axios.post(
    "http://localhost:8093/api/login",
    formData
  );
  const { username, userId, token, refreshToken } = response.data;
  console.log("Login response userId:", userId); // 응답으로 받은 userId 확인
  await AsyncStorage.setItem("token", token); // 로컬 스토리지에 토큰 저장
  await AsyncStorage.setItem("userId", userId); // 로컬 스토리지에 userId 저장
  await AsyncStorage.setItem("refreshToken", refreshToken); // 로컬 스토리지에 리프레쉬 토큰 저장
  return { username, userId, token, refreshToken };
};

export const signup = async (formData: {
  username: string;
  userId: string;
  password: string;
}) => {
  const response = await axios.post(
    "http://localhost:8093/api/signup",
    formData
  );
  const { username, userId, token, refreshToken } = response.data;

  await AsyncStorage.setItem("token", token); // 로컬 스토리지에 토큰 저장
  await AsyncStorage.setItem("userId", userId); // 로컬 스토리지에 userId 저장
  await AsyncStorage.setItem("refreshToken", refreshToken); // 로컬 스토리지에 리프레쉬 토큰 저장
  return { username, userId, token, refreshToken };
};

export const logout = async () => {
  try {
    await axios.post("http://localhost:8093/api/logout");

    // 로컬 스토리지에서 토큰 제거
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("userId"); // 로컬 스토리지에서 userId 제거
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
