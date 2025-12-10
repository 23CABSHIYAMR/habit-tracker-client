"use client";

import { useLogin } from "@/app/hooks/authAPI/useAuth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button, Form } from "reactstrap";
import Footer from "@/components/auth/Footer";
import InputField from "@/components/ui/CustomInput";
import { MailIcon, LockIcon } from "@/components/ui/SvgIcons";
import { useAppDispatch } from "@/ReduxToolkit/hooks";
import { setUser } from "@/ReduxToolkit/Reducers/Auth/authSlice";
const Login = () => {
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    trustedDevice: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let tempErrors = {};

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Enter a valid email";
    }

    if (!formData.password.trim()) {
      tempErrors.password = "Password is required";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleTrustedDevice = () => {
    setFormData((prev) => ({
      ...prev,
      trustedDevice: !prev.trustedDevice,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const valid = validateForm();
    if (!valid) return;

    login(formData, {
      onSuccess: async (response) => {
        dispatch(setUser(response?.data?.user))
        router.push("/week");
      },
      onError: (error) => {
        setErrors((prev) => ({
          ...prev,
          password: error?.message || "Invalid credentials",
        }));

        if (error?.status === 401) {
          router.push("/auth/login");
        }
      },
    });
  };

  return (
    <>
      <div className="d-flex flex-column gap-1">
        <h1 className="auth-title">Back To Track</h1>
        <h4 className="auth-sub-title">
          Welcome back! Please enter your details.
        </h4>
      </div>

      <div className="w-100 center-items-col gap-2">
        <Form
          onSubmit={handleLogin}
          noValidate
          className="center-items-col gap-2"
        >
          {/* EMAIL */}
          <InputField
            name="email"
            type="email"
            placeholder="Email address*"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            autoComplete="email"
            leftIcon={<MailIcon />}
          />

          {/* PASSWORD */}
          <InputField
            name="password"
            type="password"
            placeholder="Password*"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            showPasswordToggle={true}
            autoComplete="new-password"
            leftIcon={<LockIcon />}
          />

          {/* TRUSTED DEVICE */}
          <div className="d-flex justify-content-between gap-2 w-100">
            <input
              id="trustedDevices"
              type="checkbox"
              onChange={handleTrustedDevice}
              checked={formData.trustedDevice}
            />
            <label htmlFor="trustedDevices">Set as trusted device</label>
            <a>Forgot Password</a>
          </div>

          {/* SUBMIT */}
          <Button
            type="submit"
            disabled={isPending}
            className="d-flex align-items-center justify-content-center gap-2 w-100"
          >
            {isPending ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Logging you in...
              </>
            ) : (
              "Log In"
            )}
          </Button>
        </Form>

        <Footer isLogin={true} />
      </div>
    </>
  );
};

export default Login;
