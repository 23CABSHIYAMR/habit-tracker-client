"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthMe } from "@/app/hooks/authAPI/useAuth";
import { useAppDispatch } from "@/ReduxToolkit/hooks";
import { setUser } from "@/ReduxToolkit/Reducers/Auth/authSlice";
import { useEffect } from "react";
export default function OAuth() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data, error, isLoading } = useAuthMe();

  // 🔥 Redirect logic must be inside useEffect
  useEffect(() => {
    if (isLoading) return;

    if (data) {
      dispatch(setUser(data));
      router.replace("/week");
    } else if (error) {
      router.replace("/auth/login");
    }
  }, [data, error, isLoading, dispatch, router]);

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
