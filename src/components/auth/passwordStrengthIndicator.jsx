"use client";
import { useEffect, useState } from "react";
import zxcvbn from "zxcvbn";

const strengthLabels = ["Weak", "Fair", "Good", "Strong"];
const strengthColors = [
  "var(--fg-fg-error-secondary)",
  "var(--fg-fg-warning-secondary)",
  "var(--fg-fg-success-secondary)",
  "var(--fg-fg-success-primary)",
];

export default function PasswordStrengthIndicator({
  value = "",
  onScoreChange,
}) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!value) {
      setScore(0);
      onScoreChange?.(0, strengthLabels[0]);
      return;
    }

    const result = zxcvbn(value); // strong algorithm
    setScore(result.score);
    onScoreChange?.(result.score, strengthLabels[result.score]);
  }, [value]);

  return (
    <div className="w-100 d-flex justify-content-end">
      {value && (
        <div className="d-flex align-items-center gap-2">
          <span
            className="strength-label"
            style={{ color: strengthColors[score] }}
          >
            {strengthLabels[score]}
          </span>
          <div className="bars">
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className="bar"
                style={{
                  background: i <= score ? strengthColors[score] : "#E4E7EC",
                }}
              ></span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
