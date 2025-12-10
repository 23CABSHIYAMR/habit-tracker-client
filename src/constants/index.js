export const oAuthUrl =
  `https://accounts.google.com/o/oauth2/v2/auth?` +
  `client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&`+
  `redirect_uri=${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/` +
  `callback&response_type=code&scope=openid%20email%20profile`;

export const navItems = [
  {
    name: "Week",
    pathName: "/week",
  },
  {
    name: "Month",
    pathName: "/month",
  },
  {
    name: "Year",
    pathName: "/year",
  },
  {
    name: "All-Time",
    pathName: "/all-time",
  },
];
export const getCurrentIndex = (pathName) => {
  const path = pathName.toLowerCase();
  if (path.includes("month")) return 1;
  if (path.includes("year")) return 2;
  if (path.includes("all-time")) return 3;
  return 0;
};

export const ColorPalette = Array.from(
  { length: 8 },
  (_, i) => `var(--habit-${i + 1})`
);

export const STRENGTH = {
  POOR: "var(--error-secondary)",
  WEAK: "var(--warning-secondary)",
  GOOD: "var(--success-secondary)",
  STRONG: "var(--success-primary)",
};

export const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const fullDayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const maxLength = 15;
