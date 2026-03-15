import React from "react";
import AnalyticsBar from "@/components/layout/Analytics/AnalyticsBar";
import { FaCircle } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";
export default function AnalyticsChart({ analytics, habits, dateLabel }) {
  return (
    <div className="d-grid gap-4">
      {analytics &&
        habits &&
        analytics?.analyticSpecifics?.length > 0 &&
        analytics.analyticSpecifics.map((a) => {
          const habit = habits?.find((h) => h._id === a.habitId);
          const doesntExist = !a.completedHabitsInRange && !a.habitFreqInRange;
          return doesntExist ? (
            <React.Fragment key={a.habitId}></React.Fragment>
          ) : (
            <div
              key={a.habitId}
              style={{
                display: "grid",
                gridTemplateColumns: "36px minmax(130px, 1.2fr) minmax(200px, 7fr) 50px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: habit.palette,
                  display: "flex",
                  alignItems: "center"
                }}
              >
                {habit?.isPositiveHabit ? (
                  <FaCircle size={10} />
                ) : (
                  <RiCloseFill size={18} />
                )}
              </div>
              
              <div 
                className="text-truncate"
                style={{ color: "var(--text-primary)", fontWeight: 400, fontSize: "15px" }}
              >
                {habit?.habitName}
              </div>
              
              <div className="w-100" style={{ paddingRight: "16px" }}>
                <AnalyticsBar
                  completionPercentage={a.completionPercentage}
                  palette={habit?.palette}
                  dateLabel={dateLabel}
                />
              </div>

              <div className="text-end" style={{ color: "var(--text-inactive)", fontSize: "12px", fontWeight: 500 }}>
                {a.completedHabitsInRange} / {a.habitFreqInRange}
              </div>
            </div>
          );
        })}
    </div>
  );
}
