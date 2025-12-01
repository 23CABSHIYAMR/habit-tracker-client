import api from "@/app/(MainBody)/api/apiInstance";

export const habitService = {
  getHabits: async () => {
    const res = await api.get("/habits");
    return res.data;
  },

  createHabit: async (data) => {
    const res = await api.post("/habits", data);
    return res.data;
  },

  updateHabit: async (habitId, updates) => {
    const res = await api.put(`/habits/${habitId}`, updates);
    return res.data;
  },

  deleteHabit: async (id) => {
    const res = await api.delete(`/habits/${id}`);
    return res.data;
  }
};
