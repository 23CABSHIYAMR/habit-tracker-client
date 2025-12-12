"use client";
import AnalyticsPageTemplate from "@/components/layout/AnalyticsPageTemplate";
import {MDYFormat} from "@/utils/helpers/dateFormat"
import { useAppSelector } from "@/ReduxToolkit/hooks";
export default function AllTime() {
    const userDetails = useAppSelector((state) => state.auth.user);

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
      titleFormatter={() => MDYFormat(userDetails.createdAt) + " - Till Date"}
    />
  );
}
