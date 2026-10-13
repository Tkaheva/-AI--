import api from "./client";

export const listTasks = () => api.get("/api/tasks");
export const createTask = (data) => api.post("/api/tasks", data);
export const updateTask = (id, data) => api.patch(`/api/tasks/${id}`, data);
export const deleteTask = (id) => api.delete(`/api/tasks/${id}`);
export const aiSuggest = (title, description) =>
  api.post("/api/ai/suggest", { title, description });
