import { useEffect, useState } from "react";

export default function AnalyticsBar({ completionPercentage, palette }) {
  const percent = completionPercentage || 0;
  const targetWidth = percent === 0 ? 0 : Math.max(percent, 4);

  const [width, setWidth] = useState("0%");

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(`${targetWidth}%`);
    }, 30);
    return () => clearTimeout(timer);
  }, [targetWidth]);

  return (
    <div
      className="w-100 p-0 overflow-hidden"
      style={{
        height: "2rem",
        background: "var(--gray-100)",
        borderRadius: "var(--rem-8)",
      }}
    >
      <div
        className="h-100"
        style={{
          background: palette,
          width: width,
          borderRadius: "var(--rem-8)",
          transition: "width 700ms ease-in-out",
        }}
      ></div>
    </div>
  );
}
