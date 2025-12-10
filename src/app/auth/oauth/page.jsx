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

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await api.get("/auth/me", { withCredentials: true });

        if (!mounted) return;

        dispatch(setUser(res.data));
        router.replace("/week");
      } catch {
        toast.error("Authentication failed, please log in again.");
        router.replace("/auth/login");
      }
    })();

    return () => {
      mounted = false;
    };
  }, [router, dispatch]);

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
