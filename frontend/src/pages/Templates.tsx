import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import api from "../api/client";

const TEMPLATES = [
  { id: "software_engineer", name: "Software Engineer", icon: "💻", color: "#3b82f6",
    sections: ["Summary", "Skills", "Experience", "Projects", "Education"],
    best_for: "IBM, TCS, Infosys, Wipro, Startups", free: true },
  { id: "data_analyst", name: "Data Analyst", icon: "📊", color: "#8b5cf6",
    sections: ["Summary", "Skills", "Experience", "Projects", "Education"],
    best_for: "Analytics firms, Banks, E-commerce", free: true },
  { id: "ai_ml_engineer", name: "AI/ML Engineer", icon: "🤖", color: "#22c55e",
    sections: ["Summary", "Skills", "Research", "Projects", "Education"],
    best_for: "AI startups, Research labs, Big Tech", free: false },
  { id: "full_stack", name: "Full Stack Developer", icon: "🌐", color: "#f59e0b",
    sections: ["Summary", "Tech Stack", "Experience", "Projects", "Education"],
    best_for: "Product companies, Startups, Freelance", free: false },
  { id: "fresher", name: "Fresher / Campus", icon: "🎓", color: "#ec4899",
    sections: ["Objective", "Education", "Skills", "Projects", "Internships"],
    best_for: "Campus placements, Entry level jobs", free: true },
  { id: "business_analyst", name: "Business Analyst", icon: "💼", color: "#14b8a6",
    sections: ["Summary", "Skills", "Experience", "Projects", "Education"],
    best_for: "Consulting, Banking, IT services", free: false },
  { id: "devops", name: "DevOps Engineer", icon: "⚙️", color: "#f97316",
    sections: ["Summary", "Skills", "Experience", "Infrastructure", "Projects"],
    best_for: "Cloud companies, DevOps teams", free: false },
  { id: "ui_ux", name: "UI/UX Designer", icon: "🎨", color: "#a855f7",
    sections: ["Summary", "Skills", "Portfolio", "Projects", "Education"],
    best_for: "Product companies, Agencies, Freelance", free: false },
];

export default function Templates() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-900 px-6 py-4 flex justify-between items-center border-b border-gray-800">
        <a href="/" className="text-xl font-bold text-blue-400">HireReady</a>
        <div className="flex items-center gap-6">
          <a href="/dashboard" className="text-gray-400 hover:text-white text-sm">Resume</a>
          <a href="/templates" className="text-blue-400 text-sm font-semibold">Templates</a>
          <a href="/job-match" className="text-gray-400 hover:text-white text-sm">Job Match</a>
          <a href="/interview" className="text-gray-400 hover:text-white text-sm">Interview</a>
          <button onClick={logout} className="text-sm text-red-400">Logout</button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">Resume Templates</h2>
          <p className="text-gray-400 text-lg">Role-specific templates optimized for Indian job market</p>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <span className="flex items-center gap-2 text-green-400">
              <span className="w-3 h-3 bg-green-400 rounded-full"></span> Free
            </span>
            <span className="flex items-center gap-2 text-yellow-400">
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span> Pro (₹299/month)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEMPLATES.map((t) => (
            <div key={t.id}
              className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-blue-500/50 transition group relative overflow-hidden">

              {!t.free && (
                <div className="absolute top-3 right-3 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                  PRO
                </div>
              )}
              {t.free && (
                <div className="absolute top-3 right-3 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                  FREE
                </div>
              )}

              <div className="text-4xl mb-3">{t.icon}</div>
              <h3 className="text-lg font-bold mb-1" style={{color: t.color}}>{t.name}</h3>
              <p className="text-gray-500 text-xs mb-4">Best for: {t.best_for}</p>

              <div className="mb-4">
                <p className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">Sections</p>
                <div className="flex flex-wrap gap-1">
                  {t.sections.map((s, i) => (
                    <span key={i} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>

              {t.free ? (
                <button
                  onClick={() => window.location.href = "/dashboard"}
                  className="w-full py-2 rounded-xl text-sm font-semibold transition text-white"
                  style={{backgroundColor: t.color}}>
                  Use Template →
                </button>
              ) : (
                <button
                  className="w-full py-2 rounded-xl text-sm font-semibold transition bg-gray-800 text-gray-400 cursor-not-allowed">
                  Upgrade to Pro
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Pro CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-2xl p-8 border border-blue-800 text-center">
          <h3 className="text-2xl font-bold mb-2">Unlock All Templates</h3>
          <p className="text-gray-400 mb-6">Get access to all 8 professional templates + unlimited AI analysis</p>
          <div className="flex justify-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">₹299</div>
              <div className="text-gray-400 text-sm">per month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">₹2499</div>
              <div className="text-gray-400 text-sm">per year (save 30%)</div>
            </div>
          </div>
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-bold transition">
            Upgrade to Pro →
          </button>
        </div>
      </div>
    </div>
  );
}
