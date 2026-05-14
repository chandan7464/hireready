import { useState } from "react";

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
  location: string;
  summary: string;
  skills: string;
  experience: { company: string; role: string; duration: string; points: string }[];
  education: { college: string; degree: string; year: string; cgpa: string }[];
  projects: { name: string; tech: string; link: string; desc: string }[];
  certifications: string;
  achievements: string;
}

const EMPTY: ResumeData = {
  name: "", email: "", phone: "", linkedin: "", github: "",
  portfolio: "", location: "", summary: "", skills: "",
  experience: [{ company: "", role: "", duration: "", points: "" }],
  education: [{ college: "", degree: "", year: "", cgpa: "" }],
  projects: [{ name: "", tech: "", link: "", desc: "" }],
  certifications: "", achievements: "",
};

const TEMPLATES = [
  { id: "modern", name: "Modern", color: "#3b82f6", accent: "#1d4ed8" },
  { id: "minimal", name: "Minimal", color: "#111827", accent: "#374151" },
  { id: "creative", name: "Creative", color: "#7c3aed", accent: "#5b21b6" },
  { id: "green", name: "Professional", color: "#059669", accent: "#047857" },
];

function LivePreview({ data, template }: { data: ResumeData; template: typeof TEMPLATES[0] }) {
  return (
    <div className="bg-white text-gray-900 p-8 text-xs leading-relaxed font-sans min-h-full"
      style={{ fontFamily: "Arial, sans-serif" }}>

      {/* Header */}
      <div className="border-b-4 pb-3 mb-4" style={{ borderColor: template.color }}>
        <h1 className="text-2xl font-bold" style={{ color: template.color }}>
          {data.name || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-3 mt-1 text-gray-500 text-xs">
          {data.email && <span>✉ {data.email}</span>}
          {data.phone && <span>📱 {data.phone}</span>}
          {data.location && <span>📍 {data.location}</span>}
          {data.linkedin && <span>💼 {data.linkedin}</span>}
          {data.github && <span>🐙 {data.github}</span>}
          {data.portfolio && <span>🌐 {data.portfolio}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: template.color }}>
            Professional Summary
          </h2>
          <p className="text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Skills */}
      {data.skills && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: template.color }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-1">
            {data.skills.split(",").map((s, i) => (
              <span key={i} className="px-2 py-0.5 rounded text-xs text-white"
                style={{ backgroundColor: template.color }}>
                {s.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience.some(e => e.company) && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: template.color }}>
            Experience
          </h2>
          {data.experience.map((exp, i) => exp.company && (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-gray-900">{exp.role}</p>
                  <p className="text-gray-600">{exp.company}</p>
                </div>
                <p className="text-gray-500 text-xs">{exp.duration}</p>
              </div>
              {exp.points && (
                <ul className="mt-1 ml-3">
                  {exp.points.split("\n").map((p, j) => p.trim() && (
                    <li key={j} className="text-gray-700 flex gap-1">
                      <span style={{ color: template.color }}>•</span>{p.trim()}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.some(p => p.name) && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: template.color }}>
            Projects
          </h2>
          {data.projects.map((proj, i) => proj.name && (
            <div key={i} className="mb-3 bg-blue-50 rounded p-2 border-l-2" style={{ borderColor: template.color }}>
              <div className="flex justify-between">
                <p className="font-bold text-gray-900">{proj.name}</p>
                {proj.link && (
                  <a href={proj.link} className="text-xs underline" style={{ color: template.color }}>
                    View →
                  </a>
                )}
              </div>
              {proj.tech && <p className="text-gray-500 text-xs">Tech: {proj.tech}</p>}
              {proj.desc && <p className="text-gray-700 mt-1">{proj.desc}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.some(e => e.college) && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: template.color }}>
            Education
          </h2>
          {data.education.map((edu, i) => edu.college && (
            <div key={i} className="flex justify-between mb-2">
              <div>
                <p className="font-bold text-gray-900">{edu.degree}</p>
                <p className="text-gray-600">{edu.college}</p>
                {edu.cgpa && <p className="text-gray-500">CGPA: {edu.cgpa}</p>}
              </div>
              <p className="text-gray-500 text-xs">{edu.year}</p>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {data.certifications && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: template.color }}>
            Certifications
          </h2>
          <ul className="ml-3">
            {data.certifications.split("\n").map((c, i) => c.trim() && (
              <li key={i} className="flex gap-1 text-gray-700">
                <span style={{ color: template.color }}>•</span>{c.trim()}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Achievements */}
      {data.achievements && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: template.color }}>
            Achievements
          </h2>
          <ul className="ml-3">
            {data.achievements.split("\n").map((a, i) => a.trim() && (
              <li key={i} className="flex gap-1 text-gray-700">
                <span style={{ color: template.color }}>•</span>{a.trim()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function ResumeBuilder() {
  const [data, setData] = useState<ResumeData>(EMPTY);
  const [template, setTemplate] = useState(TEMPLATES[0]);
  const [activeTab, setActiveTab] = useState("personal");

  const update = (field: keyof ResumeData, value: any) =>
    setData(prev => ({ ...prev, [field]: value }));

  const updateExp = (idx: number, field: string, value: string) => {
    const exp = [...data.experience];
    exp[idx] = { ...exp[idx], [field]: value };
    update("experience", exp);
  };

  const updateEdu = (idx: number, field: string, value: string) => {
    const edu = [...data.education];
    edu[idx] = { ...edu[idx], [field]: value };
    update("education", edu);
  };

  const updateProj = (idx: number, field: string, value: string) => {
    const proj = [...data.projects];
    proj[idx] = { ...proj[idx], [field]: value };
    update("projects", proj);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    const preview = document.getElementById("resume-preview");
    if (!preview) return;
    printWindow.document.write(`
      <html><head><title>${data.name || "Resume"}</title>
      <style>
        body { margin: 0; font-family: Arial; }
        @media print { body { -webkit-print-color-adjust: exact; } }
      </style>
      </head><body>${preview.innerHTML}</body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const tabs = [
    { id: "personal", label: "👤 Personal" },
    { id: "summary", label: "📝 Summary" },
    { id: "skills", label: "⚡ Skills" },
    { id: "experience", label: "💼 Experience" },
    { id: "projects", label: "🚀 Projects" },
    { id: "education", label: "🎓 Education" },
    { id: "extras", label: "🏆 Extras" },
  ];

  const inp = "w-full bg-gray-800 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 mb-2";
  const lbl = "text-xs text-gray-400 mb-1 block font-medium";

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="bg-gray-900 px-6 py-3 flex justify-between items-center border-b border-gray-800">
        <a href="/" className="text-xl font-bold text-blue-400">HireReady</a>
        <div className="flex items-center gap-4">
          <a href="/dashboard" className="text-gray-400 hover:text-white text-sm">Analyzer</a>
          <a href="/resume-builder" className="text-blue-400 text-sm font-semibold">Builder</a>
          <a href="/templates" className="text-gray-400 hover:text-white text-sm">Templates</a>
          <button onClick={handlePrint}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-bold transition">
            ⬇️ Download PDF
          </button>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-56px)]">
        {/* LEFT — Form */}
        <div className="w-1/2 overflow-y-auto border-r border-gray-800">

          {/* Template Picker */}
          <div className="p-4 border-b border-gray-800 bg-gray-900">
            <p className="text-xs text-gray-400 mb-2 font-semibold uppercase">Choose Template</p>
            <div className="flex gap-2">
              {TEMPLATES.map(t => (
                <button key={t.id} onClick={() => setTemplate(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition ${
                    template.id === t.id ? "border-white" : "border-transparent"
                  }`}
                  style={{ backgroundColor: t.color }}>
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-gray-800 bg-gray-900">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-xs font-medium whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-gray-400 hover:text-white"
                }`}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Content */}
          <div className="p-4">
            {activeTab === "personal" && (
              <div>
                <h3 className="font-bold mb-3 text-blue-400">Personal Information</h3>
                <label className={lbl}>Full Name *</label>
                <input className={inp} placeholder="Chandan Kumar" value={data.name} onChange={e => update("name", e.target.value)} />
                <label className={lbl}>Email *</label>
                <input className={inp} placeholder="chandan@email.com" value={data.email} onChange={e => update("email", e.target.value)} />
                <label className={lbl}>Phone *</label>
                <input className={inp} placeholder="+91 9876543210" value={data.phone} onChange={e => update("phone", e.target.value)} />
                <label className={lbl}>Location</label>
                <input className={inp} placeholder="Delhi, India" value={data.location} onChange={e => update("location", e.target.value)} />
                <label className={lbl}>LinkedIn URL</label>
                <input className={inp} placeholder="linkedin.com/in/yourname" value={data.linkedin} onChange={e => update("linkedin", e.target.value)} />
                <label className={lbl}>GitHub URL</label>
                <input className={inp} placeholder="github.com/yourname" value={data.github} onChange={e => update("github", e.target.value)} />
                <label className={lbl}>Portfolio URL</label>
                <input className={inp} placeholder="yourportfolio.com" value={data.portfolio} onChange={e => update("portfolio", e.target.value)} />
              </div>
            )}

            {activeTab === "summary" && (
              <div>
                <h3 className="font-bold mb-3 text-blue-400">Professional Summary</h3>
                <label className={lbl}>Write 2-3 lines about yourself</label>
                <textarea className={`${inp} h-32 resize-none`}
                  placeholder="Motivated Computer Science graduate with expertise in Python and AI/ML. Built multiple production-grade applications. Seeking software engineering role at top tech companies."
                  value={data.summary} onChange={e => update("summary", e.target.value)} />
              </div>
            )}

            {activeTab === "skills" && (
              <div>
                <h3 className="font-bold mb-3 text-blue-400">Skills</h3>
                <label className={lbl}>Enter skills separated by commas</label>
                <textarea className={`${inp} h-32 resize-none`}
                  placeholder="Python, FastAPI, React, TypeScript, SQL, Machine Learning, Docker, Git"
                  value={data.skills} onChange={e => update("skills", e.target.value)} />
              </div>
            )}

            {activeTab === "experience" && (
              <div>
                <h3 className="font-bold mb-3 text-blue-400">Work Experience</h3>
                {data.experience.map((exp, i) => (
                  <div key={i} className="bg-gray-800 rounded-xl p-4 mb-4">
                    <p className="text-xs font-bold text-gray-400 mb-2">Experience {i + 1}</p>
                    <label className={lbl}>Company Name</label>
                    <input className={inp} placeholder="YBI Foundation" value={exp.company} onChange={e => updateExp(i, "company", e.target.value)} />
                    <label className={lbl}>Job Role</label>
                    <input className={inp} placeholder="AI/ML Intern" value={exp.role} onChange={e => updateExp(i, "role", e.target.value)} />
                    <label className={lbl}>Duration</label>
                    <input className={inp} placeholder="Jan 2024 - Jun 2024" value={exp.duration} onChange={e => updateExp(i, "duration", e.target.value)} />
                    <label className={lbl}>Key Points (one per line)</label>
                    <textarea className={`${inp} h-24 resize-none`}
                      placeholder="Built ML models with 95% accuracy&#10;Reduced processing time by 40%"
                      value={exp.points} onChange={e => updateExp(i, "points", e.target.value)} />
                  </div>
                ))}
                <button onClick={() => update("experience", [...data.experience, { company: "", role: "", duration: "", points: "" }])}
                  className="w-full border border-dashed border-gray-600 hover:border-blue-500 py-2 rounded-xl text-sm text-gray-400 hover:text-blue-400 transition">
                  + Add Experience
                </button>
              </div>
            )}

            {activeTab === "projects" && (
              <div>
                <h3 className="font-bold mb-3 text-blue-400">Projects</h3>
                {data.projects.map((proj, i) => (
                  <div key={i} className="bg-gray-800 rounded-xl p-4 mb-4">
                    <p className="text-xs font-bold text-gray-400 mb-2">Project {i + 1}</p>
                    <label className={lbl}>Project Name</label>
                    <input className={inp} placeholder="HireReady - AI Resume Analyzer" value={proj.name} onChange={e => updateProj(i, "name", e.target.value)} />
                    <label className={lbl}>Tech Stack</label>
                    <input className={inp} placeholder="FastAPI, React, OpenRouter AI" value={proj.tech} onChange={e => updateProj(i, "tech", e.target.value)} />
                    <label className={lbl}>Live Link / GitHub</label>
                    <input className={inp} placeholder="github.com/yourname/project" value={proj.link} onChange={e => updateProj(i, "link", e.target.value)} />
                    <label className={lbl}>Description</label>
                    <textarea className={`${inp} h-20 resize-none`}
                      placeholder="Built a full-stack AI SaaS that analyzes resumes..."
                      value={proj.desc} onChange={e => updateProj(i, "desc", e.target.value)} />
                  </div>
                ))}
                <button onClick={() => update("projects", [...data.projects, { name: "", tech: "", link: "", desc: "" }])}
                  className="w-full border border-dashed border-gray-600 hover:border-blue-500 py-2 rounded-xl text-sm text-gray-400 hover:text-blue-400 transition">
                  + Add Project
                </button>
              </div>
            )}

            {activeTab === "education" && (
              <div>
                <h3 className="font-bold mb-3 text-blue-400">Education</h3>
                {data.education.map((edu, i) => (
                  <div key={i} className="bg-gray-800 rounded-xl p-4 mb-4">
                    <label className={lbl}>College / University</label>
                    <input className={inp} placeholder="Manav Rachna International Institute" value={edu.college} onChange={e => updateEdu(i, "college", e.target.value)} />
                    <label className={lbl}>Degree</label>
                    <input className={inp} placeholder="B.Tech Computer Science" value={edu.degree} onChange={e => updateEdu(i, "degree", e.target.value)} />
                    <label className={lbl}>Year</label>
                    <input className={inp} placeholder="2021 - 2025" value={edu.year} onChange={e => updateEdu(i, "year", e.target.value)} />
                    <label className={lbl}>CGPA / Percentage</label>
                    <input className={inp} placeholder="6.5 CGPA" value={edu.cgpa} onChange={e => updateEdu(i, "cgpa", e.target.value)} />
                  </div>
                ))}
              </div>
            )}

            {activeTab === "extras" && (
              <div>
                <h3 className="font-bold mb-3 text-blue-400">Certifications & Achievements</h3>
                <label className={lbl}>Certifications (one per line)</label>
                <textarea className={`${inp} h-24 resize-none`}
                  placeholder="Python for Data Science - IBM&#10;Machine Learning - Coursera"
                  value={data.certifications} onChange={e => update("certifications", e.target.value)} />
                <label className={lbl}>Achievements (one per line)</label>
                <textarea className={`${inp} h-24 resize-none`}
                  placeholder="Top 5% in HackerRank Python&#10;Built HireReady SaaS in 1 day"
                  value={data.achievements} onChange={e => update("achievements", e.target.value)} />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Live Preview */}
        <div className="w-1/2 overflow-y-auto bg-gray-100">
          <div className="p-4 bg-gray-200 border-b border-gray-300 flex justify-between items-center">
            <span className="text-gray-700 text-sm font-semibold">Live Preview</span>
            <button onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-semibold">
              Print / Save PDF
            </button>
          </div>
          <div id="resume-preview" className="shadow-lg mx-4 my-4 bg-white">
            <LivePreview data={data} template={template} />
          </div>
        </div>
      </div>
    </div>
  );
}