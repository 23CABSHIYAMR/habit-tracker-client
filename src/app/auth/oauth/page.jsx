"use client";

import { setToken } from "@/app/services/auth/authService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const OAuth = () => {
  const router = useRouter();
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [count, setCount] = useState(2);
  const [token, setTokenValue] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get("token");
    const errorParam = urlParams.get("error");

    if (tokenParam) setTokenValue(tokenParam);
    if (errorParam) setError(errorParam);
  }, []);

  useEffect(() => {
    if (token) {
      (async () => {
        await setToken(token);
        setShowCheckmark(true);
      })();
    } else if (error) {
      toast.error("Authentication failed. Please try again.");
      router.push("/auth/login");
    }
  }, [token, error, router]);

  useEffect(() => {
    if (!token) return;
    if (count <= 0) {
      window.location.href = "/week";
      return;
    }
    const timer = setTimeout(() => setCount((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, token, router]);

  if (!token) return null;

  return (
    <div className="center-items-col gap-4">
      <>
      <h1 className="auth-title">
        <Image
          src={
            showCheckmark
              ? "/assets/images/toggleable/checked.svg"
              : "/assets/images/toggleable/unchecked.svg"
            }
          width={28}
          height={28}
          alt="status"
          />
        Welcome
      </h1>
      <h4 className="auth-sub-title">Authentication successful!</h4>
      </>
      <a
        className="space-between"
        href="/auth/login"
        style={{ textDecoration: "none", color: "var(--text-primary)" }}
      >
        <p className="m-0">Redirecting to Dashboard in {count}s...</p>
        <Image
          src="/assets/images/arrowsAndChevrons/arrow-right.svg"
          alt="arrow-right"
          width={20}
          height={20}
        />
      </a>
    </div>
  );
};

export default OAuth;
