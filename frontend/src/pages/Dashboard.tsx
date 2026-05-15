import TemplateGallery from "../components/TemplateGallery";
import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import api from "../api/client";

const ScoreCircle = ({ score, label, color }: { score: number; label: string; color: string }) => {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (score / 10) * circ;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="90" height="90" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r={r} fill="none" stroke="#1f2937" strokeWidth="8"/>
        <circle cx="45" cy="45" r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform="rotate(-90 45 45)"/>
        <text x="45" y="45" textAnchor="middle" dy="0.35em" fill="white" fontSize="18" fontWeight="bold">
          {score}
        </text>
      </svg>
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  );
};

const ScoreBar = ({ label, score, color }: { label: string; score: number; color: string }) => (
  <div className="mb-3">
    <div className="flex justify-between text-sm mb-1">
      <span className="text-gray-300">{label}</span>
      <span style={{color}} className="font-semibold">{score}/10</span>
    </div>
    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{width:`${score*10}%`, backgroundColor:color}}/>
    </div>
  </div>
);

const parseResult = (text: string) => {
  const overall = parseInt(text.match(/Overall Score[:\s]+(\d+)/i)?.[1] || "7");
  const ats = parseInt(text.match(/ATS[^:]*[:\s]+(\d+)/i)?.[1] || "7");
  const lines = text.split("\n");
  const strengths: string[] = [];
  const improvements: string[] = [];
  const tips: string[] = [];
  let section = "";
  lines.forEach(line => {
    const l = line.trim();
    if (l.match(/strength/i)) section = "s";
    else if (l.match(/improv|weakness/i)) section = "i";
    else if (l.match(/tip|action/i)) section = "t";
    else if ((l.startsWith("-") || l.startsWith("•")) && l.length > 10) {
      const clean = l.replace(/^[-•]+\s*/, "").replace(/\*\*/g, "").trim();
      if (section === "s" && strengths.length < 3) strengths.push(clean);
      if (section === "i" && improvements.length < 3) improvements.push(clean);
      if (section === "t" && tips.length < 3) tips.push(clean);
    }
  });
  return { overall, ats, strengths, improvements, tips };
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [jobId, setJobId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const form = new FormData();
      form.append("file", file);
      const res = await api.post("/api/v1/resume/upload", form);
      return res.data;
    },
    onSuccess: (data) => setJobId(data.job_id),
  });

  const { data: status } = useQuery({
    queryKey: ["resume-status", jobId],
    queryFn: () => api.get(`/api/v1/resume/${jobId}/status`).then(r => r.data),
    enabled: !!jobId,
    refetchInterval: (query) => {
      const s = query.state.data?.status;
      return s === "done" || s === "failed" ? false : 3000;
    },
  });

  const parsed = status?.result ? parseResult(status.result) : null;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-900 px-6 py-4 flex justify-between items-center border-b border-gray-800">
        <a href="/" className="text-xl font-bold text-blue-400">HireReady</a>
        <div className="flex items-center gap-6">
          <a href="/dashboard" className="text-blue-400 text-sm font-semibold">Resume</a>
          <a href="/job-match" className="text-gray-400 hover:text-white text-sm">Job Match</a>
          <a href="/interview" className="text-gray-400 hover:text-white text-sm">Interview</a>
          <span className="text-gray-400 text-sm">{user?.email}</span>
          <button onClick={logout} className="text-sm text-red-400 hover:text-red-300">Logout</button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-2">AI Resume Analyzer</h2>
        <p className="text-gray-400 mb-8">Get instant AI feedback on your resume</p>

        <div onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-gray-700 hover:border-blue-500 rounded-2xl p-12 text-center cursor-pointer transition mb-6">
          <p className="text-4xl mb-3">📄</p>
          <p className="text-gray-300 font-medium">Click to upload PDF resume</p>
          <p className="text-gray-500 text-sm mt-1">Max 10MB • PDF only</p>
          <input ref={fileRef} type="file" accept=".pdf" onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadMutation.mutate(file);
          }} className="hidden"/>
        </div>

        {uploadMutation.isPending && (
          <div className="bg-gray-900 rounded-2xl p-6 text-center">
            <p className="text-blue-400 animate-pulse font-medium">🤖 Uploading...</p>
          </div>
        )}

        {jobId && status?.status === "processing" && (
          <div className="bg-gray-900 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">⚙️</div>
            <p className="text-blue-400 font-semibold text-lg animate-pulse">AI is analyzing your resume...</p>
            <p className="text-gray-500 text-sm mt-2">This takes about 30 seconds</p>
          </div>
        )}

        {status?.status === "done" && parsed && (
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold mb-6 text-center">Resume Score</h3>
              <div className="flex justify-center gap-12">
                <ScoreCircle score={parsed.overall} label="Overall Score"
                  color={parsed.overall >= 8 ? "#22c55e" : parsed.overall >= 6 ? "#eab308" : "#ef4444"}/>
                <ScoreCircle score={parsed.ats} label="ATS Score"
                  color={parsed.ats >= 8 ? "#22c55e" : parsed.ats >= 6 ? "#3b82f6" : "#ef4444"}/>
              </div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold mb-4">Detailed Breakdown</h3>
              <ScoreBar label="Content Quality" score={parsed.overall} color="#3b82f6"/>
              <ScoreBar label="ATS Compatibility" score={parsed.ats} color="#8b5cf6"/>
              <ScoreBar label="Formatting" score={Math.min(10, parsed.overall + 1)} color="#22c55e"/>
              <ScoreBar label="Keywords" score={Math.max(1, parsed.ats - 1)} color="#f59e0b"/>
            </div>

            {parsed.strengths.length > 0 && (
              <div className="bg-green-950/30 rounded-2xl p-6 border border-green-900">
                <h3 className="text-green-400 font-bold mb-3">✅ Key Strengths</h3>
                <ul className="space-y-2">
                  {parsed.strengths.map((s, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-300">
                      <span className="text-green-400">•</span>{s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {parsed.improvements.length > 0 && (
              <div className="bg-yellow-950/30 rounded-2xl p-6 border border-yellow-900">
                <h3 className="text-yellow-400 font-bold mb-3">⚠️ Areas to Improve</h3>
                <ul className="space-y-2">
                  {parsed.improvements.map((s, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-300">
                      <span className="text-yellow-400">•</span>{s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {parsed.tips.length > 0 && (
              <div className="bg-blue-950/30 rounded-2xl p-6 border border-blue-900">
                <h3 className="text-blue-400 font-bold mb-3">💡 Action Tips</h3>
                <ul className="space-y-2">
                  {parsed.tips.map((s, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-300">
                      <span className="text-blue-400">→</span>{s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold mb-4">📋 Full AI Report</h3>
              <div className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
                {status.result}
              </div>
            </div>

            <button onClick={() => { setJobId(null); uploadMutation.reset(); }}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition">
              Analyze Another Resume
            </button>

            <TemplateGallery
              detectedIndustry={parsed?.overall >= 7 ? "IT" : "Fresher"}
              onSelect={(template) => {
                window.location.href = `/resume-builder?template=${template.id}`;
              }}
            />
          </div>
        )}

        {status?.status === "failed" && (
          <div className="bg-red-950/30 rounded-2xl p-6 border border-red-900 text-red-400">
            ❌ {status.error_msg}
          </div>
        )}
      </div>
    </div>
  );
}
