"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SignUpService } from "@/app/services/auth/authService";
export const useSignUp = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: (formData) => {
            return SignUpService(formData);
        },
    });
};


