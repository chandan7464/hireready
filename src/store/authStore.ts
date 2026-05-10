import { create } from 'zustand';
import { UserType } from '../types/auth.types';

interface AuthState {
  user: UserType | null;
  isAuthenticated: boolean;
  setUser: (user: UserType) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
}));
