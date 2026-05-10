import client from '../api/client';
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ME } from '../api/endpoints';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const { setUser, clearUser } = useAuthStore();

  const login = async (email: string, password: string) => {
    await client.post(AUTH_LOGIN, { email, password });
    await fetchMe();
  };

  const logout = async () => {
    await client.post(AUTH_LOGOUT);
    clearUser();
    window.location.href = '/login';
  };

  const fetchMe = async () => {
    const response = await client.get(AUTH_ME);
    setUser(response.data);
  };

  return { login, logout, fetchMe };
};
