import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./hooks/useAuth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

const qc = new QueryClient();

function Router() {
  const { user, fetchMe } = useAuth();
  const [loading, setLoading] = useState(true);
  const path = window.location.pathname;

  useEffect(() => {
    fetchMe().finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-blue-400 text-xl animate-pulse">Loading...</div>
    </div>
  );

  if (path === "/register") return <Register />;
  if (path === "/login" || !user) return <Login />;
  return <Dashboard />;
}

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <Router />
    </QueryClientProvider>
  );
}
