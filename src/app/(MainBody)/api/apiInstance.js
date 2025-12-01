"use client";
import axios from "axios";
import {
  toast
} from "react-toastify";

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Use environment variable
  timeout: 10000, // 10s timeout
});

// Request Interceptor (For adding auth token)
api.interceptors.request.use(
  async (config) => {
      const response = await axios.get("/api/get-token"); // Full response
      const token = response.data?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor (For handling errors globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response && navigator.onLine) {
      toast.error("Network error. Please check your internet connection.");
      return Promise.reject(error);
    }

    const {
      status,
      data
    } = error.response;
    const errorMessage = data?.message || "Something went wrong. Please try again.";
    const config = error.config;
    const requestUrl = config?.url || "";

    if (requestUrl.includes("/user/profile/image") || requestUrl.includes("/public/login")) {
      return Promise.reject({
        message: errorMessage,
        status: status,
        isHandled: true,
      });
    }


    switch (status) {
      case 400:
        toast.error(`${errorMessage}`);
        break;
      case 401:
        toast.error("Unauthorized! Redirecting to login...");
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
        break;
      case 403:
        toast.error("Forbidden: You don’t have permission to access this resource.");
        break;
      case 404:
        toast.error("Not Found: The requested resource could not be found.");
        break;
      default:
        toast.error(errorMessage);
    }

    return Promise.reject({
      message: errorMessage,
      status: status,
    });
  }
);

export default api;