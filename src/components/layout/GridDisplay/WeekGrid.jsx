import React, { useMemo } from "react";
import { FaCircle } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";
import {
  useCompleteHabit,
  useUncompleteHabit,
  useGetLogsInRange,
} from "@/app/hooks/habitLogAPI/logQuery";
import {isAfterUTC, isSameWeekUTC } from "@/utils/helpers/dateUtils";
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
    <div className="d-grid gap-2">
      {/* HEADER */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "32px 160px repeat(7, 1fr) 70px",
          fontSize: 12,
          fontWeight: 600,
          opacity: 0.7,
        }}
      >
        <div />
        <div />
        {days.map((d) => (
          <div key={d.toISOString()} className="text-center">
            {d.toLocaleDateString("en-US", { weekday: "short" })}
          </div>
        ))}
        <div className="text-end">Done</div>
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
              gridTemplateColumns: "32px 160px repeat(7, 1fr) 70px",
              alignItems: "center",
            }}
          >
            {/* ICON */}
            <div style={{ color: h.palette }}>
              {h.isPositiveHabit ? (
                <FaCircle size={16} />
              ) : (
                <RiCloseFill size={22} />
              )}
            </div>

            {/* NAME */}
            <div className="text-truncate">{h.habitName}</div>

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
                  onClick={() => {
                    console.log("Clicked",active,isSameWeekUTC(d, today),!isAfterUTC(d, today))
                    if (!editable) return;
                    completed
                      ? uncompleteHabit({
                          habitId: h._id,
                          date: d.toISOString(),
                        })
                      : completeHabit({
                          habitId: h._id,
                          date: d.toISOString(),
                        });
                  }}
                  style={{
                    height: 22,
                    width: 22,
                    margin: "0 auto",
                    borderRadius: 4,
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
            <div className="text-end">
              {completedCount}/{expectedCount}
            </div>
          </div>
        );
      })}
    </div>
  );
}
