"use client";
// import AnalyticsHeader from "@/components/layout/AnalyticsHeader";
// import AnalyticsChart from "@/components/layout/AnalyticsChart";
// import { useState, useEffect } from "react";
// import { getWeekStart, changeDate } from "@/utils/helpers/dateUtils";
// import { WMDFormat } from "@/utils/helpers/dateFormat";
// import {
//   useGetLogsInRange,
//   useGetAnalyticsForRange,
// } from "@/app/hooks/habitLogAPI/logQuery";
// import { useGetHabits } from "@/app/hooks/habitAPI/habitQuery";
// import { useAppSelector } from "@/ReduxToolkit/hooks";

// export default function WeekPage() {
//   const userDetails = useAppSelector((state) => state.auth.user);

//   // initial week (Mon-Sun)
//   const initialStart = getWeekStart();
//   const initialEnd = changeDate(6, initialStart);

//   const initialPrevStart = changeDate(-7, initialStart);
//   const initialPrevEnd = changeDate(6, initialPrevStart);

//   const initialNextStart = changeDate(7, initialStart);
//   const initialNextEnd = changeDate(6, initialNextStart);

//   const [startDate, setStartDate] = useState(initialStart);
//   const [endDate, setEndDate] = useState(initialEnd);

//   const [prevRange, setPrevRange] = useState({
//     start: initialPrevStart,
//     end: initialPrevEnd,
//   });
//   const [nextRange, setNextRange] = useState({
//     start: initialNextStart,
//     end: initialNextEnd,
//   });

//   const [canMvFwd, setCanMvFwd] = useState(false);
//   const [canMvBwd, setCanMvBwd] = useState(true);
//   const [isBarGraphActive, setBarGraphActive] = useState(false);

//   const { data: habits, isPending: isPending } = useGetHabits();

//   // safe: prevRange is initialized, so toISOString won't crash
//   const { data: analytics, isPending: isLoading } = useGetAnalyticsForRange(
//     startDate.toISOString(),
//     endDate.toISOString(),
//     new Date(prevRange.start).toISOString(),
//     new Date(prevRange.end).toISOString()
//   );

//   const { data: logs } = useGetLogsInRange(
//     startDate.toISOString(),
//     endDate.toISOString()
//   );

//   useEffect(() => {
//     if (!startDate) return;

//     const pStart = changeDate(-7, startDate);
//     const pEnd = changeDate(6, pStart);

//     const nStart = changeDate(7, startDate);
//     const nEnd = changeDate(6, nStart);

//     setPrevRange({ start: pStart, end: pEnd });
//     setNextRange({ start: nStart, end: nEnd });
//   }, [startDate]);

//   useEffect(() => {
//     if (!userDetails || !startDate) return;

//     const today = new Date();
//     const userCreatedAt = new Date(userDetails.createdAt);

//     const futureStart = changeDate(7, startDate);
//     const backStart = changeDate(-7, startDate);

//     setCanMvFwd(futureStart <= today);
//     setCanMvBwd(userCreatedAt <= backStart);
//   }, [startDate, userDetails]);

//   const goPrevWeek = () => {
//     setStartDate(new Date(prevRange.start));
//     setEndDate(new Date(prevRange.end));
//   };

//   const goNextWeek = () => {
//     if (!canMvFwd) return;
//     setStartDate(new Date(nextRange.start));
//     setEndDate(new Date(nextRange.end));
//   };

//   return (
//     <div className="d-flex flex-column gap-4">
//       <AnalyticsHeader
//         dateLabel={`${WMDFormat(startDate)} - ${WMDFormat(endDate)}`}
//         canMovePrev={canMvBwd}
//         canMoveNext={canMvFwd}
//         onPrev={goPrevWeek}
//         onNext={goNextWeek}
//         showDisplayType={true}
//         isBarGraphActive={isBarGraphActive}
//         setBarGraphActive={setBarGraphActive}
//         progressVal={analytics?.totalCompletionPercentage}
//         showProgressComparison={true}
//         comparisonValue={analytics?.comparisonFromPrev}
//       />

//       {/* Render analytics list */}
//       {isLoading || isPending ? (
//         <>is Loading</>
//       ) : isBarGraphActive ? (
//         <AnalyticsChart analytics={analytics} habits={habits} />
//       ) : (
//         <>Grid Chart</>
//       )}
//     </div>
//   );
// }
import AnalyticsPageTemplate from "@/components/layout/Analytics/AnalyticsPageTemplate";
import WeekGrid from "@/components/layout/GridDisplay/WeekGrid"; // custom grid

import { getWeekStart, changeDate } from "@/utils/helpers/dateUtils";
import { WMDFormat } from "@/utils/helpers/dateFormat";

export default function WeekPage() {
  return (
    <AnalyticsPageTemplate
      getInitialRange={() => {
        const s = getWeekStart();
        const e = changeDate(6, s);
        return { start: s, end: e };
      }}
      getPrevRange={(start) => {
        const s = changeDate(-7, start);
        const e = changeDate(6, s);
        return { start: s, end: e };
      }} 
      getNextRange={(start) => {
        const s = changeDate(7, start);
        const e = changeDate(6, s);
        return { start: s, end: e };
      }}
      allowDisplayToggle={true}
      allowMovement={true}
      showComparison={true}
      titleFormatter={(s, e) => `${WMDFormat(s)} - ${WMDFormat(e)}`}
      GridComponent={WeekGrid}
    />
  );
}
