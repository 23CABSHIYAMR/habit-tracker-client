"use client";
import AnalyticsPageTemplate from "@/components/layout/Analytics/AnalyticsPageTemplate";
import MonthCalendarGrid from "@/components/layout/GridDisplay/MonthCalendarGrid"; 

export default function MonthPage() {
  return (
    <AnalyticsPageTemplate
      getInitialRange={(createdAt) => {
        const now = new Date();
        let s = new Date(now.getFullYear(), now.getMonth(), 1);
        if (s < new Date(createdAt)) s = new Date(createdAt); // partial month
        const e = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return { start: s, end: e };
      }}
      getPrevRange={(start, user) => {
        let s = new Date(start.getFullYear(), start.getMonth() - 1, 1);
        if (s < new Date(user.createdAt)) s = new Date(user.createdAt);
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
    />
  );
}
