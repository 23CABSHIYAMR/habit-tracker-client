import { logService } from "@/app/services/api/logService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/hooks";
import {
  setLogsByDate,
  updateSingleLog,
  setLogsByRange,
  setAnalyticsByRange,
} from "@/ReduxToolkit/Reducers/Log/LogReducer";

export const useGetLogsByDate = (date) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: ["logs", date],
    queryFn: () => logService.getLogsByDate(date),
    enabled: !!date,

    onSuccess: (data) => dispatch(setLogsByDate({ date, logs: data })),
  });
};

export const useCompleteHabit = () => {
  const qc = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: logService.completeHabit,
    onSuccess: (_, vars) => {
      dispatch(
        updateSingleLog({
          date: vars.date,
          habitId: vars.habitId,
          value: true,
        })
      );
      qc.invalidateQueries(["logs", vars.date]);
    },
  });
};

export const useUncompleteHabit = () => {
  const qc = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: logService.uncompleteHabit,
    onSuccess: (_, vars) => {
      dispatch(
        updateSingleLog({
          date: vars.date,
          habitId: vars.habitId,
          value: false,
        })
      );
      qc.invalidateQueries(["logs", vars.date]);
    },
  });
};
export const useGetLogsInRange = (startDate, endDate) => {
  const dispatch = useAppDispatch();
  const key = `${startDate}_${endDate}`;
  const cached = useAppSelector((state) => state.log.rangeCache[key]);

  return useQuery({
    queryKey: ["logs-range", startDate, endDate],
    queryFn: () => logService.getLogsInRange(startDate, endDate),
    enabled: !!startDate && !!endDate,
    onSuccess: (data) => dispatch(setLogsByRange({ key, logs: data })),
    select: (data) => cached || data,
  });
};
export const useGetAnalyticsForRange = (
  startDate,
  endDate,
  prevStart,
  prevEnd
) => {
  const dispatch = useAppDispatch();
  const key = `${startDate}_${endDate}`;
  const cached = useAppSelector((state) => state.log.analyticsCache[key]);

  return useQuery({
    queryKey: ["analytics-range", startDate, endDate, prevStart, prevEnd],
    queryFn: () =>
      logService.getAnalyticsForRange(startDate, endDate, prevStart, prevEnd),
    enabled: !!startDate && !!endDate,
    onSuccess: (data) =>
      dispatch(setAnalyticsByRange({ key, analytics: data })),
    select: (data) => cached || data,
  });
};
