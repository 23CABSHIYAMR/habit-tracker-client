"use client";
import AnalyticsPageTemplate from "@/components/layout/AnalyticsPageTemplate";

export default function YearPage() {
  return (
    <AnalyticsPageTemplate
      getInitialRange={(createdAt) => {
        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        const userCreated = new Date(createdAt);

        const s = userCreated > startOfYear ? userCreated : startOfYear;
        const e = today;

        return { start: s, end: e };
      }}

      getPrevRange={(start, user) => {
        const userCreated = new Date(user.createdAt);
        const prevYear = start.getFullYear() - 1;

        let s = new Date(prevYear, 0, 1);
        let e = new Date(prevYear, 11, 31);

        // cannot show before user's creation year
        if (s < userCreated) s = userCreated;

        return { start: s, end: e };
      }}

      getNextRange={(start) => {
        const nextYear = start.getFullYear() + 1;
        const today = new Date();

        let s = new Date(nextYear, 0, 1);
        let e = new Date(nextYear, 11, 31);

        // if next year is current year, end = today
        if (nextYear === today.getFullYear()) e = today;

        // if next year is in the future → block movement
        if (nextYear > today.getFullYear()) {
          return { start: null, end: null }; // template will block navigation
        }

        return { start: s, end: e };
      }}

      allowDisplayToggle={false}
      allowMovement={true}
      showComparison={true}

      titleFormatter={(s) => s.getFullYear()}
    />
  );
}
