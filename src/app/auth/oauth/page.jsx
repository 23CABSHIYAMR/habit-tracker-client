"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/ReduxToolkit/hooks";
import { setUser } from "@/ReduxToolkit/Reducers/Auth/authSlice";
import api from "@/app/(MainBody)/api/apiInstance";

export default function OAuth() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data, error, isLoading } = useAuthMe({
    onSuccess: (user) => {
      dispatch(setUser(user));
      router.replace("/week");
    },
    onError: () => {
      router.replace("/auth/login");
    },
  });

  return (
    <div className="center-items-col gap-4">
      <h1 className="auth-title">
        <Image
          src="/assets/images/toggleable/checked.svg"
          width={30}
          height={30}
          alt="status"
        />
        Welcome
      </h1>
      <h4 className="auth-sub-title">Authentication successful! Redirecting...</h4>
    </div>
  );
}
