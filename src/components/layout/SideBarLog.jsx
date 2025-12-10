"use client";
import React, { useState, useCallback } from "react";
import { ImFire } from "react-icons/im";
import { SlOptionsVertical } from "react-icons/sl";
import { FaCircle, FaCheck } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";
import { dayNames } from "@/constants";
import {
  useCompleteHabit,
  useUncompleteHabit,
} from "@/app/hooks/habitLogAPI/logQuery";
import { useDeleteHabit } from "@/app/hooks/habitAPI/habitQuery";
import { useAppDispatch } from "@/ReduxToolkit/hooks";
import {
  setEditHabitData,
  setSideBarToggle,
} from "@/ReduxToolkit/Reducers/Layout/LayoutReducer";
export default function SideBarLog({ logs = [], isLoading, date }) {
  if (isLoading) return <div>Loading habits...</div>;
  if (logs?.length === 0) return <div>No habits today.</div>;

  return (
    <div
      className="p-2"
      style={{
        border: "1px solid var(--surface-border)",
        borderRadius: "var(--rem-4)",
      }}
    >
      {logs.map((log, i) => (
        <SingleHabitLog key={log._id || i} habit={log} dayIndex={i} />
      ))}
    </div>
  );
}

function SingleHabitLog({ habit = {}, dayIndex }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const completeHabit = useCompleteHabit();
  const uncompleteHabit = useUncompleteHabit();
  const deleteHabit = useDeleteHabit();
  if (!habit || !Array.isArray(habit?.weekFrequency) || !habit?.date) {
    return null;
  }

  const logDay = new Date(habit.date).getDay();
  const isInactive = !habit?.weekFrequency[new Date(habit?.date)?.getDay()];
  const isPositive = habit?.isPositiveHabit;
  const isCompleted = habit?.isCompleted;

  const toggleStatus = useCallback(() => {
    const payload = { habitId: habit?.habitId, date: habit.date };
    isCompleted
      ? uncompleteHabit.mutate(payload)
      : completeHabit.mutate(payload);
  }, [habit._id, habit.date, isCompleted]);

  return (
    <div
      className="sidebar-log"
      style={{ color: isInactive ? "var(--surface-secondary)" : "" }}
    >
      {/* Icon */}
      <div
        className="status-icon"
        style={{
          color: isInactive ? "var(--surface-secondary)" : habit.palette,
        }}
      >
        {isPositive ? <FaCircle size={18} /> : <RiCloseFill size={25} />}
      </div>

      {/* Pending line */}
      {!isCompleted && (
        <div
          className="pending-line"
          style={{
            background: isInactive ? "var(--surface-secondary)" : habit.palette,
          }}
        />
      )}

      {/* Main Habit Box */}
      <div className="habit-container">
        {/* Background progress */}
        <div
          className="habit-bg"
          style={{
            backgroundColor: habit.palette,
            width: isCompleted ? "100%" : "0%",
          }}
        ></div>

        {/* Text Content */}
        <div
          className="habit-content"
          style={{
            color: isCompleted ? "var(--gray-50)" : "var(--text-primary)",
          }}
        >
          {/* Title Row */}
          <div className="space-between">
            <h4
              style={{
                color: isInactive ? "var(--text-inactive)" : "",
                fontWeight: "400",
              }}
            >
              {habit.habitName}
            </h4>

            <div className="habit-actions">
              {habit?.streak > 0 && (
                <>
                  {habit?.streak} <ImFire />
                </>
              )}

              <div
                className="position-relative"
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                {menuOpen ? (
                  <RiCloseFill
                    color={
                      isCompleted ? "var(--gray-50)" : "var(--text-secondary)"
                    }
                  />
                ) : (
                  <SlOptionsVertical
                    color={
                      isCompleted ? "var(--gray-50)" : "var(--text-secondary)"
                    }
                  />
                )}
              </div>
              <div
                className="dropdown-menu"
                style={{
                  opacity: menuOpen ? 1 : 0,
                  pointerEvents: menuOpen ? "auto" : "none",
                }}
              >
                <button
                  className="edit-btn rmv-btn-style"
                  onClick={() => {
                    dispatch(setEditHabitData(habit)); // store the habit in redux
                    dispatch(setSideBarToggle(true)); // open sidebar
                    setMenuOpen(false);
                  }}
                >
                  Edit
                </button>

                <button
                  className="delete-btn rmv-btn-style"
                  onClick={() => {
                    deleteHabit.mutate(habit?.habitId);
                    setMenuOpen(false);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* Status Row */}
          <div>
            {isCompleted ? (
              <div className="d-flex justify-content-between p-2">
                <div>
                  <FaCheck /> {isPositive ? "Completed" : "Avoided"}
                </div>
                <button className="btn p-0 text-white" onClick={toggleStatus}>
                  Undo
                </button>
              </div>
            ) : isInactive ? (
              <div style={{ color: "var(--text-inactive)" }}>
                Inactive on {dayNames[logDay]}
              </div>
            ) : (
              <button className="w-100 rmv-btn-style complete-btn" onClick={toggleStatus}>
                {isPositive ? "Mark Complete" : "Mark Avoided"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
