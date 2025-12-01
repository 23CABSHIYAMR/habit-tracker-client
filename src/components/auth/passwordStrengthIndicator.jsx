"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import PasswordStrengthBar from "react-password-strength-bar";

const PasswordStrengthIndicator = ({ value = "", onScoreChange }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [strength, setStrength] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    checkStrength(value);
  }, [value]);

  const checkStrength = (val) => {
    if (!val || val.trim() === "") {
      setStrength("");
      setMessage("Password is required");
      onScoreChange?.("poor", "Password is required");
      return;
    }

    if (val.length < 8) {
      setStrength("poor");
      setMessage("Too short. Min 8 characters.");
      onScoreChange?.("poor", "Too short. Min 8 characters.");
      return;
    }

    if (val.length === 8 || !/[0-9]/.test(val)) {
      setStrength("weak");
      setMessage("Weak. Use any one digit.");
      onScoreChange?.("weak", "Weak. Use any one digit.");
      return;
    }

    let score = 0;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(val)) score++;
    if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;

    const strengthLevels = {
      0: { level: "good", message: "Good. Add symbols & cases." },
      1: { level: "strong", message: "Strong. Nice work!" },
      2: { level: "strong", message: "Strong. Nice work!" },
    };

    const result = strengthLevels[score];
    setStrength(result.level);
    setMessage(result.message);
    onScoreChange?.(result.level, result.message);
  };

  const getColor = (level) => {
    switch (level) {
      case "poor":
        return "var(--fg-fg-error-secondary)";
      case "weak":
        return "var(--fg-fg-warning-secondary)";
      case "good":
        return "var(--fg-fg-success-secondary)";
      case "strong":
        return "var(--fg-fg-success-primary)";
      default:
        return "var(--fg-fg-error-secondary)";
    }
  };

  useEffect(() => {
    // Function to update isMobile based on window width
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <>
      <div
        className="center-items "
        style={{ marginTop: "10px", marginBottom: "20px" }}
      >
        <span className="password-error-text" style={{ color: "#667085" }}>
          {message}
        </span>
        <span
          className="password-error-text"
          style={{ color: getColor(strength) }}
        >
          {strength && strength.charAt(0).toUpperCase() + strength.slice(1)}
        </span>
      </div>
      {strength && (
        <div
          className="d-flex gap-1"
          style={{ marginTop: "-10px", marginBottom: "20px" }}
        >
          <progress
            className={`bar ${strength}`}
            value={strength ? 100 : 0}
            max="100"
          />
          <progress
            className={`bar ${
              strength === "weak" ||
              strength === "good" ||
              strength === "strong"
                ? strength
                : ""
            }`}
            value={
              strength === "weak" ||
              strength === "good" ||
              strength === "strong"
                ? 100
                : 0
            }
            max="100"
          />
          <progress
            className={`bar ${
              strength === "good" || strength === "strong" ? strength : ""
            }`}
            value={strength === "good" || strength === "strong" ? 100 : 0}
            max="100"
          />
          <progress
            className={`bar ${strength === "strong" ? strength : ""}`}
            value={strength === "strong" ? 100 : 0}
            max="100"
          />
        </div>
      )}
    </>
  ) : (
    <>
      {(value.trim() !== "" || message !== "Password is required") && (
        <div
          className="center-items w-100 "
          style={{ marginTop: "-10px",  }}
        >
          {
            <span
              className="password-error-text"
              style={{ color: getColor(strength) }}
            >
              {message}
            </span>
          }
          {strength && (
            <Image
              src={`/assets/images/${strength}.svg`}
              width={96}
              height={4}
              alt={strength}
            />
          )}
        </div>
      )}
    </>
  );
};

export default PasswordStrengthIndicator;
