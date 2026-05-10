import os

os.makedirs("src/api", exist_ok=True)
os.makedirs("src/store", exist_ok=True)
os.makedirs("src/hooks", exist_ok=True)
os.makedirs("src/pages", exist_ok=True)

open("src/api/client.ts", "w").write(open("src/api/client.ts").read() if os.path.exists("src/api/client.ts") else "")

files = {
"src/api/client.ts": 'import axios from "axios";\n\nconst api = axios.create({\n  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",\n  withCredentials: true,\n});\n\napi.interceptors.response.use(\n  (res) => res,\n  (err) => {\n    if (err.response?.status === 401) window.location.href = "/login";\n    return Promise.reject(err);\n  }\n);\n\nexport default api;\n',
"src/store/authStore.ts": 'import { create } from "zustand";\ninterface User { id: string; email: string; role: string; is_active: boolean; created_at: string; }\ninterface AuthStore { user: User | null; setUser: (u: User | null) => void; clearUser: () => void; }\nexport const useAuthStore = create<AuthStore>((set) => ({ user: null, setUser: (user) => set({ user }), clearUser: () => set({ user: null }) }));\n',
"src/hooks/useAuth.ts": 'import { useAuthStore } from "../store/authStore";\nimport api from "../api/client";\nexport const useAuth = () => {\n  const { user, setUser, clearUser } = useAuthStore();\n  const login = async (email: string, password: string) => { await api.post("/api/v1/auth/login", { email, password }); const res = await api.get("/api/v1/auth/me"); setUser(res.data); };\n  const register = async (email: string, password: string) => { await api.post("/api/v1/auth/register", { email, password }); };\n  const logout = async () => { await api.post("/api/v1/auth/logout"); clearUser(); window.location.href = "/login"; };\n  const fetchMe = async () => { try { const res = await api.get("/api/v1/auth/me"); setUser(res.data); } catch { clearUser(); } };\n  return { user, login, register, logout, fetchMe };\n};\n',
"src/index.css": "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n",
}

for path, content in files.items():
    with open(path, "w") as f:
        f.write(content)
    print(f"✅ {path}")

print("Done! Now create pages manually in VS Code.")
