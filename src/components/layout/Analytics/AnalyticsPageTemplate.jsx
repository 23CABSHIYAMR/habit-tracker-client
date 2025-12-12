"use client";

import AnalyticsHeader from "@/components/layout/Analytics/AnalyticsHeader";
import AnalyticsChart from "@/components/layout/Analytics/AnalyticsChart";
import { useState, useEffect } from "react";
import { useGetHabits } from "@/app/hooks/habitAPI/habitQuery";
import {
  useGetLogsInRange,
  useGetAnalyticsForRange,
} from "@/app/hooks/habitLogAPI/logQuery";
import { useAppSelector } from "@/ReduxToolkit/hooks";

export default function AnalyticsPageTemplate({
  getInitialRange,
  getPrevRange,
  getNextRange,
  allowDisplayToggle,
  allowMovement,
  showComparison,
  titleFormatter,
  GridComponent, // 👈 WeekGrid OR MonthCalendar (null for year/all-time)
}) {
  const user = useAppSelector((s) => s.auth.user);

  const { start, end } = getInitialRange(user?.createdAt);
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);

  const [prevRange, setPrevRange] = useState(
    getPrevRange(startDate, user || {})
  );
  const [nextRange, setNextRange] = useState(getNextRange(startDate));

  const [canPrev, setCanPrev] = useState(true);
  const [canNext, setCanNext] = useState(true);
  const [isBarActive, setBarActive] = useState(false);

  const { data: habits } = useGetHabits();
  const { data: analytics } = useGetAnalyticsForRange(
    startDate.toISOString(),
    endDate.toISOString(),
    prevRange.start?.toISOString(),
    prevRange.end?.toISOString()
  );

  useGetLogsInRange(startDate.toISOString(), endDate.toISOString());

  // recompute ranges on movement
  useEffect(() => {
    setPrevRange(getPrevRange(startDate, user || {}));
    setNextRange(getNextRange(startDate));
  }, [startDate]);

  // validate movement
  useEffect(() => {
    if (!allowMovement) {
      setCanPrev(false);
      setCanNext(false);
      return;
    }

    const today = new Date();

    setCanNext(nextRange.start <= today);
    setCanPrev(prevRange.start >= new Date(user?.createdAt));
  }, [nextRange, prevRange, allowMovement, user]);

  return (
    <>
      <AnalyticsHeader
        dateLabel={titleFormatter(startDate, endDate)}
        canMovePrev={canPrev}
        canMoveNext={canNext}
        onPrev={() => {
          if (!canPrev) return;
          setStartDate(prevRange.start);
          setEndDate(prevRange.end);
        }}
        onNext={() => {
          if (!canNext) return;
          setStartDate(nextRange.start);
          setEndDate(nextRange.end);
        }}
        showDisplayType={allowDisplayToggle}
        isBarGraphActive={isBarActive}
        setBarGraphActive={setBarActive}
        progressVal={analytics?.totalCompletionPercentage}
        showProgressComparison={showComparison}
        comparisonValue={analytics?.comparisonFromPrev}
      />

      {/* GRID / CHART SWITCHING */}
      {allowDisplayToggle && !isBarActive && GridComponent ? (
        <GridComponent
          analytics={analytics}
          habits={habits}
          startDate={startDate}
          endDate={endDate}
        />
      ) : (
        <AnalyticsChart analytics={analytics} habits={habits} />
      )}
    </>
  );
}
