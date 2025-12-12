import React from "react";
import AnalyticsBar from "@/components/layout/Analytics/AnalyticsBar";
import { FaCircle } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";
export default function AnalyticsChart({ analytics, habits }) {
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
              className="row w-100 m-0 d-flex align-items-center"
            >
              <div
                className="col-1 p-0"
                style={{
                  color: habit.palette,
                }}
              >
                {habit?.isPositiveHabit ? (
                  <FaCircle size={18} />
                ) : (
                  <RiCloseFill size={25} />
                )}
              </div>
              <span className="col-2">{habit?.habitName}</span>
              <div className="col-8">
                <AnalyticsBar
                  completionPercentage={a.completionPercentage}
                  palette={habit?.palette}
                />
              </div>

              <div className="col-1 text-end p-0">
                {a.completedHabitsInRange}/{a.habitFreqInRange}
              </div>
            </div>
          );
        })}
    </div>
  );
}
