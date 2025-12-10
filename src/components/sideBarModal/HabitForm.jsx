"use client";
import { useState } from "react";
import CustomInput from "@/components/ui/CustomInput";
import { dayNames, ColorPalette } from "@/constants/index";

export default function HabitForm({
  formData,
  setFormData,
  errors,
  setErrors,
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;

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
    <div className="flex flex-col gap-4">
      {/* HABIT NAME */}
      <div>
        <label className="form-label">Habit Name*</label>
        <CustomInput
          name="habitName"
          type="text"
          placeholder="Enter habit name"
          value={formData.habitName}
          onChange={handleInputChange}
          error={errors.habitName}
        />
      </div>

      {/* HABIT TYPE */}
      <div>
        <label className="form-label">Habit Type</label>
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
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

          <label className="flex items-center gap-2">
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
      <div>
        <label className="form-label">Weekly Frequency</label>

        <div className="flex justify-between">
          {dayNames.map((day, i) => (
            <button
              type="button"
              key={i}
              className={`w-10 p-1.5 text-sm rounded-md border 
                ${
                  formData.weekFrequency[i]
                    ? "bg-[#155EEF] text-white"
                    : "bg-white border-gray-300"
                }
              `}
              onClick={() => toggleDay(i)}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mt-2">
          <button type="button" className="btn-outline" onClick={setWeekdays}>
            Weekdays
          </button>
          <button type="button" className="btn-outline" onClick={setEveryday}>
            Everyday
          </button>
        </div>
      </div>

      {/* PALETTE */}
      <div>
        <label className="form-label">Color Palette</label>
        <div className="center-items justify-content-start gap-2">
          {ColorPalette.map((c, index) => (
            <button
              key={index}
              type="button"
              className="rmv-btn-style habit-color-btn"
              style={{
                background: c,
                boxShadow:
                  formData.palette === c ? `0px 0px 0px 3px ${c}` : "none",
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
