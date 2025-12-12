"use client";
import axios from "axios";
import {
  toast
} from "react-toastify";

 const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const res = await fetch("/api/get-token");
    const { token } = await res.json();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (error) => {

    if (!error.response) {
      toast.error("Network error");
      return Promise.reject(error);
    }

    const { status, data } = error.response;
    const msg = data?.message ?? "Something went wrong";

    switch (status) {
      case 400:
        toast.error(msg);
        break;
      case 401:
        toast.error("Session expired");
        window.location.href = "/auth/login";
        break;
      case 403:
        toast.error("Forbidden");
        break;
      case 404:
        toast.error("Not found");
        break;
      default:
        toast.error(msg);
    }

    return Promise.reject(error);
  }
);
export default api;