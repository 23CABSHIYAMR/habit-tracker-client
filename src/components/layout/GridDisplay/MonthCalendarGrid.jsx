import React, { useMemo } from "react";
import { useGetLogsInRange } from "@/app/hooks/habitLogAPI/logQuery";
import DayTooltip from "./DayTooltip";

import { useAppSelector } from "@/ReduxToolkit/hooks";

export default function MonthCalendarGrid({ habits = [], startDate, endDate }) {
  const user = useAppSelector((s) => s.auth.user);
  const userCreatedAt = useMemo(() => new Date(user?.createdAt || new Date()), [user]);

  const { data: logs = [] } = useGetLogsInRange(
    startDate.toISOString(),
    endDate.toISOString()
  );

  const logMap = useMemo(() => {
    const map = new Map();
    logs.forEach((l) => map.set(`${l.habitId}_${l.date.slice(0, 10)}`, true));
    return map;
  }, [logs]);

  // Generate calendar days matching Monday-first week
  const calendarDays = useMemo(() => {
    const dates = [];
    
    // Use local time for UI display so timezones don't offset the grid
    let startDay = startDate.getDay();
    let offset = startDay === 0 ? 6 : startDay - 1;

    // Pad beginning of grid
    for (let i = 0; i < offset; i++) {
        dates.push(null);
    }

    // Anchor to 12 PM local time, eliminating midnight leap issues
    let d = new Date(startDate);
    d.setHours(12, 0, 0, 0);

    let endD = new Date(endDate);
    endD.setHours(12, 0, 0, 0);
    
    while (d <= endD) {
        dates.push(new Date(d));
        d.setDate(d.getDate() + 1);
    }

    // Pad end of grid
    while (dates.length % 7 !== 0) {
      dates.push(null);
    }

    return dates;
  }, [startDate, endDate]);

  const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return (
    <div className="w-100 mt-2 d-flex flex-column h-100" style={{ flex: 1 }}>
      <div
        className="w-100 h-100"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gridTemplateRows: `40px repeat(${Math.ceil(calendarDays.length / 7)}, minmax(80px, 1fr))`,
          borderLeft: "1px solid var(--grid-stroke)",
          borderTop: "1px solid var(--grid-stroke)"
        }}
      >
        {/* HEADERS */}
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center py-2"
            style={{
              fontSize: "12px",
              fontWeight: 500,
              color: "var(--primary-500)",
              borderRight: "1px solid var(--grid-stroke)",
              borderBottom: "1px solid var(--grid-stroke)",
              textTransform: "uppercase"
            }}
          >
            {day}
          </div>
        ))}

        {/* DAYS */}
        {calendarDays.map((d, index) => {
          if (!d) {
            return (
              <div
                key={`empty-${index}`}
                style={{
                  borderRight: "1px solid var(--grid-stroke)",
                  borderBottom: "1px solid var(--grid-stroke)",
                  backgroundColor: "var(--bg-primary)"
                }}
              />
            );
          }

          const weekdayNum = d.getDay();
          // Find all habits active on this weekday
          const activeHabits = habits.filter(h => h.weekFrequency[weekdayNum]);
          
          let completedCount = 0;
          const habitRenderList = activeHabits.map(h => {
             // Retain UTC slice for querying the logMap so it matches exactly how the DB logged it via WeekGrid
             const key = `${h._id}_${d.toISOString().slice(0, 10)}`;
             const completed = logMap.has(key);
             if (completed) completedCount++;
             return { habit: h, completed };
          });

          let pctString = "";
          // Check if this date (d) is AFTER the user's account creation date.
          // Set to end of the day bounds just in case creation was mid-day.
          const isBeforeCreation = d < new Date(userCreatedAt.getFullYear(), userCreatedAt.getMonth(), userCreatedAt.getDate());

          if (activeHabits.length > 0 && !isBeforeCreation) {
            const pct = (completedCount / activeHabits.length) * 100;
            pctString = (pct % 1 === 0 ? pct.toFixed(0) : pct.toFixed(1)) + "%";
          }

          // Use local date for UI rendering so it doesn't wrap!
          const dayNumber = String(d.getDate()).padStart(2, '0');

          return (
            <div
              key={d.toISOString()}
              style={{
                borderRight: "1px solid var(--grid-stroke)",
                borderBottom: "1px solid var(--grid-stroke)",
                backgroundColor: "var(--bg-primary)",
                cursor: activeHabits.length > 0 ? "pointer" : "default",
                position: "relative"
              }}
            >
              {/* rendering conditionals */}
              {isBeforeCreation ? (
                 <div className="p-2 h-100 w-100 d-flex flex-column justify-content-between">
                    <div className="text-end" style={{ color: "var(--text-inactive)", fontSize: "14px", opacity: 0.3 }}>
                      {dayNumber}
                    </div>
                </div>
              ) : activeHabits.length === 0 ? (
                <DayTooltip 
                  habitRenderList={[{ habit: { _id: 'none', habitName: "No habits scheduled", palette: "var(--text-inactive)" }, completed: false }]}
                >
                  <div className="p-2 h-100 w-100 d-flex flex-column justify-content-between">
                    <div className="text-end" style={{ color: "var(--text-inactive)", fontSize: "14px" }}>
                      {dayNumber}
                    </div>
                    {/* Intentionally don't display percentage if there are no habits */}
                    <div className="text-start" style={{ color: "var(--text-primary)", fontSize: "15px", fontWeight: 500 }}>
                    </div>
                  </div>
                </DayTooltip>
              ) : (
                <DayTooltip habitRenderList={habitRenderList}>
                  <div className="p-2 h-100 w-100 d-flex flex-column justify-content-between">
                    <div className="text-end" style={{ color: "var(--text-inactive)", fontSize: "14px" }}>
                      {dayNumber}
                    </div>
                    <div className="text-start" style={{ color: "var(--text-primary)", fontSize: "15px", fontWeight: 500 }}>
                      {pctString}
                    </div>
                  </div>
                </DayTooltip>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
