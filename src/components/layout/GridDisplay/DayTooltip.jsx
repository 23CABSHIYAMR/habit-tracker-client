import React, { useState, useRef, useEffect } from "react";

export default function DayTooltip({ habitRenderList, children }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="position-relative h-100 w-100 d-flex flex-column justify-content-between"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {/* WRAPPED CONTENT */}
      {children}
      
      {/* TOOLTIP CONTENT */}
      {isVisible && (
        <div
          className="position-absolute z-3 rounded"
          style={{
            bottom: "calc(100% + 10px)",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            border: "1px solid var(--surface-border)",
            minWidth: "160px",
            padding: "12px",
            // Make sure tooltip won't trigger its own mouse leaves
            pointerEvents: "none",
          }}
        >
          {/* Render Completed Habits */}
          {habitRenderList
            .filter((i) => i.completed)
            .map((item) => (
              <div
                key={item.habit._id}
                className="d-flex align-items-center mb-2"
              >
                <div
                  style={{
                    width: "3px",
                    height: "14px",
                    backgroundColor: item.habit.palette,
                    borderRadius: "2px",
                    marginRight: "8px",
                  }}
                />
                <span
                  className="text-truncate"
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                  }}
                >
                  {item.habit.habitName}
                </span>
              </div>
            ))}

          {/* Render Divider if BOTH completed and incomplete exist */}
          {habitRenderList.some((i) => i.completed) &&
            habitRenderList.some((i) => !i.completed) && (
              <hr
                style={{
                  borderTop: "2px solid var(--progress-secondary)",
                  margin: "8px 0",
                  opacity: 1,
                }}
              />
            )}

          {/* Render Incomplete Habits */}
          {habitRenderList
            .filter((i) => !i.completed)
            .map((item) => (
              <div
                key={item.habit._id}
                className="d-flex align-items-center mb-2 last:mb-0"
              >
                <div
                  style={{
                    width: "3px",
                    height: "14px",
                    backgroundColor: "var(--text-inactive)",
                    borderRadius: "2px",
                    marginRight: "8px",
                  }}
                />
                <span
                  className="text-truncate"
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--text-inactive)",
                  }}
                >
                  {item.habit.habitName}
                </span>
              </div>
            ))}

          {/* Tooltip arrow/triangle */}
          <div
            className="position-absolute"
            style={{
              bottom: "-6px",
              left: "50%",
              transform: "translateX(-50%)",
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid white",
            }}
          />
        </div>
      )}
    </div>
  );
}
