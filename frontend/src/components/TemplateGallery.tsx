// src/components/TemplateGallery.tsx
import { useState } from "react";

export const ALL_TEMPLATES = [
  // ── IT & SOFTWARE ──
  {
    id: "it_modern", name: "Tech Modern", industry: "IT",
    icon: "💻", color: "#3b82f6", bg: "#0f172a",
    accent: "#60a5fa", ats: 96,
    links: ["github", "linkedin", "portfolio"],
    sections: ["Summary", "Skills", "Experience", "Projects", "Education", "Certifications"],
    desc: "Clean modern layout for software engineers",
    style: "double-column",
    preview: { header: "#1e40af", body: "#0f172a", text: "#e2e8f0" }
  },
  {
    id: "startup", name: "Startup Ready", industry: "IT",
    icon: "🚀", color: "#8b5cf6", bg: "#1e1b4b",
    accent: "#a78bfa", ats: 94,
    links: ["github", "linkedin", "portfolio", "npm"],
    sections: ["Summary", "Tech Stack", "Experience", "Open Source", "Projects", "Education"],
    desc: "Bold template for startup environments",
    style: "single-column",
    preview: { header: "#4c1d95", body: "#1e1b4b", text: "#ede9fe" }
  },
  {
    id: "ai_ml", name: "AI Research", industry: "IT",
    icon: "🤖", color: "#22c55e", bg: "#052e16",
    accent: "#4ade80", ats: 97,
    links: ["github", "huggingface", "googlescholar", "linkedin"],
    sections: ["Summary", "Research", "Skills", "Publications", "Projects", "Education"],
    desc: "Research-grade for AI/ML engineers",
    style: "academic",
    preview: { header: "#14532d", body: "#052e16", text: "#dcfce7" }
  },
  {
    id: "fullstack", name: "Full Stack Pro", industry: "IT",
    icon: "🌐", color: "#f59e0b", bg: "#1c1400",
    accent: "#fcd34d", ats: 95,
    links: ["github", "linkedin", "portfolio"],
    sections: ["Summary", "Frontend", "Backend", "Projects", "Experience", "Education"],
    desc: "Showcases both frontend and backend expertise",
    style: "double-column",
    preview: { header: "#78350f", body: "#1c1400", text: "#fef3c7" }
  },

  // ── BANKING & FINANCE ──
  {
    id: "banking", name: "Finance Pro", industry: "Banking",
    icon: "🏦", color: "#0ea5e9", bg: "#0c1929",
    accent: "#38bdf8", ats: 93,
    links: ["linkedin"],
    sections: ["Summary", "Experience", "Skills", "Education", "Certifications", "Achievements"],
    desc: "Professional template for banking & finance",
    style: "classic",
    preview: { header: "#0c4a6e", body: "#0c1929", text: "#e0f2fe" }
  },
  {
    id: "investment", name: "Investment Banking", industry: "Banking",
    icon: "📈", color: "#10b981", bg: "#022c22",
    accent: "#34d399", ats: 95,
    links: ["linkedin", "bloomberg"],
    sections: ["Summary", "Experience", "Deals", "Skills", "Education", "Certifications"],
    desc: "Elite template for investment banking roles",
    style: "executive",
    preview: { header: "#064e3b", body: "#022c22", text: "#d1fae5" }
  },

  // ── MARKETING ──
  {
    id: "marketing", name: "Marketing Star", industry: "Marketing",
    icon: "📣", color: "#ec4899", bg: "#2d0019",
    accent: "#f472b6", ats: 91,
    links: ["linkedin", "portfolio", "behance"],
    sections: ["Summary", "Campaigns", "Skills", "Experience", "Projects", "Education"],
    desc: "Creative template for marketing professionals",
    style: "creative",
    preview: { header: "#831843", body: "#2d0019", text: "#fce7f3" }
  },

  // ── DESIGN & CREATIVE ──
  {
    id: "ux_design", name: "UX Designer", industry: "Design",
    icon: "🎨", color: "#a855f7", bg: "#1a0533",
    accent: "#d8b4fe", ats: 90,
    links: ["behance", "dribbble", "figma", "linkedin"],
    sections: ["Summary", "Portfolio", "Skills", "Experience", "Projects", "Education"],
    desc: "Visual-first template with portfolio links",
    style: "creative",
    preview: { header: "#581c87", body: "#1a0533", text: "#f3e8ff" }
  },

  // ── HEALTHCARE ──
  {
    id: "healthcare", name: "Healthcare Pro", industry: "Healthcare",
    icon: "🏥", color: "#06b6d4", bg: "#001f26",
    accent: "#22d3ee", ats: 92,
    links: ["linkedin", "researchgate"],
    sections: ["Summary", "Specialization", "Experience", "Education", "Certifications", "Research"],
    desc: "Professional template for healthcare roles",
    style: "classic",
    preview: { header: "#164e63", body: "#001f26", text: "#cffafe" }
  },

  // ── SALES ──
  {
    id: "sales", name: "Sales Champion", industry: "Sales",
    icon: "💰", color: "#f97316", bg: "#1a0a00",
    accent: "#fb923c", ats: 90,
    links: ["linkedin"],
    sections: ["Summary", "Achievements", "Experience", "Skills", "Education"],
    desc: "Results-focused template for sales professionals",
    style: "impact",
    preview: { header: "#7c2d12", body: "#1a0a00", text: "#fff7ed" }
  },

  // ── EDUCATION ──
  {
    id: "educator", name: "Educator", industry: "Education",
    icon: "🎓", color: "#14b8a6", bg: "#001a18",
    accent: "#2dd4bf", ats: 89,
    links: ["linkedin", "googlescholar"],
    sections: ["Summary", "Teaching", "Experience", "Education", "Publications", "Certifications"],
    desc: "Academic template for educators and teachers",
    style: "academic",
    preview: { header: "#134e4a", body: "#001a18", text: "#ccfbf1" }
  },

  // ── ENTERPRISE ──
  {
    id: "enterprise", name: "Enterprise Executive", industry: "Enterprise",
    icon: "🏢", color: "#64748b", bg: "#0f172a",
    accent: "#94a3b8", ats: 94,
    links: ["linkedin"],
    sections: ["Executive Summary", "Leadership", "Experience", "Achievements", "Education", "Board Memberships"],
    desc: "C-suite and senior leadership template",
    style: "executive",
    preview: { header: "#1e293b", body: "#0f172a", text: "#f1f5f9" }
  },

  // ── FRESHER / CAMPUS ──
  {
    id: "fresher_modern", name: "Campus Fresh", industry: "Fresher",
    icon: "🎓", color: "#ec4899", bg: "#2d0019",
    accent: "#f9a8d4", ats: 93,
    links: ["linkedin", "github", "portfolio"],
    sections: ["Objective", "Education", "Skills", "Projects", "Internships", "Achievements", "Certifications"],
    desc: "Modern template for freshers & campus hiring",
    style: "modern",
    preview: { header: "#831843", body: "#2d0019", text: "#fce7f3" }
  },

  // ── DEVOPS ──
  {
    id: "devops", name: "DevOps Engineer", industry: "IT",
    icon: "⚙️", color: "#f97316", bg: "#1a0a00",
    accent: "#fed7aa", ats: 95,
    links: ["github", "dockerhub", "linkedin"],
    sections: ["Summary", "Skills", "Infrastructure", "Experience", "Certifications", "Education"],
    desc: "Infrastructure-focused template for DevOps",
    style: "technical",
    preview: { header: "#7c2d12", body: "#1a0a00", text: "#fff7ed" }
  },

  // ── DATA ──
  {
    id: "data_analyst", name: "Data Analyst", industry: "IT",
    icon: "📊", color: "#8b5cf6", bg: "#1e1b4b",
    accent: "#c4b5fd", ats: 94,
    links: ["kaggle", "github", "linkedin", "tableau"],
    sections: ["Summary", "Skills", "Experience", "Projects", "Education", "Certifications"],
    desc: "Data-focused template with analytics links",
    style: "double-column",
    preview: { header: "#4c1d95", body: "#1e1b4b", text: "#ede9fe" }
  },
];

const INDUSTRIES = ["All", "IT", "Banking", "Marketing", "Design", "Healthcare", "Sales", "Education", "Enterprise", "Fresher"];

const LINK_ICONS: Record<string, {icon: string, label: string}> = {
  github: { icon: "🐙", label: "GitHub" },
  linkedin: { icon: "💼", label: "LinkedIn" },
  portfolio: { icon: "🌐", label: "Portfolio" },
  kaggle: { icon: "📈", label: "Kaggle" },
  huggingface: { icon: "🤗", label: "HuggingFace" },
  googlescholar: { icon: "🎓", label: "Scholar" },
  behance: { icon: "🎭", label: "Behance" },
  dribbble: { icon: "🏀", label: "Dribbble" },
  figma: { icon: "🎯", label: "Figma" },
  dockerhub: { icon: "🐳", label: "DockerHub" },
  npm: { icon: "📦", label: "NPM" },
  researchgate: { icon: "🔬", label: "ResearchGate" },
  bloomberg: { icon: "📰", label: "Bloomberg" },
  tableau: { icon: "📉", label: "Tableau" },
};

interface TemplateGalleryProps {
  detectedIndustry?: string;
  resumeData?: any;
  onSelect: (template: typeof ALL_TEMPLATES[0]) => void;
}

export default function TemplateGallery({ detectedIndustry, resumeData, onSelect }: TemplateGalleryProps) {
  const [industry, setIndustry] = useState(detectedIndustry || "All");
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = ALL_TEMPLATES.filter(t => {
    const matchIndustry = industry === "All" || t.industry === industry;
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.desc.toLowerCase().includes(search.toLowerCase());
    return matchIndustry && matchSearch;
  });

  const handleSelect = (t: typeof ALL_TEMPLATES[0]) => {
    setSelected(t.id);
    onSelect(t);
  };

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="text-xl font-bold">🎨 Choose Your Template</h3>
            <p className="text-gray-400 text-sm mt-1">
              {detectedIndustry
                ? `AI detected your industry: ${detectedIndustry} — showing best matches first`
                : "All professional templates — free to use"
              }
            </p>
          </div>
          <input
            type="text" placeholder="Search templates..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 w-48"
          />
        </div>
      </div>

      {/* Industry Filter */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6">
        {INDUSTRIES.map(ind => (
          <button key={ind} onClick={() => setIndustry(ind)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
              industry === ind ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}>
            {ind}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(t => (
          <div key={t.id}
            className={`rounded-2xl border-2 overflow-hidden cursor-pointer transition-all hover:scale-[1.02] ${
              selected === t.id ? "border-blue-400 shadow-lg shadow-blue-500/20" : "border-gray-800"
            }`}
            onClick={() => handleSelect(t)}>

            {/* Template Preview */}
            <div className="p-4 relative" style={{ backgroundColor: t.preview.body }}>
              {/* Industry Badge */}
              <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: t.color + "30", color: t.color }}>
                {t.industry}
              </span>

              {/* Mock Resume */}
              <div className="rounded-lg overflow-hidden shadow-lg">
                {/* Header */}
                <div className="p-3" style={{ backgroundColor: t.preview.header }}>
                  <div className="h-3 rounded mb-1 w-32" style={{ backgroundColor: t.accent }}></div>
                  <div className="flex gap-2">
                    {t.links.slice(0, 3).map((l, i) => (
                      <div key={i} className="h-1.5 rounded w-12 opacity-60" style={{ backgroundColor: t.accent }}></div>
                    ))}
                  </div>
                </div>
                {/* Body */}
                <div className="p-3" style={{ backgroundColor: t.preview.body + "dd" }}>
                  {t.sections.slice(0, 4).map((s, i) => (
                    <div key={i} className="mb-2">
                      <div className="h-1.5 rounded mb-1 w-16" style={{ backgroundColor: t.color, opacity: 0.8 }}></div>
                      <div className="h-1 rounded w-full opacity-20" style={{ backgroundColor: t.preview.text }}></div>
                      <div className="h-1 rounded w-3/4 mt-0.5 opacity-20" style={{ backgroundColor: t.preview.text }}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Template Info */}
            <div className="bg-gray-900 p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{t.icon}</span>
                <h4 className="font-bold text-white">{t.name}</h4>
              </div>
              <p className="text-gray-400 text-xs mb-3">{t.desc}</p>

              {/* ATS Score */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-gray-500">ATS</span>
                <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{
                    width: `${t.ats}%`,
                    backgroundColor: t.ats >= 95 ? "#22c55e" : t.ats >= 90 ? "#3b82f6" : "#eab308"
                  }}/>
                </div>
                <span className="text-xs font-bold" style={{
                  color: t.ats >= 95 ? "#22c55e" : t.ats >= 90 ? "#3b82f6" : "#eab308"
                }}>{t.ats}/100</span>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-1 mb-3">
                {t.links.map((l, i) => (
                  <span key={i} className="text-xs bg-gray-800 px-2 py-0.5 rounded-full text-gray-400 flex items-center gap-1">
                    {LINK_ICONS[l]?.icon} {LINK_ICONS[l]?.label}
                  </span>
                ))}
              </div>

              {/* Sections */}
              <div className="flex flex-wrap gap-1 mb-4">
                {t.sections.map((s, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 rounded-full border"
                    style={{ borderColor: t.color + "40", color: t.color }}>
                    {s}
                  </span>
                ))}
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); handleSelect(t); }}
                className="w-full py-2 rounded-xl text-sm font-bold transition text-white"
                style={{ backgroundColor: selected === t.id ? t.color : t.color + "80" }}>
                {selected === t.id ? "✅ Selected" : "Use This Template →"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No templates found for "{search}"
        </div>
      )}
    </div>
  );
}