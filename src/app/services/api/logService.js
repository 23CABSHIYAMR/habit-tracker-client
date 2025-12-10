import api from "@/app/(MainBody)/api/apiInstance";

export const logService = {
  getLogsByDate: async (date) => {
    const res = await api.get(`/habitLog/date/${date}`);
    return res.data;
  },

  getLogsInRange: async (start, end) => {
    const res = await api.get(`/habitLog/range?start=${start}&end=${end}`);
    return res.data;
  },

  completeHabit: async (body) => {
    const res = await api.post("/habitLog/complete", body);
    return res.data;
  },

  uncompleteHabit: async (body) => {
    const res = await api.delete("/habitLog/uncomplete", { data: body });
    return res.data;
  },
  getAnalyticsForRange: async (startDate, endDate, prevStart, prevEnd) => {
    const res = await api.get("/habitLog/analytics", {
      params: { startDate, endDate, prevStart, prevEnd },
    });
    return res.data;
  },
};
