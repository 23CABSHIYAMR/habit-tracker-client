import { monthNames } from "@/constants/index.js";
import { getWeek, getYear } from "date-fns";

export function WMDFormat(date) {
  const selectedDate = new Date(date);
  const formatted = `${selectedDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
  })}`;
  return formatted;
}

export function MYFormat(date) {
  const selectedDate = new Date(date);
  const formatted = `${selectedDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })}`;
  return formatted;
}
export function MDYFormat(date) {
  const selectedYear = new Date(date);
  return `${
    monthNames[selectedYear.getMonth()]
  } ${selectedYear.getDate()}, ${selectedYear.getFullYear()}`;
}

export function IsoDate(date) {
  const d = new Date(date);
  if (isNaN(d)) return "";
  return d.toISOString().split("T")[0];
}

export function getWeekKey(date) {
  return `${getYear(date)}-${getWeek(date)}`;
}

export function getMonthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}`;
}
