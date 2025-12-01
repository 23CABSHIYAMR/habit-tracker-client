"use client";
import Image from "next/image";
import { Button } from "reactstrap";
import { useRouter } from "next/navigation";
import { oAuthUrl } from "@/constants";
export default function Footer({ isLogin = false }) {
  const router = useRouter();

  const handleOAuth = () => router.push(oAuthUrl);
  return (
    <>
      <div className="text-center">
        {!isLogin ? "Already have an account? " : "Dont have a account?"}
        <a
          href={`/auth/${isLogin ? "sign-up" : "login"}`}
          className="login text-decoration-underline"
        >
          {!isLogin ? "Log in" : "Create account"}
        </a>
      </div>

      <div className="divider center-items w-100 gap-1">or</div>
      <Button
        type="button"
        onClick={handleOAuth}
        className="d-flex justify-content-center align-items-center gap-2 border w-100"
        style={{
          height: "44px",
          padding: "10px 16px",
          borderRadius: "30px",
          borderWidth: "1px",
          backgroundColor: "#FFFFFF",
          opacity: 1,
          color: "var(--text-primary)",
        }}
      >
        <Image
          src={"/assets/images/google.svg"}
          alt="google"
          width={24}
          height={24}
        />
        Google
      </Button>
    </>
  );
}
