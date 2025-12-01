import { logService } from "@/app/services/api/logService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setLogsByDate,updateSingleLog } from "@/ReduxToolkit/Reducers/Log/LogReducer";

export const useGetLogsByDate = (date) => {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: ["logs", date],
    queryFn: () => logService.getLogsByDate(date),
    enabled: !!date,

    onSuccess: (data) => dispatch(setLogsByDate({ date, logs: data })),
  });
};

export const useCompleteHabit = () => {
  const qc = useQueryClient();
  const dispatch = useDispatch();

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
  const dispatch = useDispatch();

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
