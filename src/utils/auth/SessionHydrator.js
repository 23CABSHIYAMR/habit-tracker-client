"use client";

import api from "@/app/(MainBody)/api/apiInstance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/hooks";
import { setUser } from "@/ReduxToolkit/Reducers/Auth/authSlice";

export default function SessionHydrator({ children }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector((state) => state.auth.user);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // If Redux already has user → skip /auth/me call
    if (userDetails) {
      setHydrated(true);
      return;
    }

    (async () => {
      try {
        const res = await api.get("/auth/me", { withCredentials: true });
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
