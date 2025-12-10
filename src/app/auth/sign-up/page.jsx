"use client";

import { useSignUp } from "@/app/hooks/authAPI/useAuth";
import Footer from "@/components/auth/Footer";
import InputField from "@/components/ui/CustomInput";
import { MailIcon, LockIcon, UserIcon } from "@/components/ui/SvgIcons";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Form, Button } from "reactstrap";
import PasswordStrengthIndicator from "@/components/auth/passwordStrengthIndicator";
import { useAppDispatch } from "@/ReduxToolkit/hooks";
import { setUser } from "@/ReduxToolkit/Reducers/Auth/authSlice";
const SignUp = () => {
  const router = useRouter();
  const { mutate: signUp, isPending } = useSignUp();
  const dispatch=useAppDispatch();
  // ---------------- FORM DATA ----------------
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    acceptTermsAndPolicy: false,
  });

  // ---------------- ERRORS (SHOW ONLY ON SUBMIT) ----------------
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // ---------------- HANDLE CHANGE ----------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update value
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear only this field’s error (DO NOT validate here)
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ---------------- VALIDATION ON SUBMIT ONLY ----------------
  const validateForm = () => {
    let tempErrors = {};

    if (!formData.fullName.trim()) {
      tempErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().split(" ").length < 2) {
      tempErrors.fullName = "Enter first and last name";
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      tempErrors.password = "Must be at least 8 characters";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  // ---------------- SUBMIT FORM ----------------
  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = validateForm();
    console.log(formData, errors, valid);
    if (!valid) return;

    const body = {
      userName: formData.fullName.trim(),
      email: formData.email.trim(),
      password: formData.password,
      agreedToTerms: formData.acceptTermsAndPolicy,
      oauthSignup: false,
    };

    signUp(body, {
      onSuccess: async (res) => {
        if (res?.status === 201) {
          dispatch(setUser(res.data?.user))
          router.push("/week");
        }
      },
      onError: (error) => {
        toast.error(error?.message || "Something went wrong.");
      },
    });
  };

  // ---------------- UI ----------------
  return (
    <>
      <div className="d-flex flex-column gap-1">
        <h1 className="auth-title">Create Your Account</h1>
        <h4 className="auth-sub-title">
          Start tracking and improving your habits today.
        </h4>
      </div>

      <div className="w-100 center-items-col gap-2">
        <Form
          onSubmit={handleSubmit}
          className="center-items-col gap-2"
          noValidate
        >
          <InputField
            name="fullName"
            placeholder="Full Name (First & Last Name)"
            value={formData.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
            leftIcon={<UserIcon />}
          />

          <InputField
            name="email"
            type="email"
            placeholder="Email address*"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            leftIcon={<MailIcon />}
          />

          <InputField
            name="password"
            type="password"
            placeholder="Password*"
            value={formData.password}
            onChange={handleInputChange}
            showPasswordToggle={true}
            error={errors.password}
            leftIcon={<LockIcon />}
          />
          <PasswordStrengthIndicator value={formData.password} />
          <label className="w-100 d-flex gap-2">
            <input
              type="checkbox"
              checked={formData.acceptTermsAndPolicy}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  acceptTermsAndPolicy: e.target.checked,
                }))
              }
              style={{ width: "16px", height: "16px", marginTop: "5px" }} // hide default checkbox
              required
            />
            <span className="terms-privacy p-0">
              I agree to the <a href="#">Terms & Conditions</a> and{" "}
              <a href="#">Privacy Policy.</a>
            </span>
          </label>

          <Button
            type="submit"
            disabled={isPending}
            className="center-items gap-2 w-100"
          >
            {isPending ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>

          <Footer />
        </Form>
      </div>
    </>
  );
};

export default SignUp;
