import api from "./client";

export const register = (email, password) =>
  api.post("/api/auth/register", { email, password });

export const login = async (email, password) => {
  const form = new URLSearchParams();
  form.append("username", email);
  form.append("password", password);
  return api.post("/api/auth/login", form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};
