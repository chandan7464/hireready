
import { useState } from "react";

const TEMPLATES = [
  // SOFTWARE
  {
    id: "se_free", role: "software_engineer", name: "Dev Classic", icon: "💻",
    tier: "free", color: "#3b82f6", ats: 72,
    links: ["github"],
    sections: ["Summary", "Skills", "Experience", "Projects", "Education"],
    description: "Clean basic layout for developers",
    preview_bg: "from-gray-800 to-gray-900",
  },
  {
    id: "se_pro", role: "software_engineer", name: "Dev Pro", icon: "💻",
    tier: "pro", color: "#60a5fa", ats: 96,
    links: ["github", "linkedin", "portfolio"],
    sections: ["Summary", "Tech Stack", "Experience", "Open Source", "Projects", "Education", "Achievements"],
    description: "Modern ATS-friendly with live GitHub + Portfolio links",
    preview_bg: "from-blue-900 to-blue-950",
  },

  // DATA ANALYST
  {
    id: "da_free", role: "data_analyst", name: "Data Classic", icon: "📊",
    tier: "free", color: "#8b5cf6", ats: 70,
    links: ["linkedin"],
    sections: ["Summary", "Skills", "Experience", "Projects", "Education"],
    description: "Simple layout for data professionals",
    preview_bg: "from-purple-900 to-gray-900",
  },
  {
    id: "da_pro", role: "data_analyst", name: "Data Pro", icon: "📊",
    tier: "pro", color: "#a78bfa", ats: 94,
    links: ["linkedin", "kaggle", "github"],
    sections: ["Summary", "Core Skills", "Experience", "Projects", "Publications", "Education", "Certifications"],
    description: "Modern with Kaggle + GitHub links for data roles",
    preview_bg: "from-purple-800 to-purple-950",
  },

  // AI/ML
  {
    id: "ai_free", role: "ai_ml_engineer", name: "AI Classic", icon: "🤖",
    tier: "free", color: "#22c55e", ats: 68,
    links: ["github"],
    sections: ["Summary", "Skills", "Projects", "Education"],
    description: "Basic template for AI/ML roles",
    preview_bg: "from-green-900 to-gray-900",
  },
  {
    id: "ai_pro", role: "ai_ml_engineer", name: "AI Research Pro", icon: "🤖",
    tier: "pro", color: "#4ade80", ats: 97,
    links: ["github", "huggingface", "googlescholar", "linkedin"],
    sections: ["Summary", "Research Interests", "Skills", "Experience", "Publications", "Projects", "Education"],
    description: "Research-grade with HuggingFace + Scholar links",
    preview_bg: "from-green-800 to-green-950",
  },

  // FRESHER
  {
    id: "fr_free", role: "fresher", name: "Campus Classic", icon: "🎓",
    tier: "free", color: "#ec4899", ats: 75,
    links: ["linkedin"],
    sections: ["Objective", "Education", "Skills", "Projects", "Certifications"],
    description: "Perfect for campus placements",
    preview_bg: "from-pink-900 to-gray-900",
  },
  {
    id: "fr_pro", role: "fresher", name: "Campus Pro", icon: "🎓",
    tier: "pro", color: "#f472b6", ats: 93,
    links: ["linkedin", "github", "portfolio"],
    sections: ["Objective", "Education", "Skills", "Projects", "Internships", "Achievements", "Certifications"],
    description: "Modern fresher template with GitHub + Portfolio",
    preview_bg: "from-pink-800 to-pink-950",
  },

  // FULL STACK
  {
    id: "fs_pro", role: "full_stack", name: "Full Stack Pro", icon: "🌐",
    tier: "pro", color: "#f59e0b", ats: 95,
    links: ["github", "linkedin", "portfolio", "npm"],
    sections: ["Summary", "Tech Stack", "Experience", "Projects", "Open Source", "Education"],
    description: "Showcase frontend + backend with live project links",
    preview_bg: "from-yellow-900 to-yellow-950",
  },

  // DEVOPS
  {
    id: "do_pro", role: "devops", name: "DevOps Pro", icon: "⚙️",
    tier: "pro", color: "#f97316", ats: 95,
    links: ["github", "linkedin", "dockerhub"],
    sections: ["Summary", "Skills", "Infrastructure", "Experience", "Certifications", "Education"],
    description: "DevOps template with DockerHub + GitHub links",
    preview_bg: "from-orange-900 to-orange-950",
  },

  // UI/UX
  {
    id: "ux_pro", role: "ui_ux", name: "Designer Pro", icon: "🎨",
    tier: "pro", color: "#a855f7", ats: 91,
    links: ["behance", "dribbble", "linkedin", "figma"],
    sections: ["Summary", "Skills", "Portfolio", "Experience", "Projects", "Education"],
    description: "Visual-first template with Behance + Dribbble links",
    preview_bg: "from-violet-900 to-violet-950",
  },
];

const LINK_ICONS: Record<string, string> = {
  github: "🐙", linkedin: "💼", portfolio: "🌐",
  kaggle: "📈", huggingface: "🤗", googlescholar: "🎓",
  behance: "🎭", dribbble: "🏀", figma: "🎯",
  dockerhub: "🐳", npm: "📦",
};

interface TemplateSelectorProps {
  detectedRole: string;
  userEmail: string;
}

export default function TemplateSelector({ detectedRole, userEmail }: TemplateSelectorProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState(detectedRole || "all");

  const roles = [
    { id: "all", label: "All" },
    { id: "software_engineer", label: "💻 Developer" },
    { id: "data_analyst", label: "📊 Data" },
    { id: "ai_ml_engineer", label: "🤖 AI/ML" },
    { id: "fresher", label: "🎓 Fresher" },
    { id: "full_stack", label: "🌐 Full Stack" },
    { id: "devops", label: "⚙️ DevOps" },
    { id: "ui_ux", label: "🎨 Design" },
  ];

  const filtered = filter === "all"
    ? TEMPLATES
    : TEMPLATES.filter(t => t.role === filter);

  const handleDownload = (template: typeof TEMPLATES[0]) => {
    if (template.tier === "pro") {
      alert("Upgrade to Pro (₹299/month) to download this template!");
      return;
    }
    alert(`Downloading ${template.name} template... (PDF generation coming soon)`);
  };

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold">📄 Choose Your Resume Template</h3>
          <span className="text-xs bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full">
            AI detected: {detectedRole?.replace(/_/g, " ")}
          </span>
        </div>
        <p className="text-gray-400 text-sm">
          Free templates are clean and functional. Pro templates are modern, ATS-optimized with live social links.
        </p>
      </div>

      {/* Role Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {roles.map(r => (
          <button key={r.id} onClick={() => setFilter(r.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
              filter === r.id
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}>
            {r.label}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(t => (
          <div key={t.id}
            onClick={() => setSelected(t.id)}
            className={`relative rounded-2xl border-2 cursor-pointer transition overflow-hidden ${
              selected === t.id ? "border-blue-500" : "border-gray-800 hover:border-gray-600"
            }`}>

            {/* Preview Banner */}
            <div className={`bg-gradient-to-r ${t.preview_bg} p-5 relative`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{t.icon}</span>
                  <div>
                    <p className="font-bold text-white">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.description}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                  t.tier === "free"
                    ? "bg-green-500 text-black"
                    : "bg-yellow-500 text-black"
                }`}>
                  {t.tier === "free" ? "FREE" : "PRO"}
                </div>
              </div>

              {/* Mock Resume Preview */}
              <div className="bg-black/20 rounded-lg p-3 text-xs">
                <div className="h-2 bg-white/30 rounded mb-1 w-1/2"></div>
                <div className="h-1 bg-white/20 rounded mb-2 w-1/3"></div>
                {t.sections.slice(0, 3).map((s, i) => (
                  <div key={i} className="mb-1">
                    <div className="h-1.5 rounded mb-0.5" style={{backgroundColor: t.color, width: `${30 + i*10}%`, opacity: 0.8}}></div>
                    <div className="h-1 bg-white/10 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Template Info */}
            <div className="bg-gray-900 p-4">
              {/* ATS Score */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-400">ATS Score</span>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-24 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all"
                      style={{width: `${t.ats}%`, backgroundColor: t.ats >= 90 ? "#22c55e" : "#eab308"}}/>
                  </div>
                  <span className="text-xs font-bold" style={{color: t.ats >= 90 ? "#22c55e" : "#eab308"}}>
                    {t.ats}%
                  </span>
                </div>
              </div>

              {/* Sections */}
              <div className="flex flex-wrap gap-1 mb-3">
                {t.sections.map((s, i) => (
                  <span key={i} className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>

              {/* Links */}
              {t.links.length > 0 && (
                <div className="flex gap-2 mb-3">
                  <span className="text-xs text-gray-500">Live links:</span>
                  {t.links.map((l, i) => (
                    <span key={i} className="text-xs" title={l}>{LINK_ICONS[l] || "🔗"} {l}</span>
                  ))}
                </div>
              )}

              {/* Download Button */}
              <button
                onClick={(e) => { e.stopPropagation(); handleDownload(t); }}
                className={`w-full py-2 rounded-xl text-sm font-semibold transition ${
                  t.tier === "free"
                    ? "text-white"
                    : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/20"
                }`}
                style={t.tier === "free" ? {backgroundColor: t.color} : {}}>
                {t.tier === "free" ? "⬇️ Download Free" : "🔒 Upgrade to Pro"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pro Upgrade Banner */}
      <div className="mt-8 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-6 border border-blue-800/50 text-center">
        <h4 className="text-lg font-bold mb-1">🚀 Upgrade to Pro</h4>
        <p className="text-gray-400 text-sm mb-4">
          Modern ATS-optimized templates with live social links, better formatting, higher ATS scores
        </p>
        <div className="flex justify-center gap-8 mb-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">₹299</div>
            <div className="text-gray-500">per month</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">₹2499</div>
            <div className="text-gray-500">per year</div>
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-bold transition">
          Upgrade Now →
        </button>
      </div>
    </div>
  );
}