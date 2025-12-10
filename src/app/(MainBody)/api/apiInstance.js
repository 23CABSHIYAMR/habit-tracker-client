"use client";
import axios from "axios";
import {
  toast
} from "react-toastify";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  //timeout: 10000,
  withCredentials:true,
});
api.defaults.withCredentials = true;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error("Network error. Please check your internet connection.");
      return Promise.reject(error);
    }

    const { status, data, config } = error.response;
    const errorMessage = data?.message || "Something went wrong";

    // Skip global errors if requested manually
    if (config?.skipGlobalError) {
      return Promise.reject(error);
    }

    switch (status) {
      case 400:
        toast.error(errorMessage);
        break;
      case 401:
        toast.error("Unauthorized! Redirecting to login...");
        if (typeof window !== "undefined") location.href = "/auth/login";
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