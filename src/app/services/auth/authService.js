import api from "@/app/(MainBody)/api/apiInstance";
import axios from "axios";
export const SignUpService = async (formData) => {
  const res = await api.post("/auth/sign-up", formData);
  return res;
};
export const loginService = async (formData) => {
  const response = await api.post("/auth/login", formData);
  return response;
};
export const logoutService = async () => {
  const response = await api.delete("/auth/logout");
  return response;
};
export const fetchMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
export const setToken = async (token) => {
  return axios.post("/api/set-token", {
    token,
  });
};

export const getToken = async () => {
  const response = await axios.get("/api/get-token");
  return response;
};

export const deleteToken = async () => {
  const response = await axios.delete("/api/delete-token");
  return response;
};
