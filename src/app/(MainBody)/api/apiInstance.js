"use client";
import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "/server",   // REQUIRED for proxy
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error("Network error. Check your internet connection.");
      return Promise.reject(error);
    }

    const { status, data, config } = error.response;
    const errorMessage = data?.message || "Something went wrong";

    if (config?.skipGlobalError) return Promise.reject(error);

    switch (status) {
      case 400:
        toast.error(errorMessage);
        break;

      case 401:
        toast.error("Session expired. Redirecting...");
        window.location.href = "/auth/login";
        break;

      case 403:
        toast.error("Forbidden");
        break;

      case 404:
        toast.error("Not found");
        break;

      default:
        toast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);

export default api;
