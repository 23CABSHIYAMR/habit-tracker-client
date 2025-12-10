import React from "react";

export default function ProgressBar({ progressVal}) {
  return (
    <div
      style={{
        borderRadius: "var(--rem-16)",
        height: "var(--rem-10)",
        background: "var(--progress-secondary)",
      }}
      id="parent-bar"
      className="w-100"
    >
      <div
        id="child-bar"
        style={{width: progressVal + "%",
        borderRadius: "var(--rem-16)",
        height: "var(--rem-10)",
        background: "var(--progress-primary)",
        transition:"width 250 ease-in"
        }}
      ></div>
    </div>
  );
}
