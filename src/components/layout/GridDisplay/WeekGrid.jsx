import React, { useMemo } from "react";
import { FaCircle } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";
import {
  useCompleteHabit,
  useUncompleteHabit,
  useGetLogsInRange,
} from "@/app/hooks/habitLogAPI/logQuery";
import {isAfterUTC, isSameWeekUTC } from "@/utils/helpers/dateUtils";
import confetti from "canvas-confetti";
export default function WeekGrid({ habits = [], startDate, endDate }) {
  const { data: logs = [] } = useGetLogsInRange(
    startDate.toISOString(),
    endDate.toISOString(),
  );

  const { mutate: completeHabit } = useCompleteHabit();
  const { mutate: uncompleteHabit } = useUncompleteHabit();

  const days = useMemo(() => {
    const res = [];
    const d = new Date(startDate);
    for (let i = 0; i < 7; i++) {
      res.push(new Date(d));
      d.setUTCDate(d.getUTCDate() + 1);
    }
    return res;
  }, [startDate]);

  const logMap = useMemo(() => {
    const map = new Map();
    logs.forEach((l) => map.set(`${l.habitId}_${l.date.slice(0, 10)}`, true));
    return map;
  }, [logs]);

  const today = new Date(new Date().toISOString().slice(0, 10));

  return (
    <div className="d-grid gap-4">
      {/* HEADER */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "36px minmax(130px, 1.2fr) repeat(7, 1fr) 50px",
          fontSize: "12px",
          fontWeight: 400,
          color: "var(--text-secondary)",
        }}
      >
        <div />
        <div />
        {days.map((d) => (
          <div key={d.toISOString()} className="text-center">
            {d.toLocaleDateString("en-US", { weekday: "short" })}
          </div>
        ))}
        <div className="text-end" />
      </div>

      {/* ROWS */}
      {habits.map((h) => {
        let completedCount = 0;
        let expectedCount = 0;

        return (
          <div
            key={h._id}
            style={{
              display: "grid",
              gridTemplateColumns: "36px minmax(130px, 1.2fr) repeat(7, 1fr) 50px",
              alignItems: "center",
            }}
          >
            {/* ICON */}
            <div style={{ color: h.palette, display: "flex", alignItems: "center" }}>
              {h.isPositiveHabit ? (
                <FaCircle size={10} />
              ) : (
                <RiCloseFill size={18} />
              )}
            </div>

            {/* NAME */}
            <div 
              className="text-truncate"
              style={{ color: "var(--text-primary)", fontWeight: 400, fontSize: "15px" }}
            >
              {h.habitName}
            </div>

            {/* DAYS */}
            {days.map((d) => {
              const weekday = d.getUTCDay();
              const active = h.weekFrequency[weekday];
              const key = `${h._id}_${d.toISOString().slice(0, 10)}`;
              const completed = logMap.has(key);

              if (active) expectedCount++;
              if (completed) completedCount++;

              const editable =
                active && isSameWeekUTC(d, today) && !isAfterUTC(d, today) ;

              return (
                <div
                  key={key}
                  onClick={(e) => {
                    if (!editable) return;
                    if (completed) {
                      uncompleteHabit({
                          habitId: h._id,
                          date: d.toISOString(),
                      });
                    } else {
                      completeHabit({
                          habitId: h._id,
                          date: d.toISOString(),
                      });
                      
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = (rect.left + rect.width / 2) / window.innerWidth;
                      const y = (rect.top + rect.height / 2) / window.innerHeight;
                      
                      confetti({
                        particleCount: 40,
                        spread: 50,
                        origin: { x, y },
                        colors: [h.palette],
                        disableForReducedMotion: true,
                        zIndex: 9999
                      });
                    }
                  }}
                  style={{
                    height: 28,
                    width: 28,
                    margin: "0 auto",
                    borderRadius: 8,
                    backgroundColor: completed
                      ? h.palette
                      : "var(--surface-secondary)",
                    opacity: active ? 1 : 0,
                    cursor: editable ? "pointer" : "default",
                  }}
                />
              );
            })}

            {/* SUMMARY */}
            <div className="text-end" style={{ color: "var(--text-inactive)", fontSize: "12px", fontWeight: 500 }}>
              {completedCount} / {expectedCount}
            </div>
          </div>
        );
      })}
    </div>
  );
}
