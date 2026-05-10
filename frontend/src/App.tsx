import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./hooks/useAuth";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import JobMatch from "./pages/JobMatch";

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
  if (path === "/login") return <Login />;
  if (path === "/dashboard") return user ? <Dashboard /> : <Login />;
  if (path === "/job-match") return user ? <JobMatch /> : <Login />;
  return <Landing />;
}

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <Router />
    </QueryClientProvider>
  );
}
