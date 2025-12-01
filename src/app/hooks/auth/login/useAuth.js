"use client";
import {
    loginService,
} from "@/app/services/auth/authService";
import {
    useMutation
} from "@tanstack/react-query";
import {
    useRouter
} from "next/navigation";


export const useLogin = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: (formData) => {
            return loginService(formData);
        },
    });
};