"use client";

import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/hooks";
import { useState, useEffect } from "react";
import api from "@/app/(MainBody)/api/apiInstance";
import { setUser } from "@/ReduxToolkit/Reducers/Auth/authSlice";

export default function SessionHydrator({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector((state) => state.auth.user);
  const [hydrated, setHydrated] = useState(false);

  if (pathname.startsWith("/auth")) {
    return children;
  }

  useEffect(() => {
    // If user already in Redux, hydration complete
    if (userDetails) {
      setHydrated(true);
      return;
    }

    // Otherwise try to fetch /auth/me
    (async () => {
      try {
        const res = await api.get("/auth/me");
        dispatch(setUser(res.data));
        setHydrated(true);
      } catch {
        router.replace("/auth/login");
      }
    })();
  }, [userDetails, router, dispatch]);

  if (!hydrated) return null;

  return children;
}
