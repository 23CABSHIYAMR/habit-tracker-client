"use client";
import { useState } from "react";
import CustomInput from "@/components/ui/CustomInput";
import {
  dayNames,
  ColorPalette,
  maxInputFormCharLength as maxLength,
} from "@/constants/index";

export default function HabitForm({
  formData,
  setFormData,
  errors,
  setErrors,
}) {
  const [lengthLimit, setLengthLimit] = useState(maxLength);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "habitName") {
      const currenLength = value.length;
      setLengthLimit(maxLength - currenLength);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleDay = (index) => {
    setFormData((prev) => ({
      ...prev,
      weekFrequency: prev.weekFrequency.map((v, i) => (i === index ? !v : v)),
    }));
  };

  const setWeekdays = () => {
    setFormData((prev) => ({
      ...prev,
      weekFrequency: [false, true, true, true, true, true, false],
    }));
  };

  const setEveryday = () => {
    setFormData((prev) => ({
      ...prev,
      weekFrequency: [true, true, true, true, true, true, true],
    }));
  };
  // ----------------------- UI -----------------------
  return (
    <div className="d-flex flex-column gap-3">
      {/* HABIT NAME */}
      <div className="d-flex flex-column gap-2">
        <div className="space-between align-items-center">
          <label className="form-label m-0">1. Name this habit</label>
          <p
            style={{
              color: "var(--text-placeholder)",
              fontSize: "var(--rem-14)",
            }}
            className="m-0"
          >
            Max 15 characters
          </p>
        </div>
        <div className="position-relative d-flex align-items-center">
          <CustomInput
            maxLength={maxLength}
            name="habitName"
            type="text"
            placeholder="Enter habit name"
            value={formData.habitName}
            onChange={handleInputChange}
            error={errors.habitName}
          />
          <p
            style={{
              color: "var(--text-placeholder)",
              position: "absolute",
              right: "var(--rem-4)",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "var(--rem-14)",
            }}
          >
            {lengthLimit}
          </p>
        </div>
      </div>

      {/* HABIT TYPE */}
      <div>
        <label className="form-label">2. Habit Type</label>
        <div className="d-flex gap-4 items-center">
          <label
            className="d-flex align-items-center gap-2"
            style={{ fontSize: "var(--rem-14)" }}
          >
            <input
              type="radio"
              name="isPositiveHabit"
              value="true"
              checked={formData.isPositiveHabit === true}
              onChange={() =>
                setFormData((prev) => ({ ...prev, isPositiveHabit: true }))
              }
            />
            To-Do
          </label>

          <label
            className="d-flex align-items-center gap-2"
            style={{ fontSize: "var(--rem-14)" }}
          >
            <input
              type="radio"
              name="isPositiveHabit"
              value="false"
              checked={formData.isPositiveHabit === false}
              onChange={() =>
                setFormData((prev) => ({ ...prev, isPositiveHabit: false }))
              }
            />
            Not-To-Do
          </label>
        </div>
      </div>

      {/* WEEK FREQUENCY */}
      <div className="d-flex flex-column gap-2">
        <label className="form-label m-0">3. Weekly Frequency</label>

        <div className="d-flex justify-content-between">
          {dayNames.map((day, i) => (
            <button
              type="button"
              key={i}
              className={` form-day-btn
                ${formData.weekFrequency[i] ? "active" : ""}
              `}
              onClick={() => toggleDay(i)}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="d-flex justify-content-between gap-2">
          <button type="button" className="w-100 form-day-btn" onClick={setWeekdays}>
            Weekdays
          </button>
          <button type="button" className="w-100 form-day-btn" onClick={setEveryday}>
            Everyday
          </button>
        </div>
      </div>

      {/* PALETTE */}
      <div>
        <label className="form-label">4. Color Palette</label>
        <div className="center-items justify-content-start gap-2 ps-1">
          {ColorPalette.map((c, index) => (
            <button
              key={index}
              type="button"
              className="rmv-btn-style habit-color-btn"
              style={{
                background: c,
                boxShadow:
                  formData?.palette === c ? `0px 0px 0px 5px ${c}` : "none",
                  opacity:formData?.palette === c?"1":"60%"
              }}
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  palette: c,
                }))
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
