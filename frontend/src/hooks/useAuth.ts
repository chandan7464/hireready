import { useAuthStore } from "../store/authStore";
import api from "../api/client";

export const useAuth = () => {
  const { user, setUser, clearUser } = useAuthStore();

  const login = async (email: string, password: string) => {
    await api.post("/api/v1/auth/login", { email, password });
    const res = await api.get("/api/v1/auth/me");
    setUser(res.data);
  };

  const register = async (email: string, password: string) => {
    await api.post("/api/v1/auth/register", { email, password });
  };

  const logout = async () => {
    await api.post("/api/v1/auth/logout");
    clearUser();
    window.location.href = "/";
  };

  const fetchMe = async () => {
    try {
      const res = await api.get("/api/v1/auth/me");
      setUser(res.data);
    } catch {
      clearUser();
    }
  };

  return { user, login, register, logout, fetchMe };
};
