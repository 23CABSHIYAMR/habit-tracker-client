import moment from "moment";

export const formatToLocalDate24 = (date) => {
  if (!date) return "";

  const localDate = moment(date).utcOffset(330);

  return localDate.format("MMM D, YYYY HH:mm");
};

export const formatToLocalTimestamp = (date) => {
  if (!date) return "";
  return moment.utc(date).local().format("YYYY-MM-DD HH:mm:ss.SSSSSS Z");
};

export const getLocalDate = (date) => {
  if (!date) {
    return "";
  }
  return moment(date).format("DD-MM-YYYY HH:mm");
};

export const colorCycle = ["primary", "warning", "success", "secondary"];

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colorCycle.length);
  return colorCycle[randomIndex];
};

export const convertUTCToLocal = (utcString) => {
  return moment.utc(utcString).local().format("MMMM D, YYYY HH:mm");
};

export const toUTCString = (dateStr, timeStr) => {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hour = 0, minute = 0] = (timeStr || "00:00").split(":").map(Number);
  const localDate = new Date(year, month - 1, day, hour, minute, 0);
  return localDate.toISOString();
};

//work on helpers and index.js to build the layout
