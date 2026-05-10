import { create } from "zustand";
interface User { id: string; email: string; role: string; is_active: boolean; created_at: string; }
interface AuthStore { user: User | null; setUser: (u: User | null) => void; clearUser: () => void; }
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
