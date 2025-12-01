import { MDYFormat } from "./dateFormat";

export function bedTimeVariable() {
  const now = new Date();
  const bedtime = new Date();

  bedtime.setHours(22, 0, 0, 0);

  const diff = bedtime - now;

  if (diff <= 0) return `It's past bedtime!`;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours} hour(s) ${minutes} minute(s) till bedtime`;
}

export function setGreeting() {
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 12) return "Morning";
  else if (hour < 17) return "Afternoon";
  else if (hour < 22) return "Evening";
  else return "Night";
}

export function getWeekRange(sunday) {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(sunday);
    day.setDate(sunday.getDate() + i);

    days.push(new Date(day).toISOString().split("T")[0]);
  }
  return days;
}

export function getWeekStart() {
  const today = new Date();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - today.getDay());
  return sunday;
}

export function changeDate(offset, prevDate) {
  const newDate = new Date(prevDate);
  newDate.setDate(newDate.getDate() + offset);
  return newDate;
}

export function changeYear(offset, prevDate) {
  const newDate = new Date(prevDate);
  newDate.setFullYear(newDate.getFullYear() + offset);
  return newDate;
}

export function yearFormat(date,createdDate) {
  const prevYear = new Date(date);
  const thisYear = new Date();
  prevYear.setFullYear(
    prevYear.getFullYear() - 1,
    prevYear.getMonth(),
    prevYear.getDate() + 1
  );
  const isThisYear =
    date.getFullYear() === thisYear.getFullYear() ? "Today" : MDYFormat(date);

  if (prevYear < new Date(createdDate)) {
    return `${MDYFormat(createdDate)} - ${isThisYear}`;
  }
  return `${MDYFormat(prevYear)} - ${isThisYear}`;
}

export function changeMonth(offset, prevDate) {
  const newDate = new Date(prevDate);
  newDate.setMonth(newDate.getMonth() + offset);
  return newDate;
}

export function generateMonthDates(monthKey) {
  const [year, month] = monthKey.split("-");
  const startDate = new Date(year, month, 1);
  const startDay = startDate.getDay();
  const endDate = new Date(year, Number(month) + 1, 1);
  let endDay = endDate.getDay();

  const allDates = [];
  for (let i = startDay; i > 0; i--) {
    allDates.push(0);
  }
  for (
    let start = new Date(startDate);
    start < endDate;
    start.setDate(start.getDate() + 1)
  ) {
    allDates.push(start.getDate());
  }

  while (endDay % 7 !== 0) {allDates.push(0);endDay++;}
  return allDates;
}