import React, { useEffect, useState } from "react";

export default function ProgressBar({ progressVal }) {
  const percent = progressVal || 0;
  const [width, setWidth] = useState("0%");

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(`${percent}%`);
    }, 30);
    return () => clearTimeout(timer);
  }, [percent]);

  return (
    <div
      style={{
        borderRadius: "var(--rem-16)",
        height: "var(--rem-10)",
        background: "var(--progress-secondary)",
      }}
      id="parent-bar"
      className="w-100 overflow-hidden"
    >
      <div
        id="child-bar"
        style={{
          width: width,
          borderRadius: "var(--rem-16)",
          height: "var(--rem-10)",
          background: "var(--progress-primary)",
          transition: "width 700ms ease-in-out"
        }}
      ></div>
    </div>
  );
}
