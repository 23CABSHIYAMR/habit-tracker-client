"use client";
import AnalyticsPageTemplate from "@/components/layout/AnalyticsPageTemplate";

export default function AllTime() {
  return (
    <AnalyticsPageTemplate
      getInitialRange={(createdAt) => ({
        start: new Date(createdAt),
        end: new Date()
      })}
      getPrevRange={() => ({ start: null, end: null })}
      getNextRange={() => ({ start: null, end: null })}
      allowDisplayToggle={false}
      allowMovement={false}
      showComparison={false}
      titleFormatter={() => "All-Time Analytics"}
    />
  );
}
