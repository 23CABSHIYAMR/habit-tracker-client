"use client";

import React, { useState } from "react";
import Image from "next/image";

const InputField = ({
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  leftIcon,
  rightIcon,
  showPasswordToggle = false,
  className = "",
  inputClassName = "",
  disabled = false,
  readOnly = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password" && showPasswordToggle;

  return (
    <div className={`w-100 mb-2 ${className}`}>
      {/* Input + Icons container */}
      <div className="position-relative">
        {/* Left Icon */}
        {leftIcon && (
          <span className="position-absolute top-50 start-0 translate-middle-y ms-2">
            {leftIcon}
          </span>
        )}

        {/* Input Field */}
        <input
          id={id || name}
          name={name}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          readOnly={readOnly}
          disabled={disabled}
          className={`${error ? "error-input-field" : ""} form-control ${
            leftIcon ? "ps-5" : ""
          } ${rightIcon || isPassword ? "pe-5" : ""} ${inputClassName}`}
        />

        {/* Password Eye Toggle */}
        {isPassword && value && (
          <span
            className="position-absolute top-50 end-0 translate-middle-y me-3 icon-container-size"
            style={{ cursor: "pointer" }}
            onClick={() => setShowPassword(!showPassword)}
          >
            <Image
              src={`/assets/images/toggleable/${
                showPassword ? "eye-on" : "eye-off"
              }.svg`}
              alt="toggle-password"
              width={20}
              height={20}
            />
          </span>
        )}

        {/* Right Icon */}
        {!isPassword && rightIcon && (
          <span className="position-absolute top-50 end-0 translate-middle-y me-3">
            {rightIcon}
          </span>
        )}
      </div>

      {/* Error Text — OUTSIDE the input wrapper */}
      <div className={`error-text ${error ? "active" : ""}`}>{error}</div>
    </div>
  );
};

export default InputField;
