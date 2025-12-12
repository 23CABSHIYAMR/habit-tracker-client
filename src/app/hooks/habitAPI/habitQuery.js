import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { habitService } from "@/app/services/api/habitService";
import { useAppDispatch } from "@/ReduxToolkit/hooks";
import { setHabits } from "@/ReduxToolkit/Reducers/Habit/HabitReducer";

export const useGetHabits = () => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: ["habits"],
    queryFn: habitService.getHabits,
    onSuccess: (data) => dispatch(setHabits(data))
  });
};

export const useCreateHabit = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: habitService.createHabit,
    onSuccess: () => qc.invalidateQueries(["habits"])
  });
};

export const useUpdateHabit = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ habitId, updates }) => habitService.updateHabit(habitId, updates),
    onSuccess: () => qc.invalidateQueries(["habits"])
  });
};

export const useDeleteHabit = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: habitService.deleteHabit,
    onSuccess: () => qc.invalidateQueries(["habits"])
  });
};
