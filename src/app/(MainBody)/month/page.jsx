"use client";
import AnalyticsPageTemplate from "@/components/layout/Analytics/AnalyticsPageTemplate";
import MonthCalendarGrid from "@/components/layout/GridDisplay/MonthCalendarGrid"; 

export default function MonthPage() {
  return (
    <AnalyticsPageTemplate
      getInitialRange={(createdAt) => {
        const now = new Date();
        const s = new Date(now.getFullYear(), now.getMonth(), 1);
        const e = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return { start: s, end: e };
      }}
      getPrevRange={(start, user) => {
        const s = new Date(start.getFullYear(), start.getMonth() - 1, 1);
        const e = new Date(s.getFullYear(), s.getMonth() + 1, 0);
        return { start: s, end: e };
      }}
      getNextRange={(start) => {
        const s = new Date(start.getFullYear(), start.getMonth() + 1, 1);
        const e = new Date(s.getFullYear(), s.getMonth() + 1, 0);
        return { start: s, end: e };
      }}
      allowDisplayToggle={true}
      allowMovement={true}
      showComparison={true}
      titleFormatter={(s) => 
        `${s.toLocaleString("default", { month: "long" })} ${s.getFullYear()}`
      }
      GridComponent={MonthCalendarGrid}
      pageName="month"
    />
  );
}
