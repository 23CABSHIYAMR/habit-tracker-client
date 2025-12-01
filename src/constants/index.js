export const oAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=https://habit-tracker-server-bx61.onrender.com/auth/google/callback&response_type=code&scope=openid%20email%20profile`;

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

export const colorpaletteObj = {
  blue: "007dff",
  rose: "ff37cc",
  purple: "a658ff",
  red: "ff0000",
  green: "00e266",
  darkBlue: "009bff",
  neonBlue: "00e3e2",
  pink: "ff00ff",
  yellow: "ff9a00",
  lightBlue: "EDF3FC",
};
export const ColorPalette = [
  "#007dff",
  "#ff37cc",
  "#ff0000",
  "#00e266",
  "#009bff",
  "#00e3e2",
  "#ff00ff",
  "#ff9a00",
];

export const today = new Date();


export const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
export const maxLength = 15;
export const textGray0 = "#adb5c3";
export const textGray1 = "#595959";