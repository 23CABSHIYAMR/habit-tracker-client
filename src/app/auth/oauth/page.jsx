"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/ReduxToolkit/hooks";
import { useEffect } from "react";

export default function OAuth() {
  const router = useRouter();
  const params = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const run = async () => {
      const code = params.get("code");
      if (!code) return router.replace("/auth/login");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/exchange-code`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        }
      );

      if (!res.ok) return router.replace("/auth/login");

      const { token } = await res.json();

      await fetch("/api/set-token", {
        method: "POST",
        body: JSON.stringify({ token }),
      });
      
      router.replace("/auth/success");
    };

    run();
  }, [params, router, dispatch]);

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
      <h4 className="auth-sub-title">
        Authentication successful! Redirecting...
      </h4>
    </div>
  );
}
