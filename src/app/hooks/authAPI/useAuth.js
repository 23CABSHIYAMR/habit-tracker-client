"use client";
import { loginService,SignUpService,logoutService } from "@/app/services/auth/authService";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: (formData) => {
      return loginService(formData);
    },
  });
};
export const useSignUp = () => {
  return useMutation({
    mutationFn: (formData) => {
      return SignUpService(formData);
    },
  });
};
export const useLogout = () => {
  return useMutation({
    mutationFn: () => {
      return logoutService();
    },
  });
};