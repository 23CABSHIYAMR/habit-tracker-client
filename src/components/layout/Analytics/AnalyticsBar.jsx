import { useEffect, useState } from "react";

export default function AnalyticsBar({ completionPercentage, palette, dateLabel }) {
  const percent = completionPercentage || 0;
  const targetWidth = percent === 0 ? 0 : Math.max(percent, 4);

  const [width, setWidth] = useState("0%");
  const [isHovered, setIsHovered] = useState(false);

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
        cursor: "pointer"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="h-100 d-flex align-items-center"
        style={{
          background: palette,
          width: width,
          borderRadius: "var(--rem-8)",
          transition: "width 700ms ease-in-out",
          paddingLeft: "12px",
          overflow: "hidden",
          whiteSpace: "nowrap"
        }}
      >
        <span 
          style={{ 
            color: "white", 
            fontSize: "12px", 
            fontWeight: 400, 
            opacity: isHovered && percent > 0 ? 1 : 0, 
            transition: "opacity 200ms ease",
            pointerEvents: "none"
          }}
        >
          {dateLabel}
        </span>
      </div>
    </div>
  );
}
